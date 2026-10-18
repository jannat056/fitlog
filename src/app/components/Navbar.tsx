"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Placeholder plan count (PlanContext create korle eita dynamic hobe)
  const planCount = 0;

  return (
    <header className="w-full bg-[#111625] border-b border-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Center: Navigation Links (Pill Style) */}
        <nav className="flex items-center gap-1 bg-[#1a2035] p-1.5 rounded-full border border-gray-800 shadow-inner">
          <Link
            href="/workouts"
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              pathname === "/workouts" || pathname === "/"
                ? "bg-[#d4f136] text-black font-semibold shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              pathname === "/my-plan"
                ? "bg-[#d4f136] text-black font-semibold shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Plan Count Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1a2035] border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <span className="text-sm font-medium text-gray-300">Plan</span>
            <span className="bg-[#d4f136] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
              {planCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}