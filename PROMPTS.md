# ABTalks Redesign - AI Vibe-Coding Prompt Log

This document lists the exact step-by-step prompt history used with Claude to generate this premium, mobile-first redesign of the ABTalks platform.

---

### Step 1: Design System & Color Palette Planning

**Prompt:**
> Act as an elite lead product designer from Stripe or Apple. I need to redesign the ABTalks 60-day coding challenge dashboard. The platform helps Indian college students build coding consistency by pushing a daily GitHub commit and writing a LinkedIn post. Most users access it on their phones late at night.
> 
> Let's start by defining a premium, dark-mode design system. We need custom glassmorphism styles, glowing neon violet/indigo ambient borders, soft transitions, and modern typography variables (Inter/Geist). Let's prepare a global Tailwind CSS configuration and setup the basic CSS variables. Make sure it supports smooth scrollbars, hidden default layouts, and is fully tailored for mobileview (390px width).

---

### Step 2: Edge Cases & Mock State Management

**Prompt:**
> I want to make sure we support every potential edge case in the hackathon. Let's build a client-side React Context (`MockStateContext`) that holds mock data for:
> 1. A typical day progress (e.g. Day 12 with active 11-day streak)
> 2. First Day (0 streak, no repositories connected, clean UI prompt)
> 3. Missed Day (yesterday's deadline missed, broken streak alert, freeze streak options)
> 4. Challenge Completed (all 60 days finished, winner mode, high-priority placement status)
> 
> We should also create a floating "Judge State Controller" panel component that remains sticky in the bottom-right corner of the screen during local testing. This allows judges to instantly toggle between these states on the live website to see how the UI adapts to each edge case without modifying any code. Include automatic confetti execution on submission validation.

---

### Step 3: Landing Page (/) Redesign

**Prompt:**
> Let's build the main Landing Page (`/`). It needs to be extremely inspirational, convincing a student to commit to a 60-day challenge in seconds.
> Include:
> - A premium Apple-style hero section: "Commit to 60 Days. Build in Public. Get Hired."
> - An interactive mock CLI terminal mockup showing the student initiating their workspace.
> - Animated stats (Students enrolled, active commits, placements) and a Recruiter Trust section (Razorpay, Stripe, CRED).
> - Core value proposition cards with details on GitHub & LinkedIn proof-of-work.
> - A step-by-step visual vertical timeline: "1. Unlock Daily Task", "2. Submit Proof", "3. Match with Recruiters".
> - A premium collapsible FAQ section.
> - An action-oriented Bottom CTA container.
> Make it fully mobile-first (responsive at 390px, one-thumb usability).

---

### Step 4: Student Dashboard (/dashboard) Redesign

**Prompt:**
> Now let's build the Student Dashboard page (`/dashboard`). It should feel like a motivational dashboard, not an admin panel.
> We must include:
> - Header with Level badge and animated Streak flame.
> - Today's Task Card (Day 12: Build & Deploy RAG Pipeline) with difficulty, estimates, rewards (+200 XP), and a submit button.
> - An innovative "Recruiter Visibility Score Meter" indicating match percentage (0% to 100% based on streak/completed days).
> - Modern status grids for GitHub/LinkedIn connections.
> - AI Coach insight card giving personalized daily advice based on their current streak state.
> - 60-Day Habit Matrix (contribution calendar grid) where completed days are violet, active is flashing amber, missed is rose, and locked is dark slate.
> - SVG Consistency Index line chart showing weeks of stable coding.
> - Submission log history showing recent days, commit hashes, and detailed AI feedback messages.
> Keep the design extremely clean, dark, and highly readable on 390px viewport.

---

### Step 5: Challenge Day (/day/12) Route

**Prompt:**
> Let's implement the Challenge Day page `/day/12`. Treat the day's challenge like a "Mission".
> Include:
> - Difficulty levels, track category, and estimated time.
> - Expandable learning objectives list with custom checkboxes.
> - Recommended clickable external resource cards.
> - Submission requirements checklist.
> - Interactive Proof of Work form containing text inputs for GitHub Repo URL, Commit Message, and LinkedIn Post URL.
> - Submit loading animation states ("Verifying commit on main branch...").
> - An AnimatePresence modal overlay that appears upon successful verification, showing a checkmark, updated streak days count, and "+200 XP" rewards. Make sure it routes back to the dashboard upon completion.
