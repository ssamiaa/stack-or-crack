import { Screen } from "@/lib/types";

type Props = {
  goTo: (s: Screen) => void;
  selectedTools: string[];
  onClear: () => void;
};

export default function Verdict({ goTo, onClear }: Props) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: "700px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
        
        {/* Score circle */}
        <div style={{ width: "120px", height: "120px", borderRadius: "50%", border: "3px solid rgba(184,134,11,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", boxShadow: "0 0 40px rgba(184,134,11,0.2)" }}>
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "38px", color: "#d4a853", lineHeight: 1 }}>74</span>
          <span style={{ fontFamily: "Special Elite, cursive", fontSize: "10px", color: "rgba(184,134,11,0.5)", letterSpacing: "2px" }}>/ 100</span>
        </div>

        {/* Overall comment */}
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "22px", color: "rgba(240,224,200,0.8)", textAlign: "center", maxWidth: "500px", lineHeight: 1.6 }}>
          A decent stack — you clearly understand voice, but that image tool was utterly bewildering.
        </p>

        {/* Hatter quote */}
        <div style={{ width: "100%", padding: "20px 24px", background: "rgba(26,158,143,0.06)", border: "1px solid rgba(26,158,143,0.2)", borderRadius: "4px" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "17px", color: "rgba(240,224,200,0.65)", lineHeight: 1.7, textAlign: "center" }}>
            &quot;You&apos;ve chosen wisely in some rooms and wandered into entirely the wrong rabbit hole in others.&quot;
          </p>
        </div>

        {/* Verdict cards */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { tool: "Whisper", correct: true, comment: "Inspired. Offline, accurate, free. Exactly what the brief demanded." },
            { tool: "Claude 3.5", correct: true, comment: "Reasonable. Though I'd have chosen something with more madness." },
            { tool: "Midjourney", correct: false, comment: "Images?! The brief wants voice. You've brought a paintbrush to a piano recital." },
          ].map(v => (
            <div key={v.tool} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "16px 18px", background: "rgba(10,8,20,0.6)", border: "1px solid rgba(184,134,11,0.1)", borderRadius: "3px", borderLeft: `3px solid ${v.correct ? "#1a9e8f" : "#9e2a2b"}` }}>
              <span style={{ fontSize: "20px" }}>{v.correct ? "✅" : "❌"}</span>
              <div>
                <span style={{ fontFamily: "Special Elite, cursive", fontSize: "14px", color: "#f0e0c8", display: "block", marginBottom: "3px" }}>{v.tool}</span>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "15px", color: "rgba(240,224,200,0.55)" }}>{v.comment}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => { onClear(); goTo("brief"); }}style={{ padding: "13px 32px", background: "linear-gradient(135deg, #0d2e1a, #1a9e8f, #0d2e1a)", border: "1px solid rgba(26,158,143,0.4)", color: "#f0e0c8", fontFamily: "Special Elite, cursive", fontSize: "13px", letterSpacing: "2px", cursor: "pointer", borderRadius: "2px" }}>
            🔄 Try Another Brief
          </button>
          <button onClick={() => goTo("map")} style={{ padding: "10px 20px", background: "transparent", border: "1px solid rgba(240,224,200,0.15)", color: "rgba(240,224,200,0.4)", fontFamily: "Special Elite, cursive", fontSize: "12px", letterSpacing: "1px", cursor: "pointer", borderRadius: "2px" }}>
            ← Back to Map
          </button>
        </div>

      </div>
    </div>
  );
}