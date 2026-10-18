import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d111d] flex flex-col justify-between">
      <div>
        <Navbar />
        <Hero />
        <WorkoutLibrary />
      </div>
      <Footer />
    </main>
  );
}