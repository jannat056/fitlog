"use client";

import Image from "next/image";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const { addToPlan, isInPlan } = usePlan();
  const isAdded = isInPlan(workout.id);

  return (
    <div className="bg-[#111625] rounded-2xl border border-gray-800/80 overflow-hidden hover:border-gray-700 transition-all duration-300 flex flex-col justify-between group shadow-lg">
      
      {/* Card Image Container with Top Object Positioning */}
      <div className="relative w-full h-48 bg-[#1a2035] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Category Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {workout.categories.map((cat, index) => (
              <span
                key={index}
                className="bg-[#d4f136] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider uppercase"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-white text-lg font-black tracking-wide uppercase line-clamp-1">
            {workout.name}
          </h3>
          <p className="text-gray-400 text-xs font-medium mt-0.5">
            {workout.equipment}
          </p>
        </div>

        {/* Footer Meta & Action Button */}
        <div className="space-y-3 pt-3 border-t border-gray-800/60">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
            <div className="flex items-center gap-1">
              <span className="text-gray-400">🕒</span>
              <span>{workout.duration} min</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-gray-400">🔥</span>
              <span>{workout.calories} kcal</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{workout.rating}</span>
            </div>
          </div>

          {/* Dynamic Action Button */}
          <button
            onClick={() => addToPlan(workout)}
            disabled={isAdded}
            className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              isAdded
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-[#1a2035] text-[#d4f136] border border-[#d4f136]/30 hover:bg-[#d4f136] hover:text-black"
            }`}
          >
            {isAdded ? "Added to Plan" : "+ Add to Plan"}
          </button>
        </div>

      </div>
    </div>
  );
}