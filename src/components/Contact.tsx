"use client";

import Image from "next/image";
import { useLanguage } from "../context/Providers";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="kontak" className="py-28 bg-[#F5F5F4]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="ring-1 ring-black/5 bg-black/[0.02] p-2 rounded-[2rem] shadow-xl shadow-stone-200/60">
          <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: message */}
              <div className="p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#E7E5E4]">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-[11px] font-semibold uppercase tracking-wide mb-6 w-fit">
                  <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full" />
                  {t("contact.subtitle")}
                </div>

                <h2
                  className="text-3xl md:text-4xl font-bold text-[#1C1917] mb-4 leading-tight tracking-tight"
                  dangerouslySetInnerHTML={{ __html: t("contact.action.title") }}
                />
                <p className="text-[#78716C] text-base leading-relaxed mb-8 max-w-md">
                  {t("contact.action.desc")}
                </p>

                <div className="flex items-center gap-4 mb-8 pt-6 border-t border-[#E7E5E4]">
                  <div className="w-14 h-14 rounded-full bg-[#E8E0D8] border-2 border-white shadow-sm overflow-hidden relative shrink-0">
                    <Image src="/Profil.jpeg" alt="Fikih Rizaldi" fill className="object-cover object-top" sizes="56px" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#1C1917] leading-tight mb-0.5">Muhamad Fikih Rizaldi</h3>
                    <p className="text-xs font-semibold text-[#78350F] uppercase tracking-wide">AI & Web Developer</p>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-[#E7E5E4] border-dashed">
                  {[
                    { label: "Email", value: "fikihrz31@gmail.com", href: "mailto:fikihrz31@gmail.com" },
                    { label: "LinkedIn", value: "Muhamad Fikih Rizaldi", href: "https://www.linkedin.com/in/muhamad-fikih-rizaldi-b04528374" },
                    { label: "Lokasi", value: "Yogyakarta, Indonesia", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <span className="text-[11px] font-bold text-[#A8A29E] uppercase tracking-wide w-16 flex-shrink-0">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer"
                          className="text-sm text-[#44403C] font-medium hover:text-[#78350F] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-[#44403C] font-medium">{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CTA */}
              <div className="p-10 lg:p-14 flex flex-col justify-center items-center text-center bg-[#1C1917] rounded-[calc(2rem-0.5rem)] lg:rounded-l-none">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#FAFAF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#FAFAF9] mb-3 tracking-tight">
                  {t("contact.title")}
                </h3>
                <p className="text-[#A8A29E] text-sm leading-relaxed mb-8 max-w-xs">
                  {t("contact.desc")}
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=fikihrz31@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#FAFAF9] text-[#1C1917] font-bold text-sm px-7 py-3.5 rounded-full hover:bg-[#F5F5F4] active:scale-[0.98] transition-all duration-200 shadow-sm group"
                >
                  {t("contact.form.submit")}
                  <span className="w-7 h-7 bg-[#1C1917]/8 rounded-full flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </a>

                {/* Socials */}
                <div className="flex gap-3 mt-8">
                  {[
                    { href: "https://github.com/FikihRizaldi", label: "GitHub", path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", filled: true },
                    { href: "https://www.linkedin.com/in/muhamad-fikih-rizaldi-b04528374", label: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", filled: true },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#A8A29E] hover:text-[#FAFAF9] hover:border-white/30 transition-all duration-200"
                      aria-label={s.label}>
                      <svg className="w-4 h-4" fill={s.filled ? "currentColor" : "none"} viewBox="0 0 24 24">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
