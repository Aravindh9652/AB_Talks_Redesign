"use client";

import React from "react";
import { useMockState } from "../context/MockStateContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeSelector() {
  const { isLightMode, toggleLightMode } = useMockState();

  return (
    <button
      onClick={toggleLightMode}
      title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-all active:scale-90 shadow-sm backdrop-blur-sm"
    >
      {isLightMode ? (
        <Moon className="h-4 w-4 text-violet-500 fill-violet-500/10" />
      ) : (
        <Sun className="h-4 w-4 text-amber-400 fill-amber-400/20" />
      )}
    </button>
  );
}
