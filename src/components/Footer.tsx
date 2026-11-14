"use client";

import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Footer() {
  const { data } = usePortfolio();
  const [motionPaused, setMotionPaused] = useState(false);

  const toggleMotion = () => {
    const nextState = !motionPaused;
    setMotionPaused(nextState);
    if (nextState) {
      document.documentElement.classList.add("motion-paused");
    } else {
      document.documentElement.classList.remove("motion-paused");
    }
  };

  return (
    <footer className="relative z-10 w-full pt-8 pb-36 sm:pb-40 bg-white/50 select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <strong className="font-semibold text-slate-700">{data.profile?.name || "Muhamad Fikih Rizaldi"}</strong>. {data.profile?.copyright_text || "Built using Next.js, TypeScript & Gemini API"}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-medium text-slate-600">
            {data.profile?.available_tagline || "Available for Opportunities · Yogyakarta (UTC+7)"}
          </span>
        </div>
      </div>

      {/* Pause motion button fixed at bottom-right corner */}
      <button
        type="button"
        onClick={toggleMotion}
        className="fixed bottom-3 right-4 sm:bottom-4 sm:right-6 z-40 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6]/90 hover:bg-white text-slate-600 hover:text-slate-900 text-[11px] font-semibold border border-slate-300/80 shadow-xs backdrop-blur-md transition-all cursor-pointer"
        aria-label={motionPaused ? "Play motion" : "Pause motion"}
      >
        {motionPaused ? (
          <>
            <svg className="w-3 h-3 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play motion</span>
          </>
        ) : (
          <>
            <svg className="w-3 h-3 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            <span>Pause motion</span>
          </>
        )}
      </button>
    </footer>
  );
}
