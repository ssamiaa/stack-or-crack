import { Screen } from "@/lib/types";

type Props = { goTo: (s: Screen) => void };

export default function Map({ goTo }: Props) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px" }}>
            {["GPT-4o", "Claude 3.5", "Gemini", "Llama 3.1", "Mistral", "Groq", "Cohere", "Mixtral"].map(tool => (
              <div key={tool} style={{ background: "rgba(15,10,30,0.85)", border: "1px solid rgba(184,134,11,0.15)", borderRadius: "4px", padding: "18px 16px", cursor: "pointer" }}>
                <span style={{ fontSize: "28px", display: "block", marginBottom: "8px" }}>🤖</span>
                <span style={{ fontFamily: "Special Elite, cursive", fontSize: "13px", color: "#f0e0c8", display: "block" }}>{tool}</span>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "12px", color: "rgba(240,224,200,0.4)", display: "block", marginTop: "4px" }}>Click to select</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Submit bar */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 28px",
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
              border: "1px solid rgba(184,134,11,0.3)",
              borderRadius: "4px",
              background: "rgba(184,134,11,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              color: "rgba(184,134,11,0.2)",
              fontFamily: "Cormorant Garamond, serif",
            }}>+</div>
          ))}
        </div>

        {/* Hint + button */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "14px", color: "rgba(240,224,200,0.3)" }}>
            Select 5 tools to complete your stack
          </span>
          <button onClick={() => goTo("judging")} style={{
            padding: "12px 40px",
            background: "rgba(158,42,43,0.3)",
            border: "1px solid rgba(158,42,43,0.3)",
            color: "rgba(240,224,200,0.4)",
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 700,
            fontSize: "15px",
            letterSpacing: "2px",
            cursor: "pointer",
            borderRadius: "2px"
          }}>
            🍶 Drink Me
          </button>
        </div>
      </div>

    </div>
  );
}