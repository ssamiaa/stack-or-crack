import { Screen } from "@/lib/types";
import { Tool } from "@/components/ToolCard";

type Props = {
  goTo: (s: Screen) => void;
  selectedTools: Tool[];
  onClear: () => void;
  onNewBrief: () => void;
};

const LEVEL_CONFIG: Record<string, { color: string; glow: string; bg: string; border: string; label: string }> = {
  Exploring:  { color: "#93c5fd", glow: "rgba(147,197,253,0.4)",  bg: "rgba(59,130,246,0.08)",  border: "rgba(147,197,253,0.3)",  label: "Just getting started" },
  Developing: { color: "#c4b5fd", glow: "rgba(196,181,253,0.4)",  bg: "rgba(139,92,246,0.08)",  border: "rgba(196,181,253,0.3)",  label: "Building intuition" },
  Emerging:   { color: "#6ee7b7", glow: "rgba(110,231,183,0.4)",  bg: "rgba(52,211,153,0.08)",  border: "rgba(110,231,183,0.3)",  label: "Pattern forming" },
  Proficient: { color: "#fcd34d", glow: "rgba(252,211,77,0.4)",   bg: "rgba(245,158,11,0.08)",  border: "rgba(252,211,77,0.3)",   label: "Strong instincts" },
  Extending:  { color: "#f9a8d4", glow: "rgba(249,168,212,0.45)", bg: "rgba(236,72,153,0.08)",  border: "rgba(249,168,212,0.3)",  label: "Beyond the brief" },
};

const currentLevel = "Emerging";
const cfg = LEVEL_CONFIG[currentLevel];

const verdicts = [
  { tool: "Whisper",    logo: "🎙", correct: true,  comment: "Inspired. Offline, accurate, free. Exactly what the brief demanded." },
  { tool: "Claude 3.5", logo: "🤖", correct: true,  comment: "Reasonable. Though I'd have chosen something with more madness." },
  { tool: "Midjourney", logo: "🎨", correct: false, comment: "Images?! The brief wants voice. You've brought a paintbrush to a piano recital." },
  { tool: "ElevenLabs", logo: "🔊", correct: true,  comment: "A fine voice. Silky, expressive, and perfectly suited to the task." },
  { tool: "LangChain",  logo: "⛓",  correct: false, comment: "Orchestration overkill. A simple loop would have sufficed." },
];

export default function Verdict({ goTo, onNewBrief }: Props) {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 24px",
      overflow: "hidden",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "820px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse at 0% 0%, rgba(77,124,91,0.5) 0%, transparent 60%),
          radial-gradient(ellipse at 100% 0%, rgba(49,35,74,0.7) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 100%, rgba(30,51,68,0.8) 0%, transparent 60%),
          linear-gradient(160deg, #1a2e28 0%, #1e2a3a 50%, #1a1228 100%)
        `,
        boxShadow: `0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}>

        {/* Fixed header */}
        <div style={{
          padding: "20px 32px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: "32px", filter: `drop-shadow(0 0 16px ${cfg.glow})` }}>🎩</span>
          <div>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "24px", color: "rgba(255,255,255,0.9)", margin: 0, lineHeight: 1.2 }}>
              The Hatter Has Spoken
            </h2>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
              Your stack has been judged
            </p>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Level + quote banner */}
          <div style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.15)",
            borderRadius: "12px",
            border: `1px solid ${cfg.border}`,
            boxShadow: `0 0 24px ${cfg.glow}`,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
            {/* Level badge inline */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "3px", height: "24px", borderRadius: "2px", background: cfg.color, flexShrink: 0 }} />
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "20px", color: cfg.color, letterSpacing: "1px" }}>
                {currentLevel}
              </span>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
                — {cfg.label}
              </span>
            </div>

            {/* Quote */}
            <p style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              fontSize: "17px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              margin: 0,
            }}>
              &quot;You&apos;ve chosen wisely in some rooms and wandered into entirely the wrong rabbit hole in others. Pattern forming — but the madness has logic yet to reveal itself.&quot;
            </p>
          </div>

          {/* Overall comment */}
          <p style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.8,
            margin: 0,
            padding: "0 4px",
          }}>
            A stack that shows real instinct for the core problem — voice in, reasoning through, voice out. The cracks appear at the edges, where you reached for tools that looked useful but missed the brief&apos;s constraints entirely.
          </p>

          {/* Verdict cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "4px" }}>
              Tool by Tool
            </span>
            {verdicts.map(v => (
              <div key={v.tool} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                padding: "14px 18px",
                background: v.correct ? "rgba(100,200,150,0.05)" : "rgba(200,80,80,0.05)",
                border: `1px solid ${v.correct ? "rgba(100,200,150,0.15)" : "rgba(200,80,80,0.15)"}`,
                borderRadius: "12px",
                borderLeft: `3px solid ${v.correct ? "rgba(100,200,150,0.6)" : "rgba(200,80,80,0.6)"}`,
              }}>
                <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "1px" }}>{v.logo}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "17px", color: "rgba(255,255,255,0.9)" }}>
                      {v.tool}
                    </span>
                    <span style={{
                      backgroundColor: v.correct ? "rgba(100,200,150,0.12)" : "rgba(200,80,80,0.12)",
                      color: v.correct ? "rgba(100,200,150,0.9)" : "rgba(200,80,80,0.8)",
                      boxShadow: `0 0 6px 1px ${v.correct ? "rgba(100,200,150,0.2)" : "rgba(200,80,80,0.2)"}`,
                      borderRadius: "20px",
                      padding: "2px 10px",
                      fontSize: "12px",
                      fontFamily: "Cormorant Garamond, serif",
                    }}>
                      {v.correct ? "Good pick" : "Wrong call"}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontStyle: "italic",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                  }}>
                    {v.comment}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Fixed footer */}
        <div style={{
          padding: "16px 32px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <button onClick={() => goTo("map")} style={{
            padding: "11px 22px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "15px",
            cursor: "pointer",
            borderRadius: "10px",
          }}>
            ← Back to Map
          </button>
          <button onClick={onNewBrief} style={{
            padding: "11px 28px",
            background: `linear-gradient(135deg, rgba(77,124,91,0.6), rgba(49,35,74,0.6))`,
            border: `1px solid ${cfg.border}`,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow: `0 0 16px ${cfg.glow}`,
          }}>
            🔄 Try Another Brief
          </button>
        </div>

      </div>
    </div>
  );
}