"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
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

export interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

export interface ActivityLog {
  id: number;
  type: "profile_update" | "account_create" | "streak_complete" | "streak_missed" | "streak_recovery" | "github_connect" | "linkedin_connect";
  action: string;
  timestamp: string;
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
  
  // Profile Hub states
  profileName: string;
  profileEmail: string;
  profilePhone: string;
  profileLocation: string;
  profileBio: string;
  profileSkills: string;
  goals: Goal[];
  activityLogs: ActivityLog[];
  
  addGoal: (text: string) => void;
  toggleGoal: (id: number) => void;
  updateProfile: (name: string, email: string, phone: string, location: string, bio: string, skills: string) => void;
  addActivityLog: (type: ActivityLog["type"], action: string) => void;

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
  wasStreakRecovered: boolean;
  chosenRecoveryOption: 1 | 2 | null;
  setChosenRecoveryOption: (opt: 1 | 2 | null) => void;
  recoverStreakWithXP: (cost?: number) => void;
  deductXpForDay11: (cost?: number) => void;
  completeAICodeAudit: (bonusXp?: number) => void;
  completeQuizRecovery: (bonusXp?: number) => void;
  submitDay: (repo: string, commit: string, linkedin: string, reflection?: string, explicitDay?: number) => Promise<boolean>;
  resetAll: () => void;
  initializeNewAccountLogs: () => void;
  loadUserProgress: (email: string) => void;
}

const MockStateContext = createContext<MockStateContextType | undefined>(undefined);

