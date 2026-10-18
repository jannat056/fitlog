"use client";

import Image from "next/image";
import { Workout } from "@/utils/workoutsData";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <div className="bg-[#111625] rounded-2xl border border-gray-800/80 overflow-hidden hover:border-gray-700 transition-all duration-300 flex flex-col justify-between group shadow-lg">
      
      {/* Card Image */}
      <div className="relative w-full h-44 bg-[#1a2035] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                className="bg-[#d4f136] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider"
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

        {/* Footer Meta (Time, Calories, Rating) */}
        <div className="flex items-center justify-between text-xs font-semibold text-gray-300 pt-3 border-t border-gray-800/60">
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

      </div>
    </div>
  );
}