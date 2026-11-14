"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/Providers";
import { usePortfolio } from "../context/PortfolioContext";

interface Cert {
  title: string;
  issuer: string;
  year: string;
  desc: string;
  badge: string;
  color: string;
  image: string;
}

const workAndEducation = [
  {
    type: "work",
    role: "Software Developer",
    organization: "Simo System",
    period: "2025 — Sekarang",
    location: "Project-based",
    description:
      "Merancang dan mengembangkan sistem kontrol manajemen operasional terpadu untuk monitoring alur kerja gudang, aktivitas logistik, dan pencatatan audit log pabrik.",
    tags: ["React", "Node.js", "Fullstack", "Management System"],
  },
  {
    type: "work",
    role: "Machine Learning & AI Developer",
    organization: "Independent & Research Projects",
    period: "2024 — Sekarang",
    location: "Yogyakarta",
    description:
      "Membangun pipeline MLOps otomatis untuk estimasi tarif transportasi, model klasifikasi kesehatan baterai dengan Decision Tree, dan aplikasi edukasi adaptif berbasis LLM (Google Gemini).",
    tags: ["Python", "MLflow", "Docker", "FastAPI", "Scikit-Learn"],
  },
  {
    type: "work",
    role: "Fullstack Web Developer",
    organization: "Freelance & Collaborative Projects",
    period: "2023 — 2024",
    location: "Remote",
    description:
      "Membangun berbagai solusi situs web modern (UpSite) berkinerja tinggi dengan arsitektur komponen modular dan fokus pada pengalaman pengguna yang intuitif.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
  },
  {
    type: "education",
    role: "S1 Informatika (Computer Science)",
    organization: "Universitas AMIKOM Yogyakarta",
    period: "2022 — Sekarang",
    location: "Yogyakarta, Indonesia",
    description:
      "Fokus pendalaman kurikulum pada Kecerdasan Buatan (Artificial Intelligence), Algoritma & Struktur Data, Rekayasa Perangkat Lunak, dan Basis Data Skala Besar.",
    tags: ["IPK Unggul", "Computer Science", "Artificial Intelligence"],
  },
];

const certificates: Cert[] = [
  {
    title: "Google Gemini AI Developer",
    issuer: "Lastmile x SmartBridge Indonesia",
    year: "2026",
    desc: "Program intensif membangun aplikasi berbasis Google Gemini AI: prompt engineering, integrasi API, dan solusi Generative AI.",
    badge: "AI & LLM",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    image: "/Sertifikat/lastmile.jpeg",
  },
  {
    title: "Machine Learning Operations (MLOps) for Generative AI",
    issuer: "Google",
    year: "2026",
    desc: "Implementasi MLOps untuk Generative AI: deployment model, pipeline ML, monitoring, dan siklus hidup model di Google Cloud.",
    badge: "MLOps",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    image: "/Sertifikat/Machine Learning Operations (MLOps) for Generative AI.png",
  },
  {
    title: "Prompt Design in Agent Platform",
    issuer: "Google",
    year: "2026",
    desc: "Teknik prompt efektif di Google Agent Platform: prompt engineering, agent workflow, dan optimasi respons AI generatif.",
    badge: "Prompt Eng",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    image: "/Sertifikat/Prompt Design in Agent Platform.png",
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    year: "2025",
    desc: "Fundamental arsitektur jaringan komputer, model OSI & TCP/IP, protokol IPv4/IPv6, switching, routing, dan konfigurasi perangkat.",
    badge: "Networks",
    color: "bg-slate-100 text-slate-800 border-slate-200",
    image: "/Sertifikat/Cisco.jpeg",
  },
];

export default function Experience() {
  const { t } = useLanguage();
  const { data } = usePortfolio();
  const displayItems = data.experiences && data.experiences.length > 0 ? data.experiences : workAndEducation;
  const displayCerts = (data.certificates && data.certificates.length > 0 ? data.certificates : certificates) as Cert[];
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <section id="pengalaman" className="py-24 sm:py-32 bg-white/50 border-t border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {t("exp.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            {t("exp.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t("exp.subtitle")}
          </p>
        </div>

        {/* Part 1: Timeline Pengalaman Kerja & Pendidikan */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t("exp.tab.experience")}
            </h3>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-100 space-y-10 sm:space-y-12">
            {displayItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-3 border-indigo-600 group-hover:scale-125 transition-transform" />

                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div>
                      <span className="text-xs font-semibold text-indigo-600 tracking-wide uppercase">
                        {item.organization}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {item.role}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded-full font-medium shrink-0">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-slate-600 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Sertifikasi Terverifikasi dengan Modal Interaktif */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t("exp.tab.certificates")}
            </h3>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCerts.map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white rounded-full shadow-xs">
                        {cert.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${cert.color}`}>
                        {cert.badge}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-medium text-slate-500 truncate">{cert.issuer}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2 line-clamp-2">
                      {cert.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {cert.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                  <span>{t("exp.viewCert")}</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Preview Sertifikat */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-fade-in-up"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                  {selectedCert.issuer} · {selectedCert.year}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{selectedCert.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                aria-label="Tutup modal"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image viewer */}
            <div className="relative aspect-[16/11] w-full bg-slate-50 flex items-center justify-center p-4">
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
            </div>

            {/* Footer description */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
                {selectedCert.desc}
              </p>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-indigo-600 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
