import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog — Workout Library & Planner",
  description: "Dark, high-performance fitness web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0d111d] text-white`}>
        <PlanProvider>
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
          {children}
        </PlanProvider>
      </body>
    </html>
  );
}