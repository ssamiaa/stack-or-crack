"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tool } from "./ToolCard";

interface StackTrayProps {
    stack: Tool[];
    maxSize?: number;
}

export default function StackTray({ stack, maxSize = 5 }: StackTrayProps) {
    const [tooltip, setTooltip] = useState<number | null>(null);
    const isFull = stack.length >= maxSize;

    const slots = Array.from({ length: maxSize }, (_, i) => stack[i] ?? null);

    return (
        <div className="flex items-center gap-5">
            <span
                style={{ color: isFull ? "#349056" : "rgba(255,255,255,0.3)" }}
                className="text-xl font-semibold tabular-nums">
                STACK
            </span>
            {slots.map((tool, i) => (
                <div key={i} className="relative">
                    <motion.div
                        initial={false}
                        animate={
                            tool
                                ? { scale: 1, opacity: 1 }
                                : { scale: 1, opacity: 1 }
                        }
                        onMouseEnter={() => tool && setTooltip(i)}
                        onMouseLeave={() => setTooltip(null)}
                        style={
                            tool
                                ? {
                                    background: "linear-gradient(225deg, #4d7c5b 0%, #2b4a53 50%, #1e3344 100%)",
                                    boxShadow: isFull
                                        ? "0 0 10px 2px rgba(100, 200, 150, 0.4)"
                                        : "0 0 8px 2px rgba(100, 200, 150, 0.25)",
                                }
                                : {
                                    background: "rgba(255,255,255,0.04)",
                                }
                        }
                        className={`
                            flex h-15 w-15 items-center justify-center rounded-xl border text-xl
                            transition-colors duration-150
                            ${tool
                                ? "border-green-400/40 cursor-default"
                                : "border-white/10 border-dashed"
                            }
                        `}
                    >
                        <AnimatePresence mode="wait">
                            {tool ? (
                                <motion.span
                                    key={tool.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    role="img"
                                    aria-label={tool.name}
                                >
                                    {tool.logo}
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-white/20 text-lg font-light leading-none"
                                >
                                    +
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Tooltip */}
                    <AnimatePresence>
                        {tooltip === i && tool && (
                            <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 pointer-events-none"
                            >
                                <div
                                    style={{
                                        background: "linear-gradient(225deg, #4d7c5b 0%, #2b4a53 50%, #1e3344 100%)",
                                        boxShadow: "0 0 10px 2px rgba(100, 200, 150, 0.2)",
                                    }}
                                    className="rounded-lg border border-white/15 px-2.5 py-1 text-xs font-medium text-white/80 whitespace-nowrap"
                                >
                                    {tool.name}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}

            {/* Stack count */}
            <span
                style={{ color: isFull ? "#349056" : "rgba(255,255,255,0.3)" }}
                className="mb-5 text-3xl font-bold tabular-nums"
            >
                {stack.length}/{maxSize}
            </span>
        </div>
    );
}
