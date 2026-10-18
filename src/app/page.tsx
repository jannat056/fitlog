import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] flex flex-col">
      <Hero />
      <WorkoutLibrary />
    </main>
  );
}