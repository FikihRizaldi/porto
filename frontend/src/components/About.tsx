"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/Providers";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

export default function About() {
  const { t } = useLanguage();
  const { ref, visible } = useReveal();

  return (
    <section id="tentang" className="py-24 sm:py-28 bg-[#FAFAF9] relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5EBE0]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8DFD8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left Column: Visual Card with Profile Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="ring-1 ring-black/5 bg-black/[0.03] p-3 rounded-[2.5rem] shadow-xl shadow-stone-200">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#E8E0D8] shadow-inner">
                  <Image
                    src="/Profil.jpeg"
                    alt="Muhamad Fikih Rizaldi"
                    fill
                    sizes="(max-width: 1024px) 380px, 420px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/35 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-white/60 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#1C1917]">Muhamad Fikih Rizaldi</p>
                      <p className="text-[11px] text-[#78350F] font-medium">Informatika · AMIKOM</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-xs" title="Open to Work" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-[2.5rem] bg-[#F3ECE4] border border-[#E7DFD5]" />
            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-[11px] font-bold tracking-wider uppercase mb-5 w-fit">
              <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full" />
              {t("about.badge")}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-6">
              {t("about.title")}
            </h2>

            <div className="space-y-4 text-base text-[#78716C] leading-relaxed mb-8">
              <p dangerouslySetInnerHTML={{ __html: t("about.desc1") }} />
              <p dangerouslySetInnerHTML={{ __html: t("about.desc2") }} />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/CV_Muhamad_Fikih_Rizaldi.pdf"
                download
                className="inline-flex items-center gap-2 bg-[#1C1917] text-[#FAFAF9] font-semibold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-[#292524] active:scale-95 transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t("hero.cta.download")}
              </a>
              <a
                href="#kontak"
                className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#44403C] px-6 py-3 rounded-full border border-[#D6D3D1] hover:border-[#A8A29E] hover:bg-[#F5F5F4] active:scale-95 transition-all"
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
