# FitLog

FitLog is a high-performance, dark-themed gym companion application designed for serious lifters to explore exercises, organize daily fitness routines, and track workouts with zero distractions. Built with Next.js App Router and Tailwind CSS, FitLog delivers a seamless, responsive, and aesthetic user experience across mobile, tablet, and desktop devices.

---

## Live Demo & Deployment

- **Live Application:** [https://fitloga.netlify.app](https://fitloga.netlify.app)
- **Deployment Status:** Netlify Continuous Integration

---

## Key Features

- **Workout Library:** Access a comprehensive list of exercises filtered by target muscle groups and search queries.
- **Interactive Daily Planner:** Seamlessly add exercises to a custom daily training plan powered by React Context API.
- **Exercise Details Modal:** View targeted muscle groups, recommended sets, repetition ranges, and execution descriptions in a popup view.
- **Sleek Dark Theme UI:** Designed strictly with an aesthetic dark color scheme (`#0b0f19` background and `#131927` surface containers) to match Figma specifications.
- **Fully Responsive Layout:** Optimized grid and flex layouts ensuring accessibility across all screen sizes.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Netlify / Vercel

---

## Project Structure

```text
fitlog/
├── public/
│   └── assets/
│       └── Cute Cartoon Boy Lifting a Barbell.png
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── WorkoutDetailModal.tsx
│   │   └── WorkoutLibrary.tsx
│   ├── context/
│   │   └── PlanContext.tsx
│   └── types/
│       └── workout.ts
├── .gitignore
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json


Getting Started
Follow these steps to set up and run the project locally on your machine.

Prerequisites
Node.js (v18.0.0 or higher)

npm, yarn, or pnpm

Installation
Clone the repository:

Bash
git clone [https://github.com/jannat056/fitlog.git](https://github.com/jannat056/fitlog.git)
Navigate to the project directory:

Bash
cd fitlog
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open your browser and navigate to http://localhost:3000 to view the application.

Scripts
npm run dev: Starts the local development server.

npm run build: Builds the application for production deployment.

npm run start: Starts the production server.

npm run lint: Runs ESLint to verify code quality.

License
This project is created strictly for educational purposes. Feel free to use, modify, and learn from the codebase.