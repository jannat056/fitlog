"use client";

import Image from "next/image";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { Eye } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
  onViewDetails?: (workout: Workout) => void;
}

export default function WorkoutCard({ workout, onViewDetails }: WorkoutCardProps) {
  const { addToPlan, isInPlan } = usePlan();
  const isAdded = isInPlan(workout.id);

  return (
    <div className="bg-[#131927] rounded-2xl border border-[#1e293b] hover:border-[#ccff00]/40 overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg">
      
      {/* Card Image Container */}
      <div className="relative w-full h-48 bg-[#1a2333] overflow-hidden">
        <Image
          src={workout.image || "/assets/Cute Cartoon Boy Lifting a Barbell.png"}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[#ccff00] text-[10px] font-black uppercase px-3 py-1 rounded-full border border-[#ccff00]/20">
          {workout.categories[0] || "Workout"}
        </span>
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Title & Equipment */}
          <h3 className="text-white text-base font-bold tracking-wide uppercase line-clamp-1 mb-1">
            {workout.name}
          </h3>
          <p className="text-gray-400 text-xs font-medium">
            Equipment: {workout.equipment}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="space-y-3 pt-3 border-t border-[#1e293b]">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
            <span>⏱ {workout.duration} min</span>
            <span>🔥 {workout.calories} kcal</span>
            <span className="text-yellow-400">⭐ {workout.rating}</span>
          </div>

          {/* Action Buttons: View Details & Add to Plan */}
          <div className="flex items-center gap-2">
            {onViewDetails && (
              <button
                onClick={() => onViewDetails(workout)}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#1a2332] text-gray-300 hover:bg-[#253248] hover:text-white border border-[#2a3852] transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                View Details
              </button>
            )}

            <button
              onClick={() => {
                if (!isAdded) addToPlan(workout);
              }}
              disabled={isAdded}
              className={`py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isAdded
                  ? "bg-green-500 text-black shadow-md shadow-green-500/20 cursor-default"
                  : "bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-md shadow-[#ccff00]/10 flex-1"
              }`}
            >
              {isAdded ? "Added" : "+ Add"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}