"use client";
import { useState } from "react";

type Screen = "landing" | "brief" | "map" | "judging" | "verdict";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");

  const goTo = (s: Screen) => setScreen(s);

  return (
    <main>
      {screen === "landing" && (
        <div>
          <h1>Landing</h1>
          <button onClick={() => goTo("brief")}>Start Challenge</button>
          <button onClick={() => goTo("map")}>Explore Map</button>
        </div>
      )}

      {screen === "brief" && (
        <div>
          <h1>Brief</h1>
          <button onClick={() => goTo("map")}>Build My Stack</button>
          <button onClick={() => goTo("landing")}>Back</button>
        </div>
      )}

      {screen === "map" && (
        <div>
          <h1>Map</h1>
          <button onClick={() => goTo("judging")}>Drink Me</button>
          <button onClick={() => goTo("brief")}>Back</button>
        </div>
      )}

      {screen === "judging" && (
        <div>
          <h1>Judging</h1>
          <button onClick={() => goTo("verdict")}>See Verdict</button>
        </div>
      )}

      {screen === "verdict" && (
        <div>
          <h1>Verdict</h1>
          <button onClick={() => goTo("brief")}>Try Again</button>
          <button onClick={() => goTo("map")}>Back to Map</button>
        </div>
      )}
    </main>
  );
}