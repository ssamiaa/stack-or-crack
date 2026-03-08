import { Screen } from "@/lib/types";
import ToolCard, { Tool } from "@/components/ToolCard";
import { useState } from "react";
import Drawer from "@/components/Drawer";
import toolsData from "@/data/tools.json";

type Props = {
  goTo: (s: Screen) => void;
  selectedTools: string[];
  onToggleTool: (id: string) => void;
};

export default function Map({ goTo, selectedTools, onToggleTool }: Props) {
  const [activeCategory, setActiveCategory] = useState("llm");
  const [drawerTool, setDrawerTool] = useState<Tool | null>(null);

  const tools = toolsData.tools;

  const categories = [
    ["🧠", "Language Models", "llm"],
    ["🎙", "Voice & Audio", "voice"],
    ["🎨", "Image Gen", "image"],
    ["⚡", "AI Agents", "agents"],
    ["🔧", "Dev Tools", "devtools"],
    ["📚", "RAG & Search", "rag"],
  ];

  const categoryTitle: Record<string, string> = {
    llm: "🧠 Language Models",
    voice: "🎙 Voice & Audio",
    image: "🎨 Image Generation",
    agents: "⚡ AI Agents",
    devtools: "🔧 Dev Tools",
    rag: "📚 RAG & Search",
  };

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
          {categories.map(([emoji, name, id]) => (
            <div key={id} onClick={() => setActiveCategory(id)} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              cursor: "pointer",
              borderRadius: "3px",
              border: `1px solid ${activeCategory === id ? "rgba(26,158,143,0.6)" : "rgba(184,134,11,0.15)"}`,
              background: activeCategory === id ? "rgba(26,158,143,0.12)" : "rgba(184,134,11,0.05)",
              color: activeCategory === id ? "#1a9e8f" : "rgba(240,224,200,0.6)",
              fontFamily: "Special Elite, cursive",
              fontSize: "12px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}>
              <span style={{ fontSize: "18px" }}>{emoji}</span>{name}
            </div>
          ))}
        </div>

        {/* Tools grid */}
        <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "20px", color: "#f0e0c8", marginBottom: "20px" }}>
            {categoryTitle[activeCategory]}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" }}>
            {tools
              .filter(tool => tool.category === activeCategory)
              .map(tool => (
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
              width: "44px",
              height: "44px",
              border: `1px solid ${selectedTools[i] ? "rgba(26,158,143,0.6)" : "rgba(184,134,11,0.3)"}`,
              borderRadius: "4px",
              background: selectedTools[i] ? "rgba(26,158,143,0.12)" : "rgba(184,134,11,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
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
      </div>

      {/* Drawer */}
      <Drawer
        tool={drawerTool}
        isSelected={drawerTool ? selectedTools.includes(drawerTool.id) : false}
        onClose={() => setDrawerTool(null)}
        onSelect={onToggleTool}
      />

    </div>
  );
}