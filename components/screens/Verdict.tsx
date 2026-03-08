"use client";
import { motion } from "framer-motion";
import { Screen } from "@/lib/types";
import { Tool } from "@/components/ToolCard";
import briefsData from "@/data/briefs.json";
import reload from "@/images/repeat.png"
import Image from "next/image";

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
    onClear: () => void;
    onNewBrief: () => void;
    verdict: JudgeVerdict | null;
    brief: Brief | null;
};

const LEVEL_CONFIG: Record<string, { color: string; glow: string; bg: string; border: string; label: string }> = {
    exploring: { color: "#93c5fd", glow: "rgba(147,197,253,0.4)", bg: "rgba(59,130,246,0.08)", border: "rgba(147,197,253,0.3)", label: "Just getting started" },
    developing: { color: "#c4b5fd", glow: "rgba(196,181,253,0.4)", bg: "rgba(139,92,246,0.08)", border: "rgba(196,181,253,0.3)", label: "Building intuition" },
    emerging: { color: "#6ee7b7", glow: "rgba(110,231,183,0.4)", bg: "rgba(52,211,153,0.08)", border: "rgba(110,231,183,0.3)", label: "Pattern forming" },
    proficient: { color: "#fcd34d", glow: "rgba(252,211,77,0.4)", bg: "rgba(245,158,11,0.08)", border: "rgba(252,211,77,0.3)", label: "Strong instincts" },
    extending: { color: "#f9a8d4", glow: "rgba(249,168,212,0.45)", bg: "rgba(236,72,153,0.08)", border: "rgba(249,168,212,0.3)", label: "Beyond the brief" },
};

const ratingDescriptions: Record<string, string> = {
    exploring: "You're at the very beginning of understanding this space. The tools you chose don't yet match the problem — but recognizing that gap is the first step to closing it.",
    emerging: "You're starting to develop a sense of the AI landscape, but still need more practice matching tools to problems. The direction is there — the precision isn't quite yet.",
    developing: "You understand parts of the problem but there are still gaps in your tool choices. You're on the right track — a few more deliberate swaps would get you to proficient.",
    proficient: "You have a solid understanding of what this brief requires and chose tools that genuinely fit. This is the goal — you've shown real judgment about the AI landscape.",
    extending: "You've gone beyond just knowing the tools — you understand exactly why each one belongs here. You're applying your knowledge with precision and purpose.",
};

