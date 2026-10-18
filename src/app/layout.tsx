import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FITLOG — Train With Intent",
  description: "A high-performance dark gym companion for logging workouts and daily plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0b0f19] text-white min-h-screen flex flex-col antialiased`}>
        <PlanProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#131927",
                color: "#ffffff",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}