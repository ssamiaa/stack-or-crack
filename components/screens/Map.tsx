import { Screen } from "@/lib/types";
import ToolCard, { Tool } from "@/components/ToolCard";
import { useState } from "react";
import Drawer from "@/components/Drawer";

type Props = {
  goTo: (s: Screen) => void;
  selectedTools: string[];
  onToggleTool: (id: string) => void;
};

export default function Map({ goTo, selectedTools, onToggleTool }: Props) {
    const [activeCategory, setActiveCategory] = useState("Language Models");
    const [drawerTool, setDrawerTool] = useState<Tool | null>(null);

    const placeholderTools: Tool[] = [
    { id: "gpt4o", logo: "🤖", name: "GPT-4o", maker: "OpenAI", category: "Language Models", tagline: "Most capable GPT model.", what: "A large language model.", analogy: "A very smart autocomplete.", usecases: [{ icon: "🧠", text: "Chatbots" }], comparisons: [{ name: "vs Claude", diff: "More widely used." }], tags: ["llm", "openai"], cost: "paid", costDetail: "$0.005/1k tokens", url: "https://openai.com", trending: true },
    { id: "claude", logo: "🎭", name: "Claude 3.5", maker: "Anthropic", category: "Language Models", tagline: "Best for reasoning and writing.", what: "A large language model.", analogy: "A thoughtful writing partner.", usecases: [{ icon: "✍️", text: "Writing" }], comparisons: [{ name: "vs GPT-4o", diff: "Better at long context." }], tags: ["llm", "anthropic"], cost: "paid", costDetail: "$0.003/1k tokens", url: "https://anthropic.com", trending: true },
    { id: "gemini", logo: "✨", name: "Gemini", maker: "Google", category: "Language Models", tagline: "Google's multimodal AI.", what: "A multimodal AI model.", analogy: "Google search but smarter.", usecases: [{ icon: "🔍", text: "Research" }], comparisons: [{ name: "vs GPT-4o", diff: "Better Google integration." }], tags: ["llm", "google"], cost: "freemium", costDetail: "Free tier available", url: "https://gemini.google.com", trending: false },
    { id: "llama", logo: "🦙", name: "Llama 3.1", maker: "Meta", category: "Language Models", tagline: "Best open source LLM.", what: "An open source language model.", analogy: "GPT but free and local.", usecases: [{ icon: "💻", text: "Local AI" }], comparisons: [{ name: "vs GPT-4o", diff: "Free and runs offline." }], tags: ["llm", "open-source"], cost: "free", costDetail: "100% free", url: "https://llama.meta.com", trending: true },
    { id: "mistral", logo: "💨", name: "Mistral", maker: "Mistral AI", category: "Language Models", tagline: "Fast and efficient LLM.", what: "A lightweight language model.", analogy: "A sports car version of GPT.", usecases: [{ icon: "⚡", text: "Fast inference" }], comparisons: [{ name: "vs Llama", diff: "Faster and more efficient." }], tags: ["llm", "fast"], cost: "freemium", costDetail: "Free tier available", url: "https://mistral.ai", trending: false },
    { id: "groq", logo: "⚡", name: "Groq", maker: "Groq", category: "Language Models", tagline: "Fastest LLM inference.", what: "Ultra-fast AI inference.", analogy: "LLMs on rocket fuel.", usecases: [{ icon: "🚀", text: "Real-time AI" }], comparisons: [{ name: "vs OpenAI", diff: "10x faster inference." }], tags: ["llm", "fast", "free"], cost: "freemium", costDetail: "Free tier available", url: "https://groq.com", trending: true },
    { id: "cohere", logo: "🌊", name: "Cohere", maker: "Cohere", category: "Language Models", tagline: "Enterprise-focused LLM.", what: "A business-focused AI model.", analogy: "GPT in a suit.", usecases: [{ icon: "🏢", text: "Enterprise apps" }], comparisons: [{ name: "vs GPT-4o", diff: "Better for enterprise." }], tags: ["llm", "enterprise"], cost: "paid", costDetail: "Usage based", url: "https://cohere.com", trending: false },
    { id: "mixtral", logo: "🎲", name: "Mixtral", maker: "Mistral AI", category: "Language Models", tagline: "Mixture of experts model.", what: "A sparse mixture of experts LLM.", analogy: "A committee of AIs.", usecases: [{ icon: "🧩", text: "Complex reasoning" }], comparisons: [{ name: "vs Llama", diff: "Better at complex tasks." }], tags: ["llm", "open-source"], cost: "free", costDetail: "100% free", url: "https://mistral.ai", trending: false },
    ];

    
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "14px 28px", background: "rgba(10,8,20,0.95)", borderBottom: "1px solid rgba(184,134,11,0.15)", gap: "20px" }}>
        <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "20px", color: "#d4a853" }}>
          🎩 Stack or <span style={{ fontStyle: "italic", color: "#1a9e8f" }}>Crack</span>
        </span>
        <span style={{ flex: 1, fontFamily: "Special Elite, cursive", fontSize: "11px", color: "rgba(240,224,200,0.4)", letterSpacing: "1px", background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.15)", borderRadius: "3px", padding: "5px 12px" }}>
          📜 Voice Study Assistant — startup budget — 2 weeks
        </span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Category bar */}
        <div style={{ display: "flex", gap: "8px", padding: "12px 24px", background: "rgba(8,6,16,0.9)", borderBottom: "1px solid rgba(184,134,11,0.1)", overflowX: "auto" }}>
          {[["🧠", "Language Models"], ["🎙", "Voice & Audio"], ["🎨", "Image Gen"], ["⚡", "AI Agents"], ["🔧", "Dev Tools"]].map(([emoji, name]) => (
            <div key={name} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              cursor: "pointer",
              borderRadius: "3px",
              border: "1px solid rgba(184,134,11,0.15)",
              background: "rgba(184,134,11,0.05)",
              color: "rgba(240,224,200,0.6)",
              fontFamily: "Special Elite, cursive",
              fontSize: "12px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "18px" }}>{emoji}</span>{name}
            </div>
          ))}
        </div>

        {/* Tools grid */}
        <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
        <div style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "20px", color: "#f0e0c8", marginBottom: "8px" }}>🧠 Language Models</div>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "14px", color: "rgba(240,224,200,0.35)", marginBottom: "20px" }}>The brains of any AI application</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" }}>
            {placeholderTools.map(tool => (
            <ToolCard
                key={tool.id}
                tool={tool}
                isSelected={selectedTools.includes(tool.id)}
                onSelect={onToggleTool}
                onLearnMore={(tool) => setDrawerTool(tool)}
            />
            ))}
        </div>
        </div>

      </div>

      {/* Submit bar */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 28px",
        background: "rgba(10,8,20,0.95)",
        borderTop: "1px solid rgba(184,134,11,0.12)",
        gap: "14px"
      }}>
        {/* Stack tray */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <span style={{ fontFamily: "Special Elite, cursive", fontSize: "10px", color: "rgba(184,134,11,0.5)", letterSpacing: "2px", marginRight: "8px" }}>YOUR STACK</span>
        {[0,1,2,3,4].map(i => (
            <div key={i} style={{
            width: "64px",
            height: "64px",
            border: `1px solid ${selectedTools[i] ? "rgba(26,158,143,0.6)" : "rgba(184,134,11,0.3)"}`,
            borderRadius: "4px",
            background: selectedTools[i] ? "rgba(26,158,143,0.12)" : "rgba(184,134,11,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            color: "rgba(184,134,11,0.2)",
            fontFamily: "Cormorant Garamond, serif",
            transition: "all 0.2s ease",
            }}>
            {selectedTools[i] ? "🤖" : "+"}
            </div>
        ))}
        </div>

        {/* Hint + button */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "14px", color: "rgba(240,224,200,0.3)" }}>
            {selectedTools.length === 5 
                ? "Your stack is complete — drink me!" 
                : `Select ${5 - selectedTools.length} more tool${5 - selectedTools.length === 1 ? "" : "s"}`}
            </span>
          <button 
            onClick={() => selectedTools.length === 5 ? goTo("judging") : null} 
            style={{
                padding: "12px 40px",
                background: selectedTools.length === 5 ? "rgba(158,42,43,0.8)" : "rgba(158,42,43,0.2)",
                border: `1px solid ${selectedTools.length === 5 ? "rgba(158,42,43,0.9)" : "rgba(158,42,43,0.2)"}`,
                color: selectedTools.length === 5 ? "#f0e0c8" : "rgba(240,224,200,0.25)",
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "2px",
                cursor: selectedTools.length === 5 ? "pointer" : "not-allowed",
                borderRadius: "2px",
                transition: "all 0.3s ease",
            }}>
            🍶 Drink Me
            </button>
        </div>

        <Drawer
        tool={drawerTool}
        isSelected={drawerTool ? selectedTools.includes(drawerTool.id) : false}
        onClose={() => setDrawerTool(null)}
        onSelect={onToggleTool}
      />
      </div>

    </div>
  );
}