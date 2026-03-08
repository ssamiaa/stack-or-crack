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
import BriefCard from "@/components/BriefCard";
// images
import lang from "@/images/brain.png";
import voi from "@/images/microphone-black-shape.png";
import imagegen from "@/images/color-palette.png";
import agent from "@/images/artificial-intelligence.png";
import devt from "@/images/settings.png";
import rags from "@/images/open-book.png";
import poison from "@/images/potion.png"

type Brief = typeof briefsData.briefs[0];

type Props = {
    goTo: (s: Screen) => void;
    selectedTools: Tool[];
    onToggleTool: (id: string) => void;
    brief: Brief;
};

export default function Map({ goTo, selectedTools, onToggleTool, brief }: Props) {
    const [activeCategory, setActiveCategory] = useState("llm");
    const [drawerTool, setDrawerTool] = useState<Tool | null>(null);

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

                {/* Category bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "transparent", borderBottom: "1px solid rgba(255,255,255,0.07)", overflowX: "auto" }}>
                    {/* Logo — flex:1 left side to balance right */}
                    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                        <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700, fontSize: "35px", color: "#fbfbf9", whiteSpace: "nowrap" }}>
                            Stack or <span style={{ fontWeight: 700, fontSize: "40px", fontStyle: "italic", color: "#7038d0", textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>Crack</span>
                        </span>
                    </div>
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

                    {/* New Brief button */}
                    <div style={{ flex: 3, display: "flex", justifyContent: "flex-end" }}>
                        <motion.button
                            onClick={() => goTo("brief")}
                            whileHover={{ boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.4)", borderColor: "rgba(185, 87, 227, 0.45)" }}
                            style={{
                                flexShrink: 0,
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
                    </div>

                    {/* View Brief button — flex:1 right side to balance logo */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                        <motion.button
                            onClick={() => goTo("brief")}
                            whileHover={{ boxShadow: "0 0 10px 2px rgba(100,200,150,0.35)", borderColor: "rgba(100,200,150,0.45)" }}
                            style={{
                                flexShrink: 0,
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
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "30px" }}>
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

            </div>

            {/* Submit bar */}
            <div style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 28px",
                background: "transparent",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                position: "relative",
            }}>
                {/* Spacer left */}
                <div style={{ flex: 1 }} />

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
            </div>

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