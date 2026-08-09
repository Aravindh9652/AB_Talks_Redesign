# ABTalks Redesign — AI Development Prompt Log

This document provides a complete, chronological log of all AI prompts and engineering instructions used to design, develop, refine, and deploy the ABTalks 60-Day Coding Challenge platform.

---

## Prompt 1 — Design System & Color Palette Architecture

```text
Act as an elite lead product designer from Stripe or Apple. I need to redesign the ABTalks 60-day coding challenge dashboard. The platform helps Indian college students build coding consistency by pushing a daily GitHub commit and writing a LinkedIn post. Most users access it on their phones late at night.

Let's start by defining a premium, dark-mode design system. We need custom glassmorphism styles, glowing neon violet/indigo ambient borders, soft transitions, and modern typography variables (Inter/Geist). Let's prepare a global Tailwind CSS configuration and setup the basic CSS variables. Make sure it supports smooth scrollbars, hidden default layouts, and is fully tailored for mobileview (390px width).
```

---

## Prompt 2 — Mock State Context & Judge State Controller

```text
I want to make sure we support every potential edge case in the hackathon. Let's build a client-side React Context (`MockStateContext`) that holds mock data for:
1. A typical day progress (e.g. Day 12 with active 11-day streak)
2. First Day (0 streak, no repositories connected, clean UI prompt)
3. Missed Day (yesterday's deadline missed, broken streak alert, freeze streak options)
4. Challenge Completed (all 60 days finished, winner mode, high-priority placement status)

We should also create a floating "Judge State Controller" panel component that remains sticky in the bottom-right corner of the screen during local testing. This allows judges to instantly toggle between these states on the live website to see how the UI adapts to each edge case without modifying any code. Include automatic confetti execution on submission validation.
```

---

## Prompt 3 — Landing Page (/) Mobile-First Redesign

```text
Let's build the main Landing Page (`/`). It needs to be extremely inspirational, convincing a student to commit to a 60-day challenge in seconds.
Include:
- A premium Apple-style hero section: "Commit to 60 Days. Build in Public. Get Hired."
- An interactive mock CLI terminal mockup showing the student initiating their workspace.
- Animated stats (Students enrolled, active commits, placements) and a Recruiter Trust section (Razorpay, Stripe, CRED).
- Core value proposition cards with details on GitHub & LinkedIn proof-of-work.
- A step-by-step visual vertical timeline: "1. Unlock Daily Task", "2. Submit Proof", "3. Match with Recruiters".
- A premium collapsible FAQ section.
- An action-oriented Bottom CTA container.
Make it fully mobile-first (responsive at 390px, one-thumb usability).
```

---

## Prompt 4 — Student Dashboard (/dashboard) Interface

```text
Now let's build the Student Dashboard page (`/dashboard`). It should feel like a motivational dashboard, not an admin panel.
We must include:
- Header with Level badge and animated Streak flame.
- Today's Task Card (Day 12: Build & Deploy RAG Pipeline) with difficulty, estimates, rewards (+200 XP), and a submit button.
- An innovative "Recruiter Visibility Score Meter" indicating match percentage (0% to 100% based on streak/completed days).
- Modern status grids for GitHub/LinkedIn connections.
- AI Coach insight card giving personalized daily advice based on their current streak state.
- 60-Day Habit Matrix (contribution calendar grid) where completed days are violet, active is flashing amber, missed is rose, and locked is dark slate.
- SVG Consistency Index line chart showing weeks of stable coding.
- Submission log history showing recent days, commit hashes, and detailed AI feedback messages.
Keep the design extremely clean, dark, and highly readable on 390px viewport.
```

---

## Prompt 5 — Challenge Mission Route (/day/12) Implementation

```text
Let's implement the Challenge Day page `/day/12`. Treat the day's challenge like a "Mission".
Include:
- Difficulty levels, track category, and estimated time.
- Expandable learning objectives list with custom checkboxes.
- Recommended clickable external resource cards.
- Submission requirements checklist.
- Interactive Proof of Work form containing text inputs for GitHub Repo URL, Commit Message, and LinkedIn Post URL.
- Submit loading animation states ("Verifying commit on main branch...").
- An AnimatePresence modal overlay that appears upon successful verification, showing a checkmark, updated streak days count, and "+200 XP" rewards. Make sure it routes back to the dashboard upon completion.
```

---

## Prompt 6 — Codebase Audit & Required Routes Inspection

```text
We are continuing an existing ABTalks hackathon project.
Do NOT rebuild the project from scratch.
First inspect the existing codebase and understand what has already been implemented.

Project goal:
Redesign ABTalks, a 60-day coding challenge platform for Indian college students.

Required routes:
/
/dashboard
/day/12

The project is mobile-first and judges will evaluate it at 390px width.

Already implemented:
1. Landing page
2. Student dashboard
3. Challenge Day 12
4. First-day edge case
5. Missed-day edge case
6. Streak recovery experience
7. Empty-profile edge case

First:
1. Inspect the entire repository.
2. Understand the current architecture.
3. Identify the existing design system.
4. Identify what features are already implemented.
5. Check all three required routes.
6. Check mobile responsiveness at 390px.
7. Tell me what is currently implemented and what remains unfinished.

Do not modify code yet. Wait for my next instruction.
```

---

## Prompt 7 — 60-Day Habit Matrix Interactive Submission Lookup Fix

```text
In all modes in Jump State Controller (Default Day 12, First Day, Missed Day, Empty Profile, Complete 60 Days), in the 60-Day Matrix:
- Default Day 12: Before day 12 or up to day 12, if I click any completed day it should show the submission info popup of that day.
- First Day: If I submit on first day then click day 1, it should show the submission popup.
- Missed Day: For all completed days up to streak day, clicking should show the submission info.
- Empty Profile: Clicking completed days should show submission info.
- Complete 60 Days: Clicking ANY day (1 through 60) must show submission details for that day.

Please change this only and do not change anything else.
```

---

## Prompt 8 — Production Deployment Setup & Vercel Configuration

```text
Now everything is up to date, so please help me deploy this project to Vercel production and link it with GitHub.
```

---

## Prompt 9 — Authentication Form Field Reset & Logout Session Cleanup

```text
When I open the deployed link, everything is okay, but there is a problem with Login & Sign Up. For example, if I create an account & login, and then logout, when I click Login again, old account details or pre-filled values appear in the fields. Please clean this up so opening Login or Sign Up gives a completely fresh, empty form, and then deploy to Vercel after committing to git.
```

---

## Prompt 10 — Browser Credential Anti-Autofill & Password Manager Protection

```text
See again coming, when I open Login, saved browser credentials (like siva@gmail.com and saved password) are being auto-filled by the browser with blue background tint. Do not let the browser pre-fill saved passwords on open. Keep inputs completely clean on launch, commit to git, and deploy to Vercel.
```
