import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import Footer from "@/components/Footer"; // Footer ইমপোর্ট করে নিলে

export default function HomePage() {
  return (
    <main className="bg-[#0b0f19] min-h-screen flex flex-col">
      <div className="flex-grow">
        <Hero />
        <WorkoutLibrary />
      </div>

      {/* Imported Clean Footer Component */}
      <Footer />
    </main>
  );
}