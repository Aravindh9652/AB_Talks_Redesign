# ABTalks Redesign — AI Development Prompt Log

This document provides a complete, chronological log of all AI prompts and engineering instructions used to design, develop, refine, and deploy the ABTalks 60-Day Coding Challenge platform.

---

## Prompt 1 — Design System & Color Palette Architecture

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
Act as an elite lead product designer from Stripe or Apple. I need to redesign the ABTalks 60-day coding challenge dashboard. The platform helps Indian college students build coding consistency by pushing a daily GitHub commit and writing a LinkedIn post. Most users access it on their phones late at night.

Let's start by defining a premium, dark-mode design system. We need custom glassmorphism styles, glowing neon violet/indigo ambient borders, soft transitions, and modern typography variables (Inter/Geist). Let's prepare a global Tailwind CSS configuration and setup the basic CSS variables. Make sure it supports smooth scrollbars, hidden default layouts, and is fully tailored for mobileview (390px width).
```

---

## Prompt 2 — Edge Cases & Mock State Management

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
I want to make sure we support every potential edge case in the hackathon. Let's build a client-side React Context (`MockStateContext`) that holds mock data for:
1. A typical day progress (e.g. Day 12 with active 11-day streak)
2. First Day (0 streak, no repositories connected, clean UI prompt)
3. Missed Day (yesterday's deadline missed, broken streak alert, freeze streak options)
4. Challenge Completed (all 60 days finished, winner mode, high-priority placement status)

We should also create a floating "Judge State Controller" panel component that remains sticky in the bottom-right corner of the screen during local testing. This allows judges to instantly toggle between these states on the live website to see how the UI adapts to each edge case without modifying any code. Include automatic confetti execution on submission validation.
```

---

## Prompt 3 — Landing Page (/) Redesign

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

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

## Prompt 4 — Student Dashboard (/dashboard) Redesign

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

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

## Prompt 5 — Challenge Mission Route (/day/12)

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

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

## Prompt 6 — Codebase Inspection & Verification

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

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

## Prompt 7 — 60-Day Matrix Submission Lookup

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
In all modes in Jump State Controller (Default Day 12, First Day, Missed Day, Empty Profile, Complete 60 Days), whenever I click on any day in the 60-Day Matrix:
- Default Day 12: Before day 12 or up to day 12, if I click it should show the submission info of that day.
- First Day: If I submit on first day then click it should show.
- Missed Day: Except missed day & remaining day, it should show submission info for all completed days up to streak day.
- Empty Profile: Clicking completed days should show submission info.
- Complete 60 Days: It must show submission info for all 60 days.

Please change this only and do not change anything else.
```

---

## Prompt 8 — Production Deployment Setup

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
Now everything is up to date, so please help me deploy this project to Vercel production and link it with GitHub.
```

---

## Prompt 9 — Authentication Form Field Reset & Session Cleanup

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
When I open the deployed link, if I create an account & login and then logout, when I click Login again, old account details are appearing pre-filled. Please fix this so opening Login or Sign Up gives a clean form with empty input fields every time, and then deploy to Vercel after committing.
```

---

## Prompt 10 — Browser Credential Anti-Autofill Protection

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
When opening the Login modal, saved browser credentials (like siva@gmail.com) are being auto-filled by Chrome/Edge password managers. Please add trap fields, dynamic keys, and anti-autofill rules so browser password managers never pre-fill saved passwords, commit to git, and deploy to Vercel.
```

---

## Prompt 11 — First Day & Missed Day Edge Cases

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
Handle the first-day and missed-day states required by the ABTalks hackathon brief.

First Day:
- Show 0-day streak appropriately.
- Make the experience motivational.
- Show Day 1 as the starting point.

Missed Day:
- Clearly communicate that a challenge day was missed.
- Provide a thoughtful streak recovery experience.
- Do not leave the dashboard in a broken or empty state.

Do not change unrelated functionality.
```

---

## Prompt 12 — Streak Recovery

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
Improve the missed-day streak recovery experience.

Give the student two recovery choices:
1. Spend XP / tokens to recover the missed challenge.
2. Complete an additional recovery mission (e.g. Peer AI Code Audit or Vector DB Quiz) instead of spending XP.

Make both choices clear and explain their consequences.
Keep the experience supportive rather than punitive.
```

---

## Prompt 13 — Empty Profile Edge Case

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
Handle the empty-profile edge case.

When profile information is missing, do not display broken, empty, or meaningless values.

Create a polished onboarding state that encourages the student to complete their profile and connect their relevant information.

Keep the experience consistent with the existing ABTalks design.
Do not change unrelated functionality.
```

---

## Prompt 14 — Complete Profile Experience

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
Improve the complete-profile experience.

Make profile completion feel like part of the student's 60-day learning journey rather than a generic settings form.

Show clear progress toward profile completion and provide a strong call to action.

Preserve the existing visual language and mobile-first design.
```

---

## Prompt 15 — 60-Day Matrix Update

> Reconstructed from the development instructions available after the original Antigravity conversation history was lost.

```text
Improve the 60-Day Habit Matrix.

Clearly distinguish:
- Completed days
- Current day
- Upcoming days
- Missed days
- Locked days

Maintain the existing interaction where completed days can show their submission information.

Make sure the matrix remains usable at a 390px mobile viewport.
```
