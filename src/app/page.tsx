import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] flex flex-col justify-between">
      <div>
        <Hero />
        <WorkoutLibrary />
      </div>

      {/* Simple Professional Footer */}
      <footer className="py-6 text-center text-xs text-gray-500 border-t border-[#1e293b]">
        © 2026 FitLog. All rights reserved. Train with intent.
      </footer>
    </main>
  );
}