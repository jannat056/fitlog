import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111625] border-t border-gray-800/80 text-white py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
          <Image
            src="/assets/logo.png"
            alt="FITLOG Icon"
            width={28}
            height={28}
            className="h-6 w-auto object-contain"
          />
          <span className="text-lg font-black tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright Text */}
        <p className="text-xs text-gray-400 font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}