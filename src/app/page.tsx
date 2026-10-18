import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function HomePage() {
  return (
    <main className="bg-[#0b0f19] min-h-screen">
      <Hero />
      <WorkoutLibrary />
    </main>
  );
}