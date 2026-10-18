"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import Image from "next/image";

function TrashIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function DumbbellIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 9h2v6H4z" />
      <path d="M18 9h2v6h-2z" />
      <path d="M8 9h8v6H8z" />
      <path d="M7 12h-3" />
      <path d="M17 12h3" />
      <path d="M10 7V5m4 2V5m-4 12v2m4-2v2" />
    </svg>
  );
}

function FlameIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2c2.5 2.4 4 4.5 4 7.3A4.7 4.7 0 0 1 11.3 14c-.8 1.6-1.7 2.6-3.3 3.4A5.4 5.4 0 0 0 12 22a6.5 6.5 0 0 0 6.2-9.7c-1.3 1.1-2.6 1.7-3.7 1.7A3.2 3.2 0 0 1 11.3 10c0-1.9 1.3-3.5 4.1-6.1L12 2Z" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function MyPlanPage() {
  const { planItems, removeFromPlan } = usePlan();

  // Calculate totals
  const totalDuration = planItems.reduce((acc, item) => acc + item.duration, 0);
  const totalCalories = planItems.reduce((acc, item) => acc + item.calories, 0);

  return (
    <main className="min-h-screen bg-[#0d111d] text-white flex flex-col justify-between">
      <div>
        <Navbar />

        <section className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="inline-block bg-[#1b2234] text-[#d4f136] text-xs font-black tracking-widest px-3.5 py-1.5 rounded-full uppercase border border-gray-800 mb-3">
                Your Routine
              </span>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                My Custom Workout Plan
              </h1>
            </div>

            {/* Summary Stats Card */}
            {planItems.length > 0 && (
              <div className="flex items-center gap-4 bg-[#1b2234] border border-gray-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#121724] rounded-xl border border-gray-800">
                  <ClockIcon className="w-4 h-4 text-[#d4f136]" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Total Time</p>
                    <p className="text-sm font-black text-white">{totalDuration} mins</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#121724] rounded-xl border border-gray-800">
                  <FlameIcon className="w-4 h-4 text-[#d4f136]" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Est. Calories</p>
                    <p className="text-sm font-black text-white">{totalCalories} kcal</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Plan Content */}
          {planItems.length === 0 ? (
            <div className="text-center py-20 bg-[#161d2e]/50 rounded-3xl border border-gray-800/80">
              <DumbbellIcon className="w-16 h-16 mx-auto text-gray-600 mb-4 stroke-[1.5]" />
              <h3 className="text-xl font-bold text-gray-300 mb-2">Your plan is currently empty</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                You haven't added any workouts to your plan yet. Explore the workout library and add exercises to build your routine.
              </p>
              <Link
                href="/"
                className="inline-block bg-[#d4f136] text-black font-black text-xs uppercase px-6 py-3 rounded-xl hover:bg-[#c2dc2e] transition-colors"
              >
                Browse Workouts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planItems.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-[#161d2e] border border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700 transition-all shadow-lg"
                >
                  <div>
                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 bg-[#1b2234]">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover object-top"
                      />
                      <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[#d4f136] text-[10px] font-black px-2.5 py-1 rounded-md uppercase border border-white/10">
                        {workout.categories[0]}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white uppercase tracking-wide mb-2">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mb-4">
                      Equipment: <span className="text-gray-200">{workout.equipment}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800/80 mt-2">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-300">
                      <span>⏱️ {workout.duration}m</span>
                      <span>🔥 {workout.calories} kcal</span>
                    </div>
                    <button
                      onClick={() => removeFromPlan(workout.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold"
                      title="Remove from plan"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}