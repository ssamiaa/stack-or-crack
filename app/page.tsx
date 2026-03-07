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
  const goTo = (s: Screen) => setScreen(s);

  return (
    <main>
      {screen === "landing" && <Landing goTo={goTo} />}
      {screen === "brief" && <Brief goTo={goTo} />}
      {screen === "map" && <Map goTo={goTo} />}
      {screen === "judging" && <Judging goTo={goTo} />}
      {screen === "verdict" && <Verdict goTo={goTo} />}
    </main>
  );
}