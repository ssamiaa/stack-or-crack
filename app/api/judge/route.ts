import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

// ── Types ────────────────────────────────────────────────────────────────────

type Rating = "exploring" | "emerging" | "developing" | "proficient" | "extending";

interface Tool {
  name: string;
  category: string;
}

interface Brief {
  title: string;
  description: string;
  constraints: string;
  required_capabilities: string[];
}

interface JudgeRequestBody {
  brief: Brief;
  playerStack: Tool[];   // the 5 tools the player picked
  expertStack: string[]; // the correct tool names from briefs.json
}

interface ToolVerdict {
  tool: string;
  rating: Rating;
  correct: boolean;
  verdict: string;
}

interface JudgeResponse {
  overall_rating: Rating;
  overall: string;
  tool_verdicts: ToolVerdict[];
  missed_tools: string[];
  hatter_quote: string;
}

// ── Rating Descriptions ───────────────────────────────────────────────────────
// These are hardcoded here as a reference for use on the frontend.
//
// export const ratingDescriptions: Record<Rating, string> = {
//   exploring: "You're at the very beginning of understanding this space. The tools you chose don't yet match the problem — but recognizing that gap is the first step to closing it.",
//   emerging:  "You're starting to develop a sense of the AI landscape, but still need more practice matching tools to problems. The direction is there — the precision isn't quite yet.",
//   developing:"You understand parts of the problem but there are still gaps in your tool choices. You're on the right track — a few more deliberate swaps would get you to proficient.",
//   proficient:"You have a solid understanding of what this brief requires and chose tools that genuinely fit. This is the goal — you've shown real judgment about the AI landscape.",
//   extending: "You've gone beyond just knowing the tools — you understand exactly why each one belongs here. You're applying your knowledge with precision and purpose.",
// }

// ── Prompt Builder ────────────────────────────────────────────────────────────

function buildPrompt(
  brief: Brief,
  playerStack: Tool[],
  expertStack: string[]
): string {
  return `
You are the Mad Hatter — the AI judge of Stack or Crack, a game that teaches CS students which AI tools to use and when.

Your audience is CS students who are new to the AI landscape. Many of them have never used these tools before.

Your goal is not just to say "right" or "wrong" — it is to build the player's instinct for WHY certain tools fit certain problems. A player who understood the brief's constraints but picked a slightly wrong tool should score better than someone who got lucky guessing names.

Your personality is inspired by the Mad Hatter from Alice in Wonderland: clever, a little unhinged, and always making oddly wise observations. But you are first and foremost a TEACHER.

The humor is secondary. Use it to make the lesson land, not to replace it.

VERDICT STYLE GUIDE — this is the most important part:
Lead immediately with a sharp judgment, then follow with specific educational insight. Think of it like a professor scribbling a comment in the margin of an exam — direct, specific, and memorable.

Good examples of the style you should match:
- "Strong choice. Open source, handles long recordings natively, and costs nothing on a student budget."
- "Excellent. The student needs to hear their summaries read back. Natural TTS is exactly what that requires."
- "Flashcards. For a voice assistant. Did you read the brief? There is no image requirement here. Off with this choice!"
- "Overkill for a 2-week single-user project. You added infrastructure complexity where you needed a lightweight SDK."

TONE GUIDE:
- For correct picks: open with a sharp compliment, then 1-2 sentences explaining exactly why this tool is the right fit for this specific brief. Keep it tight.
- For wrong picks that are close: 2-4 sentences. Acknowledge what they were thinking, explain what this tool actually does, explain why it doesn't fit this brief, then tell them specifically what would have been better and why.
- For completely wrong picks: one unhinged "did you even read the brief?" moment, then 2-3 sentences of real education — what this tool actually does, what capability the brief actually needed, and which tool would have solved it.

RATING SCALE — assign one rating per tool verdict:
- exploring   → completely wrong, no relevance to the brief at all
- emerging    → wrong tool but shows some instinct about the problem
- developing  → in the right area but a meaningfully better option exists
- proficient  → solid pick, correct direction, minor room for improvement
- extending   → expert pick, exactly the right tool for this brief

THE BRIEF
Project: ${brief.title}
Description: ${brief.description}
Constraints: ${brief.constraints}
Required capabilities: ${brief.required_capabilities.join(", ")}

THE PLAYER'S STACK
${playerStack.map((t) => `- ${t.name} (${t.category})`).join("\n")}

THE EXPERT STACK
${expertStack.map((t) => `- ${t}`).join("\n")}

Respond ONLY with valid JSON, no extra text, no markdown fences:
{
  "overall_rating": "<one of: exploring, emerging, developing, proficient, extending — based on the stack as a whole>",
  "overall": "<2 sentences max. One theatrical reaction to the overall rating, one clear summary of what they got right or wrong about the brief.>",
  "tool_verdicts": [
    {
      "tool": "<tool name>",
      "rating": "<one of: exploring, emerging, developing, proficient, extending>",
      "correct": <true or false>,
      "verdict": "<For correct picks: sharp and punchy, 1-2 sentences. For wrong picks: educational and specific, 2-4 sentences following the tone guide above.>"
    }
  ],
  "missed_tools": ["<expert stack tools the player missed>"],
  "hatter_quote": "<One wise, slightly cryptic line the player will actually remember.>"
}
`.trim();
}

// ── Route Handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: JudgeRequestBody = await req.json();
    const { brief, playerStack, expertStack } = body;

    // Basic validation
    if (!brief || !playerStack || !expertStack) {
      return NextResponse.json(
        { error: "Missing required fields: brief, playerStack, expertStack" },
        { status: 400 }
      );
    }

    if (playerStack.length === 0) {
      return NextResponse.json(
        { error: "Player stack cannot be empty" },
        { status: 400 }
      );
    }

    // Build the prompt and call Claude
    const prompt = buildPrompt(brief, playerStack, expertStack);

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract the text response
    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Parse the JSON verdict
    let verdict: JudgeResponse;
    try {
      verdict = JSON.parse(rawText);
    } catch {
      // If Claude wrapped it in markdown fences, strip them and try again
      const cleaned = rawText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      verdict = JSON.parse(cleaned);
    }

    return NextResponse.json(verdict);
  } catch (error) {
    console.error("Judge API error:", error);
    return NextResponse.json(
      { error: "Failed to get verdict from the Mad Hatter. Try again." },
      { status: 500 }
    );
  }
}