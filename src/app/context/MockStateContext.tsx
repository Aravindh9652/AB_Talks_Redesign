"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

export interface Submission {
  day: number;
  date: string;
  githubRepo: string;
  githubCommit: string;
  linkedinPost: string;
  xpEarned: number;
  feedback: string;
  reflection?: string;
}

interface ReflectionEntry {
  day: number;
  date: string;
  note: string;
}

interface MockStateContextType {
  streak: number;
  level: number;
  xp: number;
  daysCompletedCount: number;
  githubConnected: boolean;
  linkedinConnected: boolean;
  isFirstDay: boolean;
  isMissedDay: boolean;
  isChallengeCompleted: boolean;
  isSubmittedToday: boolean;
  githubRepo: string;
  githubCommit: string;
  linkedinPost: string;
  submissions: Submission[];
  
  // Light/Dark mode
  isLightMode: boolean;
  toggleLightMode: () => void;

  // Time Capsule Reflections
  reflections: ReflectionEntry[];
  addReflection: (day: number, note: string) => void;

  // Streak Recovery state
  streakRefreezes: number;
  useRefreeze: () => boolean;

  // Setters/Togglers
  setStreak: (s: number) => void;
  setLevel: (l: number) => void;
  setXp: (x: number) => void;
  setDaysCompletedCount: (d: number) => void;
  setGithubConnected: (c: boolean) => void;
  setLinkedinConnected: (c: boolean) => void;
  setIsFirstDay: (b: boolean) => void;
  setIsMissedDay: (b: boolean) => void;
  setIsChallengeCompleted: (b: boolean) => void;
  setIsSubmittedToday: (b: boolean) => void;
  
  submitDay: (repo: string, commit: string, linkedin: string, reflection?: string) => Promise<boolean>;
  resetAll: () => void;
}

const MockStateContext = createContext<MockStateContextType | undefined>(undefined);

