"use client";

import { useState } from "react";
import { useLanguage } from "../context/Providers";
import { usePortfolio } from "../context/PortfolioContext";

export default function Contact() {
  const { t } = useLanguage();
  const { data } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [mailFeedback, setMailFeedback] = useState(false);
  const email = data.contact?.email || "fikihrz31@gmail.com";
  const instagramUrl = data.contact?.instagram_url || "https://www.instagram.com/fikihrz_/";
  const linkedinUrl = data.contact?.linkedin_url || "https://www.linkedin.com/in/muhamad-fikih-rizaldi-b04528374";
  const githubUrl = data.contact?.github_url || "https://github.com/FikihRizaldi";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      navigator.clipboard.writeText(email);
    } catch (err) {}
    setMailFeedback(true);
    setTimeout(() => setMailFeedback(false), 4000);

    // 1. Open Gmail Web compose in a new tab (works instantly for all desktop Chrome/Edge users)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    // 2. Also trigger native mailto
    setTimeout(() => {
      window.location.href = `mailto:${email}`;
    }, 300);
  };

  return (
    <section id="kontak" className="py-24 sm:py-32 bg-white/50 border-t border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Indigo Gradients */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 text-indigo-300 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {data.contact?.contact_badge || t("contact.badge")}
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
              {data.contact?.contact_title || t("contact.title")}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl">
              {data.contact?.contact_subtitle || t("contact.subtitle")}
            </p>

            {/* Interactive Email Bar & Quick Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
              <div className="flex-1 flex items-center justify-between px-5 py-3.5 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="font-mono text-sm sm:text-base text-slate-200 select-all">{email}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="text-xs font-semibold text-indigo-300 hover:text-white px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {copied ? t("contact.copied") : t("contact.copy")}
                </button>
              </div>

              <button
                type="button"
                onClick={handleSendEmail}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-2xl shadow-lg transition-all active:scale-95 text-center cursor-pointer whitespace-nowrap"
              >
                <span>{mailFeedback ? "✓ Membuka Email..." : t("contact.sendMail")}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {mailFeedback && (
              <p className="text-xs text-indigo-300 -mt-6 mb-8 animate-fade-in flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Alamat email ({email}) telah disalin ke clipboard! Membuka Gmail / Email App...</span>
              </p>
            )}

            {/* Social Channels Row */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Tautan Langsung:</span>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 text-pink-300 font-semibold transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Instagram ↗
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub ↗
              </a>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Yogyakarta, Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
