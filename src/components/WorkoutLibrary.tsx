"use client";

import React, { useState, useMemo } from "react";
import { workoutsData, Workout } from "@/utils/workoutsData";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import { Search, Dumbbell, Flame, Clock, Star, X, Check, Plus } from "lucide-react";

export default function WorkoutLibrary() {
  const { addToPlan, isInPlan } = usePlan();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    workoutsData.forEach((w) => w.categories.forEach((c) => cats.add(c)));
    return ["ALL", ...Array.from(cats)];
  }, []);

  // Filter workouts based on search and category
  const filteredWorkouts = useMemo(() => {
    return workoutsData.filter((workout) => {
      const matchesSearch =
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.equipment.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || workout.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="inline-block bg-[#1b2234] text-[#d4f136] text-xs font-black tracking-widest px-3.5 py-1.5 rounded-full uppercase border border-gray-800 mb-3">
            High-Performance Library
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Explore Workouts
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search workouts or equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161d2e] border border-gray-800 text-white text-xs rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#d4f136] transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#d4f136] text-black shadow-lg"
                : "bg-[#161d2e] text-gray-400 border border-gray-800 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Workout Grid */}
      {filteredWorkouts.length === 0 ? (
        <div className="text-center py-20 bg-[#161d2e]/50 rounded-3xl border border-gray-800/80">
          <Dumbbell className="w-16 h-16 mx-auto text-gray-600 mb-4 stroke-[1.5]" />
          <h3 className="text-xl font-bold text-gray-300 mb-2">No workouts found</h3>
          <p className="text-gray-500 text-sm">Try searching for something else or reset filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => {
            const added = isInPlan(workout.id);

            return (
              <div
                key={workout.id}
                className="bg-[#161d2e] border border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700 transition-all shadow-lg group cursor-pointer"
                onClick={() => setSelectedWorkout(workout)}
              >
                <div>
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 bg-[#1b2234]">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {workout.categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="bg-black/75 backdrop-blur-md text-[#d4f136] text-[10px] font-black px-2.5 py-1 rounded-md uppercase border border-white/10"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-amber-400 text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {workout.rating}
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1 group-hover:text-[#d4f136] transition-colors">
                    {workout.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mb-4">
                    Equipment: <span className="text-gray-200">{workout.equipment}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800/80 mt-2">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#d4f136]" /> {workout.duration}m</span>
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-[#d4f136]" /> {workout.calories} kcal</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToPlan(workout);
                    }}
                    disabled={added}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition-all ${
                      added
                        ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                        : "bg-[#d4f136] text-black hover:bg-[#c2dc2e]"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add to Plan
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Workout Details Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#161d2e] border border-gray-800 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedWorkout(null)}
              className="absolute top-4 right-4 p-2 bg-[#1b2234] hover:bg-gray-800 text-gray-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-5 bg-[#1b2234]">
              <Image
                src={selectedWorkout.image}
                alt={selectedWorkout.name}
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              {selectedWorkout.categories.map((c, i) => (
                <span key={i} className="text-[10px] font-black uppercase bg-[#1b2234] text-[#d4f136] px-2.5 py-1 rounded-md border border-gray-800">
                  {c}
                </span>
              ))}
              <span className="text-[10px] font-black uppercase bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md border border-amber-500/20 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" /> {selectedWorkout.rating} Rating
              </span>
            </div>

            <h3 className="text-2xl font-black uppercase text-white mb-2">
              {selectedWorkout.name}
            </h3>
            <p className="text-xs text-gray-300 mb-6">
              Equipment required: <span className="font-bold text-white">{selectedWorkout.equipment}</span>
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1b2234] border border-gray-800 p-3.5 rounded-2xl flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#d4f136]" />
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Duration</p>
                  <p className="text-sm font-black text-white">{selectedWorkout.duration} Minutes</p>
                </div>
              </div>
              <div className="bg-[#1b2234] border border-gray-800 p-3.5 rounded-2xl flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#d4f136]" />
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Calorie Burn</p>
                  <p className="text-sm font-black text-white">{selectedWorkout.calories} Kcal</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                addToPlan(selectedWorkout);
              }}
              disabled={isInPlan(selectedWorkout.id)}
              className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isInPlan(selectedWorkout.id)
                  ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                  : "bg-[#d4f136] text-black hover:bg-[#c2dc2e]"
              }`}
            >
              {isInPlan(selectedWorkout.id) ? (
                <>
                  <Check className="w-4 h-4" /> Already in Plan
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Add to Workout Plan
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}