export function MockStateProvider({ children }: { children: React.ReactNode }) {
  // Main states
  const [streak, setStreak] = useState(11);
  const [level, setLevel] = useState(3);
  const [xp, setXp] = useState(1850);
  const [daysCompletedCount, setDaysCompletedCount] = useState(11);
  const [githubConnected, setGithubConnected] = useState(true);
  const [linkedinConnected, setLinkedinConnected] = useState(true);
  const [isFirstDay, setIsFirstDay] = useState(false);
  const [isMissedDay, setIsMissedDay] = useState(false);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
  const [isSubmittedToday, setIsSubmittedToday] = useState(false);
  const [streakRefreezes, setStreakRefreezes] = useState(1);
  
  // Light Mode state
  const [isLightMode, setIsLightMode] = useState(false);

  // Reflections
  const [reflections, setReflections] = useState<ReflectionEntry[]>([
    { day: 11, date: "Aug 7, 2026", note: "Set up ChromaDB local collection, converted documentation chunks to vector space." },
    { day: 10, date: "Aug 6, 2026", note: "Constructed few-shot reasoning models using LangChain template formatting." },
    { day: 9, date: "Aug 5, 2026", note: "Created a custom prompt template for summarizing complex Indian judicial transcripts." },
    { day: 8, date: "Aug 4, 2026", note: "Configured local Llamafile and established robust HTTP pipeline." },
    { day: 7, date: "Aug 3, 2026", note: "Learned about semantic search chunking strategies, overlap configuration, and sliding window chunking." },
    { day: 6, date: "Aug 2, 2026", note: "Built a basic Express server serving HTML completions using custom structured JSON objects." },
    { day: 5, date: "Aug 1, 2026", note: "Implemented rate limiter middleware to prevent prompt abuse on public endpoints." },
    { day: 4, date: "Jul 31, 2026", note: "Tested prompt injection scenarios and created guardrail validators." },
    { day: 3, date: "Jul 30, 2026", note: "Integrated OpenAI API key configurations and tested basic completions." },
    { day: 2, date: "Jul 29, 2026", note: "Configured custom ESLint and dynamic imports to resolve ssr/csr hydration mismatches." },
    { day: 1, date: "Jul 28, 2026", note: "Committed initial project workspace structure and connected all social API links." }
  ]);

  // Submission inputs
  const [githubRepo, setGithubRepo] = useState("https://github.com/vajja/ai-agent-rag-pipeline");
  const [githubCommit, setGithubCommit] = useState("feat: implement vector db query optimization and cache layer");
  const [linkedinPost, setLinkedinPost] = useState("https://linkedin.com/posts/vajjaaravindh_day12-rag-pipeline-building");

  // Historic submissions repository (for dynamic calendar clicks)
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      day: 11,
      date: "Aug 7, 2026",
      githubRepo: "https://github.com/vajja/rag-chromadb",
      githubCommit: "feat: setup chromadb vector storage",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day11-vector-db",
      xpEarned: 150,
      feedback: "Excellent structure! Clean encapsulation of ChromaDB client. Suggested next step: optimize embeddings retrieval batching.",
      reflection: "Set up ChromaDB local collection, converted documentation chunks to vector space."
    },
    {
      day: 10,
      date: "Aug 6, 2026",
      githubRepo: "https://github.com/vajja/prompt-engineering",
      githubCommit: "feat: implement few-shot prompt templates for query parsing",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day10-prompt-engineering",
      xpEarned: 150,
      feedback: "Great prompt structuring. The test cases covers complex semantic intents. Outstanding LinkedIn presentation!",
      reflection: "Constructed few-shot reasoning models using LangChain template formatting."
    },
    {
      day: 8,
      date: "Aug 4, 2026",
      githubRepo: "https://github.com/vajja/local-llamafile",
      githubCommit: "feat: test local llamafile http prompt querying scripts",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day8-llamafile",
      xpEarned: 150,
      feedback: "Local server integrations are robust. Testing latency benchmarks was a fantastic touch. Clean documentation in README.",
      reflection: "Configured local Llamafile and established robust HTTP pipeline."
    },
    {
      day: 7,
      date: "Aug 3, 2026",
      githubRepo: "https://github.com/vajja/semantic-chunking",
      githubCommit: "feat: implement document chunking scripts with sliding overlaps",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day7-chunking",
      xpEarned: 150,
      feedback: "Great chunking logic. Sliding window parameters are fine-tuned correctly to prevent losing context across splits.",
      reflection: "Learned about semantic search chunking strategies, overlap configuration, and sliding window chunking."
    },
    {
      day: 6,
      date: "Aug 2, 2026",
      githubRepo: "https://github.com/vajja/agent-express-server",
      githubCommit: "feat: launch express API serving custom structured JSON",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day6-express",
      xpEarned: 150,
      feedback: "Excellent server design. Hydration checks and validation pipelines verify data integrity perfectly before processing.",
      reflection: "Built a basic Express server serving HTML completions using custom structured JSON objects."
    },
    {
      day: 5,
      date: "Aug 1, 2026",
      githubRepo: "https://github.com/vajja/middleware-rate-limiter",
      githubCommit: "feat: configure express middleware ip rate limiters",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day5-rate-limiting",
      xpEarned: 150,
      feedback: "Very secure configuration. Suggested next step: investigate Redis key store for distributed rate limiting.",
      reflection: "Implemented rate limiter middleware to prevent prompt abuse on public endpoints."
    },
    {
      day: 4,
      date: "Jul 31, 2026",
      githubRepo: "https://github.com/vajja/guardrails-injection-testing",
      githubCommit: "feat: write guardrail checks to block adversarial system prompts",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day4-guardrails",
      xpEarned: 150,
      feedback: "Outstanding security framework. Handles nested system instructions overrides seamlessly. Top-notch work!",
      reflection: "Tested prompt injection scenarios and created guardrail validators."
    },
    {
      day: 3,
      date: "Jul 30, 2026",
      githubRepo: "https://github.com/vajja/openai-key-integration",
      githubCommit: "feat: setup configuration keys and verify simple completions",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day3-openai-api",
      xpEarned: 150,
      feedback: "Nice initial integration. Key environment secrets are successfully separated from public code repository.",
      reflection: "Integrated OpenAI API key configurations and tested basic completions."
    },
    {
      day: 2,
      date: "Jul 29, 2026",
      githubRepo: "https://github.com/vajja/hydration-ssr-fix",
      githubCommit: "feat: configure eslint and resolve ssr hydration mismatches",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day2-ssr-hydration",
      xpEarned: 150,
      feedback: "Clever resolution of client-server DOM mismatches using ClientOnly wrapper layouts. Solves React 19 hydration issues.",
      reflection: "Configured custom ESLint and dynamic imports to resolve ssr/csr hydration mismatches."
    },
    {
      day: 1,
      date: "Jul 28, 2026",
      githubRepo: "https://github.com/vajja/setup-challenge-baseline",
      githubCommit: "feat: initialize repository structure and add readme maps",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day1-challenge-start",
      xpEarned: 150,
      feedback: "Initial commitment complete! Welcome to the cohort. Looking forward to watching your engineering progression.",
      reflection: "Committed initial project workspace structure and connected all social API links."
    }
  ]);

  // Sync light mode with HTML root element
  useEffect(() => {
    const root = document.documentElement;
    if (isLightMode) {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
  }, [isLightMode]);

  // Adjust states based on presets
  useEffect(() => {
    if (isFirstDay) {
      setStreak(0);
      setLevel(1);
      setXp(0);
      setDaysCompletedCount(0);
      setGithubConnected(false);
      setLinkedinConnected(false);
      setIsSubmittedToday(false);
      setSubmissions([]);
      setReflections([]);
      setGithubRepo("");
      setGithubCommit("");
      setLinkedinPost("");
      setStreakRefreezes(0);
    } else if (isMissedDay) {
      setStreak(0);
      setLevel(2);
      setXp(1100);
      setDaysCompletedCount(11);
      setGithubConnected(true);
      setLinkedinConnected(true);
      setIsSubmittedToday(false);
      setGithubRepo("");
      setGithubCommit("");
      setLinkedinPost("");
      setStreakRefreezes(1);
    } else if (isChallengeCompleted) {
      setStreak(60);
      setLevel(10);
      setXp(12000);
      setDaysCompletedCount(60);
      setGithubConnected(true);
      setLinkedinConnected(true);
      setIsSubmittedToday(true);
      setStreakRefreezes(2);
    } else {
      // Normal Day 12 preset
      setStreak(11);
      setLevel(3);
      setXp(1850);
      setDaysCompletedCount(11);
      setGithubConnected(true);
      setLinkedinConnected(true);
      setIsSubmittedToday(false);
      setGithubRepo("https://github.com/vajja/ai-agent-rag-pipeline");
      setGithubCommit("feat: implement vector db query optimization and cache layer");
      setLinkedinPost("https://linkedin.com/posts/vajjaaravindh_day12-rag-pipeline-building");
      setStreakRefreezes(1);
    }
  }, [isFirstDay, isMissedDay, isChallengeCompleted]);

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
  };

  const addReflection = (day: number, note: string) => {
    const entry: ReflectionEntry = {
      day,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      note
    };
    setReflections((prev) => [entry, ...prev]);
  };

  const useRefreeze = () => {
    if (streakRefreezes > 0 && isMissedDay) {
      setStreakRefreezes((prev) => prev - 1);
      setStreak(11);
      setIsMissedDay(false);
      confetti({
        particleCount: 80,
        spread: 50,
        origin: { y: 0.6 }
      });
      return true;
    }
    return false;
  };

  const submitDay = async (repo: string, commit: string, linkedin: string, reflection?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const targetDay = isFirstDay ? 1 : 12;

    const newSubmission: Submission = {
      day: targetDay,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      githubRepo: repo,
      githubCommit: commit,
      linkedinPost: linkedin,
      xpEarned: 200,
      feedback: "Code analysis: 98% quality index. RAG prompt logic is robust. Your LinkedIn outreach highlights the key system components elegantly. Momentum Score increased!",
      reflection
    };

    if (reflection) {
      addReflection(targetDay, reflection);
    }

    setSubmissions([newSubmission, ...submissions]);
    setIsSubmittedToday(true);
    setStreak((prev) => prev + 1);
    setXp((prev) => prev + 200);
    setDaysCompletedCount((prev) => prev + 1);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });

    return true;
  };

  const resetAll = () => {
    setIsFirstDay(false);
    setIsMissedDay(false);
    setIsChallengeCompleted(false);
    setIsSubmittedToday(false);
    setStreak(11);
    setLevel(3);
    setXp(1850);
    setDaysCompletedCount(11);
    setGithubConnected(true);
    setLinkedinConnected(true);
    setGithubRepo("https://github.com/vajja/ai-agent-rag-pipeline");
    setGithubCommit("feat: implement vector db query optimization and cache layer");
    setLinkedinPost("https://linkedin.com/posts/vajjaaravindh_day12-rag-pipeline-building");
    setStreakRefreezes(1);
  };

  return (
    <MockStateContext.Provider
      value={{
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
        githubRepo,
        githubCommit,
        linkedinPost,
        submissions,
        isLightMode,
        toggleLightMode,
        reflections,
        addReflection,
        streakRefreezes,
        useRefreeze,
        setStreak,
        setLevel,
        setXp,
        setDaysCompletedCount,
        setGithubConnected,
        setLinkedinConnected,
        setIsFirstDay,
        setIsMissedDay,
        setIsChallengeCompleted,
        setIsSubmittedToday,
        submitDay,
        resetAll
      }}
    >
      {children}
    </MockStateContext.Provider>
  );
}

export function useMockState() {
  const context = useContext(MockStateContext);
  if (!context) {
    throw new Error("useMockState must be used within a MockStateProvider");
  }
  return context;
}
