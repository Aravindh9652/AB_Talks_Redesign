# ABTalks Redesign — 60-Day Code Challenge Platform

A premium, mobile-first redesign of the **ABTalks 60-Day Coding Challenge** platform for Indian college students. Built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, and engineered specifically for mobile builders (evaluated at **390px viewport**).

---

## 🌐 Live Production & Resources

- 🚀 **Live Production Application**: [https://abtalks-redesign-ruddy.vercel.app](https://abtalks-redesign-ruddy.vercel.app)
- 📁 **Public GitHub Repository**: [https://github.com/Aravindh9652/AB_Talks_Redesign](https://github.com/Aravindh9652/AB_Talks_Redesign)
- 📝 **AI Usage Log (`PROMPTS.md`)**: [https://github.com/Aravindh9652/AB_Talks_Redesign/blob/main/PROMPTS.md](https://github.com/Aravindh9652/AB_Talks_Redesign/blob/main/PROMPTS.md)

---

## 🗺️ Required Route Map (390px Viewport)

Judges can open and test the mandatory hackathon routes directly on the live deployed web app:

| Route Path | Description | Live Link |
| :--- | :--- | :--- |
| **`/`** | Landing Page — Apple-style Hero, CLI terminal mockup, trust section, timeline & FAQ | [Open Landing Page](https://abtalks-redesign-ruddy.vercel.app/) |
| **`/dashboard`** | Student Dashboard — Daily task, Recruiter Score, 60-day matrix, Profile Hub & Activity logs | [Open Dashboard](https://abtalks-redesign-ruddy.vercel.app/dashboard) |
| **`/day/12`** | Challenge Day 12 — Mission overview, resource guides, proof-of-work submission form & celebration overlay | [Open Day 12 Challenge](https://abtalks-redesign-ruddy.vercel.app/day/12) |

---

## ⚡ Floating Judge State Controller

To facilitate instant hackathon evaluation across all mandatory edge cases without editing any code or altering databases:

A **floating action widget** is anchored in the bottom-right corner of the live web app (`/dashboard`). Clicking this widget lets reviewers hot-swap between edge case presets in real time:

1. ⚡ **Default Day 12**: Active 11-day streak, pending Day 12 RAG Pipeline task, connected developer links.
2. 🚀 **First Day (0 Streak)**: Clean slate onboarding, 0 streak state, setup guides, initial baseline task.
3. ⚠️ **Missed Day (Streak Paused)**: Streak broken alert, freeze token status, and supportive recovery options.
4. 👤 **Empty Profile Onboarding**: Polished incomplete profile state with step-by-step portfolio completion CTA.
5. 🏅 **Completed (60/60)**: 60-day cohort winner state, certificate download modal, capstone placement status.

---

## ✨ Core Features & Product Concept

- **Proof-of-Work Consistency**: Students maintain a daily streak by submitting GitHub commits and sharing LinkedIn build posts.
- **Supportive Streak Recovery**: Instead of penalizing students with a flat reset, missed days offer choice-based recovery (spending XP or completing a recovery task/quiz).
- **Interactive 60-Day Habit Matrix**: A visual contribution heatmap grid mapping locked, active, missed, and completed days. **Tapping any completed day opens its historical submission details modal!**
- **Recruiter Visibility Score Meter**: An interactive meter calculating real-time recruiter matching potential based on code consistency.
- **Glassmorphic Design System**: Deep slate palette (`#020617`), ambient radial glow orbs, linear-style gradient borders, custom scrollbars, and dynamic Light/Dark mode switcher.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Celebrations**: `canvas-confetti`
- **Deployment**: Vercel Production

---

## 💻 Local Development Setup

First, clone the repository and install dependencies:

```bash
git clone https://github.com/Aravindh9652/AB_Talks_Redesign.git
cd AB_Talks_Redesign
npm install
```

Second, run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with mobile developer emulation set to **390px width**.

To verify the production build locally:

```bash
npm run build
npm start
```
