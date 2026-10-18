import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] flex flex-col">
      <div className="flex-grow">
        <Hero />
        <WorkoutLibrary />
      </div>

      {/* Figma Aligned Footer */}
      <footer className="py-8 px-8 text-right text-xs text-gray-500 border-t border-[#1e293b]">
        © 2026 FitLog — Workout Library
      </footer>
    </main>
  );
}