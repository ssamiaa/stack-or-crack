"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Screen } from "@/lib/types";
import briefsData from "@/data/briefs.json";

type Brief = typeof briefsData.briefs[0];

type Props = {
    goTo: (s: Screen) => void;
    brief: Brief;
    onNewBrief: () => void;
};

export default function Brief({ goTo, brief, onNewBrief }: Props) {
    const [flipKey, setFlipKey] = useState(0);

    const handleNewBrief = () => {
        onNewBrief();
        setFlipKey(k => k + 1);
    };
    const gradientStyle: React.CSSProperties = {
        background: "linear-gradient(225deg, #4d7c5b 0%, #2b4a53 50%, #1e3344 100%)",
    };

    const badgeStyle: React.CSSProperties = {
        backgroundColor: "#31234a",
        color: "#e9d5ff",
        boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.4)",
    };

    const primaryButtonStyle: React.CSSProperties = {
        backgroundColor: "#1a3a2a",
        color: "#86efac",
        boxShadow: "0 0 10px 2px rgba(100, 200, 150, 0.45)",
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
            <motion.div
                key={flipKey}
                initial={{ rotateY: 90, scale: 0.85, opacity: 0 }}
                animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                style={{ ...gradientStyle, maxWidth: "680px", width: "100%", perspective: 1200 }}
                className="rounded-2xl border border-white/15 shadow-2xl flex flex-col max-h-[85vh]"
            >
                {/* Header */}
                <div className="flex-shrink-0 flex flex-col gap-4 border-b border-white/10 p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-xl font-semibold uppercase tracking-widest text-white/30">Your Mission</span>
                            <h2 className="mt-1 text-2xl font-bold text-white leading-tight">{brief.title}</h2>
                        </div>
                        <button
                            onClick={() => goTo("map")}
                            className="rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Capability tags */}
                    <div className="flex flex-wrap gap-x-2.5 gap-y-2.5">
                        {brief.required_capabilities.map(cap => (
                            <span
                                key={cap}
                                style={{ boxShadow: "0 0 6px 1px rgba(100, 200, 150, 0.3)" }}
                                className="rounded-2xl border border-white/20 px-2.5 py-0.5 text-md font-medium text-white/60"
                            >
                                {cap}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-3">

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-semibold uppercase tracking-widest text-white/30">Brief</span>
                        <p className="text-xl italic text-white/75 leading-relaxed">{brief.description}</p>
                    </div>

                    {/* Constraints */}
                    <div className="flex flex-col gap-2">
                        <span className="text-xl font-semibold uppercase tracking-widest text-white/30">Constraints</span>
                        <div className="grid grid-cols-3 gap-3">
                            {[["Budget", brief.budget], ["Timeline", brief.timeline], ["Users", brief.users]].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="rounded-xl border border-white/10 px-4 py-3 text-center"
                                    style={{ background: "rgba(255,255,255,0.04)" }}
                                >
                                    <span className="block text-lg font-semibold uppercase tracking-widest text-white/30 mb-1">{label}</span>
                                    <span className="text-lg text-white/75">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trending badge example / flavour */}
                    <div
                        className="rounded-xl border border-white/10 px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                        <span className="text-xl font-semibold uppercase tracking-widest text-white/30">Objective</span>
                        <p className="mt-1 text-lg italic text-white/60 leading-relaxed">
                            Pick 5 tools that best serve this brief. Your stack will be judged on fit, cost, and coverage.
                        </p>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex gap-3 border-t border-white/10 p-4">
                    <motion.button
                        onClick={() => goTo("map")}
                        style={primaryButtonStyle}
                        whileHover={{ opacity: 0.85 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-lg font-semibold cursor-pointer"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Build My Stack
                    </motion.button>

                    <motion.button
                        onClick={handleNewBrief}
                        style={badgeStyle}
                        whileHover={{ opacity: 0.85 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-lg font-semibold cursor-pointer"
                    >
                        New Brief
                    </motion.button>

                    <motion.button
                        onClick={() => goTo("landing")}
                        style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", boxShadow: "0 0 10px 2px rgba(100, 200, 150, 0.3)" }}
                        whileHover={{ opacity: 0.85 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-lg font-semibold cursor-pointer"
                    >
                        Home
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
