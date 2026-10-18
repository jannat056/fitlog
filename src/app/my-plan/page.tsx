"use client";

import React, { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import { Trash2, CheckCircle2 } from "lucide-react";
import WorkoutDetailModal from "@/components/WorkoutDetailModal";
import { Workout } from "@/types/workout";

export default function MyPlanPage() {
  const { planItems, savedItems, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const currentItems = activeTab === "today" ? planItems : savedItems;

  // Summary Calculations
  const totalExercises = currentItems.length;
  const totalMinutes = currentItems.reduce((acc, item) => {
    const mins = Number(item.duration) || 0;
    return acc + mins;
  }, 0);
  const totalCalories = currentItems.reduce((acc, item) => {
    const cals = Number(item.calories) || 0;
    return acc + cals;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-6 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-wide text-white">MY PLAN</h1>
        <p className="text-gray-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-3 gap-4 bg-[#131927] border border-[#1e293b] rounded-2xl p-6 mb-8 text-center">
        <div>
          <p className="text-xs uppercase font-bold text-gray-400 mb-1">Exercises</p>
          <p className="text-3xl font-black text-[#ccff00]">{totalExercises}</p>
        </div>
        <div>
          <p className="text-xs uppercase font-bold text-gray-400 mb-1">Minutes</p>
          <p className="text-3xl font-black text-white">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-xs uppercase font-bold text-gray-400 mb-1">Calories</p>
          <p className="text-3xl font-black text-white">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs & Sort */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 bg-[#131927] p-1.5 rounded-xl border border-[#1e293b]">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "today"
                ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="text-xs text-gray-400 flex items-center gap-2">
          <span>Sort By:</span>
          <select className="bg-[#131927] border border-[#1e293b] rounded-lg px-3 py-1.5 text-white outline-none">
            <option>Duration</option>
            <option>Calories</option>
          </select>
        </div>
      </div>

      {/* List Items */}
      {currentItems.length === 0 ? (
        <div className="text-center py-16 bg-[#131927]/50 rounded-2xl border border-dashed border-[#1e293b]">
          <p className="text-gray-400 text-sm">No workouts added here yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[#131927] border border-[#1e293b] hover:border-[#ccff00]/40 rounded-2xl p-4 transition-all duration-200"
            >
              {/* Left: Thumbnail & Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#1a2333] flex-shrink-0 border border-[#26334d]">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white uppercase text-base tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{item.equipment}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                    <span>⏱ {item.duration}</span>
                    <span>🔥 {item.calories}</span>
                    {item.rating && <span className="text-yellow-400">⭐ {item.rating}</span>}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedWorkout(item)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1a2332] text-gray-300 hover:bg-[#253248] hover:text-white border border-[#2a3852] transition"
                >
                  View Details
                </button>
                <button
                  onClick={() =>
                    activeTab === "today"
                      ? removeFromPlan(item.id)
                      : removeFromSaved(item.id)
                  }
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#ccff00] text-black hover:bg-[#b8e600] flex items-center gap-1.5 transition shadow-md shadow-[#ccff00]/10"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark as Done
                </button>
                <button
                  onClick={() =>
                    activeTab === "today"
                      ? removeFromPlan(item.id)
                      : removeFromSaved(item.id)
                  }
                  className="p-2 text-gray-400 hover:text-red-400 transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workout Detail Modal Pop-up */}
      <WorkoutDetailModal
        workout={selectedWorkout}
        onClose={() => setSelectedWorkout(null)}
      />
    </div>
  );
}