"use client";

import Image from "next/image";
import { useLanguage } from "../context/Providers";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-light"
    >
      {/* Background elements (Optimized: Removed mix-blend-multiply) */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl will-change-transform" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
        <div className="w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl will-change-transform" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
        
        {/* Left Column: Text Content */}
        <div className="text-left animate-fade-in-up">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-6 border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full" />
            IT Student & Tech Enthusiast
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-dark mb-6 leading-tight">
            {t("hero.greeting")} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative inline-block pb-2">
              Muhamad Fikih Rizaldi
            </span>
          </h1>

          <p 
            className="text-lg md:text-xl text-gray-text mb-8 leading-relaxed max-w-xl"
            dangerouslySetInnerHTML={{ __html: t("hero.desc") }}
          />

          <div className="flex flex-wrap gap-4">
            <a
              href="#portofolio"
              className="bg-primary text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              {t("hero.cta.portfolio")}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#kontak"
              className="bg-white text-dark border border-card-border font-bold px-8 py-3.5 rounded-xl shadow-sm hover:border-primary hover:text-primary transition-all duration-300"
            >
              {t("nav.contact")}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm font-medium text-gray-text">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-2-3.192V9.046a1 1 0 01.31-.35zM14 10.12v4.102a8.969 8.969 0 00-2 3.192v-6.57l1.69-.724z" />
              </svg>
              {t("hero.availability")}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Web Dev & ML
            </div>
          </div>
        </div>

        {/* Right Column: Visual Element */}
        <div className="relative hidden lg:block animate-fade-in-up-delay-1">
          {/* Image Container */}
          <div className="relative z-10 flex justify-center items-center">
            {/* Decorative background shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-20 blur-xl"></div>
            
            {/* Image Wrapper */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-tr from-primary via-white to-accent shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
                <Image 
                  src="/Profil.jpeg" 
                  alt="Fikih Rizaldi"
                  width={400}
                  height={400}
                  priority
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 will-change-transform"
                />
              </div>
            </div>
            
            {/* Decorative floating dots (optimized to be static) */}
            <div className="absolute top-10 right-10 w-4 h-4 bg-accent rounded-full"></div>
            <div className="absolute bottom-20 right-5 w-6 h-6 bg-primary rounded-full"></div>
            <div className="absolute top-1/2 left-5 w-3 h-3 bg-secondary rounded-full"></div>
          </div>
          
          {/* Floating badge (optimized) */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-card-border flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 .46-4.24 3 3 0 0 1-.5-4.2 2.5 2.5 0 0 1 2.5-2.5Z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0-.46-4.24 3 3 0 0 0 .5-4.2 2.5 2.5 0 0 0-2.5-2.5Z" />
                <path d="M12 9h3.5a1.5 1.5 0 0 0 0-3H12" />
                <path d="M12 12h-3.5a1.5 1.5 0 0 0 0 3H12" />
                <path d="M12 12h3.5a1.5 1.5 0 0 0 0 3H12" />
                <path d="M12 9h-3.5a1.5 1.5 0 0 0 0-3H12" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-dark text-lg">{t("hero.badge.title")}</div>
              <div className="text-sm text-gray-text">{t("hero.badge.desc")}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
