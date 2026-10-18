"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Dynamic values (later linked to PlanContext)
  const planCount = 0;
  const savedCount = 0;

  return (
    <header className="w-full bg-[#1b2234] border-b border-gray-800/80 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* Left: Dumbbell Icon + FITLOG Text */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none">
          <div className="text-[#d4f136] text-xl font-extrabold flex items-center">
            {/* Dumbbell Icon SVG */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zm12 0a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zM3 8a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zm18 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zM7 11h10v2H7v-2z" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        {/* Center: Workouts & My Plan Pills */}
        <nav className="flex items-center gap-1 bg-[#121724] p-1 rounded-full border border-gray-800">
          <Link
            href="/workouts"
            className={`px-5 py-1.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
              pathname === "/workouts" || pathname === "/"
                ? "bg-[#d4f136] text-black shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
              pathname === "/my-plan"
                ? "bg-[#d4f136] text-black shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Plan 0 and Saved 0 Badges */}
        <div className="flex items-center gap-5 text-xs font-bold text-gray-300">
          {/* Plan Count */}
          <Link href="/my-plan" className="flex items-center gap-2 hover:text-white transition-colors">
            <span>Plan</span>
            <span className="bg-[#d4f136] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          {/* Saved Count */}
          <div className="flex items-center gap-2">
            <span>Saved</span>
            <span className="bg-[#d4f136] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {savedCount}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}