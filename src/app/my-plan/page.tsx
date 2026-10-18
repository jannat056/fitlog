"use client";

import React, { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import { Trash2, CheckCircle2, Trophy } from "lucide-react";
import WorkoutDetailModal from "@/components/WorkoutDetailModal";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

export default function MyPlanPage() {
  const { planItems, savedItems, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  
  // Local state to track completed IDs safely without deleting them
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const currentItems = activeTab === "today" ? planItems : savedItems;

  const toggleComplete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (completedIds.includes(id)) {
      setCompletedIds(completedIds.filter((itemId) => itemId !== id));
      toast("Workout marked as incomplete", { icon: "↩️" });
    } else {
      setCompletedIds([...completedIds, id]);
      toast.success("Workout marked as done!");
    }
  };

  // Progress Calculations
  const totalExercises = currentItems.length;
  const completedCount = currentItems.filter((item) => completedIds.includes(item.id)).length;
  const progressPercentage = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  // Summary Calculations
  const totalMinutes = currentItems.reduce((acc, item) => {
    const mins = typeof item.duration === "number" ? item.duration : parseInt(String(item.duration)) || 0;
    return acc + mins;
  }, 0);
  const totalCalories = currentItems.reduce((acc, item) => {
    const cals = typeof item.calories === "number" ? item.calories : parseInt(String(item.calories)) || 0;
    return acc + cals;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-6 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-wide text-white">MY PLAN</h1>
          <p className="text-gray-400 text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Progress Badge */}
        {activeTab === "today" && totalExercises > 0 && (
          <div className="bg-[#131927] border border-[#1e293b] px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg">
            <Trophy className="w-5 h-5 text-[#ccff00]" />
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Daily Progress</p>
              <p className="text-xs font-black text-white">{completedCount} of {totalExercises} Done ({progressPercentage}%)</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {activeTab === "today" && totalExercises > 0 && (
        <div className="w-full bg-[#131927] border border-[#1e293b] rounded-2xl p-4 mb-6">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-gray-400 uppercase">Completion Rate</span>
            <span className="text-[#ccff00]">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-[#1a2333] h-3 rounded-full overflow-hidden p-0.5 border border-[#26334d]">
            <div
              className="bg-gradient-to-r from-[#ccff00] to-emerald-400 h-full rounded-full transition-all duration-500 shadow-lg shadow-[#ccff00]/20"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-3 gap-4 bg-[#131927] border border-[#1e293b] rounded-2xl p-6 mb-8 text-center shadow-lg">
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

      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 bg-[#131927] p-1.5 rounded-xl border border-[#1e293b]">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "today"
                ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved ({savedItems.length})
          </button>
        </div>
      </div>

      {/* List Items */}
      {currentItems.length === 0 ? (
        <div className="text-center py-16 bg-[#131927]/50 rounded-2xl border border-dashed border-[#1e293b]">
          <p className="text-gray-400 text-sm">No workouts added here yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentItems.map((item) => {
            const isCompleted = completedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between bg-[#131927] border rounded-2xl p-4 transition-all duration-300 ${
                  isCompleted ? "border-green-500/50 bg-green-500/5 shadow-md shadow-green-500/5" : "border-[#1e293b] hover:border-[#ccff00]/40"
                }`}
              >
                {/* Left: Thumbnail & Info using correct local asset */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#1a2333] flex-shrink-0 border border-[#26334d]">
                    <Image
                      src={item.image || "/assets/Cute Cartoon Boy Lifting a Barbell.png"}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className={`font-bold uppercase text-base tracking-wide ${isCompleted ? "text-green-400 line-through" : "text-white"}`}>
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.equipment}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                      <span>⏱ {item.duration} min</span>
                      <span>🔥 {item.calories} kcal</span>
                      {item.rating && <span className="text-yellow-400">⭐ {item.rating}</span>}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedWorkout(item)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1a2332] text-gray-300 hover:bg-[#253248] hover:text-white border border-[#2a3852] transition cursor-pointer"
                  >
                    View Details
                  </button>

                  {/* Mark as Done Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleComplete(e, item.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md cursor-pointer ${
                      isCompleted
                        ? "bg-green-500 text-black shadow-green-500/20"
                        : "bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-[#ccff00]/10"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isCompleted ? "Completed" : "Mark as Done"}
                  </button>

                  {/* Delete / Remove Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (activeTab === "today") {
                        removeFromPlan(item.id);
                        toast.error("Removed from today's plan");
                      } else {
                        removeFromSaved(item.id);
                        toast.error("Removed from saved items");
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-400 transition cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
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