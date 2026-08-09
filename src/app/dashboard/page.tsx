"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Edit2,
  Plus,
  Bookmark,
  CheckSquare,
  Square,
  User,
  LogOut,
  MapPin,
  Mail,
  PhoneCall,
  ChevronDown
} from "lucide-react";
import { useMockState, Submission, Goal, ActivityLog } from "../context/MockStateContext";
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
  const router = useRouter();
  
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Good morning";
    if (hr < 17) return "Good afternoon";
    return "Good evening";
  };
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
    wasStreakRecovered,
    chosenRecoveryOption,
    recoverStreakWithXP,
    deductXpForDay11,
    completeAICodeAudit,
    completeQuizRecovery,
    submissions,
    reflections,
    streakRefreezes,
    useRefreeze,
    isLightMode,
    setGithubConnected,
    setLinkedinConnected,
    
    // Profile Hub
    profileName,
    profileEmail,
    profilePhone,
    profileLocation,
    profileBio,
    profileSkills,
    githubRepo,
    linkedinPost,
    goals,
    activityLogs,
    addGoal,
    toggleGoal,
    updateProfile,
    resetAll,
    addActivityLog,
    setIsFirstDay,
    setIsMissedDay,
    setIsChallengeCompleted
  } = useMockState();

  // Dialog State
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({ 0: 0, 1: 0, 2: 0 });
  const [quizResultModal, setQuizResultModal] = useState<{ show: boolean; score: number; passed: boolean; correctCount: number } | null>(null);
  const [activeRecoveryOption, setActiveRecoveryOption] = useState<1 | 2 | null>(null);
  const [showXpDeductModal, setShowXpDeductModal] = useState(false);
  const [selectedDaySubmission, setSelectedDaySubmission] = useState<Submission | null>(null);
  
  // Custom Connect state dialogs
  const [connectingProfile, setConnectingProfile] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Tab workspace state
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "goals">("overview");

  // Profile Edit fields
  const [editName, setEditName] = useState(profileName);
  const [editEmail, setEditEmail] = useState(profileEmail);
  const [editPhone, setEditPhone] = useState(profilePhone);
  const [editLocation, setEditLocation] = useState(profileLocation);
  const [editBio, setEditBio] = useState(profileBio);
  const [editSkills, setEditSkills] = useState(profileSkills);
  const [editGithub, setEditGithub] = useState(githubRepo);
  const [editLinkedin, setEditLinkedin] = useState(linkedinPost);
  const [isEmptyProfilePreset, setIsEmptyProfilePreset] = useState(false);
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  useEffect(() => {
    setEditName(profileName);
    setEditEmail(profileEmail);
    setEditPhone(profilePhone);
    setEditLocation(profileLocation);
    setEditBio(profileBio);
    setEditSkills(profileSkills);
    if (isEmptyProfilePreset && !profileBio && !profileSkills) {
      setEditGithub("");
      setEditLinkedin("");
    } else {
      setEditGithub(githubRepo);
      setEditLinkedin(linkedinPost);
    }
  }, [profileName, profileEmail, profilePhone, profileLocation, profileBio, profileSkills, githubRepo, linkedinPost, isEmptyProfilePreset]);

  // Goal input
  const [newGoalText, setNewGoalText] = useState("");

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 23, minutes: 59, seconds: 59, targetStr: "Sunday, 9 Aug · 8:00 AM IST" });

  // Ticking Timer effect
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      // Target is upcoming 8:00 AM
      let target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
      if (now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 1);
      }
      
      const diff = target.getTime() - now.getTime();
      const hours = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
      const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
      const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
      
      const dayName = target.toLocaleDateString("en-US", { weekday: "long" });
      const dayNum = target.getDate();
      const monthName = target.toLocaleDateString("en-US", { month: "short" });
      const targetStr = `${dayName}, ${dayNum} ${monthName} · 8:00 AM IST`;
      
      setTimeLeft({
        days: 0,
        hours,
        minutes,
        seconds,
        targetStr
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBio = editBio.trim() || "A Motivated Btech Student";
    const finalSkills = editSkills.trim() || "Java, C, C++, Python";
    const finalGithub = editGithub.trim() || githubRepo;
    const finalLinkedin = editLinkedin.trim() || linkedinPost;
    updateProfile(editName, editEmail, editPhone, editLocation, finalBio, finalSkills, finalGithub, finalLinkedin);
    setIsSavedAlert(true);
    setTimeout(() => {
      setIsSavedAlert(false);
      setActiveTab("overview");
    }, 1000);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    addGoal(newGoalText.trim());
    setNewGoalText("");
  };

  // Auto-seed today's challenge goal based on countdown
  const todayGoalText = isFirstDay
    ? "Setup GitHub & Connect LinkedIn by 8:00 AM tomorrow"
    : `Complete REST API task by 8:00 AM tomorrow`;

  // Recruiter score metric
  const recruiterScore = isFirstDay 
    ? 0 
    : Math.min(100, Math.round((streak * 3.5) + (daysCompletedCount * 0.8) + (level * 4) + (isSubmittedToday ? 5 : 0)));

  // SDE DNA scores
  const dnaScores = {
    sdeCore: isFirstDay ? 10 : Math.min(95, 60 + streak * 2.5),
    aiRAG: isFirstDay ? 5 : Math.min(98, 40 + streak * 3.5),
    prompting: isFirstDay ? 20 : Math.min(95, 50 + streak * 3.0),
    socialVisibility: isFirstDay ? 5 : Math.min(90, 30 + streak * 4.0)
  };

  const isStreakRecovered = wasStreakRecovered;
  const effectiveDaysCompleted = isChallengeCompleted
    ? 60
    : isFirstDay 
    ? (isSubmittedToday ? 1 : 0)
    : isStreakRecovered 
    ? (isSubmittedToday ? 12 : 11)
    : isMissedDay 
    ? (isSubmittedToday ? 11 : 10) 
    : daysCompletedCount;
  const currentProgressPercent = Math.round((effectiveDaysCompleted / 60) * 100);

  // Calendar cells - with ✓ for completed, ✗ for missed
  const gridCells = Array.from({ length: 60 }, (_, i) => {
    const dayNum = i + 1;
    let status: "locked" | "completed" | "missed" | "active" = "locked";
    
    // Check if this day is explicitly submitted in submissions array
    const hasSubmission = submissions.some(s => s.day === dayNum);
    
    if (isFirstDay) {
      if (dayNum === 1) status = isSubmittedToday || hasSubmission ? "completed" : "active";
    } else if (isChallengeCompleted) {
      status = "completed";
    } else if (isMissedDay) {
      if (dayNum <= 10) {
        status = "completed";
      } else if (dayNum === 11) {
        status = (wasStreakRecovered || isSubmittedToday) ? "completed" : "missed";
      } else if (dayNum === 12) {
        status = isSubmittedToday ? "completed" : "active";
      } else {
        status = "locked";
      }
    } else if (hasSubmission) {
      status = "completed";
    } else {
      if (dayNum <= daysCompletedCount) {
        status = "completed";
      } else if (dayNum === 12) {
        status = isSubmittedToday ? "completed" : "active";
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

          {/* Header Action Elements */}
          <div className="flex items-center gap-2 relative">
            <ThemeSelector />
            
            {/* User Dropdown Toggle */}
            <button 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-brand/10 border border-brand/20 text-brand font-bold text-xs hover:bg-brand/20 transition-all cursor-pointer"
            >
              {profileName.charAt(0).toUpperCase()}
            </button>

            {/* Dropdown Box Mockup */}
            {showUserDropdown && (
              <div className="absolute right-0 top-10 w-48 rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl z-50 text-xs animate-in fade-in slide-in-from-top-1.5 duration-150">
                <div className="p-2 border-b border-white/5 font-semibold text-slate-300">
                  Signed in as
                  <span className="block text-[10px] text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">{profileEmail}</span>
                </div>
                <button 
                  onClick={() => { 
                    setShowUserDropdown(false); 
                    setActiveTab("profile"); 
                    setTimeout(() => {
                      document.getElementById("profile-hub")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="w-full text-left p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-300 flex items-center gap-1.5"
                >
                  <Edit2 className="h-3.5 w-3.5" /> Edit Profile
                </button>
                <button 
                  onClick={() => {
                    setShowUserDropdown(false); 
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("abtalks_current_user");
                    }
                    resetAll();
                    router.push("/");
                  }}
                  className="w-full text-left p-2 hover:bg-white/5 rounded-xl transition-colors text-rose-400 flex items-center gap-1.5"
                >
                  <LogOut className="h-3.5 w-3.5" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container - Mobile First 390px */}
      <main className="max-w-md mx-auto px-4 mt-6 space-y-6 relative z-10">
        
        {/* Welcome Header — adapts to first day, missed day, or active streak */}
        <div className="flex justify-between items-center py-1">
          <div>
            <h1 className="text-base font-extrabold text-slate-100 flex items-center gap-1.5 leading-normal">
              {getGreeting()}, {profileName} 👋
            </h1>
            <p className="text-[10px] font-medium leading-relaxed
              {isFirstDay ? 'text-brand' : isMissedDay ? 'text-amber-400' : 'text-slate-400'}">
              {isFirstDay
                ? "Your journey starts today. Everyone starts here. 🚀"
                : isMissedDay
                ? "You missed yesterday — your progress is still here 💪"
                : isSubmittedToday
                ? "Today's challenge done. You're on a roll! 🔥"
                : "Keep building. Every day compounds. 💡"}
            </p>
          </div>
          <div className="text-right shrink-0 ml-2">
            <span className="text-[8px] uppercase tracking-widest text-slate-500 font-black block">LEVEL / XP</span>
            <span className="text-[11px] font-black text-brand tracking-wide">Lvl {level} · {xp} XP</span>
          </div>
        </div>

        {/* ── JUDGE STATE CONTROLLER (TOP LEVEL) ─────────────────────────── */}
        <div className="rounded-2xl border border-brand/25 bg-slate-900/80 backdrop-blur-md p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-brand/20 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-brand" />
              </div>
              <span className="text-[11px] font-black text-slate-100">Judge State Controller</span>
            </div>
            <button
              onClick={() => { resetAll(); }}
              title="Reset to Default"
              className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="h-3 w-3 text-slate-400" />
            </button>
          </div>

          <p className="text-[9px] text-slate-400 leading-relaxed">
            Use these presets to instantly test the mandatory hackathon edge cases across all routes.
          </p>

          <div className="space-y-2">
            {/* Default Day 12 */}
            <button
              onClick={() => { 
                setIsFirstDay(false); 
                setIsMissedDay(false); 
                setIsChallengeCompleted(false); 
                setIsEmptyProfilePreset(false);
                resetAll(); 
                updateProfile(profileName, profileEmail, profilePhone, profileLocation, "A Motivated Btech Student", "Java, c, c++, python", editGithub, editLinkedin);
              }}
              className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[11px] font-semibold transition-all border
                ${!isFirstDay && !isMissedDay && !isChallengeCompleted && !isEmptyProfilePreset
                  ? "bg-brand/15 border-brand/30 text-brand"
                  : "bg-slate-950/50 border-white/5 text-slate-300 hover:bg-slate-800/60"}`}
            >
              <span className="flex items-center gap-2">
                <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px]
                  ${!isFirstDay && !isMissedDay && !isChallengeCompleted && (profileBio || profileSkills) ? "bg-brand/30" : "bg-slate-700"}`}>
                  ▷
                </span>
                Default Day 12
              </span>
              <span className="text-[9px] text-slate-500">Streak: 11</span>
            </button>

            {/* First Day */}
            <button
              onClick={() => { 
                setIsFirstDay(true); 
                setIsMissedDay(false); 
                setIsChallengeCompleted(false); 
                setIsEmptyProfilePreset(false);
                updateProfile(profileName, profileEmail, profilePhone, profileLocation, "A Motivated Btech Student", "Java, c, c++, python");
              }}
              className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[11px] font-semibold transition-all border
                ${isFirstDay
                  ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
                  : "bg-slate-950/50 border-white/5 text-slate-300 hover:bg-slate-800/60"}`}
            >
              <span className="flex items-center gap-2">
                <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px]
                  ${isFirstDay ? "bg-violet-500/30" : "bg-slate-700"}`}>
                  ?
                </span>
                First Day (0 Streak)
              </span>
              <span className="text-[9px] text-slate-500">Streak: {isSubmittedToday ? 1 : 0}</span>
            </button>

            {/* Missed Day */}
            <button
              onClick={() => { 
                setIsMissedDay(true); 
                setIsFirstDay(false); 
                setIsChallengeCompleted(false); 
                setIsEmptyProfilePreset(false);
                updateProfile(profileName, profileEmail, profilePhone, profileLocation, "A Motivated Btech Student", "Java, c, c++, python");
              }}
              className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[11px] font-semibold transition-all border
                ${isMissedDay
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                  : "bg-slate-950/50 border-white/5 text-slate-300 hover:bg-slate-800/60"}`}
            >
              <span className="flex items-center gap-2">
                <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px]
                  ${isMissedDay ? "bg-amber-500/30 text-amber-300" : "bg-slate-700"}`}>
                  ⚠
                </span>
                Missed Day (Streak Broken)
              </span>
              <span className="text-[9px] text-slate-500">Broken</span>
            </button>

            {/* Empty Profile */}
            <button
              onClick={() => { 
                setIsFirstDay(false); 
                setIsMissedDay(false); 
                setIsChallengeCompleted(false); 
                setIsEmptyProfilePreset(true);
                setEditGithub("");
                setEditLinkedin("");
                updateProfile(profileName, profileEmail, profilePhone, profileLocation, "", "", "", "");
              }}
              className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[11px] font-semibold transition-all border
                ${!isFirstDay && !isMissedDay && !isChallengeCompleted && isEmptyProfilePreset
                  ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                  : "bg-slate-950/50 border-white/5 text-slate-300 hover:bg-slate-800/60"}`}
            >
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-slate-700 flex items-center justify-center text-[9px]">👤</span>
                Empty Profile
              </span>
              <span className="text-[9px] text-slate-500">No Bio</span>
            </button>

            {/* Completed 60/60 */}
            <button
              onClick={() => { 
                setIsChallengeCompleted(true); 
                setIsFirstDay(false); 
                setIsMissedDay(false); 
                updateProfile(profileName, profileEmail, profilePhone, profileLocation, "A Motivated Btech Student", "Java, c, c++, python");
              }}
              className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[11px] font-semibold transition-all border
                ${isChallengeCompleted
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                  : "bg-slate-950/50 border-white/5 text-slate-300 hover:bg-slate-800/60"}`}
            >
              <span className="flex items-center gap-2">
                <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px]
                  ${isChallengeCompleted ? "bg-emerald-500/30" : "bg-slate-700"}`}>
                  🏅
                </span>
                Completed (60/60)
              </span>
              <span className="text-[9px] text-slate-500">Winner</span>
            </button>
          </div>

          <div className="flex justify-between text-[9px] text-slate-500 pt-1 border-t border-white/5">
            <span>Level: {level}</span>
            <span>XP: {xp}</span>
          </div>
        </div>

        {/* Status Indicators Grid — edge-case aware */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Streak Value Card */}
          <div className={`rounded-2xl border p-4 transition-all duration-500 ${
            isFirstDay
              ? "border-brand/20 bg-brand/5"
              : isMissedDay
              ? "border-amber-500/25 bg-amber-500/5"
              : "border-white/10 bg-slate-900/30"
          }`}>
            <span className="text-[8px] uppercase tracking-widest font-black block
              {isFirstDay ? 'text-brand' : isMissedDay ? 'text-amber-400' : 'text-slate-500'}">
              {isMissedDay ? "STREAK PAUSED" : "STREAK"}
            </span>
            {isFirstDay ? (
              isSubmittedToday ? (
                <span className="text-emerald-400 font-black text-base mt-1.5 block">
                  🔥 1 day streak
                </span>
              ) : (
                <span className="text-brand font-black text-sm mt-1.5 block leading-tight">
                  🚀 Day 1 of 60<br />
                  <span className="text-[9px] text-slate-400 font-medium">Everyone starts somewhere</span>
                </span>
              )
            ) : isMissedDay ? (
              <span className="text-amber-300 font-black text-sm mt-1.5 block leading-tight">
                🔥 10 days (Paused)<br />
                <span className="text-[9px] text-amber-400/80 font-medium">Recovery available</span>
              </span>
            ) : isStreakRecovered ? (
              <span className="text-emerald-400 font-black text-base mt-1.5 block flex items-center gap-1.5">
                🔥 {streak} day streak
                <span className="text-[8px] bg-emerald-500/20 border border-emerald-500/35 text-emerald-400 font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  Regained
                </span>
              </span>
            ) : isChallengeCompleted ? (
              <span className="text-emerald-400 font-black text-base mt-1.5 block">
                🔥 60 day streak
              </span>
            ) : (
              <span className="text-slate-200 font-black text-base mt-1.5 block">
                🔥 {streak} day streak
              </span>
            )}
          </div>

          {/* Current Day Track Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-4">
            <span className="text-[8px] uppercase tracking-widest text-slate-500 font-black block">
              {isFirstDay ? "YOUR START" : "WHERE YOU ARE"}
            </span>
            <span className="text-slate-200 font-black text-base mt-1.5 block">
              Day {isFirstDay ? "1" : isChallengeCompleted ? "60" : "12"} / 60
            </span>
          </div>
        </div>

        {/* Countdown Timer Widget (TIME LEFT TO SUBMIT) */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md shadow-xl text-center space-y-3.5">
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-widest text-brand uppercase block">
              TIME LEFT TO SUBMIT
            </span>
            
            {/* Glowing Segment flip boxes */}
            <div className="flex justify-center items-center gap-2.5 py-1">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="h-12 w-10.5 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center font-mono text-xl font-black text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.15)] transition-colors duration-300">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <span className="text-[7px] text-slate-500 font-bold uppercase mt-1">DAYS</span>
              </div>
              <span className="text-slate-600 font-bold text-base -mt-4">:</span>
              
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="h-12 w-10.5 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center font-mono text-xl font-black text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.15)] transition-colors duration-300">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-[7px] text-slate-500 font-bold uppercase mt-1">HRS</span>
              </div>
              <span className="text-slate-600 font-bold text-base -mt-4">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="h-12 w-10.5 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center font-mono text-xl font-black text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.15)] transition-colors duration-300">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-[7px] text-slate-500 font-bold uppercase mt-1">MIN</span>
              </div>
              <span className="text-slate-600 font-bold text-base -mt-4">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="h-12 w-10.5 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center font-mono text-xl font-black text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.15)] transition-colors duration-300">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-[7px] text-slate-500 font-bold uppercase mt-1">SEC</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-semibold leading-none">
            {timeLeft.targetStr}
          </div>
        </div>

        {/* EDGE CASE 2: Streak Paused — supportive recovery experience with XP sacrifice option */}
        {isMissedDay && (
          <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-b from-amber-500/8 to-slate-900/40 p-5 space-y-4">
            {/* Header */}
            {wasStreakRecovered ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                      Streak Regained & Retrieved! <span className="text-emerald-400">🎉</span>
                    </h3>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                      Day 11 Recovery Completed · 12-Day Streak Active
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/20 border border-emerald-500/35 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  ✓ Restored
                </span>
              </div>
            ) : (
              <div className="flex gap-3 items-start">
                <div className="h-10 w-10 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <span className="text-xl">⏸</span>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-amber-300">Your streak paused.</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                    That&apos;s okay. Life happens. Choose your preferred recovery path to restore your momentum:
                  </p>
                </div>
              </div>
            )}

            {/* Context Info */}
            <div className="rounded-xl bg-slate-950/60 border border-white/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-amber-400 font-semibold flex items-center gap-1.5">⚠ You missed Day 11</span>
                <span className="text-[9px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded-md font-bold">✓ 10 Days Saved</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-0.5">
                <span>🔥 Reserve XP: <strong>{xp} XP</strong></span>
                <span>·</span>
                <span>Level: <strong>Lvl {level}</strong></span>
              </div>
            </div>

            {/* Dual Recovery Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Option 1: XP Token (-70 XP) + Submit Day 11 Task */}
              <button
                disabled={chosenRecoveryOption !== null && chosenRecoveryOption !== 1}
                onClick={() => {
                  deductXpForDay11(70);
                  setShowXpDeductModal(true);
                }}
                className={`flex flex-col justify-between rounded-xl p-3.5 text-left transition-all border shadow-lg ${
                  chosenRecoveryOption === 2
                    ? "bg-slate-950/40 border-white/5 opacity-30 cursor-not-allowed pointer-events-none"
                    : chosenRecoveryOption === 1
                    ? "bg-amber-500/20 border-amber-400 text-amber-200"
                    : "bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border-amber-500/30 hover:border-amber-400 active:scale-98"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1">
                      ⚡ Option 1: Fast-Track (-70 XP)
                    </span>
                    <span className="text-[9px] font-black text-rose-400 bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.5 rounded-md">
                      {chosenRecoveryOption === 2 ? "🔒 Locked" : "-70 XP"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-bold mt-1.5">XP Token + Complete Day 11</p>
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-snug">
                    Deduct 70 XP from reserve to unlock and complete the Day 11 recovery challenge.
                  </p>
                </div>
                <span className={`mt-3 w-full rounded-lg py-2 text-[10px] font-extrabold text-center border transition-colors ${
                  chosenRecoveryOption === 2
                    ? "bg-slate-800/40 border-white/5 text-slate-500"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`}>
                  {chosenRecoveryOption === 2 ? "Locked (Chosen Option 2)" : chosenRecoveryOption === 1 ? "✓ Chosen & Unlocked" : "Deduct 70 XP & Open Day 11 Task →"}
                </span>
              </button>

              {/* Option 2: Quick 3-Question Vector DB Quiz (+150 XP & Free Recovery) */}
              <button
                disabled={chosenRecoveryOption !== null && chosenRecoveryOption !== 2}
                onClick={() => setShowQuizModal(true)}
                className={`flex flex-col justify-between rounded-xl p-3.5 text-left transition-all border shadow-lg ${
                  chosenRecoveryOption === 1
                    ? "bg-slate-950/40 border-white/5 opacity-30 cursor-not-allowed pointer-events-none"
                    : chosenRecoveryOption === 2
                    ? "bg-brand/20 border-brand/40 text-brand"
                    : "bg-gradient-to-br from-brand/15 via-slate-900 to-slate-950 border-brand/30 hover:border-brand/50 active:scale-98"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-brand flex items-center gap-1">
                      🧠 Option 2: Concept Quiz
                    </span>
                    <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded-md">
                      {chosenRecoveryOption === 1 ? "🔒 Locked" : chosenRecoveryOption === 2 ? "✓ Passed" : "Pass ≥ 70%"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-bold mt-1.5">3-Question Vector DB Quiz</p>
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-snug">
                    Score &ge; 70% on ChromaDB quiz to unlock missed day challenge for free!
                  </p>
                </div>
                <span className={`mt-3 w-full rounded-lg py-2 text-[10px] font-extrabold text-center border transition-colors ${
                  chosenRecoveryOption === 1
                    ? "bg-slate-800/40 border-white/5 text-slate-500"
                    : "bg-brand/20 text-brand border-brand/30"
                }`}>
                  {chosenRecoveryOption === 1 ? "Locked (Chosen Option 1)" : chosenRecoveryOption === 2 ? "✓ Chosen & Passed" : "Start 3-Question Quiz (Pass ≥ 70%) →"}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* EDGE CASE 2 (RECOVERED): Streak Regained Banner */}
        {isStreakRecovered && !isMissedDay && (
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-950 p-4 shadow-lg shadow-emerald-500/10 space-y-2 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                    Streak Regained & Retrieved! <span className="text-emerald-400">🎉</span>
                  </h3>
                  <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                    Day 11 Recovery Completed · 12-Day Streak Active
                  </p>
                </div>
              </div>
              <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/20 border border-emerald-500/35 px-2.5 py-1 rounded-full uppercase tracking-wider">
                ✓ Restored
              </span>
            </div>
          </div>
        )}

        {/* Today's Mission Objective */}
        <div className="relative rounded-2xl border border-brand/25 bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-brand/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <span className="rounded-full bg-brand-acc border border-brand/20 px-2 py-0.5 text-[10px] font-semibold text-brand transition-colors duration-500">
              {isFirstDay ? "DAY 1 / 60" : isChallengeCompleted ? "DAY 60 / 60" : "DAY 12 / 60"}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
              {isSubmittedToday || isChallengeCompleted ? "COMPLETED" : "TODAY'S MISSION"}
            </span>
          </div>

          <h2 className="text-base font-bold mt-2.5 text-slate-100">
            {isFirstDay 
              ? "Setup GitHub & Connect LinkedIn" 
              : isChallengeCompleted 
              ? "Capstar Showcase & Cohort Graduation" 
              : "Build a REST API"}
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {isFirstDay 
              ? "Initialize your workspaces and commit a baseline README to document your 60-day goals."
              : isChallengeCompleted
              ? "Final capstone submission verified. You have completed all 60 days of the ABTalks Fullstack & AI Cohort!"
              : "Build a REST API that allows users to create, read and delete tasks successfully."}
          </p>

          <div className="mt-4 flex gap-4 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">⏱ {isFirstDay ? "~20 min" : isChallengeCompleted ? "GRADUATED" : "~45 min"}</span>
            <span className="flex items-center gap-1">⚡ {isFirstDay ? "+50 XP" : isChallengeCompleted ? "+12,000 XP" : "+100 XP"}</span>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5">
            {isChallengeCompleted ? (
              <div className="space-y-2.5">
                <span className="w-full flex flex-col items-center justify-center gap-1 rounded-xl bg-emerald-500/15 p-3 text-center text-xs font-black text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/10">
                  <span>🏅 60-Day Challenge Completed</span>
                  <span className="text-[10px] font-extrabold text-emerald-300">
                    🚀 Indian Dev Cohort 05 Completed &amp; Eligible for Certificate of Completion of 60-Day Challenge ✓
                  </span>
                </span>

                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 py-3 text-xs font-black text-slate-950 transition-all active:scale-98 shadow-lg shadow-amber-500/20"
                >
                  <Award className="h-4 w-4" />
                  📜 Generate &amp; Download Official Cohort Certificate
                </button>
              </div>
            ) : isSubmittedToday ? (
              <span className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 py-3 text-xs font-black text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                {isStreakRecovered ? "Streak Regained & Mission Completed ✓" : "Mission Completed"}
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

        {/* ADVANCED PROFILE WORKSPACE HUB PANEL (Overview, Edit Profile, Goals, Activities) */}
        <div id="profile-hub" className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-lg">
          
          {/* Profile Header Banner */}
          <div className="p-4.5 bg-slate-900 border-b border-white/5 flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-full border-2 border-brand flex items-center justify-center bg-brand-acc text-brand font-black text-sm shrink-0 transition-colors duration-500">
              {profileName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">{profileName}</h3>
              <span className="text-[10px] text-slate-500 font-semibold">{profileEmail}</span>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex border-b border-white/5 text-[11px] font-semibold text-slate-400 bg-slate-950/20">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${activeTab === "overview" ? "text-brand border-brand font-extrabold" : "border-transparent hover:text-white"}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${activeTab === "profile" ? "text-brand border-brand font-extrabold" : "border-transparent hover:text-white"}`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveTab("goals")}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${activeTab === "goals" ? "text-brand border-brand font-extrabold" : "border-transparent hover:text-white"}`}
            >
              My Goals
            </button>
          </div>

          {/* Tab contents */}
          <div className="p-4.5 min-h-[220px]">
            
            {/* Overview Tab — edge-case aware */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                {/* EDGE CASE 3: Empty profile CTA — ONLY when bio & skills are empty */}
                {(!profileBio && !profileSkills) ? (
                  <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/15 via-violet-500/10 to-slate-900/90 p-4.5 space-y-3.5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-24 w-24 bg-brand/10 rounded-full blur-xl pointer-events-none" />
                    
                    {/* Header */}
                    <div className="flex gap-3 items-start relative z-10">
                      <div className="h-10 w-10 rounded-xl bg-brand/20 border border-brand/35 flex items-center justify-center shrink-0 text-lg shadow-inner">
                        👤
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-black text-slate-100">Complete your profile</h4>
                          <span className="text-[9px] font-black text-brand bg-brand/15 border border-brand/30 px-2 py-0.5 rounded-full">
                            0% Setup
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
                          Add your bio &amp; tech stack to unlock your public engineer portfolio and recruiter match score.
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 relative z-10">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400">
                        <span>Profile Strength</span>
                        <span className="text-brand">0 / 3 completed</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden border border-white/5">
                        <div className="h-full w-0 bg-gradient-to-r from-brand to-violet-400 transition-all duration-500" />
                      </div>
                    </div>

                    {/* Steps checklist */}
                    <div className="grid grid-cols-3 gap-2 relative z-10 pt-1">
                      <div className="rounded-xl bg-slate-950/60 border border-white/5 p-2 text-center space-y-1">
                        <span className="text-xs">✏️</span>
                        <p className="text-[9px] font-extrabold text-slate-300">Add Bio</p>
                        <span className="text-[8px] text-amber-400 font-bold block">Pending</span>
                      </div>
                      <div className="rounded-xl bg-slate-950/60 border border-white/5 p-2 text-center space-y-1">
                        <span className="text-xs">💻</span>
                        <p className="text-[9px] font-extrabold text-slate-300">Tech Stack</p>
                        <span className="text-[8px] text-amber-400 font-bold block">Pending</span>
                      </div>
                      <div className="rounded-xl bg-slate-950/60 border border-white/5 p-2 text-center space-y-1">
                        <span className="text-xs">🔗</span>
                        <p className="text-[9px] font-extrabold text-slate-300">Social Links</p>
                        <span className="text-[8px] text-amber-400 font-bold block">Pending</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("profile")}
                      className="w-full rounded-xl bg-gradient-to-r from-brand to-violet-600 hover:from-brand/90 hover:to-violet-500 py-3 text-xs font-black text-white transition-all active:scale-98 flex items-center justify-center gap-1.5 shadow-lg shadow-brand/20 relative z-10"
                    >
                      🚀 Complete Profile &amp; Unlock Portfolio →
                    </button>
                  </div>
                ) : (
                  <div className="rounded-xl bg-gradient-to-r from-brand/20 to-slate-900 border border-brand/20 p-3.5">
                    <h4 className="text-xs font-bold text-slate-200">Welcome back, {profileName}! 👋</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                      {isSubmittedToday
                        ? "Today's challenge is done. You're ahead of 90% of students. 🔥"
                        : "Your dashboard is ready. Start today's challenge to keep your streak alive!"}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h5 className="text-[9px] font-black tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
                    <Bookmark className="h-3 w-3" /> Recent Activity
                  </h5>
                  
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 no-scrollbar">
                    {(isChallengeCompleted
                      ? [
                          { id: 101, type: "streak_complete", action: "🏆 60-Day Challenge Completed & Graduated!", timestamp: "8/9/2026, 10:00:00 AM" },
                          { id: 102, type: "streak_complete", action: "Streak day completed (Day 60)", timestamp: "8/9/2026, 9:30:00 AM" },
                          { id: 103, type: "streak_complete", action: "Streak day completed (Day 59)", timestamp: "8/8/2026, 9:15:00 PM" },
                          { id: 104, type: "streak_complete", action: "Streak day completed (Day 58)", timestamp: "8/7/2026, 8:45:00 PM" },
                          { id: 105, type: "streak_complete", action: "Streak day completed (Day 57)", timestamp: "8/6/2026, 8:30:00 PM" },
                          { id: 106, type: "account_create", action: "Account created successfully", timestamp: "7/28/2026, 7:51:24 PM" }
                        ]
                      : isFirstDay
                      ? activityLogs.filter(log => log.type === "account_create" || log.type === "profile_update" || log.action.includes("Day 1"))
                      : (!profileBio && !profileSkills)
                      ? activityLogs.filter(log => log.type !== "profile_update")
                      : isMissedDay 
                      ? activityLogs.filter(log => (wasStreakRecovered ? !log.action.includes("Day 12") : (!log.action.includes("Day 11") && !log.action.includes("Day 12"))))
                      : activityLogs
                    ).map((log) => (
                      <div key={log.id} className="flex gap-2.5 items-start bg-slate-950/40 p-2.5 rounded-xl border border-white/5 text-[10px] transition-colors">
                        <span className="text-xs select-none mt-0.5">
                          {log.type === "profile_update" ? "✏️" : 
                           log.type === "account_create" ? "✅" :
                           log.type === "streak_complete" ? "🔥" :
                           log.type === "streak_recovery" ? "❄️" :
                           log.type === "streak_missed" ? "❌" : "🔗"}
                        </span>
                        <div className="flex-1">
                          <div className="text-slate-300 font-semibold leading-relaxed">{log.action}</div>
                          <span className="text-[8px] text-slate-500 block mt-0.5">{log.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Edit Tab */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSave} className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Profile Information
                </div>

                {isSavedAlert && (
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-2 text-center text-[10px] font-bold text-emerald-400">
                    ✓ Profile updated successfully!
                  </div>
                )}

                <div className="space-y-2 text-[11px]">
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Name</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Email</label>
                    <input 
                      type="email" 
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Phone</label>
                    <input 
                      type="text" 
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Location</label>
                    <input 
                      type="text" 
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Bio</label>
                    <input 
                      type="text" 
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Skills (comma separated)</label>
                    <input 
                      type="text" 
                      value={editSkills}
                      onChange={(e) => setEditSkills(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">GitHub Profile URL</label>
                    <input 
                      type="text" 
                      value={editGithub}
                      onChange={(e) => setEditGithub(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">LinkedIn Profile URL</label>
                    <input 
                      type="text" 
                      value={editLinkedin}
                      onChange={(e) => setEditLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand py-2 text-xs font-bold text-white hover:bg-brand/90 transition-all mt-4"
                >
                  Save Profile Changes
                </button>
              </form>
            )}

            {/* My Goals Tab */}
            {activeTab === "goals" && (
              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  🎯 My Goals
                </div>

                {/* Add Goal Form */}
                <form onSubmit={handleAddGoal} className="flex gap-2">
                  <input 
                    type="text" 
                    value={newGoalText}
                    onChange={(e) => setNewGoalText(e.target.value)}
                    placeholder="e.g., Complete React course by next week"
                    className="flex-1 rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand"
                  />
                  <button 
                    type="submit"
                    className="rounded-xl bg-brand/10 border border-brand/20 p-2 text-brand hover:bg-brand/20 transition-all flex items-center justify-center shrink-0"
                  >
                    <Plus className="h-4.5 w-4.5" />
                  </button>
                </form>

                {/* Goals Checklist List */}
                <div className="space-y-2 max-h-[180px] overflow-y-auto no-scrollbar">
                  {/* Auto-seeded daily goal — auto-completes when today's challenge is submitted */}
                  <div className={`flex gap-2.5 items-center p-2.5 rounded-xl border text-[11px] transition-all duration-500
                    ${isSubmittedToday
                      ? "bg-emerald-500/5 border-emerald-500/20"
                      : "bg-brand/5 border-brand/15"
                    }`}>
                    <span className="shrink-0">
                      {isSubmittedToday ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-500/10" />
                      ) : (
                        <div className="h-4 w-4 rounded border border-brand/40" />
                      )}
                    </span>
                    <span className="leading-snug flex-1">
                      <span className={`block ${isSubmittedToday ? "line-through text-slate-500" : "text-slate-300"}`}>
                        {todayGoalText}
                      </span>
                      {isSubmittedToday ? (
                        <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">✅ Completed today!</span>
                      ) : (
                        <span className="text-[9px] text-brand font-bold block mt-0.5">⏱ {String(timeLeft.hours).padStart(2,'0')}:{String(timeLeft.minutes).padStart(2,'0')} remaining</span>
                      )}
                    </span>
                  </div>
                  {goals.map((g) => (
                    <div 
                      key={g.id} 
                      onClick={() => toggleGoal(g.id)}
                      className="flex gap-2.5 items-center bg-slate-950/40 p-2.5 rounded-xl border border-white/5 text-[11px] cursor-pointer hover:bg-slate-900/40 transition-colors"
                    >
                      <button className="text-brand shrink-0">
                        {g.completed ? (
                          <CheckCircle2 className="h-4 w-4 fill-brand/10" />
                        ) : (
                          <div className="h-4 w-4 rounded border border-white/20" />
                        )}
                      </button>
                      <span className={`text-slate-300 leading-none ${g.completed ? "line-through opacity-50" : ""}`}>
                        {g.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* GitHub & LinkedIn - Social Standing */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Social Standing</span>
            <span className="text-[9px] text-emerald-400 font-bold">● Live</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-950/70 p-3 border border-white/5 flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Github className="h-4 w-4 text-slate-300" />
              </div>
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase block">GitHub</span>
                <span className="text-sm font-black text-slate-100">🔥 {effectiveDaysCompleted} commits</span>
              </div>
            </div>
            <div className="rounded-xl bg-slate-950/70 p-3 border border-white/5 flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                <Linkedin className="h-4 w-4 text-sky-400" />
              </div>
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase block">LinkedIn</span>
                <span className="text-sm font-black text-slate-100">{isFirstDay ? (isSubmittedToday ? 1 : 0) : effectiveDaysCompleted} posts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Your Journey – Progress Bar (How much completed?) */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-200">Your Journey</span>
            <span className="text-[10px] font-black text-brand">{effectiveDaysCompleted} / 60 days</span>
          </div>

          {/* Animated Progress Bar */}
          <div className="space-y-1.5">
            <div className="h-3 w-full rounded-full bg-slate-800/80 overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-violet-400 transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${isFirstDay && !isSubmittedToday ? 0 : currentProgressPercent}%` }}
              >
                <div className="absolute inset-0 bg-white/10 animate-pulse rounded-full" />
              </div>
            </div>
            <div className="flex justify-between text-[9px] font-bold">
              <span className="text-slate-500">Day 0</span>
              <span className="text-brand font-black text-[10px]">{isFirstDay && !isSubmittedToday ? "0%" : `${currentProgressPercent}%`} Complete</span>
              <span className="text-slate-500">Day 60</span>
            </div>
          </div>

          {/* Progress milestone dots */}
          <div className="flex justify-between items-center px-0.5">
            {[15, 30, 45, 60].map((milestone) => {
              const reached = effectiveDaysCompleted >= milestone;
              return (
                <div key={milestone} className="flex flex-col items-center gap-1">
                  <div className={`h-2 w-2 rounded-full border ${reached ? "bg-brand border-brand shadow-sm shadow-brand/40" : "bg-slate-800 border-slate-700"}`} />
                  <span className="text-[7px] text-slate-600 font-bold">D{milestone}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements (Am I doing well?) */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-200">Achievements</span>
            <span className="text-[9px] text-slate-500 font-bold">{isFirstDay ? "0" : "3"} unlocked</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { emoji: "🏆", label: "7 Day Streak", desc: "Consistent", color: "amber" },
              { emoji: "🚀", label: "First Project", desc: "Initiated", color: "violet" },
              { emoji: "💻", label: "10 Builds", desc: "Milestone", color: "emerald" },
            ].map((badge) => (
              <div
                key={badge.label}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center transition-all duration-300
                  ${isFirstDay
                    ? "opacity-30 bg-slate-950/20 border-white/5"
                    : badge.color === "amber"
                    ? "bg-amber-500/5 border-amber-500/15"
                    : badge.color === "violet"
                    ? "bg-violet-500/5 border-violet-500/15"
                    : "bg-emerald-500/5 border-emerald-500/15"
                  }`}
              >
                <span className="text-xl">{badge.emoji}</span>
                <div>
                  <p className="text-[9px] font-black text-slate-200 leading-tight">{badge.label}</p>
                  <p className="text-[8px] text-slate-500">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Resources - replaces AI DNA */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-4 space-y-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-200">📚 Today's Resources</span>
            <span className="text-[9px] text-slate-500 font-semibold">Day 12 · REST API</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Curated guides to help you complete today's challenge faster.
          </p>
          <div className="space-y-2">
            {[
              { label: "REST API Design Best Practices", url: "https://restfulapi.net/", tag: "Guide" },
              { label: "Express.js Routing Docs", url: "https://expressjs.com/en/guide/routing.html", tag: "Docs" },
              { label: "Postman API Testing Tutorial", url: "https://learning.postman.com/docs/getting-started/introduction/", tag: "Tool" },
            ].map((res) => (
              <a
                key={res.label}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-2 rounded-xl bg-slate-950/60 border border-white/5 p-2.5 hover:border-brand/30 hover:bg-brand/5 transition-all group"
              >
                <span className="text-[10px] text-slate-300 font-medium group-hover:text-brand transition-colors leading-snug">{res.label}</span>
                <span className="text-[8px] font-black uppercase tracking-wider text-slate-500 bg-slate-800 rounded-md px-1.5 py-0.5 shrink-0 group-hover:bg-brand/20 group-hover:text-brand transition-colors">{res.tag}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Time Capsule reflections list */}
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
              {(isChallengeCompleted ? [
                { day: 60, date: "Aug 9, 2026", note: "Deployed final microservices architecture and presented 60-day Capstone Project to senior engineering leads." },
                { day: 59, date: "Aug 8, 2026", note: "Completed end-to-end integration tests, load testing, and optimized PostgreSQL query indexes." },
                { day: 58, date: "Aug 7, 2026", note: "Implemented real-time WebSocket notifications and Redis Pub/Sub event distribution system." }
              ] : reflections.slice(0, 3)).map((ref, idx) => (
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

        {/* 60-Day Habit Matrix - Landing page style with ✓/✗ */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand" />
              60-Day Matrix
            </span>
            <span className="text-[10px] text-brand font-black">{effectiveDaysCompleted}/60 Days</span>
          </div>
          <p className="text-[9px] text-slate-500 italic">💡 Tap any completed day to view your submission</p>

          <div className="grid grid-cols-10 gap-1">
            {gridCells.map((cell) => {
              const isCompleted = cell.status === "completed";
              const isMissed = cell.status === "missed";
              const isActive = cell.status === "active";
              const isLocked = cell.status === "locked";

              return (
                <div
                  key={cell.day}
                  onClick={() => handleCellClick(cell.day, cell.status)}
                  title={`Day ${cell.day} - ${cell.status}`}
                  className={`aspect-square rounded-lg flex items-center justify-center text-[9px] font-black transition-all duration-200 select-none
                    ${isCompleted ? "bg-brand cursor-pointer hover:scale-110 hover:brightness-110 active:scale-95" : ""}
                    ${isMissed ? "bg-rose-500/30 border border-rose-500/60 shadow-[0_0_10px_rgba(244,63,94,0.3)] cursor-not-allowed" : ""}
                    ${isActive ? "bg-amber-500/15 border border-amber-400/50 animate-pulse cursor-pointer" : ""}
                    ${isLocked ? "bg-slate-800/50 border border-white/5 cursor-not-allowed" : ""}
                  `}
                >
                  {isCompleted && <span className="text-white text-[10px]">✓</span>}
                  {isMissed && <span className="text-rose-400 font-black text-[11px]">✕</span>}
                  {isActive && <span className="text-amber-300 text-[8px] font-black">{cell.day}</span>}
                  {isLocked && <span className="text-slate-600 text-[8px]">{cell.day}</span>}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[8px] text-slate-500 border-t border-white/5 pt-2.5">
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-sm bg-slate-700" /> Locked</div>
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-sm bg-brand" /> ✓ Done</div>
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-sm bg-rose-500" /> ✗ Missed</div>
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-sm bg-amber-400" /> Active</div>
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

      {/* Option 1 XP Deduction Confirmation Modal */}
      {showXpDeductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-amber-500/35 bg-slate-900 p-6 text-center shadow-2xl relative space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xl font-bold">
              ⚡
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-100">70 XP Recovery Token Used!</h3>
              <p className="text-[10px] text-amber-300 font-semibold mt-0.5">Day 11 Challenge Unlocked</p>
            </div>

            <div className="rounded-xl bg-slate-950/80 border border-white/5 p-3.5 space-y-2 text-left text-xs">
              <div className="flex justify-between items-center text-slate-400 text-[10px]">
                <span>Deduction Fee:</span>
                <span className="font-bold text-rose-400">-70 XP</span>
              </div>
              <div className="flex justify-between items-center text-slate-200 font-bold text-[11px] border-t border-white/5 pt-2">
                <span>Current XP Balance:</span>
                <span className="text-amber-400">{xp} XP (Lvl {level})</span>
              </div>
              <div className="text-[9px] text-emerald-400 font-semibold pt-1 flex items-center gap-1">
                <span>✓</span> Day 11 Recovery Challenge is now active!
              </div>
            </div>

            <button
              onClick={() => {
                setShowXpDeductModal(false);
                router.push("/day/11");
              }}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 py-3 text-xs font-black text-white transition-all shadow-lg shadow-amber-500/20 active:scale-98"
            >
              Proceed to Day 11 Task →
            </button>
          </div>
        </div>
      )}

      {/* AI Peer Code Audit Modal for Option 2 Recovery */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-brand/30 bg-slate-900 p-6 shadow-2xl space-y-4 relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-brand/20 flex items-center justify-center border border-brand/30 text-lg">
                  🤖
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-100">AI Peer Code Audit & Latency Benchmark</h3>
                  <p className="text-[9px] text-brand font-bold">Free Streak Recovery Mission · +150 XP</p>
                </div>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 rounded-lg bg-white/5"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Run automated code diagnostic checks on ChromaDB vector chunking to restore your Day 11 streak for FREE:
              </p>

              <div className="rounded-xl bg-slate-950/80 border border-white/5 p-3.5 space-y-2.5">
                <div className="flex items-center gap-2.5 text-[11px] text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Cosine similarity threshold set to <strong>&gt; 0.85</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px] text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Sliding window text overlap set to <strong>50 tokens</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px] text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Vector query latency benchmark verified <strong>(&lt;95ms)</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setShowAuditModal(false)}
                className="flex-1 rounded-xl border border-white/10 bg-slate-800/50 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  completeAICodeAudit(150);
                  setShowAuditModal(false);
                }}
                className="flex-2 rounded-xl bg-gradient-to-r from-brand to-violet-500 hover:from-brand/90 hover:to-violet-400 py-2.5 text-xs font-black text-white transition-all shadow-lg shadow-brand/20 active:scale-98"
              >
                Submit AI Audit & Restore Streak (+150 XP) →
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Option 2 Interactive 3-Question Concept Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-brand/35 bg-slate-900 p-6 shadow-2xl space-y-4 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-brand/20 flex items-center justify-center border border-brand/30 text-lg">
                  🧠
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-100">Day 11 Concept Recovery Quiz</h3>
                  <p className="text-[9px] text-brand font-bold">3 Questions · Free Recovery · +150 XP</p>
                </div>
              </div>
              <button
                onClick={() => setShowQuizModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 rounded-lg bg-white/5"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              {/* Question 1 */}
              <div className="rounded-xl bg-slate-950/70 border border-white/5 p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-100">
                  <span className="h-5 w-5 rounded-full bg-brand/20 text-brand flex items-center justify-center text-[10px] shrink-0 font-extrabold">1</span>
                  <span>What is the primary role of ChromaDB in a RAG pipeline?</span>
                </div>
                <div className="space-y-1.5 pl-7">
                  {[
                    "Store & query vector embeddings for semantic similarity search",
                    "Compress CSS styles and bundle Next.js pages",
                    "Manage database schema migrations for PostgreSQL"
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, 0: idx }))}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[10px] border transition-all ${
                        quizAnswers[0] === idx 
                          ? "bg-brand/20 border-brand/40 text-brand font-bold" 
                          : "bg-slate-900 border-white/5 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {idx === 0 ? "A) " : idx === 1 ? "B) " : "C) "}{opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="rounded-xl bg-slate-950/70 border border-white/5 p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-100">
                  <span className="h-5 w-5 rounded-full bg-brand/20 text-brand flex items-center justify-center text-[10px] shrink-0 font-extrabold">2</span>
                  <span>Why do we use text chunk overlap (e.g. 50 tokens) during document splitting?</span>
                </div>
                <div className="space-y-1.5 pl-7">
                  {[
                    "To preserve semantic context across chunk boundaries",
                    "To duplicate files and increase database size",
                    "To reduce HTTP header payload overhead"
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, 1: idx }))}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[10px] border transition-all ${
                        quizAnswers[1] === idx 
                          ? "bg-brand/20 border-brand/40 text-brand font-bold" 
                          : "bg-slate-900 border-white/5 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {idx === 0 ? "A) " : idx === 1 ? "B) " : "C) "}{opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="rounded-xl bg-slate-950/70 border border-white/5 p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-100">
                  <span className="h-5 w-5 rounded-full bg-brand/20 text-brand flex items-center justify-center text-[10px] shrink-0 font-extrabold">3</span>
                  <span>Which metric is commonly used to measure distance between vector embeddings?</span>
                </div>
                <div className="space-y-1.5 pl-7">
                  {[
                    "Cosine Similarity / Distance",
                    "RGB Color spectrum offset",
                    "TCP Socket port latency"
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, 2: idx }))}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[10px] border transition-all ${
                        quizAnswers[2] === idx 
                          ? "bg-brand/20 border-brand/40 text-brand font-bold" 
                          : "bg-slate-900 border-white/5 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {idx === 0 ? "A) " : idx === 1 ? "B) " : "C) "}{opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setShowQuizModal(false)}
                className="flex-1 rounded-xl border border-white/10 bg-slate-800/50 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const correctCount = (quizAnswers[0] === 0 ? 1 : 0) + (quizAnswers[1] === 0 ? 1 : 0) + (quizAnswers[2] === 0 ? 1 : 0);
                  const scorePercent = Math.round((correctCount / 3) * 100);
                  const isPassed = correctCount >= 2;

                  setShowQuizModal(false);
                  setQuizResultModal({
                    show: true,
                    score: scorePercent,
                    passed: isPassed,
                    correctCount
                  });

                  if (isPassed) {
                    setActiveRecoveryOption(2);
                    addActivityLog("streak_recovery", `Passed Day 11 Vector DB Quiz with ${scorePercent}% score!`);
                  }
                }}
                className="flex-2 rounded-xl bg-gradient-to-r from-brand to-violet-500 hover:from-brand/90 hover:to-violet-400 py-2.5 text-xs font-black text-white transition-all shadow-lg shadow-brand/20 active:scale-98"
              >
                Submit Quiz & View Results →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Option 2 Quiz Results Modal */}
      {quizResultModal?.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-brand/35 bg-slate-900 p-6 text-center shadow-2xl relative space-y-4">
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold border ${
              quizResultModal.passed 
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                : "bg-rose-500/20 text-rose-400 border-rose-500/30"
            }`}>
              {quizResultModal.passed ? "🎉" : "❌"}
            </div>

            <div>
              <h3 className="text-base font-black text-slate-100">
                {quizResultModal.passed ? "Quiz Passed!" : "Quiz Failed"}
              </h3>
              <p className={`text-[11px] font-bold mt-1 ${quizResultModal.passed ? "text-emerald-400" : "text-rose-400"}`}>
                Score: {quizResultModal.score}% ({quizResultModal.correctCount}/3 Correct)
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/80 border border-white/5 p-3.5 text-xs text-slate-300 space-y-1.5 text-left">
              {quizResultModal.passed ? (
                <>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
                    <span>✓</span> Minimum 70% score requirement satisfied!
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Option 2 verified. Your Day 11 recovery challenge is unlocked. Complete the task to restore your streak!
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-[11px]">
                    <span>⚠</span> You need at least 70% score to pass (minimum 2/3 correct).
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Review ChromaDB vector embedding & RAG concepts and attempt the quiz again.
                  </p>
                </>
              )}
            </div>

            {quizResultModal.passed ? (
              <button
                onClick={() => {
                  setQuizResultModal(null);
                  router.push("/day/11");
                }}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 py-3 text-xs font-black text-white transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
              >
                Proceed to Day 11 Task →
              </button>
            ) : (
              <button
                onClick={() => {
                  setQuizResultModal(null);
                  setShowQuizModal(true);
                }}
                className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-3 text-xs font-bold text-slate-200 transition-all border border-white/10 active:scale-98"
              >
                Try Quiz Again 🔄
              </button>
            )}
          </div>
        </div>
      )}
      {/* Official Certificate of Completion Modal */}
      {showCertificateModal && (
        <>
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              @page {
                size: A4 landscape;
                margin: 0 !important;
              }
              html, body {
                background-color: #020617 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: 100% !important;
                overflow: hidden !important;
              }
              body * {
                visibility: hidden !important;
              }
              #certificate-modal-container, #certificate-modal-container * {
                visibility: visible !important;
              }
              #certificate-modal-container {
                position: fixed !important;
                inset: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                max-width: none !important;
                margin: 0 !important;
                padding: 2.5rem !important;
                background-color: #020617 !important;
                border: none !important;
                box-shadow: none !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                page-break-inside: avoid !important;
                page-break-after: avoid !important;
              }
              .print-no-show {
                display: none !important;
              }
              #certificate-print-card {
                width: 100% !important;
                max-width: 900px !important;
                border: 4px solid #f59e0b !important;
                border-radius: 1.5rem !important;
                background: #020617 !important;
                box-shadow: none !important;
                padding: 2.5rem !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          ` }} />

          <div id="certificate-modal-container" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div id="certificate-print-card" className="w-full max-w-2xl rounded-3xl border-4 border-amber-500/40 bg-slate-950 p-8 shadow-2xl space-y-6 relative overflow-hidden">
              
              {/* Watermark background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header Controls */}
              <div className="flex justify-between items-center print-no-show border-b border-white/10 pb-4">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-amber-400" />
                  ABTalks Official Cohort Certification
                </span>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  ✕ Close
                </button>
              </div>

              {/* CERTIFICATE CANVAS FRAME */}
              <div className="border-2 border-amber-500/30 rounded-2xl p-6 bg-slate-950 space-y-5 text-center relative">
                
                {/* Header Badge */}
                <div className="flex justify-center items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl text-amber-400">
                    🏆
                  </div>
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-amber-400">
                    Certificate of Completion
                  </h1>
                  <p className="text-[10px] text-amber-400/80 font-bold uppercase tracking-wider mt-1">
                    ABTalks Fullstack &amp; AI Engineering Cohort
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-400 italic">This is proudly presented to</p>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-100 underline decoration-amber-500/50 underline-offset-8">
                    {profileName}
                  </h2>
                </div>

                <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                  For successfully completing all <strong>60 Days</strong> of intensive fullstack software development, AI model integration, and vector RAG engineering in <strong>Indian Dev Cohort 05</strong>.
                </p>

                {/* Stats Metadata Grid */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-b border-white/10 py-3 text-center">
                  <div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase block">Challenges</span>
                    <span className="text-xs font-black text-emerald-400">60 / 60 Done</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase block">Streak</span>
                    <span className="text-xs font-black text-amber-400">🔥 60 Days</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase block">XP Earned</span>
                    <span className="text-xs font-black text-brand">⚡ 12,000 XP</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase block">Match Score</span>
                    <span className="text-xs font-black text-sky-400">98% SDE</span>
                  </div>
                </div>

                {/* Verification & Signatures */}
                <div className="flex justify-between items-end pt-3 text-left">
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Verification ID</span>
                    <span className="text-[10px] font-mono font-bold text-amber-400/90">CERT-ABTALKS-2026-6060</span>
                    <span className="text-[8px] text-slate-500 block mt-0.5">Issued: August 9, 2026</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-serif italic text-amber-300 border-b border-amber-500/40 pb-0.5">
                      ABTalks Cohort Board
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold block mt-0.5">Authorized Engineering Lead</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 print-no-show pt-2">
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-slate-800/50 py-3 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 py-3 text-xs font-black text-slate-950 transition-all active:scale-98 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download / Save as PDF Certificate →
                </button>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
