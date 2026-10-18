"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planItems } = usePlan();

  // Directly derive count from context planItems length
  const planCount = planItems ? planItems.length : 0;
  const savedCount = 0;

  return (
    <header className="w-full bg-[#1b2234] border-b border-gray-800/80 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* Left: Logo Icon + Brand Name */}
        <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
          <Image
            src="/assets/logo.png"
            alt="FITLOG Icon"
            width={32}
            height={32}
            className="h-7 w-auto object-contain"
            priority
          />
          <span className="text-xl font-black tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        {/* Center: Navigation Pills */}
        <nav className="flex items-center gap-1 bg-[#121724] p-1 rounded-full border border-gray-800">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
              pathname === "/" || pathname === "/workouts"
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

        {/* Right: Dynamic Badges */}
        <div className="flex items-center gap-5 text-xs font-bold text-gray-300">
          <Link href="/my-plan" className="flex items-center gap-2 hover:text-white transition-colors">
            <span>Plan</span>
            <span className="bg-[#d4f136] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

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