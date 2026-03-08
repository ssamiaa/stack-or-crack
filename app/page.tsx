"use client";
import { useState } from "react";
import { Screen } from "@/lib/types";
import Landing from "@/components/screens/Landing";
import Brief from "@/components/screens/Brief";
import Map from "@/components/screens/Map";
import Judging from "@/components/screens/Judging";
import Verdict from "@/components/screens/Verdict";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const goTo = (s: Screen) => setScreen(s);

  const toggleTool = (id: string) => {
    setSelectedTools(prev => {
      if (prev.includes(id)) return prev.filter(t => t !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
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