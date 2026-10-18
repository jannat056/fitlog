"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface PlanContextType {
  planItems: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  isInPlan: (id: string) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [planItems, setPlanItems] = useState<Workout[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load saved plan from localStorage on initial client mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("fitlog_plan");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setPlanItems(parsed);
        }
      } catch (err) {
        console.error("Failed to load plan from localStorage:", err);
      }
    }
  }, []);

  // Save to localStorage whenever planItems change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("fitlog_plan", JSON.stringify(planItems));
    }
  }, [planItems, isClient]);

  const addToPlan = (workout: Workout) => {
    console.log("Adding workout clicked:", workout); // Debug log

    // Check if already in plan using string comparison
    const exists = planItems.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (exists) {
      toast.error(`${workout.name} is already in your plan!`);
      return;
    }

    setPlanItems((prev) => {
      const updated = [...prev, workout];
      console.log("New plan items array:", updated); // Debug log
      return updated;
    });

    toast.success(`${workout.name} added to your plan!`);
  };

  const removeFromPlan = (id: string) => {
    setPlanItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.success("Workout removed from plan.");
  };

  const isInPlan = (id: string) => {
    return planItems.some((item) => String(item.id) === String(id));
  };

  return (
    <PlanContext.Provider
      value={{ planItems, addToPlan, removeFromPlan, isInPlan }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}