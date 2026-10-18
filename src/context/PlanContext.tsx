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

  // LocalStorage support to persist state
  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    if (savedPlan) {
      try {
        setPlanItems(JSON.parse(savedPlan));
      } catch (e) {
        console.error("Failed to parse plan from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(planItems));
  }, [planItems]);

  const addToPlan = (workout: Workout) => {
    if (planItems.some((item) => item.id === workout.id)) {
      toast.error(`${workout.name} is already in your plan!`);
      return;
    }
    setPlanItems((prev) => [...prev, workout]);
    toast.success(`${workout.name} added to your plan!`);
  };

  const removeFromPlan = (id: string) => {
    setPlanItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout removed from plan.");
  };

  const isInPlan = (id: string) => {
    return planItems.some((item) => item.id === id);
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