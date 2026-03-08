# Stack or Crack

Stack or Crack is an interactive AI literacy game where players are given a real project brief and must assemble the right stack of AI tools to solve it. Once your stack is complete, the Mad Hatter judges every choice — evaluating fit, cost, and coverage against the brief. Learn the AI tool landscape by putting it to use.

## Getting Started

Install dependencies:

```bash
npm install
```

Add your Anthropic API key to a `.env.local` file in the project root:

```
ANTHROPIC_API_KEY=your_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

## How to Play

1. Click **Start Challenge** to receive a project brief
2. Browse the **Map** of AI tools across categories: Language Models, Voice & Audio, Image Generation, AI Agents, Dev Tools, and RAG & Search
3. Select 5 tools you think best match the brief
4. Click **Drink Me** to submit your stack for judgement
5. The Mad Hatter will score each tool and reveal the expert stack
