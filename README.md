# ABTalks Hackathon Redesign

A world-class, premium, mobile-first redesign of the ABTalks 60-Day coding challenge dashboard. Inspired by Apple, Stripe, Linear, and Notion.

## Route Map

Provide these routes exactly for automated screenshot capture (at 390px viewport):
```
/
/dashboard
/day/12
```

## Features

- **Mobile-First UX (390px)**: Engineered specifically for late-night mobile builders. Responsive, thumb-friendly navigation, large touch targets, and beautiful typography.
- **Design Philosophy**: Deep Slate themes with glassmorphic modals, floating ambient violet/indigo grids, linear gradient borders, and smooth micro-interactions.
- **Dynamic State Engine & Judge Controller**: A floating action panel at the bottom-right allows judges and reviewers to instantly hot-swap between:
  - **Default Day 12**: Active streak, partial progress, connected accounts, and pending day submission.
  - **First Day**: 0-day clean slate, disconnect state, custom setup guides.
  - **Missed Day**: broken streak alert, recovery freeze panel, custom motivators.
  - **Challenge Completed**: 60/60 day victory screen, ultimate recruiter matching status.
- **Recruiter Visibility Score Meter**: An interactive speedometer indicating your visibility factor to premium tech companies based on code consistency.
- **AI Coach Insights**: Custom learning recommendations that dynamically adapt based on the selected edge case.
- **Interactive Habit Matrix**: A 60-day visual contribution grid (contribution heatmap) mapping out locked, completed, active, and missed days.
- **Animated Submissions**: Forms containing validation, submission pending spinners, soundless confetti execution, and XP level advancement metrics.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Celebrations**: canvas-confetti

## Getting Started

First, install dependencies:
```bash
npm install
```

Second, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your mobile developer emulation (390px) to view the interface.