export function MockStateProvider({ children }: { children: React.ReactNode }) {
  // Tracks whether we loaded real saved progress — if true, skip demo presets
  const hasSavedProgress = useRef(false);
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
  const [wasStreakRecovered, setWasStreakRecovered] = useState(false);
  const [chosenRecoveryOption, setChosenRecoveryOption] = useState<1 | 2 | null>(null);
  const [streakRefreezes, setStreakRefreezes] = useState(1);
  
  // Profile Hub parameters
  const [profileName, setProfileName] = useState("Vajja Aravindh");
  const [profileEmail, setProfileEmail] = useState("vajjaaravindh@gmail.com");
  const [profilePhone, setProfilePhone] = useState("+919876543256");
  const [profileLocation, setProfileLocation] = useState("Gannavaram, AP");
  const [profileBio, setProfileBio] = useState("A Motivated Btech Student");
  const [profileSkills, setProfileSkills] = useState("Java, c, c++, python");
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, text: "Complete REST API task by midnight", completed: false },
    { id: 2, text: "Push vector database embeddings collection", completed: true }
  ]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: 1, type: "streak_complete", action: "Streak day completed (Day 11)", timestamp: "8/8/2026, 11:30:12 PM" },
    { id: 2, type: "streak_complete", action: "Streak day completed (Day 10)", timestamp: "8/7/2026, 9:15:08 PM" },
    { id: 3, type: "streak_recovery", action: "Streak recovery freeze used (Day 9)", timestamp: "8/6/2026, 8:45:22 PM" },
    { id: 4, type: "account_create", action: "Account created successfully", timestamp: "7/28/2026, 7:51:24 PM" }
  ]);

  // Light Mode state
  const [isLightMode, setIsLightMode] = useState(false);

  // Synchronize logged-in user identity from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const currentUserStr = localStorage.getItem("abtalks_current_user");
      if (currentUserStr) {
        const u = JSON.parse(currentUserStr);
        if (u.name) setProfileName(u.name);
        if (u.email) setProfileEmail(u.email);
        if (u.phone) setProfilePhone(u.phone);
        if (u.location) setProfileLocation(u.location);
        if (u.bio !== undefined) setProfileBio(u.bio);
        if (u.skills !== undefined) setProfileSkills(u.skills);
        loadUserProgress(u.email);
      }
    } catch (e) {
      console.error("Mount user sync error:", e);
    }
  }, []);

  // Reflections
  const [reflections, setReflections] = useState<ReflectionEntry[]>([
    { day: 11, date: "Aug 7, 2026", note: "Set up ChromaDB local collection, converted documentation chunks to vector space." },
    { day: 10, date: "Aug 6, 2026", note: "Constructed few-shot reasoning models using LangChain template formatting." },
    { day: 9, date: "Aug 5, 2026", note: "Created a custom prompt template for summarizing Indian judicial transcripts." },
    { day: 8, date: "Aug 4, 2026", note: "Configured local Llamafile and established robust HTTP pipeline." },
    { day: 7, date: "Aug 3, 2026", note: "Learned about semantic search chunking strategies and overlap sliding windows." },
    { day: 6, date: "Aug 2, 2026", note: "Built a basic Express server serving HTML completions using structured JSON." },
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
      reflection: "Learned about semantic search chunking strategies and overlap sliding windows."
    },
    {
      day: 6,
      date: "Aug 2, 2026",
      githubRepo: "https://github.com/vajja/agent-express-server",
      githubCommit: "feat: launch express API serving custom structured JSON",
      linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day6-express",
      xpEarned: 150,
      feedback: "Excellent server design. Hydration checks and validation pipelines verify data integrity perfectly before processing.",
      reflection: "Built a basic Express server serving HTML completions using structured JSON."
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

  // ─── PERSISTENCE: Load all saved progress for logged-in user on mount ───
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      // 1. Load profile info
      const savedUser = localStorage.getItem("abtalks_current_user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        const name = u.name || "Vajja Aravindh";
        const email = u.email || "vajjaaravindh@gmail.com";
        setProfileName(name);
        setProfileEmail(email);
        setProfilePhone(u.phone || "");
        setProfileLocation(u.location || "");
        setProfileBio(u.bio || "");
        setProfileSkills(u.skills || "");

        // 2. Load progress keyed by email
        const key = `abtalks_progress_${email}`;
        const savedProgress = localStorage.getItem(key);
        if (savedProgress) {
          const p = JSON.parse(savedProgress);
          if (p.streak !== undefined) setStreak(p.streak);
          if (p.level !== undefined) setLevel(p.level);
          if (p.xp !== undefined) setXp(p.xp);
          if (p.daysCompletedCount !== undefined) setDaysCompletedCount(p.daysCompletedCount);
          if (p.githubConnected !== undefined) setGithubConnected(p.githubConnected);
          if (p.linkedinConnected !== undefined) setLinkedinConnected(p.linkedinConnected);
          if (p.streakRefreezes !== undefined) setStreakRefreezes(p.streakRefreezes);
          if (p.isSubmittedToday !== undefined) setIsSubmittedToday(p.isSubmittedToday);
          if (p.isMissedDay !== undefined) setIsMissedDay(p.isMissedDay);
          if (p.submissions) setSubmissions(p.submissions);
          if (p.reflections) setReflections(p.reflections);
          if (p.goals) setGoals(p.goals);
          if (p.activityLogs) setActivityLogs(p.activityLogs);
          // Mark that we have real data — presets must NOT overwrite
          hasSavedProgress.current = true;
        }
      }
    } catch (e) {
      console.error("Progress load error:", e);
    }
  }, []);

  // ─── PERSISTENCE: Helper to save progress to localStorage ───
  const saveProgress = (
    userEmail: string,
    updates: Partial<{
      streak: number; level: number; xp: number; daysCompletedCount: number;
      githubConnected: boolean; linkedinConnected: boolean; streakRefreezes: number;
      isSubmittedToday: boolean; isMissedDay: boolean; submissions: Submission[]; reflections: ReflectionEntry[];
      goals: Goal[]; activityLogs: ActivityLog[];
    }>
  ) => {
    if (typeof window === "undefined" || !userEmail) return;
    const key = `abtalks_progress_${userEmail}`;
    try {
      const existing = localStorage.getItem(key);
      const current = existing ? JSON.parse(existing) : {};
      localStorage.setItem(key, JSON.stringify({ ...current, ...updates }));
    } catch (e) {
      console.error("Progress save error:", e);
    }
  };

  // Adjust states based on presets — SKIPPED when real saved progress was loaded
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
      setWasStreakRecovered(false);
      setProfileBio("A Motivated Btech Student");
      setProfileSkills("Java, c, c++, python");
      setActivityLogs([
        { id: 1, type: "account_create", action: "Account created successfully", timestamp: "7/28/2026, 7:51:24 PM" }
      ]);
    } else if (isMissedDay) {
      setStreak(10);
      setLevel(2);
      setXp(1500);
      setDaysCompletedCount(10);
      setGithubConnected(true);
      setLinkedinConnected(true);
      setIsSubmittedToday(false);
      setGithubRepo("");
      setGithubCommit("");
      setLinkedinPost("");
      setStreakRefreezes(1);
      setWasStreakRecovered(false);
    } else if (isChallengeCompleted) {
      setStreak(60);
      setLevel(10);
      setXp(12000);
      setDaysCompletedCount(60);
      setGithubConnected(true);
      setLinkedinConnected(true);
      setIsSubmittedToday(true);
      setStreakRefreezes(2);
      setWasStreakRecovered(false);
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
      setWasStreakRecovered(false);
    }
  }, [isFirstDay, isMissedDay, isChallengeCompleted]);

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
  };

  const addGoal = (text: string) => {
    const newGoal: Goal = {
      id: Date.now(),
      text,
      completed: false
    };
    setGoals((prev) => {
      const updated = [newGoal, ...prev];
      saveProgress(profileEmail, { goals: updated });
      return updated;
    });
    addActivityLog("profile_update", `Added goal: "${text}"`);
  };

  const toggleGoal = (id: number) => {
    setGoals((prev) => {
      const updated = prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g));
      saveProgress(profileEmail, { goals: updated });
      return updated;
    });
  };

  const addActivityLog = (type: ActivityLog["type"], action: string) => {
    const newLog: ActivityLog = {
      id: Date.now(),
      type,
      action,
      timestamp: new Date().toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      })
    };
    setActivityLogs((prev) => {
      const updated = [newLog, ...prev];
      saveProgress(profileEmail, { activityLogs: updated });
      return updated;
    });
  };

  const updateProfile = (name: string, email: string, phone: string, location: string, bio: string, skills: string) => {
    setProfileName(name);
    setProfileEmail(email);
    setProfilePhone(phone);
    setProfileLocation(location);
    setProfileBio(bio);
    setProfileSkills(skills);

    if (typeof window !== "undefined") {
      localStorage.setItem("abtalks_current_user", JSON.stringify({
        name, email, phone, location, bio, skills
      }));
    }

    if (bio || skills) {
      addActivityLog("profile_update", "Profile updated");
    }
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
      addActivityLog("profile_update", "Streak recovered using freeze token");
      confetti({
        particleCount: 80,
        spread: 50,
        origin: { y: 0.6 }
      });
      return true;
    }
    return false;
  };

  const submitDay = async (repo: string, commit: string, linkedin: string, reflection?: string, explicitDay?: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const targetDay = explicitDay || (isFirstDay ? 1 : 12);
    const isRecoverySubmission = isMissedDay || targetDay === 11;

    const newSubmission: Submission = {
      day: targetDay,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      githubRepo: repo,
      githubCommit: commit,
      linkedinPost: linkedin,
      xpEarned: 200,
      feedback: isRecoverySubmission 
        ? "Streak Recovery Validated! ChromaDB vector storage pipeline setup verified. 100% test pass rate. Your 11-day momentum score is fully restored!"
        : "Code analysis: 98% quality index. RAG prompt logic is robust. Your LinkedIn outreach highlights the key system components elegantly. Momentum Score increased!",
      reflection
    };

    if (reflection) {
      addReflection(targetDay, reflection);
    }

    const updatedSubmissions = [newSubmission, ...submissions];
    const newStreak = isRecoverySubmission ? 12 : streak + 1;
    const newXp = xp + (isRecoverySubmission ? 300 : 200);
    const newDays = isRecoverySubmission ? 12 : daysCompletedCount + 1;

    setSubmissions(updatedSubmissions);
    setIsSubmittedToday(true);
    if (isRecoverySubmission) {
      setWasStreakRecovered(true);
    }
    if (isMissedDay && !isRecoverySubmission) {
      setIsMissedDay(false);
      setStreakRefreezes((prev) => Math.max(0, prev - 1));
    }
    setStreak(newStreak);
    setXp(newXp);
    setDaysCompletedCount(newDays);

    const updatedLogs: ActivityLog[] = [
      {
        id: Date.now(),
        type: isRecoverySubmission ? "streak_recovery" : "streak_complete",
        action: isRecoverySubmission ? "Streak Day 11 recovered & completed!" : `Streak Day ${targetDay} completed`,
        timestamp: new Date().toLocaleString("en-US", {
          month: "numeric", day: "numeric", year: "numeric",
          hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true
        })
      },
      ...activityLogs
    ];
    setActivityLogs(updatedLogs);

    // ─── PERSIST progress so it survives logout/login ───
    saveProgress(profileEmail, {
      isSubmittedToday: true,
      isMissedDay: false,
      streak: newStreak,
      xp: newXp,
      daysCompletedCount: newDays,
      submissions: updatedSubmissions,
      activityLogs: updatedLogs
    });

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });

    return true;
  };

  const recoverStreakWithXP = (cost: number = 70) => {
    setXp((prev) => Math.max(0, prev - cost));
    setStreak(12);
    setDaysCompletedCount(12);
    setWasStreakRecovered(true);
    setIsSubmittedToday(true);
    setStreakRefreezes((prev) => Math.max(0, prev - 1));
    addActivityLog("streak_recovery", `Streak recovered using ${cost} XP Token! (-${cost} XP)`);
  };

  const deductXpForDay11 = (cost: number = 70) => {
    setXp((prev) => Math.max(0, prev - cost));
    setChosenRecoveryOption(1);
    addActivityLog("streak_recovery", `Used ${cost} XP Token to unlock Day 11 Recovery Task (-${cost} XP)`);
  };

  const completeAICodeAudit = (bonusXp: number = 150) => {
    setXp((prev) => prev + bonusXp);
    setStreak(12);
    setDaysCompletedCount(12);
    setWasStreakRecovered(true);
    setIsSubmittedToday(true);
    setChosenRecoveryOption(2);
    setStreakRefreezes((prev) => Math.max(0, prev - 1));
    addActivityLog("streak_recovery", `Completed AI Peer Code Audit & restored streak! (+${bonusXp} XP)`);
  };

  const completeQuizRecovery = (bonusXp: number = 150) => {
    setXp((prev) => prev + bonusXp);
    setStreak(12);
    setDaysCompletedCount(12);
    setWasStreakRecovered(true);
    setIsSubmittedToday(true);
    setChosenRecoveryOption(2);
    setStreakRefreezes((prev) => Math.max(0, prev - 1));
    addActivityLog("streak_recovery", `Passed Day 11 Vector DB Quiz & restored streak! (+${bonusXp} XP)`);
  };

  const resetAll = () => {
    hasSavedProgress.current = false;
    setIsFirstDay(false);
    setIsMissedDay(false);
    setIsChallengeCompleted(false);
    setIsSubmittedToday(false);
    setWasStreakRecovered(false);
    setChosenRecoveryOption(null);
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
    setWasStreakRecovered(false);
    setProfileBio("A Motivated Btech Student");
    setProfileSkills("Java, c, c++, python");
    setSubmissions([
      {
        day: 11,
        date: "Aug 7, 2026",
        githubRepo: "https://github.com/vajja/rag-chromadb",
        githubCommit: "feat: setup chromadb vector storage",
        linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day11-vector-db",
        xpEarned: 150,
        feedback: "Excellent structure! Clean encapsulation of ChromaDB client.",
        reflection: "Set up ChromaDB local collection, converted documentation chunks to vector space."
      },
      {
        day: 10,
        date: "Aug 6, 2026",
        githubRepo: "https://github.com/vajja/prompt-engineering",
        githubCommit: "feat: implement few-shot prompt templates for query parsing",
        linkedinPost: "https://linkedin.com/posts/vajjaaravindh_day10-prompt-engineering",
        xpEarned: 150,
        feedback: "Great prompt structuring. The test cases cover complex semantic intents.",
        reflection: "Constructed few-shot reasoning models using LangChain template formatting."
      }
    ]);
    setActivityLogs([
      { id: 1, type: "streak_complete", action: "Streak day completed (Day 11)", timestamp: "8/8/2026, 11:30:12 PM" },
      { id: 2, type: "streak_complete", action: "Streak day completed (Day 10)", timestamp: "8/7/2026, 9:15:08 PM" },
      { id: 3, type: "streak_recovery", action: "Streak recovery freeze used (Day 9)", timestamp: "8/6/2026, 8:45:22 PM" },
      { id: 4, type: "account_create", action: "Account created successfully", timestamp: "7/28/2026, 7:51:24 PM" }
    ]);
  };

  const initializeNewAccountLogs = () => {
    setActivityLogs([
      {
        id: Date.now(),
        type: "account_create",
        action: "Account created successfully",
        timestamp: new Date().toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      }
    ]);
  };

  // ─── Called explicitly after login to reload saved progress for that user ───
  const loadUserProgress = (email: string) => {
    if (typeof window === "undefined" || !email) return;
    try {
      const key = `abtalks_progress_${email}`;
      const savedProgress = localStorage.getItem(key);
      if (savedProgress) {
        const p = JSON.parse(savedProgress);
        if (p.streak !== undefined) setStreak(p.streak);
        if (p.level !== undefined) setLevel(p.level);
        if (p.xp !== undefined) setXp(p.xp);
        if (p.daysCompletedCount !== undefined) setDaysCompletedCount(p.daysCompletedCount);
        if (p.githubConnected !== undefined) setGithubConnected(p.githubConnected);
        if (p.linkedinConnected !== undefined) setLinkedinConnected(p.linkedinConnected);
        if (p.streakRefreezes !== undefined) setStreakRefreezes(p.streakRefreezes);
        if (p.isSubmittedToday !== undefined) setIsSubmittedToday(p.isSubmittedToday);
        if (p.isMissedDay !== undefined) setIsMissedDay(p.isMissedDay);
        if (p.submissions) setSubmissions(p.submissions);
        if (p.reflections) setReflections(p.reflections);
        if (p.goals) setGoals(p.goals);
        if (p.activityLogs) setActivityLogs(p.activityLogs);
        // Guard presets from overwriting again
        hasSavedProgress.current = true;
      } else {
        // New user with no saved progress — allow presets to run fresh
        hasSavedProgress.current = false;
      }
    } catch (e) {
      console.error("loadUserProgress error:", e);
    }
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
        wasStreakRecovered,
        chosenRecoveryOption,
        setChosenRecoveryOption,
        recoverStreakWithXP,
        deductXpForDay11,
        completeAICodeAudit,
        completeQuizRecovery,
        githubRepo,
        githubCommit,
        linkedinPost,
        submissions,
        profileName,
        profileEmail,
        profilePhone,
        profileLocation,
        profileBio,
        profileSkills,
        goals,
        activityLogs,
        addGoal,
        toggleGoal,
        updateProfile,
        addActivityLog,
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
        resetAll,
        initializeNewAccountLogs,
        loadUserProgress
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
