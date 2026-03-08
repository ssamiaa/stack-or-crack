import { Screen } from "@/lib/types";
import briefsData from "@/data/briefs.json";

type Brief = typeof briefsData.briefs[0];

type Props = {
  goTo: (s: Screen) => void;
  brief: Brief;
  onNewBrief: () => void;
};

export default function Brief({ goTo, brief, onNewBrief }: Props) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: "660px", width: "100%", background: "rgba(15,10,30,0.85)", border: "1px solid rgba(184,134,11,0.25)", borderRadius: "4px", padding: "48px 52px" }}>
        
        <div style={{ fontFamily: "Special Elite, cursive", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#d4a853", marginBottom: "16px" }}>
          ◆ Your Mission ◆
        </div>

        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "26px", color: "#f0e0c8", marginBottom: "20px", lineHeight: 1.3 }}>
          {brief.title}
        </h2>

        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.35), transparent)", margin: "0 0 20px" }} />

        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "17px", color: "rgba(240,224,200,0.75)", lineHeight: 1.8, marginBottom: "28px" }}>
          {brief.description}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
          {[["Budget", `🌱 ${brief.budget}`], ["Timeline", `⏳ ${brief.timeline}`], ["Users", `👤 ${brief.users}`]].map(([label, value]) => (
            <div key={label} style={{ background: "rgba(184,134,11,0.07)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: "3px", padding: "10px 14px", textAlign: "center" }}>
              <span style={{ display: "block", fontFamily: "Special Elite, cursive", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#d4a853", marginBottom: "4px" }}>{label}</span>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "15px", color: "#f0e0c8" }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "Special Elite, cursive", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#d4a853", opacity: 0.7, marginBottom: "10px" }}>
          Required Capabilities
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {brief.required_capabilities.map(cap => (
            <span key={cap} style={{ background: "rgba(26,100,160,0.18)", border: "1px solid rgba(58,97,134,0.4)", borderRadius: "20px", padding: "5px 14px", fontFamily: "Special Elite, cursive", fontSize: "12px", color: "#8fb3c9", letterSpacing: "1px" }}>
              {cap}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={() => goTo("map")} style={{ padding: "13px 32px", background: "linear-gradient(135deg, #0d2e1a, #1a9e8f, #0d2e1a)", border: "1px solid rgba(26,158,143,0.4)", color: "#f0e0c8", fontFamily: "Special Elite, cursive", fontSize: "14px", letterSpacing: "2px", cursor: "pointer", borderRadius: "2px" }}>
            🗺 Build My Stack
          </button>
          <button onClick={onNewBrief} style={{ padding: "10px 20px", background: "transparent", border: "1px solid rgba(240,224,200,0.15)", color: "rgba(240,224,200,0.4)", fontFamily: "Special Elite, cursive", fontSize: "12px", letterSpacing: "1px", cursor: "pointer", borderRadius: "2px" }}>
            🎲 New Brief
          </button>
          <button onClick={() => goTo("landing")} style={{ padding: "10px 20px", background: "transparent", border: "1px solid rgba(240,224,200,0.15)", color: "rgba(240,224,200,0.4)", fontFamily: "Special Elite, cursive", fontSize: "12px", letterSpacing: "1px", cursor: "pointer", borderRadius: "2px" }}>
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
}