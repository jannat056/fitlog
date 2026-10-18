"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";

interface PlanContextType {
  planItems: Workout[];
  savedItems: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [planItems, setPlanItems] = useState<Workout[]>([]);
  const [savedItems, setSavedItems] = useState<Workout[]>([]);

  // Load from localStorage on initial render
  useEffect(() => {
    const storedPlan = localStorage.getItem("planItems");
    const storedSaved = localStorage.getItem("savedItems");
    if (storedPlan) setPlanItems(JSON.parse(storedPlan));
    if (storedSaved) setSavedItems(JSON.parse(storedSaved));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("planItems", JSON.stringify(planItems));
  }, [planItems]);

  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  const addToPlan = (workout: Workout) => {
    if (!isInPlan(workout.id)) {
      setPlanItems((prev) => [...prev, workout]);
    }
  };

  const saveForLater = (workout: Workout) => {
    if (!isSaved(workout.id)) {
      setSavedItems((prev) => [...prev, workout]);
    }
  };

  const removeFromPlan = (id: string) => {
    setPlanItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInPlan = (id: string) => planItems.some((item) => item.id === id);
  const isSaved = (id: string) => savedItems.some((item) => item.id === id);

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};