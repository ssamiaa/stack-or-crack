import { Screen } from "@/lib/types";

type Props = { goTo: (s: Screen) => void };

export default function Landing({ goTo }: Props) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      textAlign: "center",
      gap: "24px",
    }}>
      <div style={{ fontSize: "13px", letterSpacing: "5px", textTransform: "uppercase", color: "#d4a853", opacity: 0.8, fontFamily: "Special Elite, cursive" }}>
        A Hackathon Adventure
      </div>

      <h1 className="title-main">
        Stack or <span className="title-crack">Crack</span>
      </h1>

      <div style={{ fontFamily: "IM Fell English, serif", fontStyle: "italic", fontSize: "16px", color: "rgba(240,224,200,0.45)", letterSpacing: "1px" }}>
        Down the Rabbit Hole of AI Tools
      </div>

      <div style={{ maxWidth: "460px", display: "flex", flexDirection: "column", gap: "6px", margin: "8px 0 24px" }}>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "17px", color: "rgba(240,224,200,0.55)", lineHeight: 1.9 }}>
          You get a <strong style={{ color: "rgba(240,224,200,0.88)" }}>real project brief.</strong>
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "17px", color: "rgba(240,224,200,0.55)", lineHeight: 1.9 }}>
          You explore the <strong style={{ color: "rgba(240,224,200,0.88)" }}>map of AI tools.</strong>
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "17px", color: "rgba(240,224,200,0.55)", lineHeight: 1.9 }}>
          You assemble your stack — then the <strong style={{ color: "rgba(240,224,200,0.88)" }}>Mad Hatter judges every choice.</strong>
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "17px", color: "rgba(240,224,200,0.55)", lineHeight: 1.9 }}>
          Learn the AI landscape by <strong style={{ color: "rgba(240,224,200,0.88)" }}>defending your decisions.</strong>
        </p>
        <span style={{ fontFamily: "IM Fell English, serif", fontStyle: "italic", fontSize: "15px", color: "rgba(184,134,11,0.65)", marginTop: "8px" }}>
          Only the curious survive.
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
        <button onClick={() => goTo("brief")} style={{
          padding: "14px 48px",
          background: "linear-gradient(135deg, #0d2e1a 0%, #1a3d2b 40%, #1a9e8f 60%, #1a3d2b 80%, #0d2e1a 100%)",
          border: "1px solid rgba(26,158,143,0.4)",
          color: "#f0e0c8",
          fontFamily: "Special Elite, cursive",
          fontSize: "15px",
          letterSpacing: "2px",
          cursor: "pointer",
          borderRadius: "2px",
        }}>
          Start Challenge
        </button>
        <button onClick={() => goTo("map")} style={{
          padding: "10px 32px",
          background: "transparent",
          border: "1px solid rgba(240,224,200,0.2)",
          color: "rgba(240,224,200,0.5)",
          fontFamily: "Special Elite, cursive",
          fontSize: "13px",
          letterSpacing: "2px",
          cursor: "pointer",
          borderRadius: "2px",
        }}>
          Explore the Map
        </button>
      </div>
    </div>
  );
}