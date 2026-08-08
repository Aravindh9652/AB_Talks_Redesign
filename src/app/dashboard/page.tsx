"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  Code, 
  ChevronRight, 
  Award,
  Zap,
  TrendingUp,
  BrainCircuit,
  Target,
  LineChart,
  Calendar,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Sparkle,
  Copy,
  Download,
  Share2,
  Hourglass,
  RefreshCw,
  UserCheck,
  Plus
} from "lucide-react";
import { useMockState, Submission } from "../context/MockStateContext";
import ThemeSelector from "../components/ThemeSelector";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Dashboard() {
  const { 
    streak, 
    level, 
    xp, 
    daysCompletedCount, 
    githubConnected, 
    linkedinConnected,
    isFirstDay,
    isMissedDay,
    isChallengeCompleted,
    isSubmittedToday,
    submissions,
    reflections,
    streakRefreezes,
    useRefreeze,
    isLightMode,
    setGithubConnected,
    setLinkedinConnected
  } = useMockState();

  // Dialog State
  const [selectedDaySubmission, setSelectedDaySubmission] = useState<Submission | null>(null);
  
  // Custom Connect state dialogs
  const [connectingProfile, setConnectingProfile] = useState(false);

  // Recruiter Score Index
  const recruiterScore = isFirstDay 
    ? 0 
    : Math.min(100, Math.round((streak * 3.5) + (daysCompletedCount * 0.8) + (level * 4) + (isSubmittedToday ? 5 : 0)));

  // Mock Calendar 60 Days Grid
  const gridCells = Array.from({ length: 60 }, (_, i) => {
    const dayNum = i + 1;
    let status: "locked" | "completed" | "missed" | "active" = "locked";
    
    if (isFirstDay) {
      if (dayNum === 1) status = "active";
    } else if (isChallengeCompleted) {
      status = "completed";
    } else {
      if (dayNum <= daysCompletedCount) {
        status = "completed";
      } else if (dayNum === 12) {
        status = isSubmittedToday ? "completed" : "active";
      } else if (isMissedDay && dayNum === 11) {
        status = "missed";
      } else {
        status = "locked";
      }
    }
    return { day: dayNum, status };
  });

  const handleCellClick = (dayNum: number, status: string) => {
    if (status === "completed") {
      const sub = submissions.find(s => s.day === dayNum);
      if (sub) {
        setSelectedDaySubmission(sub);
      }
    } else if (status === "active" && !isSubmittedToday) {
      window.location.href = isFirstDay ? "/day/1" : "/day/12";
    }
  };

  const handleProfileConnect = () => {
    setConnectingProfile(true);
    setTimeout(() => {
      setGithubConnected(true);
      setLinkedinConnected(true);
      setConnectingProfile(false);
    }, 1200);
  };

  const currentChallengeProgress = Math.round((daysCompletedCount / 60) * 100);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern pb-24 overflow-x-hidden font-sans transition-colors duration-300">
      
      {/* Background Ambient Glows */}
      <div className="glow-orb top-[-10%] right-[-10%] w-[450px] h-[450px] bg-brand/15 transition-all duration-500" />
      <div className="glow-orb top-[30%] left-[-10%] w-[400px] h-[400px] bg-brand/10 transition-all duration-500" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand transition-colors duration-500">
              <Code className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold tracking-tight text-sm">
              AB<span className="bg-gradient-to-r from-brand to-slate-300 bg-clip-text text-transparent">Talks</span>
            </span>
          </Link>

          {/* Level and Streak indicators */}
          <div className="flex items-center gap-2">
            <ThemeSelector />
            <div className="flex items-center gap-1 rounded-full bg-slate-900 border border-white/5 px-2.5 py-1 text-xs">
              <span className="text-[10px] text-slate-500 font-medium">Lvl</span>
              <span className="font-bold text-brand transition-colors duration-500">{level}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs text-amber-400 font-semibold">
              <Flame className={`h-3.5 w-3.5 ${streak > 0 ? "animate-pulse fill-amber-400" : ""}`} />
              <span>{streak}d</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container - Optimized for 390px (Mobile-First Layout) */}
      <main className="max-w-md mx-auto px-4 mt-6 space-y-6 relative z-10">
        
        {/* Welcome Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-100">
              {isFirstDay ? "Namaste Builder 🚀" : "Good evening, Vajja 👋"}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isFirstDay 
                ? "Your journey starts today. Everyone starts somewhere." 
                : isMissedDay 
                ? "Your streak paused. That's okay." 
                : "You're building a public record of what you can do."}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-brand transition-colors duration-500">
              {isFirstDay ? "Day 1" : `Day 12`}
            </span>
            <span className="text-[9px] text-slate-500 block uppercase font-semibold">of 60 days</span>
          </div>
        </div>

        {/* EDGE CASE 2: Streak Paused / Missed Day Recovery Panel (Mandatory requirement) */}
        {isMissedDay && (
          <div className="rounded-2xl border border-brand/20 bg-brand/5 p-5 space-y-3.5">
            <div className="flex gap-2 items-center text-brand">
              <Flame className="h-5 w-5 fill-brand/20 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Streak Paused</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              That's okay. You missed Day 11. Don't lose your 10 days of progress. Complete today's task + a 10-minute recovery task to restore your momentum.
            </p>

            <button
              onClick={useRefreeze}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-brand hover:bg-brand/90 py-3 text-xs font-bold text-white transition-all active:scale-98 shadow-lg shadow-brand/15"
            >
              <Zap className="h-4.5 w-4.5 fill-white/10" />
              Recover My Streak
            </button>
          </div>
        )}

        {/* Today's Mission Action Card */}
        <div className="relative rounded-2xl border border-brand/25 bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-brand/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <span className="rounded-full bg-brand-acc border border-brand/20 px-2 py-0.5 text-[10px] font-semibold text-brand transition-colors duration-500">
              {isFirstDay ? "DAY 1 / 60" : "DAY 12 / 60"}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
              {isSubmittedToday ? "COMPLETED" : "TODAY'S MISSION"}
            </span>
          </div>

          <h2 className="text-base font-bold mt-2.5 text-slate-100">
            {isFirstDay ? "Setup GitHub & Connect LinkedIn" : "Build a REST API"}
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {isFirstDay 
              ? "Initialize your workspaces and commit a baseline README to document your 60-day goals."
              : "Build a REST API that allows users to create, read and delete tasks successfully."}
          </p>

          <div className="mt-4 flex gap-4 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">⏱ {isFirstDay ? "~20 min" : "~45 min"}</span>
            <span className="flex items-center gap-1">⚡ {isFirstDay ? "+50 XP" : "+100 XP"}</span>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5">
            {isSubmittedToday ? (
              <span className="w-full flex items-center justify-center gap-1 rounded-xl bg-emerald-500/10 py-3 text-xs font-bold text-emerald-400 border border-emerald-500/25">
                <CheckCircle2 className="h-4.5 w-4.5" /> Mission Completed
              </span>
            ) : (
              <Link
                href={isFirstDay ? "/day/1" : "/day/12"}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-brand hover:bg-brand/90 py-3 text-xs font-bold text-white transition-all hover:scale-102 active:scale-98 shadow-md shadow-brand/10"
              >
                Start today's challenge <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* EDGE CASE 3: Empty Profile connected section (Mandatory requirement) */}
        {isFirstDay && !githubConnected && !linkedinConnected ? (
          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-5 space-y-3.5 text-center">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Complete your profile</h3>
            <p className="text-xs text-slate-400 leading-relaxed px-2">
              Add your GitHub and LinkedIn to unlock your public learner profile and establish visibility indices.
            </p>
            <button
              onClick={handleProfileConnect}
              disabled={connectingProfile}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-3 text-xs font-bold text-slate-200 transition-colors"
            >
              {connectingProfile ? (
                <>
                  <RefreshCw className="h-4.5 w-4.5 animate-spin text-slate-500" />
                  Connecting API socials...
                </>
              ) : (
                <>
                  Connect Profile Now
                </>
              )}
            </button>
          </div>
        ) : (
          /* Profile Standing & Connected Stats widget */
          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-4.5 space-y-3.5">
            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
              <span className="font-bold text-slate-300">Profile Sync</span>
              <span className="text-[10px] text-slate-500">Updates automatically</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5 flex flex-col justify-between">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Github className="h-3 w-3" /> GitHub Commits
                </span>
                <span className="text-lg font-black text-slate-200 mt-2 block">
                  {isFirstDay ? "0 commits" : `🔥 ${daysCompletedCount} commits`}
                </span>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5 flex flex-col justify-between">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Linkedin className="h-3 w-3 text-sky-400" /> LinkedIn Posts
                </span>
                <span className="text-lg font-black text-slate-200 mt-2 block">
                  {isFirstDay ? "0 posts" : `${daysCompletedCount - 1} posts`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Progress Timeline Metric */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4.5 backdrop-blur-sm space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-bold">Your Journey</span>
            <span className="font-bold text-slate-400">{currentChallengeProgress}% Done</span>
          </div>

          {/* Text-based custom visual bar requested in mock */}
          <div className="flex items-center gap-1.5 font-mono text-sm tracking-widest text-slate-600 bg-slate-950/40 p-3.5 rounded-xl border border-white/5 justify-between">
            <span className="text-brand transition-colors duration-500">
              {isFirstDay ? "░░░░░░░░░░░░ 0%" : "████████░░░░ 20%"}
            </span>
            <span className="text-xs text-slate-400 font-sans font-bold shrink-0">
              {daysCompletedCount} / 60 days
            </span>
          </div>
        </div>

        {/* Achievements section matching exact prompt layout */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4.5 backdrop-blur-sm space-y-3.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-bold">Achievements Unlocked</span>
            <span className="text-[10px] text-slate-500">{isFirstDay ? "0 / 3" : "3 / 3"}</span>
          </div>

          <div className="space-y-2.5">
            <div className={`flex gap-3 items-center p-2.5 rounded-xl border transition-all ${isFirstDay ? "opacity-35 bg-slate-950/20 border-white/5" : "bg-slate-950/60 border-brand/10"}`}>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-base shrink-0">
                🏆
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">7 Day Streak</h4>
                <p className="text-[10px] text-slate-500">Pushed daily commits for 7 consecutive days.</p>
              </div>
            </div>

            <div className={`flex gap-3 items-center p-2.5 rounded-xl border transition-all ${isFirstDay ? "opacity-35 bg-slate-950/20 border-white/5" : "bg-slate-950/60 border-brand/10"}`}>
              <div className="h-8 w-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-base shrink-0">
                🚀
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">First Project</h4>
                <p className="text-[10px] text-slate-500">Submitted initial Day 1 project setup parameters.</p>
              </div>
            </div>

            <div className={`flex gap-3 items-center p-2.5 rounded-xl border transition-all ${isFirstDay ? "opacity-35 bg-slate-950/20 border-white/5" : "bg-slate-950/60 border-brand/10"}`}>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-base shrink-0">
                💻
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">10 Builds</h4>
                <p className="text-[10px] text-slate-500">Completed 10 public repository submission logs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI SDE Career DNA Card */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4.5 backdrop-blur-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <BrainCircuit className="h-4.5 w-4.5 text-brand animate-pulse" />
            AI SDE Career DNA
          </h3>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Analyzes code cleanliness, daily push speeds, and LinkedIn feedback keywords to verify target competency.
          </p>

          <div className="space-y-2.5 mt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400 font-medium">SDE Core Concepts</span>
                <span className="text-brand font-bold">{dnaScores.sdeCore}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${dnaScores.sdeCore}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400 font-medium">AI & Vector Databases</span>
                <span className="text-brand font-bold">{dnaScores.aiRAG}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${dnaScores.aiRAG}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Time Capsule timeline reflections log */}
        {reflections.length > 0 && (
          <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4.5 backdrop-blur-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Hourglass className="h-4 w-4 text-brand" />
              Time Capsule Reflections
            </h3>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Your chronological visual diary. A capture of your engineering thoughts across the 60-day cohort.
            </p>

            <div className="relative pl-4 border-l border-white/5 space-y-4 mt-3">
              {reflections.slice(0, 3).map((ref, idx) => (
                <div key={idx} className="relative text-[11px]">
                  <span className="absolute -left-5.5 top-1 h-2.5 w-2.5 rounded-full bg-brand border border-slate-950" />
                  <div className="flex justify-between text-[9px] text-slate-500 font-semibold">
                    <span>Day {ref.day} Reflection</span>
                    <span>{ref.date}</span>
                  </div>
                  <p className="text-slate-300 mt-1 leading-relaxed italic">
                    &quot;{ref.note}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 60-Day Habit Matrix grid (Clickable cells show modal) */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4.5 backdrop-blur-sm space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand" />
              60-Day Habit Matrix
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {daysCompletedCount}/60 Days
            </span>
          </div>
          
          <p className="text-[9px] text-slate-500 italic leading-none">
            💡 Click any completed day below to view its submission hash, feedback, and notes!
          </p>

          <div className="grid grid-cols-10 gap-1.5">
            {gridCells.map((cell) => {
              let bgClass = "bg-slate-900/60 border border-white/5 text-slate-600 cursor-not-allowed";
              if (cell.status === "completed") {
                bgClass = "bg-brand/80 border border-brand/20 text-brand shadow-sm shadow-brand/10 cursor-pointer hover:scale-105 active:scale-95";
              } else if (cell.status === "active") {
                bgClass = "bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold animate-pulse cursor-pointer hover:scale-105";
              } else if (cell.status === "missed") {
                bgClass = "bg-rose-500/20 border border-rose-500/40 text-rose-300 cursor-not-allowed";
              }
              return (
                <div 
                  key={cell.day}
                  onClick={() => handleCellClick(cell.day, cell.status)}
                  className={`flex items-center justify-center text-[9px] aspect-square rounded-md transition-all duration-250 ${bgClass}`}
                  title={`Day ${cell.day} - ${cell.status}`}
                >
                  {cell.day}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-white/5 pt-3">
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-slate-800" /> Locked</div>
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> Done</div>
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Missed</div>
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Active</div>
          </div>
        </div>

      </main>

      {/* POPUP MODAL: SHOW HISTORICAL SUBMISSIONS WHEN CALENDAR CELL CLICKED */}
      <AnimatePresence>
        {selectedDaySubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl border border-brand/25 bg-slate-900/90 p-5 text-white shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand/10 to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <h3 className="text-sm font-bold text-slate-200">Day {selectedDaySubmission.day} Submission</h3>
                <span className="text-[10px] text-slate-500">{selectedDaySubmission.date}</span>
              </div>

              <div className="space-y-3.5 mt-4 text-[11px] text-slate-400">
                <div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">GitHub Commit</div>
                  <a 
                    href={selectedDaySubmission.githubRepo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 mt-1 text-slate-300 hover:text-brand transition-colors overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    <Github className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    {selectedDaySubmission.githubCommit}
                  </a>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">LinkedIn Share</div>
                  <a 
                    href={selectedDaySubmission.linkedinPost} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 mt-1 text-sky-400 hover:underline overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                    {selectedDaySubmission.linkedinPost}
                  </a>
                </div>

                {selectedDaySubmission.reflection && (
                  <div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Reflection Note</div>
                    <p className="mt-1 text-slate-200 leading-relaxed italic">&quot;{selectedDaySubmission.reflection}&quot;</p>
                  </div>
                )}

                <div className="rounded-xl bg-brand-acc border border-brand/10 p-3 mt-1.5">
                  <div className="text-[9px] text-brand font-bold uppercase tracking-wider">AI Coach Feedback</div>
                  <p className="text-[10px] text-slate-300 leading-relaxed mt-0.5">{selectedDaySubmission.feedback}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDaySubmission(null)}
                className="mt-5 w-full rounded-xl bg-brand hover:bg-brand/90 py-2.5 text-xs font-bold text-white transition-all active:scale-98"
              >
                Close Record
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
