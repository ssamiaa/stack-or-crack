"use client";

import { motion } from "framer-motion";

export interface Tool {
    id: string;
    logo: string;
    name: string;
    maker: string;
    category: string;
    tagline: string;
    what: string;
    analogy: string;
    usecases: { icon: string; text: string }[];
    comparisons: { name: string; diff: string }[];
    tags: string[];
    cost: string;
    costDetail: string;
    url: string;
    trending: boolean;
}

interface ToolCardProps {
    tool: Tool;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onLearnMore: (tool: Tool) => void;
}

export default function ToolCard({ tool, isSelected, onSelect, onLearnMore }: ToolCardProps) {
    const gradientStyle: React.CSSProperties = {
        background: 'linear-gradient(225deg, #4d7c5b 0%, #2b4a53 50%, #1e3344 100%)',
    };

    const glow = "0 0 18px 4px rgba(100, 200, 150, 0.45)";

    const badgeStyle: React.CSSProperties = {
        backgroundColor: '#31234a',
        color: '#e9d5ff',
        boxShadow: '0 0 8px 2px rgba(168, 85, 247, 0.4)',
    };

    return (
        <motion.div
            whileHover={{ y: -3, boxShadow: glow }}
            whileTap={{ scale: 0.98 }}
            animate={{ boxShadow: isSelected ? glow : "0 0 0px 0px rgba(0,0,0,0)" }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelect(tool.id)}
            style={gradientStyle}
            className={`
        relative flex flex-col gap-3 rounded-2xl border p-5 cursor-pointer
        transition-colors duration-150 select-none
        ${isSelected
                    ? "border-white/30"
                    : "border-white/10 hover:border-white/25"
                }
      `}
        >
            {/* Trending badge */}
            {tool.trending && (
                <span
                    style={badgeStyle}
                    className="absolute top-3 right-3 rounded-2xl bg-amber-200 px-2 py-0.5 text-xs font-medium text-amber-700">
                    Trending
                </span>
            )}

            {/* Logo + name + maker */}
            <div className="flex flex-col gap-1">
                <span className="text-3xl leading-none" role="img" aria-label={tool.name}>
                    {tool.logo}
                </span>
                <span className="text-base font-semibold text-white leading-tight">
                    {tool.name}
                </span>
                <span className="text-xs text-white/50">{tool.maker}</span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-white/50 leading-snug">{tool.tagline}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                    <span
                        key={tag}
                        style={{ boxShadow: '0 0 6px 1px rgba(100, 200, 150, 0.3)' }}
                        className="rounded-2xl border border-white/20 px-2.5 py-0.5 text-xs font-medium text-white/60"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer: checkmark + learn more */}
            <div className="mt-auto flex items-center justify-between pt-1">
                <motion.div
                    initial={false}
                    animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={badgeStyle}
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                >
                    <svg className="h-3 w-3 text-white/50" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                    </svg>
                </motion.div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onLearnMore(tool);
                    }}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                >
                    Learn More
                </button>
            </div>
        </motion.div>
    );
}
