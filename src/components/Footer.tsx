"use client";

import { useLanguage } from "../context/Providers";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#1C1917] text-[#FAFAF9]">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div
              className="flex items-center gap-2.5 mb-4 cursor-pointer group w-fit"
              onClick={scrollToTop}
            >
              <div className="w-8 h-8 bg-[#78350F] rounded-lg flex items-center justify-center text-[#FEF3C7] font-bold text-xs group-hover:bg-[#92400E] transition-colors">
                FR
              </div>
              <span className="font-bold text-[#FAFAF9] tracking-tight">
                Fikih<span className="text-[#D97706]">Rizaldi</span>
              </span>
            </div>
            <p className="text-sm text-[#78716C] leading-relaxed max-w-[22ch]">
              {t("footer.desc")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-bold text-[#78716C] uppercase tracking-widest mb-5">Navigasi</h4>
            <ul className="space-y-3">
              {[
                { href: "#beranda", label: "Beranda" },
                { href: "#keahlian", label: "Keahlian" },
                { href: "#portofolio", label: "Portofolio" },
                { href: "#pengalaman", label: "Pengalaman" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[#A8A29E] hover:text-[#FAFAF9] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold text-[#78716C] uppercase tracking-widest mb-5">Kontak</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:fikihrz31@gmail.com" className="group flex items-center gap-3 text-sm text-[#A8A29E] hover:text-[#FAFAF9] transition-colors">
                  <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  fikihrz31@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/FikihRizaldi" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-[#A8A29E] hover:text-[#FAFAF9] transition-colors">
                  <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </span>
                  github.com/FikihRizaldi
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#78716C]">
                <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                Yogyakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#57534E]">
            &copy; {new Date().getFullYear()} Muhamad Fikih Rizaldi. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[#78716C] hover:text-[#FAFAF9] transition-colors group"
          >
            Kembali ke atas
            <span className="w-6 h-6 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/30 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
