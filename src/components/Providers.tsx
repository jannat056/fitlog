"use client";

import React from "react";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      {children}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#161d2e",
            color: "#fff",
            border: "1px solid #1f293d",
            fontSize: "12px",
            textTransform: "uppercase",
            fontWeight: "bold",
          },
        }}
      />
    </PlanProvider>
  );
}