import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function HomePage() {
  return (
    <main className="bg-[#0b0f19] min-h-screen">
      <Hero />
      <WorkoutLibrary />

      {/* Clean Single Footer */}
      <footer className="py-6 px-8 text-right text-xs text-gray-500 border-t border-[#1e293b]">
        © 2026 FitLog — Workout Library
      </footer>
    </main>
  );
}