"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Hourglass
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
  const { streak, daysCompletedCount } = useMockState();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const faqs = [
    {
      q: "What is the ABTalks 60-Day Challenge?",
      a: "It's a structured program designed for Indian engineering students to build consistency. You commit to writing code daily for 60 days and sharing your proof-of-work publicly on GitHub and LinkedIn. It builds your coding habits and makes you highly visible to premium tech recruiters."
    },
    {
      q: "Do I have to pay anything to join?",
      a: "No! The challenge is 100% free for all students. We partner with tech companies and recruiters who fund the platform so they can discover top-tier, consistent talent directly."
    },
    {
      q: "What happens if I miss a day?",
      a: "Consistency is key. If you miss a day, your public streak resets to zero. However, we have a 'Streak Freeze' recovery path which lets you repair your streak by completing weekly engineering concepts challenges or by using your streak freeze tokens."
    },
    {
      q: "How does the Recruiter Visibility work?",
      a: "Every submission is parsed. Your consistency, code quality, and engagement on LinkedIn are calculated into a 'Momentum Score'. Recruiters can search and filter students based on their tracks and Momentum Scores, giving you direct interview leads."
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern pb-12 overflow-x-hidden font-sans">
      
      {/* Background Ambient Glows */}
      <div className="glow-orb top-[-10%] left-[20%] w-[500px] h-[500px] bg-brand/20 transition-all duration-500" />
      <div className="glow-orb top-[40%] right-[-10%] w-[400px] h-[400px] bg-brand/10 transition-all duration-500" />
      <div className="glow-orb bottom-[-5%] left-[10%] w-[600px] h-[600px] bg-brand/15 transition-all duration-500" />

      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand shadow-md shadow-brand/25 transition-colors duration-500">
              <Terminal className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-sans font-bold tracking-tight text-lg">
              AB<span className="bg-gradient-to-r from-brand to-slate-300 bg-clip-text text-transparent">Talks</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeSelector />
            <Link
              href="/dashboard"
              className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              Dashboard <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-10 pb-16 text-center max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold text-violet-400 backdrop-blur-sm"
        >
          <Sparkles className="h-3 w-3" />
          <span>Cohort 05 Starting Soon</span>
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
          <Link
            href="/dashboard"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 px-6 text-xs font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand/90 hover:shadow-brand/35 transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200"
          >
            Claim Your Spot <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-[9px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Free for students. No card required.
          </span>
        </motion.div>

        {/* Live Mock Interactive Terminal illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 text-left shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/5 bg-slate-950 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <span className="font-mono text-[10px] text-slate-500">abtalks-cli --vibe-check</span>
            <span className="h-3.5 w-3.5 rounded bg-violet-500/20" />
          </div>
          <div className="p-4 font-mono text-[11px] space-y-2 leading-relaxed text-slate-300">
            <div className="text-slate-500">// Initialize challenge environment</div>
            <div>
              <span className="text-violet-400">candid-dev$</span> agy init --track=ai-engineering
            </div>
            <div className="text-emerald-400">✓ AI Cohort track initialized successfully!</div>
            <div>
              <span className="text-violet-400">candid-dev$</span> agy status --day=12
            </div>
            <div className="text-slate-400 flex flex-col gap-1 pl-2">
              <span>Day 12 Mission: Build & Deploy RAG Pipeline</span>
              <span>Requirements: GitHub Commit + LinkedIn Share</span>
              <span>XP Reward: +200 XP | Level: {streak >= 12 ? "4" : "3"}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Animated Stats Section */}
      <section className="px-4 py-8 max-w-md mx-auto relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-4 backdrop-blur-sm text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10">
              <Users className="h-4.5 w-4.5 text-brand" />
            </div>
            <div className="text-xl font-bold tracking-tight">12,450+</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Active Builders</div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-4 backdrop-blur-sm text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10">
              <Flame className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
            </div>
            <div className="text-xl font-bold tracking-tight">842k+</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Commits Pushed</div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-4 backdrop-blur-sm text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10">
              <Briefcase className="h-4.5 w-4.5 text-brand" />
            </div>
            <div className="text-xl font-bold tracking-tight">1,820+</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Student Placements</div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-4 backdrop-blur-sm text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-400" />
            </div>
            <div className="text-xl font-bold tracking-tight">3.2x</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Visibility Boost</div>
          </div>
        </div>
      </section>

      {/* Recruiter Trust Section */}
      <section className="px-4 py-8 text-center max-w-md mx-auto relative z-10 border-t border-white/5 mt-6">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Recruited By Engineers At</span>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 opacity-60 text-xs font-bold text-slate-400">
          <span className="hover:text-white transition-colors">Razorpay</span>
          <span className="hover:text-white transition-colors">Stripe</span>
          <span className="hover:text-white transition-colors font-mono">CRED</span>
          <span className="hover:text-white transition-colors">BrowserStack</span>
          <span className="hover:text-white transition-colors">Atlassian</span>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center tracking-tight text-slate-100 mb-8">
          Slightly Different Coding
        </h2>

        <div className="space-y-4">
          <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20">
              <Code className="h-5 w-5 text-brand" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">AI Career DNA Mapping</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Calculates real-time competency indices for vector databases, agent orchestration, and code completeness to match you directly to SDE target roles.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20">
              <TrendingUp className="h-5 w-5 text-brand" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Recruiter Preview Cards</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Generates a polished shareable public portfolio link illustrating your habit calendar, commit consistency, and SDE ready score indices.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20">
              <Hourglass className="h-5 w-5 text-brand" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Time Capsule reflections</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Write a one-line reflection note daily as you submit. On Day 60, download a beautiful visual story summarizing your complete 60-day engineering arc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (The 3-Step Routine) */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center tracking-tight text-slate-100 mb-8">
          The 3-Step System
        </h2>

        <div className="relative space-y-8 pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-brand before:to-slate-800">
          
          {/* Step 1 */}
          <div className="relative">
            <span className="absolute -left-9 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border-2 border-brand text-[10px] font-bold text-brand z-10">
              1
            </span>
            <h3 className="text-sm font-semibold text-slate-200">Unlock the Daily Task</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Every day at 8:00 PM IST, the challenge releases a specific building objective along with structured resources.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <span className="absolute -left-9 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border-2 border-brand text-[10px] font-bold text-brand z-10">
              2
            </span>
            <h3 className="text-sm font-semibold text-slate-200">Submit Commit & Social proof</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Submit your GitHub commit hash, LinkedIn link, and daily reflection before midnight. Our system validates it automatically.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <span className="absolute -left-9 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border-2 border-brand text-[10px] font-bold text-brand z-10">
              3
            </span>
            <h3 className="text-sm font-semibold text-slate-200">Unlock Recruitment Matches</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Maintain a streak. Once you cross Day 30, companies will match with your profile based on your momentum index.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center tracking-tight text-slate-100 mb-8">
          Student Success Stories
        </h2>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/10 to-transparent pointer-events-none" />
            <p className="text-xs italic text-slate-300 leading-relaxed">
              &quot;I completed the 60-day challenge and my LinkedIn profile started gaining traction. A hiring manager from Razorpay saw my Day 42 vector database submission and messaged me. I got hired!&quot;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold">
                AS
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">Aravind Sharma</div>
                <div className="text-[9px] text-slate-500">Software Engineer @ Razorpay</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/30 p-5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent pointer-events-none" />
            <p className="text-xs italic text-slate-300 leading-relaxed">
              &quot;Before ABTalks, I was struggling with consistency. The XP system, daily feedback, and streak flame motivated me to build. My repository went from empty to a rich canvas of actual projects.&quot;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                KP
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">Kavita Patel</div>
                <div className="text-[9px] text-slate-500">Backend Intern @ CRED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12 max-w-md mx-auto relative z-10 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center tracking-tight text-slate-100 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-slate-900/20 overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggleFaq(i)}
                className="flex w-full items-center justify-between p-4 text-left text-xs font-semibold text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${activeFaq === i ? "rotate-180 text-violet-400" : ""}`} />
              </button>
              
              {activeFaq === i && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3 animate-in slide-in-from-top duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-16 text-center max-w-md mx-auto relative z-10 border-t border-white/5">
        <div className="relative rounded-3xl border border-violet-500/20 bg-gradient-to-tr from-slate-900 to-slate-950 p-6 shadow-2xl">
          <div className="absolute inset-0 rounded-3xl bg-violet-600/5 opacity-50 blur-sm pointer-events-none" />
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
            Ready to Accelerate Your Career?
          </h2>
          <p className="mt-3 text-xs text-slate-400 leading-relaxed">
            Join thousands of Indian engineering students who have chosen building in public over textbook theory.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-500 hover:shadow-violet-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200"
            >
              Start Free Challenge <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-white/5 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <div>© 2026 ABTalks Inc. All rights reserved.</div>
        <div className="mt-1">Built for the ABTalks Hackathon. Designed Mobile-First.</div>
      </footer>
    </div>
  );
}
