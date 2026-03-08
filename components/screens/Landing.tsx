import { Screen } from "@/lib/types";
import { motion } from "framer-motion";
import toolsData from "@/data/tools.json";
import briefsData from "@/data/briefs.json";

type Props = { goTo: (s: Screen) => void; onExplore: () => void };

const toolCount = toolsData.tools.length;
const realmCount = new Set(toolsData.tools.map(t => t.category)).size;
const briefCount = briefsData.briefs.length;

export default function Landing({ goTo, onExplore }: Props) {
    const primaryButtonStyle: React.CSSProperties = {
        background: "linear-gradient(135deg, rgba(77,124,91,0.6), rgba(49,35,74,0.6))",
        border: "1px solid rgba(100,200,150,0.3)",
        color: "rgba(255,255,255,0.85)",
        boxShadow: "0 0 16px rgba(100,200,150,0.3)",
        transition: "all 0.1s ease",
        letterSpacing: "2px",
    };

    const springTransition = {
        type: "spring" as const,
        stiffness: 400,
        damping: 17
    };

    const popIn = (delay: number) => ({
        initial: { opacity: 0, y: 28, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    });

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
    

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <motion.h1
                    className="title-main"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
                >
                   <img
            src="/hatterw:ob.png"
            alt="Mad Hatter"
            style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                marginBottom: "-40px",
            }}
            />

                </motion.h1>
            
            </motion.div>
            {/* Floating title */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                
                <motion.h1
                    className="title-main"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
                >
                    Stack or <span className="title-crack">Crack</span>
                </motion.h1>
            </motion.div>

            <motion.div
                {...popIn(0.3)}
                style={{ fontFamily: "IM Fell English, serif", fontStyle: "italic", fontSize: "30px", color: "rgba(240,224,200,0.45)", letterSpacing: "1px" }}
            >
                Can you navigate the AI realm?
            </motion.div>

            <motion.div {...popIn(0.5)} style={{ maxWidth: "460px", margin: "8px 0 24px" }}>
                <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "19px",
                    color: "rgba(240,224,200,0.55)",
                    lineHeight: 1.8,
                    textAlign: "center"
                }}>
                    You get a <strong style={{ color: "rgba(240,224,200,0.88)" }}>real project brief</strong> and explore the
                    <strong style={{ color: "rgba(240,224,200,0.88)" }}> map of AI tools.</strong> You assemble your stack, then the
                    <strong style={{ color: "rgba(240,224,200,0.88)" }}> Mad Hatter judges every choice.</strong> Learn the AI landscape by
                    <strong style={{ color: "rgba(240,224,200,0.88)" }}> putting it to use.</strong>
                </p>
            </motion.div>

            <motion.div {...popIn(0.7)} style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                <motion.button
                    onClick={() => goTo("brief")}
                    style={primaryButtonStyle}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px 2px rgba(134, 239, 172, 0.3)",
                        borderColor: "rgba(134, 239, 172, 0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={springTransition}
                    className="flex w-fit items-center justify-center gap-4 rounded-2xl px-10 py-2.5 text-xl font-semibold cursor-pointer"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Start Challenge
                </motion.button>

                <motion.button
                    onClick={onExplore}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px 2px rgba(240, 224, 200, 0.15)",
                        borderColor: "rgba(240, 224, 200, 0.6)",
                        color: "rgba(240, 224, 200, 0.9)",
                        backgroundColor: "rgba(240, 224, 200, 0.05)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={springTransition}
                    style={{
                        padding: "10px 40px",
                        background: "transparent",
                        border: "1px solid rgba(240, 224, 200, 0.2)",
                        color: "rgba(240, 224, 200, 0.5)",
                        fontSize: "18px",
                        letterSpacing: "2px",
                        cursor: "pointer",
                        borderRadius: "16px",
                        transition: "all 0.1s ease",
                        fontWeight: 500,
                    }}
                >
                    Explore the Map
                </motion.button>
            </motion.div>

            <motion.div
                {...popIn(0.9)}
                style={{
                    display: "flex",
                    gap: "48px",
                    marginTop: "20px",
                    padding: "10px 0",
                    borderTop: "1px solid rgba(240,224,200,0.1)",
                    borderBottom: "1px solid rgba(240,224,200,0.1)"
                }}
            >
                {[
                    { value: String(toolCount), label: "AI Tools" },
                    { value: String(realmCount), label: "Realms" },
                    { value: String(briefCount), label: "Briefs" }
                ].map((stat, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <span style={{
                            fontSize: "25px",
                            fontWeight: 700,
                            color: "#f0e0c8",
                            lineHeight: 1,
                        }}>
                            {stat.value}
                        </span>
                        <span style={{
                            fontSize: "15px",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            color: "rgba(240,224,200,0.4)"
                        }}>
                            {stat.label}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
