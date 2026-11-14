"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { usePortfolio } from "../context/PortfolioContext";

// SVG Tech Logos for conveyor belt (NO EMOJIS, pure vector logos)
interface TechSkill {
  name: string;
  category: string;
  renderLogo: () => ReactNode;
}

const techSkills: TechSkill[] = [
  {
    name: "Python",
    category: "Core AI",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#3776AB]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.803v.825H3.9S0 5.767 0 11.916c0 6.148 3.4 5.922 3.4 5.922h2.03v-2.859s-.11-3.4 3.34-3.4h5.753v-.86H8.718s-3.342-.047-3.342-3.353c0-3.307 2.92-3.238 2.92-3.238h6.155s2.92.07 2.92 3.238v2.184h-2.182v.86h5.753s3.4-.226 3.4-5.922C24 3.21 21.32 0 11.914 0zM8.738 1.838a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm6.544 20.324a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" />
      </svg>
    ),
  },
  {
    name: "FastAPI",
    category: "Backend",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#009688]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.04 18.5v-5.62H8.38L13.04 5.5v5.62h2.58l-4.66 7.38z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    category: "Containers",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M23.79 9.89a4.84 4.84 0 00-3.328-1.523c-.114-.01-.212.085-.23.198a3.11 3.11 0 01-.652 1.488 4.7 4.7 0 01-1.787 1.347.195.195 0 00-.098.243 6.945 6.945 0 01.378 1.408c.038.257.06.517.06.779 0 1.25-.378 2.45-1.077 3.463-1.634 2.37-4.457 3.79-7.464 3.79-2.023 0-3.958-.65-5.544-1.854a8.91 8.91 0 01-2.905-4.148.188.188 0 00-.236-.118 6.7 6.7 0 01-1.127.247.19.19 0 00-.166.19 8.24 8.24 0 002.583 5.412c2.096 1.944 4.847 3.016 7.747 3.016 3.633 0 7.042-1.684 9.072-4.493a10.8 10.8 0 002.012-6.143c0-.62-.066-1.23-.195-1.823a.19.19 0 00-.199-.148" />
      </svg>
    ),
  },
  {
    name: "MLflow",
    category: "MLOps",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#0194E2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
      </svg>
    ),
  },
  {
    name: "PyTorch",
    category: "Deep Learning",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#EE4C2C]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.748 0a.44.44 0 00-.309.129L10.07 2.5a.442.442 0 00-.129.31v.003c0 .117.046.23.13.313l1.83 1.83a.442.442 0 00.312.13.438.438 0 00.31-.13l2.368-2.368a.442.442 0 00.13-.312.442.442 0 00-.13-.311L13.06.13A.442.442 0 0012.75 0zm5.666 5.666a.44.44 0 00-.312.13l-1.83 1.83a.442.442 0 00-.13.312c0 .118.046.23.13.313l2.37 2.368a.442.442 0 00.31.13.44.44 0 00.312-.13l1.83-1.83a.442.442 0 00.13-.312.442.442 0 00-.13-.311l-2.37-2.37a.442.442 0 00-.31-.13zm-12.828 0a.442.442 0 00-.312.13l-2.37 2.37a.442.442 0 00-.13.311.442.442 0 00.13.312l1.83 1.83a.44.44 0 00.312.13.442.442 0 00.31-.13l2.37-2.368a.442.442 0 00.13-.313.442.442 0 00-.13-.312l-1.83-1.83a.442.442 0 00-.312-.13zm6.414 4.086a6.25 6.25 0 100 12.5 6.25 6.25 0 000-12.5z" />
      </svg>
    ),
  },
  {
    name: "Scikit-Learn",
    category: "Machine Learning",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#F7931E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    name: "Google Gemini",
    category: "GenAI & LLM",
    renderLogo: () => (
      <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "Web Platform",
    renderLogo: () => (
      <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.836 17.518-4.81-6.87v6.87h-1.636V6.482h1.636l4.81 6.87V6.482h1.636v11.036h-1.636z" />
      </svg>
    ),
  },
  {
    name: "React",
    category: "Frontend",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Type Safety",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#3178C6]" viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff" fontFamily="system-ui, sans-serif">TS</text>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Runtime",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Database",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: "Git & GitHub",
    category: "Version Control",
    renderLogo: () => (
      <svg className="w-4 h-4 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.6 10.59L8.38 4.8a2.53 2.53 0 013.58 0l1.64 1.64-2.14 2.14a2 2 0 00-.7-.47 2 2 0 00-1.76.27 2 2 0 00-.6 2.45L6.68 12.6A2 2 0 004 14.5a2 2 0 002 2 2 2 0 001.9-1.39l2.12-2.12a2 2 0 002.34-.14 2 2 0 00.7-1.68l2.1-2.1 4.14 4.14a2.53 2.53 0 010 3.58l-5.78 5.78a2.53 2.53 0 01-3.58 0L2.6 14.17a2.53 2.53 0 010-3.58z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const { data } = usePortfolio();
  const profile = data.profile;
  const card0 = (data.heroCards?.find((c) => c.index === 0) || {}) as Record<string, any>;
  const card1 = (data.heroCards?.find((c) => c.index === 1) || {}) as Record<string, any>;
  const card2 = (data.heroCards?.find((c) => c.index === 2) || {}) as Record<string, any>;
  const card3 = (data.heroCards?.find((c) => c.index === 3) || {}) as Record<string, any>;
  const card4 = (data.heroCards?.find((c) => c.index === 4) || {}) as Record<string, any>;

  // 5 Stack Cards positions: [card0, card1, card2, card3, card4]
  const [stackOrder, setStackOrder] = useState<number[]>([0, 1, 2, 3, 4]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("beranda");
  const autoShuffleTimer = useRef<NodeJS.Timeout | null>(null);

  // Scroll spy to highlight active section in floating dock
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["beranda", "proyek", "pengalaman", "kontak"];
      const scrollPos = window.scrollY + 350;
      
      // If at bottom of page, highlight kontak
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 120) {
        setActiveSection("kontak");
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatic card shuffle (every 7 seconds)
  useEffect(() => {
    if (isPaused) {
      if (autoShuffleTimer.current) clearInterval(autoShuffleTimer.current);
      return;
    }

    autoShuffleTimer.current = setInterval(() => {
      setStackOrder((prev) => [prev[1], prev[2], prev[3], prev[4], prev[0]]);
    }, 7000);

    return () => {
      if (autoShuffleTimer.current) clearInterval(autoShuffleTimer.current);
    };
  }, [isPaused]);

  // Manual Shuffle Button
  const handleShuffleClick = () => {
    setStackOrder((prev) => [prev[1], prev[2], prev[3], prev[4], prev[0]]);
  };

  // Click on a specific card to bring to front
  const handleCardClick = (cardIndex: number) => {
    setStackOrder((prev) => {
      if (prev[0] === cardIndex) {
        return [prev[1], prev[2], prev[3], prev[4], prev[0]];
      }
      const filtered = prev.filter((idx) => idx !== cardIndex);
      return [cardIndex, ...filtered];
    });
  };

  // Get position index (0 to 4) for a given card
  const getPos = (cardIndex: number) => stackOrder.indexOf(cardIndex);

  return (
    <section
      id="beranda"
      className="relative min-h-[max(860px,100svh)] pt-24 sm:pt-28 pb-36 sm:pb-40 flex flex-col items-center justify-center bg-transparent select-none"
    >
      {/* MAIN EDITORIAL CONTENT & HEADLINE */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6]/90 backdrop-blur-sm border border-slate-300/80 shadow-xs text-slate-700 text-xs sm:text-[13px] font-medium select-none mb-5 sm:mb-6 hover:border-indigo-400 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-600 font-medium">
            {profile?.status_badge || "Open for full-time positions"}
          </span>
        </div>

        {/* Editorial Headline */}
        <h1 className="font-editorial-serif text-3xl sm:text-5xl md:text-[54px] text-slate-800 tracking-tight leading-[1.14] max-w-3xl mb-8 sm:mb-10">
          <span className="block font-normal">
            {profile?.headline_prefix || "A developer and researcher for"}
          </span>
          <span className="block font-bold text-indigo-600 tracking-tight mt-1">
            {profile?.headline_highlight || "intelligent systems & modern web"}
          </span>
        </h1>

        {/* ================= CARD STACK CONTAINER (358px x 458px) ================= */}
        <div className="card-stack">
          <div className="stack-stage">
            
            {/* CARD 0: PHOTO CARD (/profile.png + HANDWRITTEN NOTE) */}
            <article
              data-card
              data-position={getPos(0)}
              onClick={() => handleCardClick(0)}
              className="stack-card bg-white flex flex-col"
            >
              <div
                style={{ position: "relative", width: "100%", height: "355px" }}
                className="rounded-[12px] overflow-hidden bg-gradient-to-b from-indigo-100/90 via-indigo-50/70 to-slate-100 border border-indigo-100/80 shadow-inner"
              >
                <Image
                  src={profile?.avatar_url || card0?.image || "/profile.png"}
                  alt={`${profile?.name || "Muhamad Fikih Rizaldi"} profile`}
                  fill
                  priority
                  sizes="(max-width: 600px) 82vw, 330px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
              </div>

              <p className="font-handwritten text-lg sm:text-xl text-slate-800 text-center mt-3 -rotate-1 select-none">
                {profile?.handwritten_note || card0?.note || "Hey, nice to have you here"}
              </p>
            </article>

            {/* CARD 1: BIO & ENGINEERING PHILOSOPHY CARD */}
            <article
              data-card
              data-position={getPos(1)}
              onClick={() => handleCardClick(1)}
              className="stack-card bg-white flex flex-col justify-between p-6 text-left border border-slate-200/90 shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm shadow-indigo-600/30">
                  {card1?.initials || profile?.initials || "FR"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {card1?.author || profile?.name || "Muhamad Fikih Rizaldi"}
                  </h4>
                  <p className="text-xs text-indigo-600 font-semibold">
                    {card1?.subtitle || "AMIKOM Yogyakarta · Informatika"}
                  </p>
                </div>
              </div>

              <blockquote className="font-editorial-serif italic text-base sm:text-lg text-slate-700 leading-snug my-3">
                “{card1?.quote || "Building high-impact machine learning pipelines and modern fullstack architectures that translate complex problems into fast, scalable software."}”
              </blockquote>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Core Focus:</span>
                <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 font-bold text-indigo-600 text-[11px]">
                  {card1?.core_focus || "AI & Modern Web"}
                </span>
              </div>
            </article>

            {/* CARD 2: AKADEMIK & PEMINATAN (NO EMOJIS, CLEAN SVG ICONS) */}
            <article
              data-card
              data-position={getPos(2)}
              onClick={() => handleCardClick(2)}
              className="stack-card bg-white flex flex-col justify-between p-6 text-left border border-slate-200/90 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                    {card2?.tag || "Pendidikan & Track"}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-semibold">
                    {card2?.period || "2022 — Sekarang"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {card2?.university || "Universitas AMIKOM Yogyakarta"}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold mb-3.5">
                  {card2?.degree || "S1 Informatika"}
                </p>

                <div className="space-y-3 border-t border-slate-100 pt-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-slate-800 block">Konsentrasi Studi</span>
                      <span className="text-slate-600 text-[11px] font-medium">
                        {card2?.concentration || "Pemrograman"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="12 8 8 12 12 16 16 12 12 8" />
                      </svg>
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-slate-800 block">Fokus Minat & Target</span>
                      <span className="text-slate-600 text-[11px] font-medium">
                        {card2?.interest_focus || "Machine Learning, AI, Data & Modern Web"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-slate-800 block">Indeks Prestasi Kumulatif</span>
                      <span className="inline-flex items-center gap-1.5 mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold font-mono text-[11px] border border-indigo-100">
                          {card2?.gpa || "IPK 3.82"}
                        </span>
                        <span className="text-slate-500 text-[11px]">/ 4.00</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  {card2?.status || "Mahasiswa Aktif"}
                </span>
                <span className="text-slate-500 font-medium text-[11px]">
                  {card2?.location || "Sleman, Yogyakarta"}
                </span>
              </div>
            </article>

            {/* CARD 3: TECH STACK & WHERE I BUILD CARD (PURE SVG LOGOS, NO EMOJIS) */}
            <article
              data-card
              data-position={getPos(3)}
              onClick={() => handleCardClick(3)}
              className="stack-card bg-white flex flex-col justify-between p-6 text-left border border-slate-200/90 shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {card3?.title || "What I build with"}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold mb-4">
                  {card3?.subtitle || "Core Technology Stack"}
                </p>

                <div className="space-y-2.5">
                  {(card3?.items || [
                    { category: "AI & Machine Learning", tech: "Python · Docker · MLflow" },
                    { category: "Modern Fullstack", tech: "Next.js · React · TypeScript" },
                    { category: "Database & API", tech: "FastAPI · PostgreSQL" },
                  ]).map((item: any, idx: number) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <svg className="w-4 h-4 text-indigo-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-indigo-600 font-bold">{item.tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={card3?.button_link || "#proyek"}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-indigo-600 transition-colors block shadow-xs"
              >
                {card3?.button_text || "Explore 5 Case Studies →"}
              </a>
            </article>

            {/* CARD 4: SOCIALS & CREDENTIALS CARD (EXACT IRFAN KURNIA STYLE) */}
            <article
              data-card
              data-position={getPos(4)}
              onClick={() => handleCardClick(4)}
              className="stack-card social-card flex flex-col justify-between"
            >
              <div>
                <h3>{card4?.title || "My socials"}</h3>

                {/* Featured wide LinkedIn button */}
                <a
                  href={card4?.linkedin_url || "https://www.linkedin.com/in/muhamad-fikih-rizaldi-b04528374"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin-social"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A66C2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span className="truncate max-w-[210px] text-sm sm:text-[15px]">
                    {card4?.linkedin_handle && !card4.linkedin_handle.startsWith("/in/muhamad-fikih-rizaldi")
                      ? card4.linkedin_handle
                      : "LinkedIn Profile"}
                  </span>
                </a>

                {/* 2x2 Grid Below */}
                <div className="social-grid">
                  {/* Instagram */}
                  <a
                    href={card4?.instagram_url || "https://www.instagram.com/fikihrz_/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link group"
                    title="Instagram"
                  >
                    <svg className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    <span>{card4?.instagram_handle || "Instagram"}</span>
                  </a>

                  {/* GitHub */}
                  <a
                    href={card4?.github_url || "https://github.com/FikihRizaldi"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link group"
                    title="GitHub"
                  >
                    <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    <span>{card4?.github_handle || "GitHub"}</span>
                  </a>

                  {/* Resume PDF */}
                  <a
                    href={card4?.resume_url || profile?.resume_url || "/CV_Muhamad_Fikih_Rizaldi.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link group"
                    title="Download Resume PDF"
                  >
                    <svg className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="12" y2="18"/>
                      <line x1="15" y1="15" x2="12" y2="18"/>
                    </svg>
                    <span>Resume</span>
                  </a>

                  {/* Direct Email */}
                  <a
                    href={`mailto:${card4?.email || data?.contact?.email || "fikihrz31@gmail.com"}`}
                    onClick={(e) => {
                      const targetMail = card4?.email || data?.contact?.email || "fikihrz31@gmail.com";
                      try {
                        navigator.clipboard.writeText(targetMail);
                      } catch (err) {}
                      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetMail)}`, "_blank", "noopener,noreferrer");
                    }}
                    className="social-link group cursor-pointer"
                    title="Send Email (Opens Gmail Web / Mail App)"
                  >
                    <svg className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span>Email</span>
                  </a>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 text-center border-t border-white/5 pt-2 mt-2">
                {card4?.footer_note || "Ready for full-time & collaboration opportunities."}
              </p>
            </article>

          </div>

          {/* STACK CONTROLS UNDER THE CARDS */}
          <div className="stack-controls">
            <button
              type="button"
              onClick={handleShuffleClick}
              aria-label="Shuffle hero cards"
            >
              <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              <span>Shuffle</span>
            </button>

            <span className="stack-count">
              <span>{stackOrder[0] + 1}</span> / 5
            </span>

            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Resume auto shuffle" : "Pause auto shuffle"}
            >
              {isPaused ? (
                <>
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* SKILL CONVEYOR BELT (REAL SVG VECTOR LOGOS, NO EMOJIS) */}
      <div className="logo-conveyor" aria-hidden="true">
        <div className="logo-track">
          {[...techSkills, ...techSkills].map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3.5 py-1.5 mx-2 rounded-full bg-white/80 border border-slate-200/90 shadow-2xs hover:border-indigo-300 transition-colors"
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="flex items-center justify-center shrink-0">{skill.renderLogo()}</span>
              <span className="text-xs font-semibold text-slate-700">{skill.name}</span>
              <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-100">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING DOCK TASKBAR */}
      <nav className="floating-dock" aria-label="Quick Navigation">
        {/* Monogram Brand Button */}
        <a href="#beranda" className="dock-home-btn" title="Home">
          <div className="dock-logo-badge">
            <svg
              className="w-7 h-7"
              viewBox="0 0 36 36"
              fill="currentColor"
            >
              <rect x="2" y="2" width="32" height="32" rx="16" fill="#0F172A" />
              <text
                x="18"
                y="24"
                textAnchor="middle"
                fontSize="17"
                fontWeight="800"
                fill="#FFFFFF"
                letterSpacing="-0.5px"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                fr
              </text>
              <circle cx="27" cy="8" r="3.5" fill="#4F46E5" />
            </svg>
          </div>
        </a>

        {/* Work */}
        <a
          href="#proyek"
          className={`dock-pill-link ${activeSection === "proyek" ? "active" : ""}`}
        >
          <svg className="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 4-2 2" />
            <path d="m15 9-2 2" />
            <path d="m9 15-2 2" />
            <path d="M19 8a3 3 0 0 0-3-3l-9 9a3 3 0 0 0 0 4.24l.76.76a3 3 0 0 0 4.24 0l9-9a3 3 0 0 0 0-4.24L19 8Z" />
            <path d="M18 2h4v4" />
            <path d="m22 2-5 5" />
          </svg>
          <span>Work</span>
        </a>

        {/* Quests */}
        <a
          href="#pengalaman"
          className={`dock-pill-link ${activeSection === "pengalaman" ? "active" : ""}`}
        >
          <svg className="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.3 8.7 8.7 21.3c-.4.4-1 .4-1.4 0l-6-6c-.4-.4-.4-1 0-1.4L13.9 1.3c.4-.4 1-.4 1.4 0l6 6c.4.4.4 1 0 1.4z" />
            <path d="m14.5 3.5 2 2" />
            <path d="m11.5 6.5 3 3" />
            <path d="m8.5 9.5 2 2" />
            <path d="m5.5 12.5 3 3" />
          </svg>
          <span>Quests</span>
        </a>

        {/* Let's Talk */}
        <a
          href="#kontak"
          className={`dock-pill-link ${activeSection === "kontak" ? "active" : ""}`}
        >
          <svg className="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span>Let&apos;s Talk</span>
        </a>

        {/* Divider */}
        <span className="dock-divider" aria-hidden="true"/>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/fikihrz_/"
          target="_blank"
          rel="noopener noreferrer"
          className="dock-pill-link dock-social"
          title="Instagram @fikihrz_"
        >
          <svg className="dock-icon text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
      </nav>
    </section>
  );
}
