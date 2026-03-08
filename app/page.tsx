"use client";
import { useState } from "react";
import { Screen } from "@/lib/types";
import Landing from "@/components/screens/Landing";
import Brief from "@/components/screens/Brief";
import Map from "@/components/screens/Map";
import Judging from "@/components/screens/Judging";
import Verdict from "@/components/screens/Verdict";
import { Tool } from "@/components/ToolCard";
import toolsData from "@/data/tools.json";
import briefsData from "@/data/briefs.json";

export default function Home() {
    const [screen, setScreen] = useState<Screen>("landing");
    const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
    const [currentBrief, setCurrentBrief] = useState(() => {
        const briefs = briefsData.briefs;
        return briefs[Math.floor(Math.random() * briefs.length)];
    });

    const goTo = (s: Screen) => setScreen(s);

    const clearStack = () => setSelectedTools([]);

    const newBrief = () => {
        const briefs = briefsData.briefs;
        const available = briefs.filter(b => b.id !== currentBrief.id);
        const picked = available[Math.floor(Math.random() * available.length)];
        console.log("current:", currentBrief.id);
        console.log("picked:", picked.id);
        setCurrentBrief(picked);
        clearStack();
        setScreen("brief");
    };

    const toggleTool = (id: string) => {
        setSelectedTools(prev => {
            if (prev.find(t => t.id === id)) return prev.filter(t => t.id !== id);
            if (prev.length >= 5) return prev;
            const tool = toolsData.tools.find(t => t.id === id) as Tool;
            return tool ? [...prev, tool] : prev;
        });
    };

    return (
        <main>
            {screen === "landing" && <Landing goTo={goTo} />}
            {screen === "brief" && <Brief goTo={goTo} brief={currentBrief} onNewBrief={newBrief} />}
            {screen === "map" && (
                <Map
                    goTo={goTo}
                    selectedTools={selectedTools}
                    onToggleTool={toggleTool}
                    brief={currentBrief}
                />
            )}
            {screen === "judging" && (
                <Judging
                    goTo={goTo}
                    selectedTools={selectedTools}
                />
            )}
            {screen === "verdict" && (
                <Verdict
                    goTo={goTo}
                    selectedTools={selectedTools}
                    onClear={clearStack}
                    onNewBrief={newBrief}
                />
            )}
        </main>
    );
}