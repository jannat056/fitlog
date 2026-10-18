"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface PlanContextType {
  planItems: Workout[];
  savedItems: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  isInPlan: (id: string) => boolean;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [planItems, setPlanItems] = useState<Workout[]>([]);
  const [savedItems, setSavedItems] = useState<Workout[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load saved plan & saved workouts from localStorage
  useEffect(() => {
    setIsClient(true);
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedForLater = localStorage.getItem("fitlog_saved");

    if (savedPlan) {
      try {
        const parsedPlan = JSON.parse(savedPlan);
        if (Array.isArray(parsedPlan)) setPlanItems(parsedPlan);
      } catch (err) {
        console.error("Failed to load plan from localStorage:", err);
      }
    }

    if (savedForLater) {
      try {
        const parsedSaved = JSON.parse(savedForLater);
        if (Array.isArray(parsedSaved)) setSavedItems(parsedSaved);
      } catch (err) {
        console.error("Failed to load saved items from localStorage:", err);
      }
    }
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("fitlog_plan", JSON.stringify(planItems));
    }
  }, [planItems, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedItems));
    }
  }, [savedItems, isClient]);

  // Plan Handlers
  const addToPlan = (workout: Workout) => {
    const exists = planItems.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (exists) {
      toast.error(`${workout.name} is already in your plan!`);
      return;
    }

    setPlanItems((prev) => [...prev, workout]);
    toast.success(`${workout.name} added to your plan!`);
  };

  const removeFromPlan = (id: string) => {
    setPlanItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.success("Workout removed from plan.");
  };

  const isInPlan = (id: string) => {
    return planItems.some((item) => String(item.id) === String(id));
  };

  // Saved Handlers
  const saveForLater = (workout: Workout) => {
    const exists = savedItems.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (exists) {
      toast.error(`${workout.name} is already saved!`);
      return;
    }

    setSavedItems((prev) => [...prev, workout]);
    toast.success(`${workout.name} saved for later!`);
  };

  const removeFromSaved = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.success("Workout removed from saved.");
  };

  const isSaved = (id: string) => {
    return savedItems.some((item) => String(item.id) === String(id));
  };

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        addToPlan,
        removeFromPlan,
        isInPlan,
        saveForLater,
        removeFromSaved,
        isSaved,
      }}
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