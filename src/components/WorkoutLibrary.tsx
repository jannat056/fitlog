import WorkoutCard from "@/components/WorkoutCard";
import { workoutsData } from "@/utils/workoutsData";

export default function WorkoutLibrary() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Section Header */}
      <div className="mb-8">
        <span className="inline-block bg-[#1b2234] text-[#d4f136] text-xs font-black tracking-widest px-3.5 py-1.5 rounded-full uppercase border border-gray-800 mb-3">
          Workout Library
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
          Train with intent. <br />
          <span className="text-gray-400">Log every set.</span>
        </h2>
      </div>

      {/* 3x4 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutsData.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}