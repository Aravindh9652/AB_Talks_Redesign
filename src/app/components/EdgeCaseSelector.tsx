"use client";

import React, { useState } from "react";
import { useMockState } from "../context/MockStateContext";
import { Settings, RefreshCw, Award, Zap, HelpCircle, AlertTriangle, Play } from "lucide-react";

export default function EdgeCaseSelector() {
  const {
    isFirstDay,
    isMissedDay,
    isChallengeCompleted,
    setIsFirstDay,
    setIsMissedDay,
    setIsChallengeCompleted,
    resetAll,
    streak,
    xp,
    level
  } = useMockState();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-500 transition-all hover:scale-105 active:scale-95 border border-violet-400/20"
        title="Toggle Hackathon Tester Panel"
      >
        <Settings className={`h-5 w-5 ${isOpen ? "rotate-45" : ""} transition-transform duration-300`} />
      </button>

      {/* Control Panel Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 rounded-2xl border border-white/10 bg-slate-900/90 p-4 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-sm font-semibold tracking-wide text-slate-200 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-400" />
              Judge State Controller
            </h3>
            <button
              onClick={resetAll}
              className="rounded p-1 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
              title="Reset to Day 12 Default"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mb-3 text-[11px] text-slate-400">
            Use these presets to instantly test the mandatory hackathon edge cases across all routes.
          </p>

          <div className="space-y-2">
            {/* Default State */}
            <button
              onClick={() => {
                resetAll();
                setIsFirstDay(false);
                setIsMissedDay(false);
                setIsChallengeCompleted(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                !isFirstDay && !isMissedDay && !isChallengeCompleted
                  ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                  : "bg-white/5 text-slate-300 border border-transparent hover:bg-white/10"
              }`}
            >
              <span className="flex items-center gap-2">
                <Play className="h-3.5 w-3.5 text-emerald-400" />
                Default Day 12
              </span>
              <span className="text-[10px] text-slate-400">Streak: 11</span>
            </button>

            {/* Edge Case 1: First Day */}
            <button
              onClick={() => {
                resetAll();
                setIsFirstDay(true);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                isFirstDay
                  ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                  : "bg-white/5 text-slate-300 border border-transparent hover:bg-white/10"
              }`}
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="h-3.5 w-3.5 text-sky-400" />
                First Day (0 Streak)
              </span>
              <span className="text-[10px] text-slate-400">Streak: 0</span>
            </button>

            {/* Edge Case 2: Missed Day */}
            <button
              onClick={() => {
                resetAll();
                setIsMissedDay(true);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                isMissedDay
                  ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                  : "bg-white/5 text-slate-300 border border-transparent hover:bg-white/10"
              }`}
            >
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                Missed Day (Streak Broken)
              </span>
              <span className="text-[10px] text-slate-400">Broken</span>
            </button>

            {/* Edge Case 3: Completed Challenge */}
            <button
              onClick={() => {
                resetAll();
                setIsChallengeCompleted(true);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                isChallengeCompleted
                  ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                  : "bg-white/5 text-slate-300 border border-transparent hover:bg-white/10"
              }`}
            >
              <span className="flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                Completed (60/60)
              </span>
              <span className="text-[10px] text-slate-400">Winner</span>
            </button>
          </div>

          <div className="mt-3 border-t border-white/10 pt-2 text-[10px] text-slate-500 flex justify-between">
            <span>Level: {level}</span>
            <span>XP: {xp}</span>
          </div>
        </div>
      )}
    </div>
  );
}
