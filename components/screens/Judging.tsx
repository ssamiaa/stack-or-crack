import { Screen } from "@/lib/types";

type Props = {
  goTo: (s: Screen) => void;
  selectedTools: string[];
};

export default function Judging({ goTo }: Props) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "24px", textAlign: "center" }}>
      
      <div style={{ fontSize: "80px" }}></div>
      
      <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "28px", color: "#f0e0c8" }}>
        The Hatter Deliberates…
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "320px" }}>
        {[
          "Stack received. Examining your choices…",
          "Comparing against the brief requirements…",
          "Sharpening the quill for your verdict…"
        ].map(step => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 18px", background: "rgba(26,158,143,0.08)", border: "1px solid rgba(26,158,143,0.2)", borderRadius: "3px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1a9e8f", boxShadow: "0 0 8px rgba(26,158,143,0.6)", flexShrink: 0 }} />
            <span style={{ fontFamily: "Special Elite, cursive", fontSize: "13px", color: "rgba(240,224,200,0.6)", letterSpacing: "1px" }}>{step}</span>
          </div>
        ))}
      </div>

      <button onClick={() => goTo("verdict")} style={{ marginTop: "16px", padding: "12px 32px", background: "transparent", border: "1px solid rgba(240,224,200,0.2)", color: "rgba(240,224,200,0.4)", fontFamily: "Special Elite, cursive", fontSize: "13px", letterSpacing: "2px", cursor: "pointer", borderRadius: "2px" }}>
        See Verdict →
      </button>

    </div>
  );
}