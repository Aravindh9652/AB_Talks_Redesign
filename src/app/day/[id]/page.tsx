"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Terminal, 
  Play, 
  ExternalLink, 
  CheckSquare, 
  Sparkles, 
  Flame, 
  Award, 
  BookOpen, 
  ChevronRight,
  Send,
  Loader2,
  CheckCircle,
  HelpCircle,
  Code,
  Hourglass,
  Check
} from "lucide-react";
import { useMockState } from "../../context/MockStateContext";
import ThemeSelector from "../../components/ThemeSelector";

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

export default function ChallengeDayPage() {
  const params = useParams();
  const router = useRouter();
  const dayId = params?.id ? String(params.id) : "12";
  const isFirst = dayId === "1";
  const isRecovery = dayId === "11";
  
  const { 
    streak, 
    level, 
    xp, 
    isSubmittedToday,
    githubRepo: defaultRepo,
    githubCommit: defaultCommit,
    linkedinPost: defaultLinkedin,
    submitDay,
    daysCompletedCount
  } = useMockState();

  // Inputs
  const [repoInput, setRepoInput] = useState(defaultRepo);
  const [commitInput, setCommitInput] = useState(defaultCommit);
  const [linkedinInput, setLinkedinInput] = useState(defaultLinkedin);
  const [reflectionInput, setReflectionInput] = useState(
    isFirst 
      ? "Initialized my public repository workspace and updated my learner bio profile credentials!" 
      : isRecovery
      ? "Completed Day 11 recovery task! Configured ChromaDB vector client and sliding window text chunking strategy."
      : "Implemented task schema model, set up Express routing paths, and ran local validation tests using cURL queries."
  );

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successAnimation, setSuccessAnimation] = useState(false);

  useEffect(() => {
    if (isSubmittedToday) {
      setRepoInput(defaultRepo || "https://github.com/vajja/ai-agent-rag-pipeline");
      setCommitInput(defaultCommit || "feat: implement vector db query optimization and cache layer");
      setLinkedinInput(defaultLinkedin || "https://linkedin.com/posts/vajjaaravindh_day12-rag-pipeline-building");
    } else {
      setRepoInput("");
      setCommitInput("");
      setLinkedinInput("");
    }
  }, [isSubmittedToday, defaultRepo, defaultCommit, defaultLinkedin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate inputs
    if (!repoInput || !repoInput.startsWith("https://github.com/")) {
      setErrorMsg("Please enter a valid GitHub repository URL (starts with https://github.com/).");
      return;
    }
    if (!commitInput || commitInput.length < 5) {
      setErrorMsg("Please provide a valid commit hash or message.");
      return;
    }
    if (!linkedinInput || !linkedinInput.startsWith("https://linkedin.com/")) {
      setErrorMsg("Please enter a valid LinkedIn post link (starts with https://linkedin.com/).");
      return;
    }
    if (!reflectionInput || reflectionInput.length < 10) {
      setErrorMsg("Please write a short reflection note (min 10 characters) for your Time Capsule.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitDay(repoInput, commitInput, linkedinInput, reflectionInput, isRecovery ? 11 : undefined);
      setSuccessAnimation(true);
    } catch (err) {
      setErrorMsg("There was a connection error validating your commit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Day Data matching requested mock exactly
  const dayData = isFirst ? {
    title: "Setup GitHub & Connect LinkedIn",
    difficulty: "Beginner",
    timeEst: "~20 min",
    rewardXp: 50,
    goal: "Connect your core developer credentials, initialize your workspace template, and publish your commit goal.",
    learn: [
      "Version control workflows",
      "Public builder social presence",
      "Cohort tracker configuration"
    ],
    mission: [
      "Initialize your workspace repository template",
      "Commit your initial baseline README files",
      "Add GitHub & LinkedIn links to your dashboard",
      "Submit Day 1 proof of build"
    ]
  } : isRecovery ? {
    title: "Day 11 Recovery — Setup ChromaDB Vector Storage",
    difficulty: "Recovery Mission",
    timeEst: "~10 min",
    rewardXp: 200,
    goal: "Complete this 10-minute conceptual recovery task to restore your Day 11 momentum and unfreeze your streak!",
    learn: [
      "ChromaDB local vector collections",
      "Sliding window document chunking",
      "Streak recovery verification"
    ],
    mission: [
      "Initialize ChromaDB local storage client",
      "Split documentation chunks with 50-token overlaps",
      "Verify semantic similarity search query latency",
      "Submit Day 11 recovery proof to unfreeze your streak"
    ]
  } : {
    title: "Build a REST API",
    difficulty: "Intermediate",
    timeEst: "~45 min",
    rewardXp: 100,
    goal: "Build a REST API that allows users to create, read and delete tasks.",
    learn: [
      "REST APIs",
      "HTTP methods",
      "API design"
    ],
    mission: [
      "Create the API",
      "Connect your database",
      "Test your endpoints",
      "Deploy your project"
    ]
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern pb-24 overflow-x-hidden font-sans">
      
      {/* Background Glows */}
      <div className="glow-orb top-[-10%] left-[-10%] w-[450px] h-[450px] bg-brand/10 transition-all duration-500" />
      <div className="glow-orb bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-brand/10 transition-all duration-500" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSelector />
            <div className="flex items-center gap-1 rounded-full bg-slate-900 border border-white/5 px-2 py-0.5 text-[10px]">
              <span className="text-slate-500 font-medium">Lvl</span>
              <span className="font-bold text-brand transition-colors duration-500">{level}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] text-amber-400 font-semibold">
              <Flame className="h-3 w-3 fill-amber-400" />
              <span>{streak}d</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto px-4 mt-6 space-y-6 relative z-10">
        
        {/* Mission Heading */}
        <div className="border-b border-white/5 pb-4">
          <span className="text-[10px] font-bold text-brand uppercase tracking-wider transition-colors duration-500">
            DAY {dayId}
          </span>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-100 mt-1">
            {dayData.title}
          </h1>
          <div className="flex gap-4 mt-2 text-[10px] text-slate-400 font-medium">
            <span>{dayData.difficulty}</span>
            <span>•</span>
            <span>{dayData.timeEst}</span>
            <span>•</span>
            <span className="text-brand">+{dayData.rewardXp} XP</span>
          </div>
        </div>

        {/* Goal Description Section */}
        <section className="space-y-2">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Today's Goal</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {dayData.goal}
          </p>
        </section>

        <hr className="border-white/5" />

        {/* What You'll Learn Section */}
        <section className="space-y-2">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">What you'll learn</h3>
          <ul className="space-y-1.5">
            {dayData.learn.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-acc text-brand text-[9px] font-bold shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-white/5" />

        {/* Checklist Section */}
        <section className="space-y-2.5">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Your Mission</h3>
          <ul className="space-y-2 pl-1">
            {dayData.mission.map((step, idx) => (
              <li key={idx} className="flex gap-3 items-center text-xs text-slate-300">
                <span className="h-5 w-5 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[9px] font-bold text-slate-500 shrink-0">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-white/5" />

        {/* Proof of Work Submission Form */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Send className="h-4 w-4 text-brand" />
            Submit your work
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* GitHub Repo Input */}
            <div className="space-y-1.5">
              <label htmlFor="repo-input" className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                GitHub Repository
              </label>
              <input
                id="repo-input"
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="https://github.com/username/project"
                disabled={isSubmittedToday || isSubmitting}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
              />
            </div>

            {/* GitHub Commit Link Input */}
            <div className="space-y-1.5">
              <label htmlFor="commit-input" className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                GitHub Commit
              </label>
              <input
                id="commit-input"
                type="text"
                value={commitInput}
                onChange={(e) => setCommitInput(e.target.value)}
                placeholder="https://github.com/username/project/commit/hash"
                disabled={isSubmittedToday || isSubmitting}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
              />
            </div>

            {/* LinkedIn Post Input */}
            <div className="space-y-1.5">
              <label htmlFor="linkedin-input" className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                LinkedIn Post
              </label>
              <input
                id="linkedin-input"
                type="text"
                value={linkedinInput}
                onChange={(e) => setLinkedinInput(e.target.value)}
                placeholder="https://linkedin.com/posts/..."
                disabled={isSubmittedToday || isSubmitting}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
              />
            </div>

            {/* Reflection Note Input */}
            <div className="space-y-1.5">
              <label htmlFor="reflection-input" className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Hourglass className="h-3.5 w-3.5 text-brand" />
                Reflection note
              </label>
              <textarea
                id="reflection-input"
                rows={2}
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                placeholder="What did you learn today?"
                disabled={isSubmittedToday || isSubmitting}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand transition-colors disabled:opacity-50 resize-none font-sans"
              />
            </div>

            {errorMsg && (
              <p className="text-[10px] text-rose-400 font-semibold leading-none">
                {errorMsg}
              </p>
            )}

            {isSubmittedToday ? (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-3 text-center text-xs font-semibold text-emerald-400">
                ✓ Day {dayId} Complete!
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white transition-all hover:scale-102 active:scale-98 disabled:opacity-60
                  ${isRecovery ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/20" : "bg-brand hover:bg-brand/90 shadow-brand/10"}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Verifying Commit...
                  </>
                ) : isRecovery ? (
                  <>
                    🔥 Submit Day 11 Recovery & Restore Streak
                  </>
                ) : (
                  <>
                    Submit Day {dayId}
                  </>
                )}
              </button>
            )}
          </form>
        </section>

      </main>

      {/* Premium Submission Success Celebration Modal */}
      <AnimatePresence>
        {successAnimation && (
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
              className="w-full max-w-sm rounded-3xl border border-brand/35 bg-slate-900 p-6 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand/5 blur-md pointer-events-none" />
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
              
              <h2 className="text-base font-extrabold text-slate-100 mt-4">
                {isRecovery ? "🎉 Day 11 Streak Recovered!" : `🎉 Day ${dayId} Complete!`}
              </h2>
              
              <div className="space-y-1 mt-2 text-xs text-slate-400">
                <div className="text-brand font-bold text-sm">+{dayData.rewardXp} XP</div>
                <div>{isRecovery ? "🔥 Your 12-day streak is fully restored!" : "🔥 Your streak continues"}</div>
                <div className="font-semibold text-slate-200 mt-1">
                  12 / 60 completed
                </div>
              </div>

              <button
                onClick={() => {
                  setSuccessAnimation(false);
                  router.push("/dashboard");
                }}
                className="mt-6 w-full rounded-xl bg-brand hover:bg-brand/90 py-2.5 text-xs font-bold text-white transition-all active:scale-98 shadow-lg shadow-brand/10"
              >
                Return to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
