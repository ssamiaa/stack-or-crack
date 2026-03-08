"use client";

import { Screen } from "@/lib/types";
import ToolCard, { Tool } from "@/components/ToolCard";
import { useState } from "react";
import { motion } from "framer-motion";
import Drawer from "@/components/Drawer";
import toolsData from "@/data/tools.json";
import StackTray from "@/components/StackTray";
import briefsData from "@/data/briefs.json";
import Image from "next/image";
// images
import lang from "@/images/brain.png";
import voi from "@/images/microphone-black-shape.png";
import imagegen from "@/images/color-palette.png";
import agent from "@/images/artificial-intelligence.png";
import devt from "@/images/settings.png";
import rags from "@/images/open-book.png";
import poison from "@/images/potion.png"
import info from "@/images/information.png"

type Brief = typeof briefsData.briefs[0];

type Props = {
    goTo: (s: Screen) => void;
    selectedTools: Tool[];
    onToggleTool: (id: string) => void;
    brief: Brief;
    exploreMode?: boolean;
    onNewBrief: () => void;
};

export default function Map({ goTo, selectedTools, onToggleTool, brief, exploreMode = false, onNewBrief }: Props) {
    const [activeCategory, setActiveCategory] = useState("llm");
    const [drawerTool, setDrawerTool] = useState<Tool | null>(null);
    const [showBudgetTooltip, setShowBudgetTooltip] = useState(false);

    const tools = toolsData.tools;

    const badgeStyle: React.CSSProperties = {
        backgroundColor: "#31234a",
        color: "#e9d5ff",
        boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.4)",
    };

    const categories = [
        { img: lang, label: "Language Models", id: "llm" },
        { img: voi, label: "Voice & Audio", id: "voice" },
        { img: imagegen, label: "Image Gen", id: "image" },
        { img: agent, label: "AI Agents", id: "agents" },
        { img: devt, label: "Dev Tools", id: "devtools" },
        { img: rags, label: "RAG & Search", id: "rag" },
    ];

    const categoryTitleLabel: Record<string, string> = {
        llm: "Language Models",
        voice: "Voice & Audio",
        image: "Image Generation",
        agents: "AI Agents",
        devtools: "Dev Tools",
        rag: "RAG & Search",
    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Body */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                {/* Header bar */}
                <div style={{ position: "relative", display: "flex", alignItems: "center", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

                    {/* Left — logo */}
                    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                        <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "35px", color: "#fbfbf9", whiteSpace: "nowrap" }}>
                            Stack or <span style={{ fontWeight: 700, fontSize: "40px", fontStyle: "italic", color: "#7038d0", textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>Crack</span>
                        </span>
                    </div>

                    {/* Centre — categories (absolutely positioned so they're truly centred) */}
                    <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "8px" }}>
                        {categories.map(({ img, label, id }) => (
                            <div key={id} onClick={() => setActiveCategory(id)} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 18px",
                                cursor: "pointer",
                                borderRadius: "14px",
                                border: `1px solid ${activeCategory === id ? "rgba(100,200,150,0.45)" : "rgba(255,255,255,0.1)"}`,
                                background: activeCategory === id
                                    ? "linear-gradient(225deg, #4d7c5b 0%, #2b4a53 50%, #1e3344 100%)"
                                    : "rgba(255,255,255,0.04)",
                                boxShadow: activeCategory === id ? "0 0 10px 2px rgba(100,200,150,0.3)" : "none",
                                color: activeCategory === id ? "#fff" : "rgba(255,255,255,0.5)",
                                fontFamily: "Cormorant Garamond, serif",
                                fontWeight: 600,
                                fontSize: "14px",
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                transition: "all 0.2s ease",
                            }}>
                                <Image
                                    src={img}
                                    alt={label}
                                    width={18}
                                    height={18}
                                    style={{
                                        filter: activeCategory === id
                                            ? "drop-shadow(0 0 5px rgba(100,200,150,0.9)) invert(1)"
                                            : "drop-shadow(0 0 3px rgba(100,200,150,0.4)) invert(0.6)",
                                        transition: "filter 0.2s ease",
                                    }}
                                />
                                {label}
                            </div>
                        ))}
                    </div>

                    {/* Right — buttons */}
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                        {exploreMode ? (
                            <motion.button
                                onClick={() => goTo("brief")}
                                whileHover={{ boxShadow: "0 0 10px 2px rgba(100,200,150,0.45)", borderColor: "rgba(100,200,150,0.55)" }}
                                style={{
                                    padding: "8px 18px",
                                    background: "#1a3a2a",
                                    border: "1px solid rgba(100,200,150,0.25)",
                                    color: "rgba(255,255,255,0.7)",
                                    fontFamily: "Cormorant Garamond, serif",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    borderRadius: "14px",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Start Challenge
                            </motion.button>
                        ) : (
                            <motion.button
                                onClick={onNewBrief}
                                whileHover={{ boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.4)", borderColor: "rgba(185, 87, 227, 0.45)" }}
                                style={{
                                    padding: "8px 18px",
                                    background: "#31234a",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "rgba(255,255,255,0.5)",
                                    fontFamily: "Cormorant Garamond, serif",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    borderRadius: "14px",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                New Brief
                            </motion.button>
                        )}
                        <motion.button
                            onClick={() => goTo(exploreMode ? "landing" : "brief")}
                            whileHover={{ boxShadow: "0 0 10px 2px rgba(100,200,150,0.35)", borderColor: "rgba(100,200,150,0.45)" }}
                            style={{
                                padding: "8px 18px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.5)",
                                fontFamily: "Cormorant Garamond, serif",
                                fontWeight: 600,
                                fontSize: "14px",
                                borderRadius: "14px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "all 0.2s ease",
                            }}
                        >
                            Back
                        </motion.button>
                    </div>
                </div>

                {/* Content row: tools + brief sidebar */}
                <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

                    {/* Tools grid */}
                    <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "30px", color: "#f6f5f4", marginBottom: "20px" }}>
                            {(() => {
                                const cat = categories.find(c => c.id === activeCategory);
                                return cat ? (
                                    <Image
                                        src={cat.img}
                                        alt={cat.label}
                                        width={30}
                                        height={30}
                                        style={{ filter: "drop-shadow(0 0 5px rgba(100,200,150,0.8)) invert(1)" }}
                                    />
                                ) : null;
                            })()}
                            {categoryTitleLabel[activeCategory]}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${exploreMode ? 5 : 4}, 1fr)`, gap: "30px" }}>
                            {tools
                                .filter(tool => tool.category === activeCategory)
                                .map(tool => (
                                    <ToolCard
                                        key={tool.id}
                                        tool={tool}
                                        isSelected={selectedTools.some(t => t.id === tool.id)}
                                        stackFull={selectedTools.length === 5}
                                        onSelect={onToggleTool}
                                        onLearnMore={(tool) => setDrawerTool(tool)}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Brief sidebar — challenge mode only */}
                    {!exploreMode && (
                        <div style={{
                            width: "410px",
                            flexShrink: 0,
                            borderLeft: "1px solid rgba(255,255,255,0.07)",
                            overflowY: "auto",
                            background: "linear-gradient(225deg, rgba(77,124,91,0.12) 0%, rgba(43,74,83,0.1) 50%, rgba(30,51,68,0.12) 100%)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            padding: "20px",
                        }}>
                            {/* Mission + title */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <span style={{ fontSize: "15px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.3)" }}>Your Mission</span>
                                <h2 style={{ margin: 0, fontSize: "25px", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{brief.title}</h2>
                            </div>

                            {/* Capability tags */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                {brief.required_capabilities.map(cap => (
                                    <span
                                        key={cap}
                                        style={{
                                            boxShadow: "0 0 6px 1px rgba(100,200,150,0.25)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            borderRadius: "999px",
                                            padding: "3px 12px",
                                            fontSize: "14px",
                                            color: "rgba(255,255,255,0.6)",
                                        }}
                                    >
                                        {cap}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <span style={{ fontSize: "15px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.3)" }}>Brief</span>
                                <p style={{ margin: 0, fontSize: "18px", fontStyle: "italic", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{brief.description}</p>
                            </div>

                            {/* Constraints */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <span style={{ fontSize: "15px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.3)" }}>Constraints</span>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                                    {/* Budget with info tooltip */}
                                    <div style={{ position: "relative", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", padding: "10px 8px", textAlign: "center", background: "rgba(255,255,255,0.03)" }}>
                                        <span style={{ display: "block", fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>Budget</span>
                                        <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>{brief.budget}</span>
                                        <div
                                            style={{ position: "absolute", bottom: "5px", right: "6px", display: "flex", alignItems: "center", cursor: "pointer" }}
                                            onMouseEnter={() => setShowBudgetTooltip(true)}
                                            onMouseLeave={() => setShowBudgetTooltip(false)}
                                        >
                                            <Image src={info} alt="info" width={15} height={15} style={{ opacity: 0.4, filter: "invert(1)" }} />
                                            {showBudgetTooltip && (
                                                <div style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    left: "calc(100% + 12px)",
                                                    width: "200px",
                                                    background: "#1a1a2e",
                                                    border: "1px solid rgba(112, 56, 208, 0.4)",
                                                    borderRadius: "10px",
                                                    padding: "10px 12px",
                                                    fontSize: "12px",
                                                    color: "rgba(255,255,255,0.7)",
                                                    lineHeight: 1.5,
                                                    zIndex: 50,
                                                    pointerEvents: "none",
                                                    whiteSpace: "normal",
                                                    boxShadow: `
                                                        0 4px 6px -1px rgba(0, 0, 0, 0.6), 
                                                        0 0 15px 1px rgba(112, 56, 208, 0.4)
                                                    `
                                                }}>
                                                    {brief.budgetDescription}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Timeline */}
                                    <div style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", padding: "10px 8px", textAlign: "center", background: "rgba(255,255,255,0.03)" }}>
                                        <span style={{ display: "block", fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>Timeline</span>
                                        <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>{brief.timeline}</span>
                                    </div>
                                    {/* Users */}
                                    <div style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", padding: "10px 8px", textAlign: "center", background: "rgba(255,255,255,0.03)" }}>
                                        <span style={{ display: "block", fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>Users</span>
                                        <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>{brief.users}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Objective */}
                            <div style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", padding: "12px", background: "rgba(255,255,255,0.03)" }}>
                                <span style={{ fontSize: "15px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.3)" }}>Objective</span>
                                <p style={{ margin: "6px 0 0", fontSize: "15px", fontStyle: "italic", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                                    Pick 5 tools that best serve this brief. Your stack will be judged on fit, cost, and coverage.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Submit bar — hidden in explore mode */}
            {!exploreMode && <div style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 28px",
                background: "transparent",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                position: "relative",
            }}>
                {/* Spacer left */}
                
                {/* Mascot — bottom left */}
                <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
                style={{ flex: 1, display: "flex", alignItems: "flex-end" }}
                >
                <img
                    src="/hatterw:ob.png"
                    alt="Mad Hatter"
                    style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    marginBottom: "-20px",
                    }}
                />
                </motion.div>


                {/* StackTray — center */}
                <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <StackTray stack={selectedTools} maxSize={5} />
                </div>

                {/* Hint + button — right */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", marginBottom: "20px" }}>
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "18px", color: "rgba(240,224,200,0.3)" }}>
                        {selectedTools.length === 5
                            ? "Your stack is complete — drink me!"
                            : `Select ${5 - selectedTools.length} more tool${5 - selectedTools.length === 1 ? "" : "s"}`}
                    </span>
                    <motion.button
                        onClick={() => selectedTools.length === 5 ? goTo("judging") : null}
                        whileHover={selectedTools.length === 5 ? { boxShadow: "0 0 16px 4px rgba(255,255,255,0.25)" } : {}}
                        transition={{ duration: 0.2 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 36px",
                            background: selectedTools.length === 5 ? "rgba(158,42,43,0.8)" : "rgba(158,42,43,0.2)",
                            border: `1px solid ${selectedTools.length === 5 ? "rgba(158,42,43,0.9)" : "rgba(158,42,43,0.2)"}`,
                            color: selectedTools.length === 5 ? "#fdfbf8" : "rgba(240,224,200,0.25)",
                            fontFamily: "Cormorant Garamond, serif",
                            fontWeight: 700,
                            fontSize: "25px",
                            letterSpacing: "2px",
                            cursor: selectedTools.length === 5 ? "pointer" : "not-allowed",
                            borderRadius: "15px",
                        }}>
                        <Image
                            src={poison}
                            alt="potion"
                            width={30}
                            height={30}
                            style={{
                                filter: selectedTools.length === 5
                                    ? "invert(1) drop-shadow(0 0 4px rgba(139, 42, 158, 0.9))"
                                    : "invert(0.3)",
                                transition: "filter 0.3s ease",
                            }}
                        />
                        Drink Me
                    </motion.button>
                </div>
            </div>}

            {/* Drawer */}
            <Drawer
                tool={drawerTool}
                isSelected={drawerTool ? selectedTools.some(t => t.id === drawerTool.id) : false}
                onClose={() => setDrawerTool(null)}
                onSelect={onToggleTool}
            />

        </div>
    );
}