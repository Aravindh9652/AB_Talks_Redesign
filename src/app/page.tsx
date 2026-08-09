"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Terminal, 
  Code, 
  Briefcase, 
  Users, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Lock,
  Plus,
  Hourglass,
  RefreshCw,
  GitCommit,
  Share2,
  Trophy,
  Calendar,
  CheckCircle,
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { useMockState } from "./context/MockStateContext";
import ThemeSelector from "./components/ThemeSelector";

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

export default function LandingPage() {
  const router = useRouter();
  const { streak, updateProfile, initializeNewAccountLogs, loadUserProgress } = useMockState();

  // Authentication and Loading states
  const [authModal, setAuthModal] = useState<"login" | "signup" | "forgot" | "reset" | null>(null);
  const [isConnectingDashboard, setIsConnectingDashboard] = useState(false);

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirm, setShowNewConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupLocation, setSignupLocation] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");

  // Validation States
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);

  // Password Visibility States
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);

  // Helper to open modal with freshly cleared inputs
  const openAuthModal = (modalType: "login" | "signup" | "forgot" | "reset" | null) => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginError(null);
    setSignupName("");
    setSignupPhone("");
    setSignupEmail("");
    setSignupLocation("");
    setSignupPassword("");
    setSignupConfirm("");
    setSignupError(null);
    setForgotEmail("");
    setForgotError(null);
    setNewPassword("");
    setNewPasswordConfirm("");
    setResetSuccess(false);
    setAuthModal(modalType);
  };

  // Simulated DB state
  const [registeredUsers, setRegisteredUsers] = useState<Array<{
    name: string;
    email: string;
    phone: string;
    location: string;
    password?: string;
  }>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("abtalks_users");
    if (saved) {
      try {
        setRegisteredUsers(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Simple state toggling
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Compute Signup Progress fields count filled
  const signupProgress = [
    signupName,
    signupEmail,
    signupPassword,
    signupConfirm
  ].filter(Boolean).length;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter email and password.");
      return;
    }

    // Always read directly from localStorage (source of truth)
    let allUsers: Array<{ name: string; email: string; phone?: string; location?: string; password?: string }> = [];
    try {
      const saved = localStorage.getItem("abtalks_users");
      if (saved) {
        allUsers = JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }

    const emailMatch = allUsers.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (!emailMatch) {
      setLoginError("No account found with this email. Please Sign Up first.");
      return;
    }
    if (emailMatch.password !== loginPassword) {
      setLoginError("Wrong password! Please try again.");
      return;
    }
    const matchedUser = emailMatch;

    // Save current user identity to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("abtalks_current_user", JSON.stringify({
        name: matchedUser.name,
        email: matchedUser.email,
        phone: matchedUser.phone || "",
        location: matchedUser.location || "",
        bio: "A Motivated Btech Student",
        skills: "Java, c, c++, python"
      }));
    }

    // Set profile name/email in context
    updateProfile(
      matchedUser.name,
      matchedUser.email,
      matchedUser.phone || "",
      matchedUser.location || "",
      "A Motivated Btech Student",
      "Java, c, c++, python"
    );

    // Reload all saved progress for this specific user
    loadUserProgress(matchedUser.email);

    setAuthModal(null);
    setIsConnectingDashboard(true);
    setTimeout(() => {
      setIsConnectingDashboard(false);
      router.push("/dashboard");
    }, 1800);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    if (!forgotEmail) { setForgotError("Please enter your email."); return; }
    let allUsers: Array<{ email: string; password?: string }> = [];
    try {
      const saved = localStorage.getItem("abtalks_users");
      if (saved) allUsers = JSON.parse(saved);
    } catch (err) { console.error(err); }
    if (!allUsers.some(u => u.email.toLowerCase() === forgotEmail.toLowerCase())) {
      setForgotError("No account found with this email.");
      return;
    }
    setResetEmail(forgotEmail.toLowerCase());
    setNewPassword("");
    setNewPasswordConfirm("");
    setResetSuccess(false);
    setAuthModal("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    if (!newPassword || newPassword.length < 4) { setForgotError("Password must be at least 4 characters."); return; }
    if (newPassword !== newPasswordConfirm) { setForgotError("Passwords do not match!"); return; }
    try {
      const saved = localStorage.getItem("abtalks_users");
      if (saved) {
        const allUsers = JSON.parse(saved);
        const updated = allUsers.map((u: any) =>
          u.email.toLowerCase() === resetEmail ? { ...u, password: newPassword } : u
        );
        localStorage.setItem("abtalks_users", JSON.stringify(updated));
      }
    } catch (err) { console.error(err); }
    setResetSuccess(true);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (!signupName || !signupEmail || !signupPassword || !signupConfirm) {
      setSignupError("Please fill in all required fields.");
      return;
    }

    if (signupPassword !== signupConfirm) {
      setSignupError("Passwords do not match!");
      return;
    }

    if (registeredUsers.some(u => u.email.toLowerCase() === signupEmail.toLowerCase())) {
      setSignupError("An account with this email already exists!");
      return;
    }

    const newUser = {
      name: signupName,
      email: signupEmail,
      phone: signupPhone || "",
      location: signupLocation || "",
      password: signupPassword
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    localStorage.setItem("abtalks_users", JSON.stringify(updated));
    initializeNewAccountLogs();
    updateProfile(
      newUser.name,
      newUser.email,
      newUser.phone,
      newUser.location,
      "A Motivated Btech Student",
      "Java, c, c++, python"
    );
    setAuthModal(null);
    setIsConnectingDashboard(true);
    setTimeout(() => {
      setIsConnectingDashboard(false);
      router.push("/dashboard");
    }, 1800);
  };

  const toggleFaq = (idx: number) => {
    setFaqOpen(faqOpen === idx ? null : idx);
  };

  // Preview Journey cells (Day 1 - 30) - with completed ticks & missed crosses
  const journeyCells = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    let status: "completed" | "active" | "missed" | "locked" = "locked";
    if (day <= 11) {
      if (day === 9) status = "missed"; // Mark Day 9 as missed for wrong mark visualization
      else status = "completed";
    }
    else if (day === 12) status = "active";
    return { day, status };
  });

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern pb-24 overflow-x-hidden font-sans transition-colors duration-300">
      
      {/* Background Ambient Glows */}
      <div className="glow-orb top-[-10%] right-[-10%] w-[450px] h-[450px] bg-brand/15 transition-all duration-500" />
      <div className="glow-orb top-[40%] left-[-15%] w-[400px] h-[400px] bg-brand/10 transition-all duration-500" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
              <Code className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold tracking-tight text-sm">
              AB<span className="bg-gradient-to-r from-brand to-slate-300 bg-clip-text text-transparent">Talks</span>
            </span>
          </Link>
          
          {/* Header Actions matching pill colors from screenshot */}
          <div className="flex items-center gap-2">
            <ThemeSelector />
            <button 
              onClick={() => openAuthModal("login")}
              className="rounded-full bg-brand px-5 py-1.5 text-xs font-bold hover:bg-brand/90 transition-all cursor-pointer text-white shadow-sm shadow-brand/10"
            >
              Login
            </button>
            <button 
              onClick={() => openAuthModal("signup")}
              className="rounded-full bg-brand px-5 py-1.5 text-xs font-bold hover:bg-brand/90 transition-all cursor-pointer text-white shadow-sm shadow-brand/10"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 text-center max-w-md mx-auto relative z-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex h-10 w-32 items-center justify-center rounded-full bg-brand-acc border border-brand/20 text-[10px] font-bold text-brand transition-colors duration-500"
        >
          🚀 Indian Dev Cohort 05
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
        >
          60 Days. 60 Builds.<br />
          One Stronger You.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 text-xs text-slate-400 leading-relaxed max-w-sm mx-auto"
        >
          Build something every day. Track your progress. Build a public GitHub record. Share your journey on LinkedIn. Become more visible to recruiters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 flex flex-col gap-3 justify-center items-center"
        >
          <button
            onClick={() => openAuthModal("signup")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 px-6 text-xs font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand/90 hover:shadow-brand/35 transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer"
          >
            Claim Your Spot <ArrowRight className="h-4 w-4" />
          </button>
          <span className="text-[9px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Free for students. No card required.
          </span>
        </motion.div>
      </section>

      {/* What is ABTalks Section */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand transition-colors duration-500">What is ABTalks?</h2>
        <h3 className="text-xl font-extrabold tracking-tight text-slate-100 leading-snug">
          A supportive coding challenge built to turn college students into visible creators.
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          ABTalks runs a 60-day challenge where you pick an engineering track, build a functional project every single day, and prove your work by submitting a GitHub commit and sharing a LinkedIn update. No boring copy-paste tutorials—just daily code pushes that recruiters can verify.
        </p>
      </section>

      {/* Core Pillars / Explanations section */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand transition-colors duration-500">How You Grow</h2>
        
        <div className="space-y-4">
          <div className="flex gap-3.5 items-start p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
            <div className="h-8.5 w-8.5 rounded-lg bg-brand-acc text-brand flex items-center justify-center text-sm shrink-0 border border-brand/20 transition-colors duration-500">
              💻
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Build something every day</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Unlock intermediate building challenges daily at 8:00 PM. Deploy APIs, configure database networks, and orchestrate vector pipelines.</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
            <div className="h-8.5 w-8.5 rounded-lg bg-brand-acc text-brand flex items-center justify-center text-sm shrink-0 border border-brand/20 transition-colors duration-500">
              📈
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Track your progress</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Stay consistent using XP multipliers, rank levels, unlock badges, and leverage our pause recovery streak freeze options.</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
            <div className="h-8.5 w-8.5 rounded-lg bg-brand-acc text-brand flex items-center justify-center text-sm shrink-0 border border-brand/20 transition-colors duration-500">
              <Github className="h-4.5 w-4.5 text-brand" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Build a public GitHub record</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Create an active calendar profile verified by automated commit scanning. Demonstrate you build production code daily.</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
            <div className="h-8.5 w-8.5 rounded-lg bg-brand-acc text-brand flex items-center justify-center text-sm shrink-0 border border-brand/20 transition-colors duration-500">
              <Linkedin className="h-4.5 w-4.5 text-brand" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Share your journey on LinkedIn</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Publish daily progress updates. Build a supportive developer network and capture hiring managers' attention.</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
            <div className="h-8.5 w-8.5 rounded-lg bg-brand-acc text-brand flex items-center justify-center text-sm shrink-0 border border-brand/20 transition-colors duration-500">
              💼
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Become more visible to recruiters</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Get directly matched with top companies that prioritize engineering momentum and consistency over plain resumes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How the challenge works (Step Routine) */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5 space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand transition-colors duration-500">How it works</h2>
        
        <div className="relative space-y-8 pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-brand before:to-slate-800">
          <div className="relative">
            <span className="absolute -left-9 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border-2 border-brand text-[10px] font-bold text-brand z-10">1</span>
            <h4 className="text-xs font-bold text-slate-200">Grab Daily Task at 8:00 PM IST</h4>
            <p className="text-[10px] text-slate-400 mt-1">Each night, you get an intermediate project brief to configure and deploy locally.</p>
          </div>

          <div className="relative">
            <span className="absolute -left-9 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border-2 border-brand text-[10px] font-bold text-brand z-10">2</span>
            <h4 className="text-xs font-bold text-slate-200">Connect Proof & Daily Reflections</h4>
            <p className="text-[10px] text-slate-400 mt-1">Submit your Git commit hash, LinkedIn post link, and reflection logs to verify daily progress.</p>
          </div>

          <div className="relative">
            <span className="absolute -left-9 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border-2 border-brand text-[10px] font-bold text-brand z-10">3</span>
            <h4 className="text-xs font-bold text-slate-200">Lock Recruiter Visibility Indexes</h4>
            <p className="text-[10px] text-slate-400 mt-1">Maintain your streak. Once you cross Day 30, companies will match with your profile based on your momentum index.</p>
          </div>
        </div>
      </section>

      {/* 60-day journey visualization with green ticks & red crosses */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand transition-colors duration-500">Visualization</h2>
        <h3 className="text-base font-bold text-slate-200">60-Day Habit Matrix Journey</h3>
        <p className="text-[10px] text-slate-500">Daily contribution blocks representing engineering consistency.</p>

        <div className="grid grid-cols-10 gap-1.5 bg-slate-900/20 border border-white/5 p-4 rounded-2xl">
          {journeyCells.map((cell) => {
            let bgClass = "";
            let content = <span>{cell.day}</span>;
            
            if (cell.status === "completed") {
              bgClass = "bg-brand/85 border border-brand/25 text-white shadow-sm shadow-brand/10";
              content = (
                <div className="flex flex-col items-center justify-center h-full relative">
                  <span className="text-[6.5px] text-brand-acc font-semibold absolute top-0.5">{cell.day}</span>
                  <span className="text-[9px] text-emerald-400 font-extrabold mt-2.5">✓</span>
                </div>
              );
            } else if (cell.status === "missed") {
              bgClass = "bg-rose-500/15 border border-rose-500/30 text-rose-300";
              content = (
                <div className="flex flex-col items-center justify-center h-full relative">
                  <span className="text-[6.5px] text-rose-400/50 font-semibold absolute top-0.5">{cell.day}</span>
                  <span className="text-[9px] text-rose-500 font-black mt-2">✗</span>
                </div>
              );
            } else if (cell.status === "active") {
              bgClass = "bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold animate-pulse";
              content = <span className="font-extrabold">{cell.day}</span>;
            } else {
              bgClass = "bg-slate-900/60 border border-white/5 text-slate-600";
              content = <span>{cell.day}</span>;
            }
            
            return (
              <div 
                key={cell.day}
                className={`flex items-center justify-center text-[9px] aspect-square rounded-md transition-all relative overflow-hidden ${bgClass}`}
              >
                {content}
              </div>
            );
          })}
          <div className="col-span-10 flex items-center justify-center gap-4 text-[8px] text-slate-500 font-semibold mt-2.5 border-t border-white/5 pt-2">
            <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Completed</span>
            <span className="flex items-center gap-1"><span className="text-rose-500">✗</span> Missed Day</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-slate-800" /> Locked</span>
          </div>
        </div>
      </section>

      {/* polished Student Achievements */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand transition-colors duration-500">Achievements</h2>
        <h3 className="text-base font-bold text-slate-200">Consistency Badges</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-brand/20 bg-gradient-to-b from-brand/5 to-slate-900/40 p-4 text-center space-y-2.5 shadow-md shadow-brand/5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-xl border border-amber-500/25">
              🏆
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-200 tracking-tight leading-none">7d Streak</div>
              <span className="text-[8.5px] text-slate-500 font-bold uppercase block mt-1">Consistency</span>
            </div>
          </div>

          <div className="rounded-2xl border border-brand/20 bg-gradient-to-b from-brand/5 to-slate-900/40 p-4 text-center space-y-2.5 shadow-md shadow-brand/5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-xl border border-violet-500/25">
              🚀
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-200 tracking-tight leading-none">Day 1 Build</div>
              <span className="text-[8.5px] text-slate-500 font-bold uppercase block mt-1">Initiation</span>
            </div>
          </div>

          <div className="rounded-2xl border border-brand/20 bg-gradient-to-b from-brand/5 to-slate-900/40 p-4 text-center space-y-2.5 shadow-md shadow-brand/5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-xl border border-emerald-500/25">
              💻
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-200 tracking-tight leading-none">10 Builds</div>
              <span className="text-[8.5px] text-slate-500 font-bold uppercase block mt-1">Milestone</span>
            </div>
          </div>

          {/* 30d Momentum Badge */}
          <div className="rounded-2xl border border-brand/20 bg-gradient-to-b from-brand/5 to-slate-900/40 p-4 text-center space-y-2.5 shadow-md shadow-brand/5">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-xl border border-orange-500/25">
              🔥
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-200 tracking-tight leading-none">30d Momentum</div>
              <span className="text-[8.5px] text-slate-500 font-bold uppercase block mt-1">Hiring Catalyst</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand transition-colors duration-500">Social Proof</h2>
          <h3 className="text-lg font-bold text-slate-200">What Builders Say</h3>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4.5 space-y-2 text-xs">
            <p className="text-slate-300 leading-relaxed italic">
              &quot;I connected my GitHub daily pushes, and three weeks in, recruiter match indexes went up. Ended up matching and signing with CRED before Day 60.&quot;
            </p>
            <div className="text-[10px] text-slate-500 font-bold">
              — Akhil, BTech Graduate placed at CRED
            </div>
          </div>
          
          <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4.5 space-y-2 text-xs">
            <p className="text-slate-300 leading-relaxed italic">
              &quot;The streak recovery was my savior. I missed day 18 due to university exams, but the paused recovery quiz allowed me to freeze and save my streak without starting over.&quot;
            </p>
            <div className="text-[10px] text-slate-500 font-bold">
              — Vajja Aravindh, Cohort 05 builder
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Frequently Asked Questions (FAQ) */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5 space-y-6">
        <h2 className="text-2xl font-bold text-center tracking-tight text-slate-100">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {[
            { q: "Is this challenge completely free?", a: "Yes. ABTalks 60-day challenge is 100% free for all Indian college students. Our missions are sponsored by recruiting partner companies." },
            { q: "What if I miss a single day?", a: "We feature a Streak Paused Recovery program. Complete today's mission + a 10-minute conceptual engineering task to restore your previous momentum and streak." },
            { q: "Do I need to be an expert coder?", a: "No. The tracks start with baseline repository environments and scale gradually across 60 days to full REST APIs, vector configurations, and RAG search systems." },
            { q: "Can I change my track in the middle?", a: "Yes, you can swap tracks from your dashboard edge selector panel settings, but your current daily progress will be set to that track's baseline." },
            { q: "Are there any real-world projects?", a: "Yes, you construct REST APIs, connect databases, write rate-limiter middleware, and build vector DB indexes." },
            { q: "How do recruiters contact me?", a: "Once you complete Day 30, your Recruiter Card becomes shareable. Direct matches are initialized automatically based on SDE score metrics." }
          ].map((faq, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-slate-900/40 overflow-hidden">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full flex justify-between items-center p-4 text-xs font-semibold text-left text-slate-200 hover:bg-white/5 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
              </button>
              {faqOpen === i && (
                <div className="p-4 border-t border-white/5 bg-slate-950/20 text-[11px] text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="px-4 py-16 text-center max-w-md mx-auto relative z-10 border-t border-white/5 space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-100">
          Ready to Build Your Proof?
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
          Cohort 05 spots are filling up. Start building in public and unlock direct matches with companies.
        </p>
        <button
          onClick={() => openAuthModal("signup")}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 px-6 text-xs font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand/90 transition-all hover:scale-102 cursor-pointer"
        >
          Register for the Cohort <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      {/* POPUP MODAL: AUTHENTICATION */}
      <AnimatePresence>
        {authModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto"
          >
            {/* LOGIN OVERLAY VIEW */}
            {authModal === "login" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-xs rounded-3xl border border-brand/20 bg-slate-900 p-6 text-slate-100 shadow-2xl relative"
              >
                <button 
                  onClick={() => setAuthModal(null)}
                  className="absolute top-4 right-4 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>

                {/* Styled Lock Box Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand to-violet-900 text-white shadow-lg shadow-brand/20 mb-4">
                  <Lock className="h-7.5 w-7.5 text-amber-400 fill-amber-400/10" />
                </div>

                <div className="text-center space-y-1 mb-5">
                  <h3 className="text-base font-extrabold text-slate-100">Login to ABTalks</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Welcome back! Sign in to your account</p>
                </div>

                {loginError && (
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/25 p-2.5 text-center text-[10px] font-semibold text-rose-400 mb-4 animate-in fade-in zoom-in-95 duration-150">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                      📧 EMAIL ADDRESS
                    </label>
                    <input 
                      type="email" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                      🔑 PASSWORD
                    </label>
                    <div className="relative flex items-center">
                      <input 
                        type={showLoginPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full rounded-xl bg-slate-950 border border-white/10 pl-3.5 pr-10 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 text-slate-500 hover:text-slate-200 cursor-pointer p-0.5 select-none"
                      >
                        {showLoginPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>


                  {/* Forgot Password link */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => { setForgotEmail(loginEmail); setForgotError(null); setAuthModal("forgot"); }}
                      className="text-[9px] text-brand hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand py-3 text-xs font-bold text-white hover:bg-brand/90 transition-all active:scale-98 shadow-md shadow-brand/10 flex items-center justify-center gap-1"
                  >
                    🚀 LOGIN
                  </button>
                </form>

                <div className="text-center text-[10px] mt-5 text-slate-400">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => openAuthModal("signup")}
                    className="text-brand font-bold hover:underline"
                  >
                    Sign up here
                  </button>
                </div>
              </motion.div>
            )}

            {/* FORGOT PASSWORD VIEW */}
            {authModal === "forgot" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-xs rounded-3xl border border-brand/20 bg-slate-900 p-6 text-slate-100 shadow-2xl relative"
              >
                <button
                  onClick={() => { setAuthModal("login"); setForgotError(null); }}
                  className="absolute top-4 right-4 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 mb-4">
                  <span className="text-2xl">🔓</span>
                </div>

                <div className="text-center space-y-1 mb-5">
                  <h3 className="text-base font-extrabold text-slate-100">Forgot Password?</h3>
                  <p className="text-[10px] text-slate-500">Enter your email to reset your password</p>
                </div>

                {forgotError && (
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/25 p-2.5 text-center text-[10px] font-semibold text-rose-400 mb-4">
                    {forgotError}
                  </div>
                )}

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">📧 EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand py-3 text-xs font-bold text-white hover:bg-brand/90 transition-all active:scale-98 shadow-md shadow-brand/10"
                  >
                    Continue →
                  </button>
                </form>

                <div className="text-center text-[10px] mt-4 text-slate-500">
                  Remember it?{" "}
                  <button onClick={() => openAuthModal("login")} className="text-brand font-bold hover:underline">Back to Login</button>
                </div>
              </motion.div>
            )}

            {/* RESET PASSWORD VIEW */}
            {authModal === "reset" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-xs rounded-3xl border border-emerald-500/20 bg-slate-900 p-6 text-slate-100 shadow-2xl relative"
              >
                <button
                  onClick={() => setAuthModal("forgot")}
                  className="absolute top-4 right-4 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 mb-4">
                  <span className="text-2xl">🔑</span>
                </div>

                {resetSuccess ? (
                  <div className="text-center space-y-4">
                    <div className="text-4xl">🎉</div>
                    <h3 className="text-base font-extrabold text-emerald-400">Password Reset!</h3>
                    <p className="text-[10px] text-slate-400">Your password has been updated successfully.</p>
                    <button
                      onClick={() => { openAuthModal("login"); }}
                      className="w-full rounded-xl bg-brand py-3 text-xs font-bold text-white hover:bg-brand/90 transition-all mt-2"
                    >
                      Back to Login →
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-center space-y-1 mb-5">
                      <h3 className="text-base font-extrabold text-slate-100">Set New Password</h3>
                      <p className="text-[10px] text-slate-500 truncate">for <span className="text-brand font-bold">{resetEmail}</span></p>
                    </div>

                    {forgotError && (
                      <div className="rounded-xl bg-rose-500/10 border border-rose-500/25 p-2.5 text-center text-[10px] font-semibold text-rose-400 mb-4">
                        {forgotError}
                      </div>
                    )}

                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">🔑 NEW PASSWORD</label>
                        <div className="relative flex items-center">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••"
                            className="w-full rounded-xl bg-slate-950 border border-white/10 pl-3.5 pr-10 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand"
                          />
                          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 text-slate-500 hover:text-slate-200">
                            {showNewPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">✅ CONFIRM PASSWORD</label>
                        <div className="relative flex items-center">
                          <input
                            type={showNewConfirm ? "text" : "password"}
                            value={newPasswordConfirm}
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                            placeholder="••••••"
                            className="w-full rounded-xl bg-slate-950 border border-white/10 pl-3.5 pr-10 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand"
                          />
                          <button type="button" onClick={() => setShowNewConfirm(!showNewConfirm)} className="absolute right-3 text-slate-500 hover:text-slate-200">
                            {showNewConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3 text-xs font-bold text-white transition-all active:scale-98 shadow-md shadow-emerald-500/20"
                      >
                        Reset Password ✓
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            )}

            {/* SIGNUP OVERLAY VIEW */}
            {authModal === "signup" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm rounded-3xl border border-brand/20 bg-slate-900 p-6 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
              >
                <button 
                  onClick={() => setAuthModal(null)}
                  className="absolute top-4 right-4 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>

                {/* Sparkle Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-700 text-white shadow-lg shadow-pink-500/20 mb-4">
                  <Sparkles className="h-7.5 w-7.5 text-amber-300 fill-amber-300/10" />
                </div>

                <div className="text-center space-y-1 mb-4">
                  <h3 className="text-base font-extrabold text-slate-100">Create Your Account</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Join thousands making a difference!</p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest">
                    <span>PROGRESS</span>
                    <span>{signupProgress}/4 fields</span>
                  </div>
                  <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand transition-all duration-300"
                      style={{ width: `${(signupProgress / 4) * 100}%` }}
                    />
                  </div>
                </div>

                {signupError && (
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/25 p-2.5 text-center text-[10px] font-semibold text-rose-400 mb-4 animate-in fade-in zoom-in-95 duration-150">
                    {signupError}
                  </div>
                )}

                <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    
                    {/* Full name */}
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400">👤 FULL NAME</label>
                      <input 
                        type="text" 
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400">📱 PHONE (OPTIONAL)</label>
                      <input 
                        type="text" 
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">📧 EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">📍 LOCATION (OPTIONAL)</label>
                    <input 
                      type="text" 
                      value={signupLocation}
                      onChange={(e) => setSignupLocation(e.target.value)}
                      placeholder="City, State"
                      className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    
                    {/* Password */}
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400">🔑 PASSWORD</label>
                      <div className="relative flex items-center">
                        <input 
                          type={showSignupPassword ? "text" : "password"}
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="••••••"
                          className="w-full rounded-xl bg-slate-950 border border-white/10 pl-3 pr-8 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-2 text-slate-500 hover:text-slate-200 cursor-pointer p-0.5 select-none"
                        >
                          {showSignupPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm */}
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400">✅ CONFIRM PASSWORD</label>
                      <div className="relative flex items-center">
                        <input 
                          type={showSignupConfirm ? "text" : "password"}
                          value={signupConfirm}
                          onChange={(e) => setSignupConfirm(e.target.value)}
                          placeholder="••••••"
                          className="w-full rounded-xl bg-slate-950 border border-white/10 pl-3 pr-8 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupConfirm(!showSignupConfirm)}
                          className="absolute right-2 text-slate-500 hover:text-slate-200 cursor-pointer p-0.5 select-none"
                        >
                          {showSignupConfirm ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 py-3 text-xs font-bold text-white transition-all active:scale-98 shadow-md shadow-pink-500/10 flex items-center justify-center gap-1.5 mt-2"
                  >
                    🎉 CREATE ACCOUNT
                  </button>
                </form>

                <div className="text-center text-[10px] mt-4 text-slate-400">
                  Already have an account?{" "}
                  <button 
                    onClick={() => openAuthModal("login")}
                    className="text-brand font-bold hover:underline"
                  >
                    Login here
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN REFRESH DASHBOARD LOADER MODAL */}
      <AnimatePresence>
        {isConnectingDashboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 border border-brand/20 text-brand shadow-lg shadow-brand/15 mb-4">
              <RefreshCw className="h-7 w-7 animate-spin" />
            </div>
            <h3 className="text-sm font-bold text-slate-200">Connecting workspace...</h3>
            <p className="text-[10px] text-slate-500 mt-1">Loading your custom student dashboard</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
