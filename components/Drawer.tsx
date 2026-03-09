"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tool } from "./ToolCard";

interface DrawerProps {
    tool: Tool | null;
    isSelected: boolean;
    onClose: () => void;
    onSelect: (id: string) => void;
    exploreMode?: boolean;
}

export default function Drawer({ tool, isSelected, onClose, onSelect, exploreMode = false }: DrawerProps) {
    const gradientStyle: React.CSSProperties = {
        background: "linear-gradient(225deg, #4d7c5b 0%, #2b4a53 50%, #1e3344 100%)",
        perspective: 1200,
    };

    const badgeStyle: React.CSSProperties = {
        backgroundColor: "#31234a",
        color: "#e9d5ff",
        boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.4)",
    };

    const stackButtonStyle: React.CSSProperties = isSelected
        ? {
              backgroundColor: "#1a3a2a",
              color: "#86efac",
              boxShadow: "0 0 10px 2px rgba(100, 200, 150, 0.45)",
          }
        : {
              backgroundColor: "#31234a",
              color: "#e9d5ff",
              boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.4)",
          };

    return (
        <AnimatePresence>
            {tool && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer card */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
                        <motion.div
                            key="drawer"
                            initial={{ rotateY: 90, scale: 0.85, opacity: 0 }}
                            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                            exit={{ rotateY: -90, scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 280, damping: 26 }}
                            style={gradientStyle}
                            className="pointer-events-auto w-full max-w-lg rounded-2xl border border-white/15 shadow-2xl flex flex-col max-h-[85vh]"
                        >
                            {/* Sticky header */}
                            <div className="flex-shrink-0 flex flex-col gap-4 border-b border-white/10 p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col gap-1">
                                        <img src={tool.logo} alt={tool.name} style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "8px", background: "rgba(255,255,255,0.08)", padding: "5px", flexShrink: 0 }} />
                                        <span className="mt-2 text-2xl font-bold text-white">{tool.name}</span>
                                        <span className="text-lg font-bold text-white/50">by {tool.maker}</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        {tool.trending && (
                                            <span style={badgeStyle} className="rounded-2xl px-2.5 py-0.5 text-md font-medium">
                                                Trending
                                            </span>
                                        )}
                                        <button
                                            onClick={onClose}
                                            className="rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {tool.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            style={{ boxShadow: "0 0 6px 1px rgba(100, 200, 150, 0.3)" }}
                                            className="rounded-2xl border border-white/20 px-2.5 py-0.5 text-sm font-medium text-white/60"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Scrollable content */}
                            <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-5">

                                {/* What */}
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30">What it does</span>
                                    <p className="text-base text-white/75 leading-relaxed">{tool.what}</p>
                                </div>

                                {/* Analogy */}
                                <div
                                    className="rounded-xl border border-white/10 px-4 py-3"
                                    style={{ background: "rgba(255,255,255,0.04)" }}
                                >
                                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Think of it like…</span>
                                    <p className="mt-1 text-base italic text-white/60 leading-relaxed">{tool.analogy}</p>
                                </div>

                                {/* Use cases */}
                                {tool.usecases.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Use cases</span>
                                        <ul className="flex flex-col gap-2">
                                            {tool.usecases.map((u, i) => (
                                                <li key={i} className="flex items-start gap-2.5 text-base text-white/70">
                                                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-white/40" />
                                                    <span className="leading-snug">{u.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Comparisons */}
                                {tool.comparisons.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-widest text-white/30">How it compares</span>
                                        <ul className="flex flex-col gap-2">
                                            {tool.comparisons.map((c, i) => (
                                                <li key={i} className="rounded-xl border border-white/10 px-4 py-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                                                    <span className="text-sm font-semibold text-white/50">{c.name}</span>
                                                    <p className="mt-0.5 text-base text-white/65 leading-snug">{c.diff}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Cost */}
                                {tool.costDetail && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Cost</span>
                                        <p className="text-base text-white/70">{tool.costDetail}</p>
                                    </div>
                                )}
                            </div>

                            {/* Sticky footer */}
                            <div className="flex gap-3 border-t border-white/10 p-4">
                                {/* Add / remove from stack — hidden in explore mode */}
                                {!exploreMode && (
                                    <motion.button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelect(tool.id);
                                        }}
                                        style={stackButtonStyle}
                                        whileHover={{ opacity: 0.85 }}
                                        transition={{ duration: 0.15 }}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold cursor-pointer"
                                    >
                                        {isSelected ? (
                                            <>
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                                                </svg>
                                                In Stack
                                            </>
                                        ) : (
                                            <>
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                </svg>
                                                Add to Stack
                                            </>
                                        )}
                                    </motion.button>
                                )}

                                {/* Visit site */}
                                <motion.a
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ boxShadow: "0 0 10px 2px rgba(100, 200, 150, 0.3)", backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.75)" }}
                                    whileHover={{ opacity: 0.85 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 py-2.5 text-sm font-semibold cursor-pointer"
                                >
                                    Visit Site
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
