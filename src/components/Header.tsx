"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { useLanguage } from "../context/Providers";
import { Languages } from "lucide-react";

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
    { href: "#beranda", label: t("nav.home") },
    { href: "#keahlian", label: t("nav.skills") },
    { href: "#portofolio", label: t("nav.portfolio") },
    { href: "#pengalaman", label: t("nav.experience") },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-card-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="#beranda" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-lg group-hover:scale-110 transition-transform duration-300">
            FR
          </div>
          <span
            className={`font-bold text-xl hidden sm:block transition-colors duration-300 text-dark`}
          >
            Fikih<span className="text-primary">Rizaldi</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? "text-gray-text" : "text-dark"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className={`p-2 rounded-full transition-all duration-300 ${scrolled ? 'text-dark hover:bg-gray-100' : 'text-dark hover:bg-white/10'}`}
            title="Ganti Bahasa"
          >
            <Languages className="w-5 h-5" />
          </button>
          <div className="hidden md:flex items-center gap-4 border-l border-gray-300 pl-6 ml-2"></div>
          <a
            href="/CV_Muhamad_Fikih_Rizaldi.pdf"
            download
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              scrolled
                ? "bg-primary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                : "border border-primary text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {t("hero.cta.download")}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? "rotate-45 translate-y-2 bg-dark"
                : "bg-dark"
            }`}
          />
          <span
            className={`w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? "opacity-0"
                : "bg-dark"
            }`}
          />
          <span
            className={`w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? "-rotate-45 -translate-y-2 bg-dark"
                : "bg-dark"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white/95 backdrop-blur-lg border-t border-card-border`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-dark font-medium hover:text-primary transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          <a 
            href="/CV_Muhamad_Fikih_Rizaldi.pdf"
            download
            className="block text-center w-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 cursor-pointer"
          >
            {t("hero.cta.download")}
          </a>
        </div>
      </div>
    </header>
  );
}
