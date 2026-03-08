"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Screen } from "@/lib/types";
import { Tool } from "@/components/ToolCard";
import briefsData from "@/data/briefs.json";
type Brief = typeof briefsData.briefs[0];

type JudgeVerdict = {
  overall_rating: string;
  overall: string;
  tool_verdicts: { tool: string; rating: string; correct: boolean; verdict: string }[];
  missed_tools: string[];
  hatter_quote: string;
};

type Props = {
  goTo: (s: Screen) => void;
  selectedTools: Tool[];
  brief: Brief;
  onVerdictReady: (verdict: JudgeVerdict) => void;
};

const steps = [
  "Stack received. Examining your choices…",
  "Comparing against the brief requirements…",
  "Sharpening the quill for your verdict…",
];

export default function Judging({ goTo, selectedTools, brief, onVerdictReady }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [apiDone, setApiDone] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    const callJudge = async () => {
      try {
        const res = await fetch("/api/judge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brief: {
              title: brief.title,
              description: brief.description,
              constraints: brief.constraints,
              required_capabilities: brief.required_capabilities,
            },
            playerStack: selectedTools.map(t => ({ name: t.name, category: t.category })),
            expertStack: brief.expert_stack,
          }),
        });
        const data = await res.json();
        onVerdictReady(data);
        setApiDone(true);
      } catch (err) {
        console.error("Judge API failed:", err);
        setApiDone(true); // navigate anyway so user isn't stuck
      }
    };

    callJudge();

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return prev + 1;
      });
    }, 45);

    const step1 = setTimeout(() => setCurrentStep(1), 1500);
    const step2 = setTimeout(() => setCurrentStep(2), 3000);
    const step3 = setTimeout(() => setTimerDone(true), 4500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  }, []);

  useEffect(() => {
    if (timerDone && apiDone) goTo("verdict");
  }, [timerDone, apiDone]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "32px",
      textAlign: "center",
      padding: "40px 20px",
    }}>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0px); }
        }
      `}</style>
      {/* Animated mascot */}
        <Image
                src="/hatterw:ob.png"
                alt="Mad Hatter"
                width={300}
                height={300}
                style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "contain",
                        animation: "float 2s ease-in-out infinite",
                        filter: "drop-shadow(0 0 24px rgba(100, 200, 150, 0.45))",
                        marginBottom: "-70px",
                }}
        />


      {/* Title */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <h2 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontWeight: 700,
          fontSize: "32px",
          color: "#ffffff",
          margin: 0,
          letterSpacing: "-0.5px",
        }}>
          The Hatter Deliberates…
        </h2>
        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          fontSize: "16px",
          color: "rgba(255,255,255,0.35)",
          margin: 0,
        }}>
          Every choice is being weighed
        </p>
      </div>

      {/* Card container */}
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "linear-gradient(225deg, #4d7c5b 0%, #2b4a53 50%, #1e3344 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>

        {/* Progress bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>
              Analysing
            </span>
            <span style={{
              backgroundColor: "#31234a",
              color: "#e9d5ff",
              boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.4)",
              borderRadius: "20px",
              padding: "2px 10px",
              fontSize: "12px",
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 600,
            }}>
              {progress}%
            </span>
          </div>
          <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, rgba(100,200,150,0.8), rgba(168,85,247,0.8))",
              borderRadius: "2px",
              transition: "width 0.1s linear",
              boxShadow: "0 0 8px rgba(100,200,150,0.5)",
            }} />
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {steps.map((step, i) => (
            <div key={step} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              background: i <= currentStep ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${i <= currentStep ? "rgba(100,200,150,0.25)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "10px",
              opacity: i <= currentStep ? 1 : 0.35,
              transition: "all 0.4s ease",
              animation: i === currentStep ? "fadeIn 0.4s ease forwards" : "none",
            }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                flexShrink: 0,
                background: i < currentStep
                  ? "#e9d5ff"
                  : i === currentStep
                  ? "rgba(100,200,150,0.9)"
                  : "rgba(255,255,255,0.15)",
                boxShadow: i === currentStep
                  ? "0 0 8px rgba(100,200,150,0.8)"
                  : i < currentStep
                  ? "0 0 8px rgba(168,85,247,0.5)"
                  : "none",
                transition: "all 0.4s ease",
              }} />
              <span style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "15px",
                fontStyle: "italic",
                color: i <= currentStep ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.2)",
                transition: "color 0.4s ease",
              }}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Tool logos */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", paddingTop: "4px" }}>
          {selectedTools.map((tool, i) => (
            <div key={tool.id} style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              boxShadow: i < Math.ceil((progress / 100) * selectedTools.length) ? "0 0 8px 2px rgba(100,200,150,0.3)" : "none",
              transition: "box-shadow 0.4s ease",
            }}>
              <img src={tool.logo} alt={tool.name} style={{ width: "28px", height: "28px", objectFit: "contain", borderRadius: "6px", background: "rgba(255,255,255,0.08)", padding: "3px", flexShrink: 0 }} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}