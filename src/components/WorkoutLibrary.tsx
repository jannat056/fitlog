"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { Plus, Search, Eye } from "lucide-react";
import WorkoutDetailModal from "@/components/WorkoutDetailModal";
import { Workout } from "@/types/workout";

// Full 12 Workouts for 3-Column, 4-Row Grid Layout (Total 12 items)
const MOCK_WORKOUTS: Workout[] = [
  {
    id: "1",
    name: "Barbell Bench Press",
    equipment: "Barbell, Bench",
    categories: ["Chest", "Strength"],
    duration: 25,
    calories: 180,
    rating: 4.8,
    image: "/assets/banner.png",
    difficulty: "Intermediate",
    sets: "4",
    reps: "6-8",
    description: "A compound press that builds chest thickness, triceps, and delts from a stable bench.",
  },
  {
    id: "2",
    name: "Back Squat",
    equipment: "Barbell, Rack",
    categories: ["Legs", "Strength"],
    duration: 30,
    calories: 240,
    rating: 4.9,
    image: "/assets/banner.png",
    difficulty: "Advanced",
    sets: "4",
    reps: "6-8",
    description: "The ultimate lower body builder targeting quads, glutes, and hamstrings.",
  },
  {
    id: "3",
    name: "Overhead Press",
    equipment: "Barbell",
    categories: ["Shoulders", "Strength"],
    duration: 20,
    calories: 150,
    rating: 4.7,
    image: "/assets/banner.png",
    difficulty: "Intermediate",
    sets: "3",
    reps: "8-10",
    description: "Build powerful shoulders and core stability with strict overhead pressing.",
  },
  {
    id: "4",
    name: "Pull-Up",
    equipment: "Pull-up Bar",
    categories: ["Back", "Bodyweight"],
    duration: 15,
    calories: 120,
    rating: 4.7,
    image: "/assets/banner.png",
    difficulty: "Intermediate",
    sets: "3",
    reps: "Max",
    description: "Master bodyweight pulling power for a wider, stronger back.",
  },
  {
    id: "5",
    name: "Deadlift",
    equipment: "Barbell",
    categories: ["Back", "Strength"],
    duration: 35,
    calories: 300,
    rating: 5.0,
    image: "/assets/banner.png",
    difficulty: "Advanced",
    sets: "3",
    reps: "5",
    description: "The ultimate test of raw pulling strength across the entire posterior chain.",
  },
  {
    id: "6",
    name: "Barbell Row",
    equipment: "Barbell",
    categories: ["Back", "Strength"],
    duration: 20,
    calories: 160,
    rating: 4.6,
    image: "/assets/banner.png",
    difficulty: "Intermediate",
    sets: "4",
    reps: "8-10",
    description: "Build thickness and strength in the mid-back and lats.",
  },
  {
    id: "7",
    name: "Incline Dumbbell Press",
    equipment: "Dumbbells, Bench",
    categories: ["Chest", "Hypertrophy"],
    duration: 20,
    calories: 140,
    rating: 4.7,
    image: "/assets/banner.png",
    difficulty: "Intermediate",
    sets: "4",
    reps: "10-12",
    description: "Focus heavily on upper chest development with full range motion.",
  },
  {
    id: "8",
    name: "Romanian Deadlift",
    equipment: "Barbell",
    categories: ["Legs", "Strength"],
    duration: 25,
    calories: 200,
    rating: 4.8,
    image: "/assets/banner.png",
    difficulty: "Intermediate",
    sets: "4",
    reps: "8-10",
    description: "Isolate and strengthen hamstrings and glutes with a controlled hip hinge.",
  },
  {
    id: "9",
    name: "Lateral Raise",
    equipment: "Dumbbells",
    categories: ["Shoulders", "Isolation"],
    duration: 15,
    calories: 90,
    rating: 4.6,
    image: "/assets/banner.png",
    difficulty: "Beginner",
    sets: "4",
    reps: "12-15",
    description: "Sculpt side deltoids to create a wider, aesthetic upper body frame.",
  },
  {
    id: "10",
    name: "Dumbbell Bicep Curl",
    equipment: "Dumbbells",
    categories: ["Arms", "Isolation"],
    duration: 15,
    calories: 100,
    rating: 4.7,
    image: "/assets/banner.png",
    difficulty: "Beginner",
    sets: "3",
    reps: "10-12",
    description: "Isolate bicep peak and arm size with standard alternating curls.",
  },
  {
    id: "11",
    name: "Tricep Pushdown",
    equipment: "Cable Machine",
    categories: ["Arms", "Isolation"],
    duration: 15,
    calories: 100,
    rating: 4.7,
    image: "/assets/banner.png",
    difficulty: "Beginner",
    sets: "3",
    reps: "12-15",
    description: "Build tricep definition and pressing lockout power using cables.",
  },
  {
    id: "12",
    name: "Leg Press",
    equipment: "Leg Press Machine",
    categories: ["Legs", "Hypertrophy"],
    duration: 25,
    calories: 210,
    rating: 4.8,
    image: "/assets/banner.png",
    difficulty: "Beginner",
    sets: "4",
    reps: "10-12",
    description: "Safely load heavy weight to maximize quad growth and lower body stamina.",
  },
];

export default function WorkoutLibrary() {
  const { addToPlan, isInPlan } = usePlan();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const categoriesList = ["All", "Chest", "Legs", "Shoulders", "Back", "Arms", "Strength"];

  const filteredWorkouts = MOCK_WORKOUTS.filter((workout) => {
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      workout.categories.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 text-white">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-wide">WORKOUT LIBRARY</h1>
          <p className="text-gray-400 text-sm mt-1">
            Explore high-performance movements and build your custom routine.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131927] border border-[#1e293b] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00]/50 transition"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
                : "bg-[#131927] text-gray-400 hover:text-white border border-[#1e293b]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3-Column Grid (Ensures 3 columns x 4 rows layout for 12 items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => {
          const added = isInPlan(workout.id);

          return (
            <div
              key={workout.id}
              className="bg-[#131927] border border-[#1e293b] hover:border-[#ccff00]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              {/* Image & Badge */}
              <div className="relative h-48 w-full bg-[#1a2333] overflow-hidden">
                <Image
                  src={workout.image || "/assets/banner.png"}
                  alt={workout.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[#ccff00] text-[10px] font-black uppercase px-3 py-1 rounded-full border border-[#ccff00]/20">
                  {workout.categories[0] || "Workout"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-bold text-white uppercase text-base tracking-wide mb-1">
                    {workout.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Equipment: {workout.equipment}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                    <span>⏱ {workout.duration} min</span>
                    <span>🔥 {workout.calories} kcal</span>
                    <span className="text-yellow-400">⭐ {workout.rating}</span>
                  </div>
                </div>

                {/* Actions: View Details & Quick Add (Save option is inside Modal as requested) */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#1e293b]">
                  <button
                    onClick={() => setSelectedWorkout(workout)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#1a2332] text-gray-300 hover:bg-[#253248] hover:text-white border border-[#2a3852] transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (added) return;
                      addToPlan(workout);
                    }}
                    className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      added
                        ? "bg-green-500 text-black"
                        : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                    }`}
                    title={added ? "In Plan" : "Add to Plan"}
                  >
                    <Plus className="w-4 h-4" />
                    {added ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Modal (Where 'Save for Later' and deep details live) */}
      <WorkoutDetailModal
        workout={selectedWorkout}
        onClose={() => setSelectedWorkout(null)}
      />
    </div>
  );
}