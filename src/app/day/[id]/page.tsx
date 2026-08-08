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
  Hourglass
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
  
  const { 
    streak, 
    level, 
    xp, 
    isSubmittedToday,
    githubRepo: defaultRepo,
    githubCommit: defaultCommit,
    linkedinPost: defaultLinkedin,
    submitDay
  } = useMockState();

  // Inputs
  const [repoInput, setRepoInput] = useState(defaultRepo);
  const [commitInput, setCommitInput] = useState(defaultCommit);
  const [linkedinInput, setLinkedinInput] = useState(defaultLinkedin);
  const [reflectionInput, setReflectionInput] = useState("Implemented vector search queries using ChromaDB; embeddings indexing checks out!");

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Synchronize input fields with global context defaults when it changes
  useEffect(() => {
    setRepoInput(defaultRepo);
    setCommitInput(defaultCommit);
    setLinkedinInput(defaultLinkedin);
  }, [defaultRepo, defaultCommit, defaultLinkedin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate inputs
    if (!repoInput || !repoInput.startsWith("https://github.com/")) {
      setErrorMsg("Please enter a valid GitHub repository URL (starts with https://github.com/).");
      return;
    }
    if (!commitInput || commitInput.length < 15) {
      setErrorMsg("Please provide a descriptive commit message (min 15 chars).");
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
      await submitDay(repoInput, commitInput, linkedinInput, reflectionInput);
      setSuccessAnimation(true);
      setTimeout(() => {
        setSuccessAnimation(false);
        router.push("/dashboard");
      }, 3500);
    } catch (err) {
      setErrorMsg("There was a connection error validating your commit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Day 12 Mock Mission Configuration
  const dayData = {
    title: "Build & Deploy Vector DB RAG Pipeline",
    track: "AI & Vector Engineering",
    difficulty: "Medium",
    timeEst: "2 hours",
    objectives: [
      "Initialize and configure a local ChromaDB instance",
      "Convert a set of text files to vector embeddings using HuggingFace / OpenAI models",
      "Implement a retrieval query function that queries top-K matching document chunks",
      "Construct a dynamic prompt template feeding retrieved context to a mock LLM query client"
    ],
    resources: [
      { name: "ChromaDB Quickstart Docs", link: "https://docs.trychroma.com/" },
      { name: "Sentence Transformers Guide", link: "https://huggingface.co/sentence-transformers" },
      { name: "Vector Search Intuition Video", link: "https://youtube.com" }
    ],
    requirements: [
      "GitHub repo must contain chromadb client configuration and querying script",
      "LinkedIn post must detail what RAG stands for and include a screenshot of your terminal results"
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
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-acc border border-brand/20 px-2 py-0.5 text-[10px] font-semibold text-brand transition-colors duration-500">
              Day {dayId} Mission
            </span>
            <span className="text-[10px] text-slate-500 font-medium">• {dayData.track}</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-100 mt-2">
            {dayData.title}
          </h1>
          <div className="flex gap-4 mt-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">Difficulty: <span className="text-brand font-semibold transition-colors duration-500">{dayData.difficulty}</span></span>
            <span>Est: {dayData.timeEst}</span>
          </div>
        </div>

        {/* Learning Objectives */}
        <section className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 backdrop-blur-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-brand" />
            Learning Objectives
          </h3>
          <ul className="space-y-2">
            {dayData.objectives.map((obj, index) => (
              <li key={index} className="flex gap-2.5 items-start text-xs text-slate-400 leading-relaxed">
                <CheckSquare className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Resources */}
        <section className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm space-y-2.5">
          <h3 className="text-xs font-semibold text-slate-300">Recommended Resources</h3>
          <div className="flex flex-col gap-2">
            {dayData.resources.map((res, index) => (
              <a 
                key={index} 
                href={res.link} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/5 px-3.5 py-2 text-xs text-slate-300 hover:text-white transition-all group"
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {res.name}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-brand transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* Submission Rules checklist */}
        <section className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm space-y-2">
          <h3 className="text-xs font-semibold text-slate-300">Submission Requirements</h3>
          <ul className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed list-disc list-inside">
            {dayData.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </section>

        {/* Proof of Work Submission Form */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-md space-y-4">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Send className="h-4 w-4 text-brand" />
            Proof of Work Submission
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* GitHub Repo Input */}
            <div className="space-y-1.5">
              <label htmlFor="repo-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Github className="h-3.5 w-3.5 text-slate-400" /> GitHub Repository
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

            {/* GitHub Commit Message Input */}
            <div className="space-y-1.5">
              <label htmlFor="commit-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Code className="h-3.5 w-3.5 text-slate-400" /> Commit Message
              </label>
              <input
                id="commit-input"
                type="text"
                value={commitInput}
                onChange={(e) => setCommitInput(e.target.value)}
                placeholder="feat: implement chromadb configurations..."
                disabled={isSubmittedToday || isSubmitting}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
              />
            </div>

            {/* LinkedIn Post Input */}
            <div className="space-y-1.5">
              <label htmlFor="linkedin-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Linkedin className="h-3.5 w-3.5 text-sky-400" /> LinkedIn Share Post Link
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

            {/* WOW FEATURE 5: Time Capsule Daily Reflection Note */}
            <div className="space-y-1.5">
              <label htmlFor="reflection-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Hourglass className="h-3.5 w-3.5 text-brand" />
                Time Capsule Reflection Note
              </label>
              <textarea
                id="reflection-input"
                rows={2}
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                placeholder="Write a one-line reflection of what you learned or built today..."
                disabled={isSubmittedToday || isSubmitting}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand transition-colors disabled:opacity-50 resize-none font-sans"
              />
            </div>

            {errorMsg && (
              <p className="text-[10px] text-rose-400 leading-relaxed font-semibold">
                {errorMsg}
              </p>
            )}

            {isSubmittedToday ? (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-3 text-center text-xs font-semibold text-emerald-400">
                ✓ Already Submitted and Verified!
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-xs font-bold text-white transition-all hover:bg-brand/90 hover:scale-102 active:scale-98 disabled:opacity-60 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Verifying Commit...
                  </>
                ) : (
                  <>
                    Submit Proof of Work
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
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-lg font-bold text-slate-100 mt-4">Day {dayId} Verified!</h2>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Daily Proof-of-Work authenticated. Commited to main branch.
              </p>
              
              <div className="mt-5 border-t border-white/5 pt-4 flex justify-around text-center">
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Streak</span>
                  <span className="text-sm font-bold text-amber-400 flex items-center justify-center gap-0.5">
                    <Flame className="h-4 w-4 fill-amber-400" /> {streak + 1} Days
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">XP Earned</span>
                  <span className="text-sm font-bold text-brand">
                    +200 XP
                  </span>
                </div>
              </div>

              <div className="mt-6 text-[10px] text-slate-500 italic">
                AI Coach: &quot;Outstanding vector DB design! Resumed next milestone query.&quot;
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
