"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/Providers";
import { usePortfolio } from "../context/PortfolioContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const { data } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF9F6]/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3 sm:py-3.5"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Left: Custom Monogram Brand (like 'ik' in reference, but 'fr') */}
        <Link
          href="#beranda"
          className="group flex items-center gap-2 select-none"
          aria-label="Muhamad Fikih Rizaldi Home"
        >
          <div className="relative flex items-center">
            {/* Custom SVG Ligature Monogram 'FR' */}
            <svg
              className="w-8 h-8 text-indigo-600 transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 36 36"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="32" height="32" rx="9" fill="#0F172A" />
              <text
                x="18"
                y="24"
                textAnchor="middle"
                fontSize="18"
                fontWeight="800"
                fill="#FFFFFF"
                letterSpacing="-0.5px"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {data.profile?.initials?.toLowerCase() || "fr"}
              </text>
              <circle cx="27" cy="9" r="3.5" fill="#4F46E5" />
            </svg>
          </div>
        </Link>

        {/* Right: Minimalist Uppercase Links (RESUME, LINKEDIN, NOW / WORK, plus Lang) */}
        <div className="hidden sm:flex items-center gap-6 text-[12px] font-semibold tracking-wider text-slate-700 uppercase">
          <a
            href={data.profile?.resume_url || "/CV_Muhamad_Fikih_Rizaldi.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-colors"
          >
            Resume
          </a>

          <a
            href={data.contact?.linkedin_url || "https://www.linkedin.com/in/muhamad-fikih-rizaldi-b04528374"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="#pengalaman"
            className="hover:text-indigo-600 transition-colors"
          >
            Now
          </a>

          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="px-2 py-0.5 rounded text-[11px] font-bold text-slate-500 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100 transition-all uppercase"
            aria-label="Switch Language"
          >
            {lang === "id" ? "EN" : "ID"}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="sm:hidden bg-[#FAF9F6]/95 backdrop-blur-md border-b border-slate-200 px-6 py-5 space-y-4">
          <nav className="flex flex-col gap-3 font-semibold text-sm uppercase tracking-wider text-slate-800">
            <a
              href="#proyek"
              onClick={() => setMobileOpen(false)}
              className="hover:text-indigo-600 py-1"
            >
              Work
            </a>
            <a
              href="#pengalaman"
              onClick={() => setMobileOpen(false)}
              className="hover:text-indigo-600 py-1"
            >
              Experience & Now
            </a>
            <a
              href="/CV_Muhamad_Fikih_Rizaldi.pdf"
              target="_blank"
              onClick={() => setMobileOpen(false)}
              className="hover:text-indigo-600 py-1"
            >
              Resume (PDF)
            </a>
            <a
              href="https://www.linkedin.com/in/muhamad-fikih-rizaldi-b04528374"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="hover:text-indigo-600 py-1"
            >
              LinkedIn
            </a>
            <a
              href="#kontak"
              onClick={() => setMobileOpen(false)}
              className="hover:text-indigo-600 py-1"
            >
              Contact
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Bahasa / Language:</span>
            <button
              onClick={() => {
                setLang(lang === "id" ? "en" : "id");
                setMobileOpen(false);
              }}
              className="px-3 py-1 text-xs font-bold border border-slate-300 rounded-md text-slate-700 bg-white"
            >
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}