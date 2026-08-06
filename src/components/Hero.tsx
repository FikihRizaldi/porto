"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "../context/Providers";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Hero() {
  const { t } = useLanguage();
  const { ref, visible } = useReveal();

  return (
    <section
      id="beranda"
      className="relative min-h-[100dvh] flex items-center bg-[#FAFAF9] overflow-hidden"
    >
      {/* Subtle tinted background strip */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[#F0EDE8]/60 hidden lg:block" />

      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[100dvh]"
      >
        {/* Left: Text */}
        <div
          className={`py-32 lg:py-0 pr-0 lg:pr-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] text-[11px] font-semibold tracking-wide uppercase mb-8">
            <span className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full" />
            Tersedia · Open to Work
          </div>

          <h1 className="text-[2.75rem] sm:text-5xl lg:text-6xl font-bold text-[#1C1917] leading-[1.1] tracking-tight mb-6">
            {t("hero.greeting")}{" "}
            <br className="hidden sm:block" />
            <span className="italic text-[#78350F]">Fikih Rizaldi</span>
          </h1>

          <p
            className="text-base text-[#78716C] leading-relaxed max-w-[44ch] mb-10"
            dangerouslySetInnerHTML={{ __html: t("hero.desc") }}
          />

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-14">
            <a
              href="#portofolio"
              className="inline-flex items-center gap-3 bg-[#1C1917] text-[#FAFAF9] font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#292524] active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              {t("hero.cta.portfolio")}
              <span className="w-6 h-6 bg-[#FAFAF9]/10 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </a>
            <a
              href="#kontak"
              className="inline-flex items-center text-sm font-semibold text-[#44403C] px-6 py-3 rounded-full border border-[#D6D3D1] hover:border-[#A8A29E] hover:bg-[#F5F5F4] active:scale-[0.98] transition-all duration-200"
            >
              {t("nav.contact")}
            </a>
          </div>


        </div>

        {/* Right: Photo (desktop only) */}
        <div
          className={`hidden lg:flex items-center justify-end h-full transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative flex flex-col items-end w-full max-w-[420px]">
            {/* Outer bezel */}
            <div className="ring-1 ring-black/5 bg-black/5 p-2 rounded-[2rem] shadow-xl shadow-stone-200">
              {/* Inner core */}
              <div className="relative w-[360px] h-[460px] rounded-[calc(2rem-0.5rem)] overflow-hidden bg-[#E8E0D8] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                <Image
                  src="/Profil.jpeg"
                  alt="Foto profil Muhamad Fikih Rizaldi"
                  fill
                  sizes="360px"
                  priority
                  className="object-cover object-top"
                />
                {/* Subtle bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1C1917]/15 to-transparent" />
              </div>
            </div>

            {/* Floating info chip — bottom left */}
            <div className="absolute -bottom-4 -left-6 bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-2xl px-4 py-3 shadow-lg shadow-stone-200/50 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FEF3C7] rounded-xl flex items-center justify-center text-[#92400E]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#1C1917]">{t("hero.badge.title")}</div>
                <div className="text-[10px] text-[#A8A29E]">{t("hero.badge.desc")}</div>
              </div>
            </div>

            {/* Top right label */}
            <div className="absolute -top-3 right-0 bg-[#1C1917] text-[#FAFAF9] text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full">
              AI · Web Dev
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
