"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToLibrary = () => {
    const libraryElement = document.getElementById("library");
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0b0f19] text-white py-16 md:py-24 px-6 border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text & CTA */}
        <div className="flex flex-col items-start">
          <span className="text-[#ccff00] text-xs font-black uppercase tracking-widest bg-[#ccff00]/10 px-3 py-1.5 rounded-full border border-[#ccff00]/20 mb-4">
            WORKOUT LIBRARY
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white mb-6">
            TRAIN WITH INTENT. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-emerald-400">
              LOG EVERY SET.
            </span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* Browse Workouts Button with smooth scroll */}
            <button
              onClick={scrollToLibrary}
              className="bg-[#ccff00] text-black font-black uppercase tracking-wider text-xs px-7 py-4 rounded-xl hover:bg-[#b8e600] transition-all shadow-lg shadow-[#ccff00]/20 flex items-center gap-2 cursor-pointer"
            >
              BROWSE WORKOUTS
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Banner / Hero Image */}
        <div className="relative w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden bg-[#131927] border border-[#1e293b] shadow-2xl">
          <Image
            src="/assets/banner.png"
            alt="FitLog Gym Banner"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}