export default function Verdict({ goTo, onNewBrief, verdict, selectedTools, brief }: Props) {
    const currentLevel = verdict?.overall_rating?.toLowerCase() ?? "emerging";
    const cfg = LEVEL_CONFIG[currentLevel] ?? LEVEL_CONFIG["emerging"];

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
                    <img
                        src="/hatterw:ob.png"
                        alt="Mad Hatter"
                        style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "cover",
                        }}
                    />
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

                    {/* Brief reminder */}
                    <div style={{
                        padding: "16px 20px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontSize: "16px", flexShrink: 0 }}>📜</span>
                            <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "16px", color: "rgba(255,255,255,0.7)" }}>
                                {brief?.title ?? ""}
                            </span>
                        </div>
                        <p style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontStyle: "italic",
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.35)",
                            lineHeight: 1.6,
                            margin: 0,
                            paddingLeft: "26px",
                        }}>
                            {brief?.description ?? ""}
                        </p>
                        <div style={{ display: "flex", gap: "6px", paddingLeft: "26px", flexWrap: "wrap" }}>
                            {[brief?.budget, brief?.timeline, brief?.users].filter(Boolean).map((item, i) => (
                                <span key={i} style={{
                                    fontFamily: "Cormorant Garamond, serif",
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    color: "rgba(255,255,255,0.25)",
                                    letterSpacing: "0.5px",
                                }}>
                                    {i > 0 && <span style={{ marginRight: "6px", opacity: 0.4 }}>•</span>}
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Level + description banner */}
                    <div style={{
                        padding: "20px 24px",
                        background: "rgba(0,0,0,0.15)",
                        borderRadius: "12px",
                        border: `1px solid ${cfg.border}`,
                        boxShadow: `0 0 24px ${cfg.glow}`,
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "3px", height: "24px", borderRadius: "2px", background: cfg.color, flexShrink: 0 }} />
                            <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "20px", color: cfg.color, letterSpacing: "1px" }}>
                                {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
                            </span>
                            <span style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
                                — {cfg.label}
                            </span>
                        </div>
                        <p style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontSize: "15px",
                            color: "rgba(255,255,255,0.55)",
                            lineHeight: 1.7,
                            margin: 0,
                        }}>
                            {ratingDescriptions[currentLevel]}
                        </p>
                    </div>

                    {/* Overall comment from API */}
                    <p style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "15px",
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.8,
                        margin: 0,
                        padding: "0 4px",
                    }}>
                        {verdict?.overall ?? ""}
                    </p>

                    {/* Verdict cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "4px" }}>
                            Tool by Tool
                        </span>
                        {(verdict?.tool_verdicts ?? []).map(v => {
                            const toolObj = selectedTools.find(t => t.name === v.tool);
                            return (
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
                                    {toolObj?.logo && (toolObj.logo.startsWith("http") || toolObj.logo.startsWith("/")) ? (
                                        <img
                                            src={toolObj.logo}
                                            alt={toolObj.name}
                                            style={{ width: "28px", height: "28px", objectFit: "contain", flexShrink: 0, marginTop: "2px", borderRadius: "4px" }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "1px" }}>
                                            {toolObj?.logo ?? "🔧"}
                                        </span>
                                    )}
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
                                                {v.rating}
                                            </span>
                                        </div>
                                        <span style={{
                                            fontFamily: "Cormorant Garamond, serif",
                                            fontStyle: "italic",
                                            fontSize: "14px",
                                            color: "rgba(255,255,255,0.45)",
                                            lineHeight: 1.6,
                                        }}>
                                            {v.verdict}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Missed tools */}
                    {verdict?.missed_tools && verdict.missed_tools.length > 0 && (
                        <div style={{
                            padding: "16px 20px",
                            background: "rgba(252,211,77,0.06)",
                            border: "1px solid rgba(252,211,77,0.35)",
                            borderRadius: "12px",
                            borderLeft: "3px solid rgba(252,211,77,0.8)",
                            boxShadow: "0 0 20px rgba(252,211,77,0.1)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "16px" }}>⚠️</span>
                                <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(252,211,77,0.8)" }}>
                                    You missed
                                </span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {verdict.missed_tools.map(tool => (
                                    <span key={tool} style={{
                                        background: "rgba(252,211,77,0.1)",
                                        border: "1px solid rgba(252,211,77,0.3)",
                                        borderRadius: "20px",
                                        padding: "4px 14px",
                                        fontFamily: "Cormorant Garamond, serif",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        color: "rgba(252,211,77,0.9)",
                                        boxShadow: "0 0 8px rgba(252,211,77,0.15)",
                                    }}>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hatter quote — bottom */}
                    <div style={{
                        padding: "20px 24px",
                        background: "rgba(0,0,0,0.15)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "12px",
                    }}>
                        <p style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontStyle: "italic",
                            fontSize: "17px",
                            color: "rgba(255,255,255,0.55)",
                            lineHeight: 1.7,
                            margin: 0,
                            textAlign: "center",
                        }}>
                            &quot;{verdict?.hatter_quote ?? "The tea is still brewing…"}&quot;
                        </p>
                    </div>

                </div>

                {/* Fixed footer */}
                <div style={{
                    padding: "16px 32px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(0,0,0,0.2)",
                    display: "flex",
                    gap: "30px",
                    justifyContent: "center",
                    flexShrink: 0,
                }}>
                    <motion.button
                        onClick={() => goTo("map")}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 12px 2px rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.25)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        style={{
                            padding: "11px 22px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.4)",
                            fontFamily: "Cormorant Garamond, serif",
                            fontSize: "15px",
                            cursor: "pointer",
                            borderRadius: "10px",
                        }}>
                        Back to Map
                    </motion.button>
                    <motion.button
                        onClick={onNewBrief}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 24px 4px rgba(100,200,150,0.4)", borderColor: "rgba(134,239,172,0.6)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        style={{
                            padding: "11px 28px",
                            background: "linear-gradient(135deg, rgba(77,124,91,0.6), rgba(49,35,74,0.6))",
                            border: "1px solid rgba(100,200,150,0.3)",
                            color: "rgba(255,255,255,0.85)",
                            fontFamily: "Cormorant Garamond, serif",
                            fontWeight: 700,
                            fontSize: "15px",
                            cursor: "pointer",
                            borderRadius: "10px",
                            boxShadow: "0 0 16px rgba(100,200,150,0.3)",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}>
                        <Image
                            src={reload}
                            alt="redo"
                            width={16}
                            height={16}
                            style={{
                                filter: "invert(1) drop-shadow(0 0 3px rgba(134, 239, 172, 0.4))",
                                opacity: 0.9,
                                transition: "filter 0.3s ease"
                            }}
                        />
                        Try Another Brief
                    </motion.button>
                </div>

            </div>
        </div>
    );
}