"use client";

import React from "react";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      {children}
    </PlanProvider>
  );
}