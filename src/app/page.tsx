import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d111d]">
      <Navbar />
      <Hero />
      <WorkoutLibrary />
    </main>
  );
}