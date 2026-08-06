"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/Providers";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#beranda",   label: t("nav.home") },
    { href: "#keahlian", label: t("nav.skills") },
    { href: "#portofolio", label: t("nav.portfolio") },
    { href: "#pengalaman", label: t("nav.experience") },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      scrolled
        ? "bg-[#FAFAF9]/90 backdrop-blur-md shadow-sm shadow-stone-200 border-b border-[#E7E5E4]"
        : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="#beranda" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#1C1917] rounded-lg flex items-center justify-center text-[#FAFAF9] font-bold text-xs group-hover:bg-[#78350F] transition-colors duration-300">
            FR
          </div>
          <span className="font-bold text-[#1C1917] hidden sm:block tracking-tight">
            Fikih<span className="text-[#78350F]">Rizaldi</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#78716C] hover:text-[#1C1917] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="text-xs font-semibold text-[#78716C] hover:text-[#1C1917] border border-[#D6D3D1] hover:border-[#A8A29E] rounded-full px-3 py-1.5 transition-all duration-200"
          >
            {lang.toUpperCase()}
          </button>
          <a
            href="/CV_Muhamad_Fikih_Rizaldi.pdf"
            download
            className="inline-flex items-center gap-2 bg-[#1C1917] text-[#FAFAF9] text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#292524] active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            {t("hero.cta.download")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-[#1C1917] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-[#1C1917] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-[#1C1917] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80" : "max-h-0"} bg-[#FAFAF9]/95 backdrop-blur-md border-t border-[#E7E5E4]`}>
        <div className="px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[#78716C] font-medium hover:text-[#1C1917] py-2.5 border-b border-[#F5F5F4] last:border-0 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/CV_Muhamad_Fikih_Rizaldi.pdf"
            download
            className="mt-4 text-center bg-[#1C1917] text-[#FAFAF9] font-semibold py-3 rounded-full hover:bg-[#292524] transition-colors"
          >
            {t("hero.cta.download")}
          </a>
        </div>
      </div>
    </header>
  );
}
