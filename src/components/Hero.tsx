"import client"; // Keep or remove depending on if it needs hooks, but standard Next.js works fine

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[#0d111d] text-white py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content (Title, Description & Buttons) */}
        <div className="space-y-6">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-[#1a2035] text-[#d4f136] border border-gray-800 tracking-wider uppercase">
            Workout Library
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
            Train with intent. <br />
            <span className="text-white">Log every set.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Link
              href="#library"
              className="px-7 py-3.5 rounded-full bg-[#d4f136] text-black font-bold text-sm hover:bg-[#c2dc2e] transition-colors shadow-lg cursor-pointer"
            >
              Explore Workouts
            </Link>
            <Link
              href="/my-plan"
              className="px-7 py-3.5 rounded-full bg-[#1a2035] border border-gray-800 text-white font-medium text-sm hover:border-gray-700 transition-colors cursor-pointer"
            >
              View My Plan
            </Link>
          </div>
        </div>

        {/* Right Image (Cartoon Boy Asset) */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg h-[320px] md:h-[400px] flex items-center justify-center">
            <Image
              src="/assets/Cute Cartoon Boy Lifting a Barbell.png" 
              alt="FitLog Banner Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}