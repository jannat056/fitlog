"use client";

import { workoutsData } from "@/utils/workoutsData";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutLibrary() {
  return (
    <section className="bg-[#0d111d] py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Title */}
        <div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase">
            THE LIBRARY
          </h2>
        </div>

        {/* Grid Layout for Cards (3 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutsData.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>

      </div>
    </section>
  );
}