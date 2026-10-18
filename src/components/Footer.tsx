import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111625] border-t border-gray-800/80 text-white py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Flat Dumbbell Vector Icon + FITLOG Text */}
        <Link href="/" className="flex items-center gap-2.5 focus:outline-none group">
          <div className="text-[#d4f136] flex items-center">
            {/* Flat Vector Dumbbell Icon */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zm12 0a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zM3 8a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zm18 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zM7 11h10v2H7v-2z" />
            </svg>
          </div>
          <span className="text-lg font-black tracking-wider text-white uppercase group-hover:text-[#d4f136] transition-colors">
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