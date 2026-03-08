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

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);

  const goTo = (s: Screen) => setScreen(s);

  const toggleTool = (id: string) => {
    setSelectedTools(prev => {
      if (prev.find(t => t.id === id)) return prev.filter(t => t.id !== id);
      if (prev.length >= 5) return prev;
      const tool = toolsData.tools.find(t => t.id === id) as Tool;
      return tool ? [...prev, tool] : prev;
    });
  };

  const clearStack = () => setSelectedTools([]);

  return (
    <main>
      {screen === "landing" && <Landing goTo={goTo} />}
      {screen === "brief" && <Brief goTo={goTo} />}
      {screen === "map" && (
        <Map
          goTo={goTo}
          selectedTools={selectedTools}
          onToggleTool={toggleTool}
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
        />
      )}
    </main>
  );
}