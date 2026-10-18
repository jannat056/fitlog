"use client";

import React from "react";
import Image from "next/image";
import { X, Check, Bookmark } from "lucide-react";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";

interface WorkoutDetailModalProps {
  workout: Workout | null;
  onClose: () => void;
}

export default function WorkoutDetailModal({
  workout,
  onClose,
}: WorkoutDetailModalProps) {
  const { addToPlan, saveForLater, isInPlan, isSaved } = usePlan();

  if (!workout) return null;

  const added = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#131927] border border-[#1e293b] rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-gray-400 hover:text-white p-2 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Big Image */}
        <div className="relative w-full md:w-1/2 h-72 md:h-auto min-h-[350px] bg-[#1a2333]">
          <Image
            src={workout.image || "/placeholder.png"}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Right: Content & Metadata */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div>
            {/* Title & Description */}
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white mb-2">
              {workout.name}
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4">
              {"A high-performance compound movement designed to build strength, power, and muscle definition from a stable platform."}
            </p>

            {/* Category Badges */}
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                Chest
              </span>
              <span className="bg-[#1f293d] text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase">
                Strength
              </span>
            </div>

            {/* Specifications List */}
            <div className="space-y-2.5 border-t border-b border-[#1e293b] py-4 mb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold uppercase">Equipment</span>
                <span className="font-bold text-white">{workout.equipment || "Barbell, Bench"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold uppercase">Difficulty</span>
                <span className="font-bold text-white">Intermediate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold uppercase">Sets</span>
                <span className="font-bold text-white">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold uppercase">Reps</span>
                <span className="font-bold text-white">6-8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold uppercase">Duration</span>
                <span className="font-bold text-white">{workout.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold uppercase">Calories</span>
                <span className="font-bold text-white">{workout.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold uppercase">Rating</span>
                <span className="font-bold text-yellow-400">⭐ {workout.rating || "4.8"}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h4 className="text-xs font-extrabold uppercase text-gray-300 tracking-wider mb-2">
                Instructions
              </h4>
              <ol className="text-xs text-gray-400 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Lie on the bench with eyes under the bar and feet planted.</li>
                <li>Unrack with locked elbows and lower the bar to mid-chest.</li>
                <li>Press up in a slight arc until elbows lock without bouncing.</li>
                <li>Keep shoulder blades pinched and a natural arch in the back.</li>
              </ol>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#1e293b]">
            <button
              onClick={() => addToPlan(workout)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg ${
                added
                  ? "bg-green-500 text-black shadow-green-500/20"
                  : "bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-[#ccff00]/20"
              }`}
            >
              <Check className="w-4 h-4" />
              {added ? "In Your Plan" : "Add to today's plan"}
            </button>

            <button
              onClick={() => saveForLater(workout)}
              className={`py-3 px-5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition ${
                saved
                  ? "bg-[#1f293d] text-[#ccff00] border-[#ccff00]/40"
                  : "bg-[#1a2333] text-gray-300 hover:text-white border-[#2a3852] hover:bg-[#253248]"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-[#ccff00]" : ""}`} />
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}