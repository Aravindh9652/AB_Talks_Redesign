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
  Search
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

  // Navigation / Tab states
  const [activeQuizAnswer, setActiveQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showRecruiterPreview, setShowRecruiterPreview] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Interactive calendar submission state
  const [selectedDaySubmission, setSelectedDaySubmission] = useState<Submission | null>(null);
  

  // SDE Career DNA scores (Dynamic based on streak & level)
  const dnaScores = {
    sdeCore: isFirstDay ? 10 : Math.min(95, 60 + streak * 2.5),
    aiRAG: isFirstDay ? 5 : Math.min(98, 40 + streak * 3.5),
    prompting: isFirstDay ? 20 : Math.min(95, 50 + streak * 3.0),
    socialVisibility: isFirstDay ? 5 : Math.min(90, 30 + streak * 4.0)
  };

  // Calculated stats
  const nextLevelXp = level * 1000;
  const progressPercent = Math.min(100, Math.round((xp / nextLevelXp) * 100));
  const challengeProgress = Math.round((daysCompletedCount / 60) * 100);
  
  // Recruiter Visibility Score
  const recruiterScore = isFirstDay 
    ? 0 
    : Math.min(100, Math.round((streak * 3.5) + (daysCompletedCount * 0.8) + (level * 4) + (isSubmittedToday ? 5 : 0)));

  // Mock Activity Calendar Grid (60 Days)
  const gridCells = Array.from({ length: 60 }, (_, i) => {
    const dayNum = i + 1;
    let status: "locked" | "completed" | "missed" | "active" = "locked";
    
    if (isFirstDay) {
      if (dayNum === 1) status = "active";
    } else if (isChallengeCompleted) {
      status = "completed";
    } else {
      // Normal Day 12 settings
      if (dayNum <= daysCompletedCount) {
        status = "completed";
      } else if (dayNum === 12) {
        status = isSubmittedToday ? "completed" : "active";
      } else if (isMissedDay && dayNum === 9) {
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
      // Link to day submission page
      window.location.href = isFirstDay ? "/day/1" : "/day/12";
    }
  };

  const handleRefreezeQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeQuizAnswer === 2) {
      // Correct answer ("Performs fast vector similarity searches")
      useRefreeze();
      setQuizSubmitted(true);
      setTimeout(() => {
        setQuizSubmitted(false);
        setActiveQuizAnswer(null);
      }, 2000);
    } else {
      alert("Incorrect answer. Read the documentation resources and try again!");
    }
  };

  const copyRecruiterLink = () => {
    navigator.clipboard.writeText("https://abtalks.in/profile/vajja");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };


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

      {/* Main Container - Optimized for 390px (Mobile-First) */}
      <main className="max-w-md mx-auto px-4 mt-6 space-y-6 relative z-10">
        
        {/* Welcome & Title */}
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {isFirstDay ? "Welcome Rookie" : "Keep the Momentum"}
          </span>
          <h1 className="text-2xl font-bold tracking-tight mt-0.5 text-slate-100 flex items-center gap-2">
            Namaste, Vajja!
            {streak > 0 && <Sparkles className="h-5 w-5 text-amber-400 animate-bounce" />}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isFirstDay 
              ? "Your 60-day building journey begins now. Establish your baseline today!"
              : isMissedDay 
              ? "You missed yesterday's deadline. Break through the friction and repair your streak today!"
              : isChallengeCompleted 
              ? "Magnificent! You completed the 60-day challenge. Your profile is high-priority for recruiters."
              : `You are in the top 8% of Cohort 05. Maintain your streak to lock in recruiter matches.`}
          </p>
        </div>

        {/* WOW FEATURE 1: Momentum Recovery Quiz (Guides broken streak users back) */}
        {isMissedDay && (
          <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4 flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <AlertCircle className="h-4.5 w-4.5 text-brand" />
              <h3 className="text-xs font-bold text-brand">Streak Freeze Recovery</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              You missed yesterday's submission. Answer this daily engineering concept quiz to use your <strong>Streak Freeze ({streakRefreezes} left)</strong> and restore your 11-day streak!
            </p>

            {quizSubmitted ? (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-3 text-center text-xs font-bold text-emerald-400 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 animate-bounce" /> Streak Frozen and Repaired Successfully!
              </div>
            ) : (
              <form onSubmit={handleRefreezeQuiz} className="space-y-2 mt-1">
                <div className="text-[10px] font-semibold text-slate-300">
                  Question: What does a Vector DB index (like HNSW) accomplish?
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <label className="flex items-center gap-2 rounded-xl bg-slate-950 border border-white/5 p-2.5 cursor-pointer hover:bg-slate-900 transition-colors">
                    <input 
                      type="radio" 
                      name="recovery-quiz" 
                      checked={activeQuizAnswer === 1}
                      onChange={() => setActiveQuizAnswer(1)} 
                    />
                    <span>It encrypts embeddings data</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-xl bg-slate-950 border border-white/5 p-2.5 cursor-pointer hover:bg-slate-900 transition-colors">
                    <input 
                      type="radio" 
                      name="recovery-quiz" 
                      checked={activeQuizAnswer === 2}
                      onChange={() => setActiveQuizAnswer(2)} 
                    />
                    <span>It performs fast vector similarity searches</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-xl bg-slate-950 border border-white/5 p-2.5 cursor-pointer hover:bg-slate-900 transition-colors">
                    <input 
                      type="radio" 
                      name="recovery-quiz" 
                      checked={activeQuizAnswer === 3}
                      onChange={() => setActiveQuizAnswer(3)} 
                    />
                    <span>It caches HTML query templates</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={activeQuizAnswer === null}
                  className="w-full rounded-xl bg-brand hover:bg-brand/90 py-2 mt-2 text-[11px] font-bold text-white transition-all disabled:opacity-50"
                >
                  Verify Answer & Freeze Streak
                </button>
              </form>
            )}
          </div>
        )}

        {/* Level and XP progress bar */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-brand" /> XP Progress
            </span>
            <span className="font-semibold text-brand">
              {xp} / {nextLevelXp} XP
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full rounded-full bg-brand transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <span>Level {level}</span>
            <span>{100 - progressPercent}% until Lvl {level + 1}</span>
          </div>
        </div>

        {/* Dynamic Action / Today's Task Card */}
        <div className="relative rounded-2xl border border-brand/20 bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-brand/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <span className="rounded-full bg-brand-acc border border-brand/20 px-2 py-0.5 text-[10px] font-medium text-brand">
              {isFirstDay ? "Day 1: Baseline" : "Day 12 Mission"}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
              <Target className="h-3.5 w-3.5 text-amber-500" />
              {isSubmittedToday ? "COMPLETED" : "10 hrs left"}
            </span>
          </div>

          <h2 className="text-base font-bold mt-2 text-slate-100">
            {isFirstDay 
              ? "Setup Github & Connect LinkedIn" 
              : "Build & Deploy Vector DB RAG Pipeline"}
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {isFirstDay 
              ? "Connect your credentials and write your first public post about committing to building in public."
              : "Configure ChromaDB, store sample document embeddings, and construct a query utility."}
          </p>

          <div className="mt-4 flex gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Code className="h-3.5 w-3.5" /> Intermediate
            </span>
            <span>•</span>
            <span>Est: 2 hours</span>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-slate-400">Reward: +200 XP</span>
            </div>
            
            {isSubmittedToday ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/25">
                <CheckCircle2 className="h-3.5 w-3.5" /> Submitted
              </span>
            ) : (
              <Link
                href={isFirstDay ? "/day/1" : "/day/12"}
                className="inline-flex items-center gap-1 rounded-xl bg-brand hover:bg-brand/90 px-4 py-2 text-xs font-bold text-white transition-all hover:scale-103 active:scale-98 shadow-md shadow-brand/10"
              >
                Start Mission <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>


        {/* WOW FEATURE 3: AI Career DNA Card (Visualizes SDE readiness indices) */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <BrainCircuit className="h-4.5 w-4.5 text-brand animate-pulse" />
            AI SDE Career DNA
          </h3>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Analyzes code cleanliness, daily push speeds, and LinkedIn feedback keywords to verify target competency.
          </p>

          <div className="space-y-2.5 mt-2">
            {/* SDE Core */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400 font-medium">SDE Core Concepts</span>
                <span className="text-brand font-bold">{dnaScores.sdeCore}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${dnaScores.sdeCore}%` }} />
              </div>
            </div>

            {/* AI Vector Engineering */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400 font-medium">AI & Vector Databases</span>
                <span className="text-brand font-bold">{dnaScores.aiRAG}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${dnaScores.aiRAG}%` }} />
              </div>
            </div>

            {/* Social Impact */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400 font-medium">Public Tech Presence</span>
                <span className="text-brand font-bold">{dnaScores.socialVisibility}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${dnaScores.socialVisibility}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* WOW FEATURE 4: Recruiter Preview Card Toggle */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              Recruiter Preview Card
            </h3>
            <button
              onClick={() => setShowRecruiterPreview(!showRecruiterPreview)}
              className="text-[10px] font-bold text-brand hover:underline flex items-center gap-1"
            >
              {showRecruiterPreview ? "Hide Preview" : "Show Preview"}
              <ChevronRight className={`h-3 w-3 transition-transform ${showRecruiterPreview ? "rotate-90" : ""}`} />
            </button>
          </div>

          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${recruiterScore}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Discoverability Index</span>
            <span className="text-emerald-400 font-bold">{recruiterScore}% Score</span>
          </div>

          {/* Collapsible Recruiter Profile card */}
          {showRecruiterPreview && (
            <div className="border border-white/10 rounded-2xl bg-slate-950 p-4 space-y-3 mt-2 animate-in slide-in-from-top-3 duration-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-brand flex items-center justify-center font-bold text-[10px] text-white">
                    VA
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Vajja Aravindh</h4>
                    <span className="text-[9px] text-slate-500">VR SEC Student • AI Dev</span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkle className="h-3 w-3 fill-emerald-400" /> Matches Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5 text-center text-slate-400 text-[10px]">
                <div>
                  <span className="block font-bold text-slate-100">{streak} Days</span>
                  <span>Commit Streak</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-100">{daysCompletedCount}</span>
                  <span>Projects built</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-100">{level}</span>
                  <span>Developer Lvl</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={copyRecruiterLink}
                  className="flex-1 flex justify-center items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 py-2 text-[10px] font-bold text-slate-300 hover:bg-white/10 transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  {linkCopied ? "Copied Link!" : "Copy Share Link"}
                </button>
                <button className="rounded-xl bg-brand/10 border border-brand/20 p-2 text-brand hover:bg-brand/20 transition-colors" title="Download Portfolio PDF">
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Credentials Connect Connectors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-4 text-center flex flex-col items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 border border-white/10 mb-2">
              <Github className={`h-4.5 w-4.5 ${githubConnected ? "text-slate-200" : "text-slate-600"}`} />
            </div>
            <span className="text-xs font-bold text-slate-300">GitHub Connect</span>
            <span className={`text-[10px] mt-1 font-semibold ${githubConnected ? "text-emerald-400" : "text-rose-400"}`}>
              {githubConnected ? "Connected" : "Disconnected"}
            </span>
            <button 
              onClick={() => setGithubConnected(!githubConnected)}
              className="mt-3 w-full rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 py-1 text-[10px] font-semibold text-slate-300 transition-colors"
            >
              {githubConnected ? "Disconnect" : "Connect"}
            </button>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-4 text-center flex flex-col items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 border border-white/10 mb-2">
              <Linkedin className={`h-4.5 w-4.5 ${linkedinConnected ? "text-sky-400 font-bold" : "text-slate-600"}`} />
            </div>
            <span className="text-xs font-bold text-slate-300">LinkedIn Connect</span>
            <span className={`text-[10px] mt-1 font-semibold ${linkedinConnected ? "text-emerald-400" : "text-rose-400"}`}>
              {linkedinConnected ? "Connected" : "Disconnected"}
            </span>
            <button 
              onClick={() => setLinkedinConnected(!linkedinConnected)}
              className="mt-3 w-full rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 py-1 text-[10px] font-semibold text-slate-300 transition-colors"
            >
              {linkedinConnected ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>

        {/* AI Learning Insights */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-brand mb-2">
            <BrainCircuit className="h-4.5 w-4.5" />
            <span>AI Coach Insight</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isFirstDay 
              ? "Connecting your socials is crucial. Our data shows students who build in public increase their hiring success index by 320%." 
              : isMissedDay 
              ? "A broken streak is a speedbump, not a wall. Answer the conceptual quiz above to freeze your streak and keep consistency!" 
              : "Excellent work on chromaDB setup. We suggest trying to implement embedding similarity threshold filters to prune irrelevant results for Day 13."}
          </p>
        </div>

        {/* WOW FEATURE 5: Time Capsule Journey (Historical reflections logs) */}
        {reflections.length > 0 && (
          <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Hourglass className="h-4 w-4 text-brand" />
              Time Capsule Reflections
            </h3>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Your chronological visual diary. A capture of your engineering thoughts across the 60-day cohort.
            </p>

            <div className="relative pl-4 border-l border-white/5 space-y-4 mt-3">
              {reflections.map((ref, idx) => (
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

        {/* 60-Day Habit Matrix - CLICKABLE CELLS FOR HISTORIC SUBMISSIONS */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm space-y-3">
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
                bgClass = "bg-brand/80 border border-brand/20 text-brand-acc shadow-sm shadow-brand/10 cursor-pointer hover:scale-105 active:scale-95";
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

        {/* Consistency Index line graph */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <LineChart className="h-4 w-4 text-brand" />
              Consistency Index
            </span>
            <span className="text-[10px] text-brand font-bold">
              Stable (9.4/10)
            </span>
          </div>

          <div className="relative h-20 w-full">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              <line x1="0" y1="5" x2="100" y2="5" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              
              <path 
                d={isFirstDay 
                  ? "M0,30 L20,30 L40,30 L60,30 L80,30 L100,30 Z" 
                  : "M0,28 L16,24 L32,12 L48,15 L64,8 L80,10 L100,5 L100,30 L0,30 Z"} 
                fill="url(#chartGradient)" 
              />
              
              <path 
                d={isFirstDay 
                  ? "M0,30 Q20,30 40,30 T80,30 T100,30" 
                  : "M0,28 L16,24 Q32,12 48,15 T80,10 T100,5"} 
                fill="none" 
                stroke="var(--brand-primary)" 
                strokeWidth="1.5" 
              />
              {!isFirstDay && (
                <>
                  <circle cx="48" cy="15" r="1.2" fill="var(--brand-primary)" stroke="#020617" strokeWidth="0.5" />
                  <circle cx="80" cy="10" r="1.2" fill="var(--brand-primary)" stroke="#020617" strokeWidth="0.5" />
                  <circle cx="100" cy="5" r="1.5" fill="var(--brand-primary)" stroke="#ffffff" strokeWidth="0.5" className="animate-pulse" />
                </>
              )}
            </svg>
          </div>
          <div className="flex justify-between items-center text-[8px] text-slate-500 uppercase tracking-wider font-semibold">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-400">Recent Submissions</h3>
          
          {submissions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/10 p-6 text-center">
              <span className="text-[11px] text-slate-500">No submissions recorded yet.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub, i) => (
                <div key={i} className="rounded-2xl border border-white/5 bg-slate-900/30 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-200">Day {sub.day} Submission</span>
                    <span className="text-[10px] text-slate-500">{sub.date}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                      <Github className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {sub.githubCommit}
                    </span>
                    <span className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-sky-400">
                      <Linkedin className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                      {sub.linkedinPost.substring(0, 45)}...
                    </span>
                  </div>

                  <div className="rounded-xl bg-brand-acc border border-brand/10 p-2.5 mt-2">
                    <div className="text-[9px] text-brand font-bold uppercase tracking-wider">AI Coach Feedback</div>
                    <p className="text-[10px] text-slate-300 leading-relaxed mt-0.5">{sub.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
