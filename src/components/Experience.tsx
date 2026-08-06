"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/Providers";

interface Cert {
  title: string; issuer: string; year: string;
  desc: string; badge: string; link: string; color: string; image: string;
}

function CertCard({ cert, index, onOpenModal }: { cert: Cert; index: number; onOpenModal: (cert: Cert) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => onOpenModal(cert)}
      className={`cursor-pointer block group ring-1 ring-black/5 bg-black/[0.03] p-1.5 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/80 hover:ring-[#D6D3D1] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-white rounded-[calc(1rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative h-40 w-full bg-[#F5F5F4] border-b border-[#E7E5E4]/50 overflow-hidden">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md bg-white/90 text-[#1C1917]">
              {cert.year}
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          {/* Issuer */}
          <div className="text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="text-base">{cert.badge}</span>
            {cert.issuer}
          </div>

          {/* Title */}
          <h3 className="text-[13px] font-bold text-[#1C1917] mb-3 leading-snug group-hover:text-[#78350F] transition-colors">
            {cert.title}
          </h3>

          {/* Desc */}
          <p className="text-[11px] text-[#A8A29E] leading-relaxed line-clamp-2 mt-auto mb-4">{cert.desc}</p>

          {/* Action indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#78716C] group-hover:text-[#78350F] transition-colors mt-auto">
            <span>Pratinjau Sertifikat</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { t } = useLanguage();
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

  const certificates: Cert[] = [
    {
      title: "Google Gemini AI Developer",
      issuer: "Lastmile x SmartBridge Indonesia",
      year: "2026",
      desc: "Program intensif membangun aplikasi berbasis Google Gemini AI: prompt engineering, integrasi API, dan solusi Generative AI.",
      badge: "🏅",
      color: "bg-[#DBEAFE] text-[#1E40AF]",
      link: "#",
      image: "/sertifikat/lastmile.jpeg",
    },
    {
      title: "Machine Learning Operations (MLOps) for Generative AI",
      issuer: "Google",
      year: "2026",
      desc: "Implementasi MLOps untuk Generative AI: deployment model, pipeline ML, monitoring, dan siklus hidup model di Google Cloud.",
      badge: "⚙️",
      color: "bg-[#DCFCE7] text-[#14532D]",
      link: "#",
      image: "/sertifikat/Machine Learning Operations (MLOps) for Generative AI.png",
    },
    {
      title: "Prompt Design in Agent Platform",
      issuer: "Google",
      year: "2026",
      desc: "Teknik prompt efektif di Google Agent Platform: prompt engineering, agent workflow, dan optimasi respons AI generatif.",
      badge: "🧠",
      color: "bg-[#F3E8FF] text-[#6B21A8]",
      link: "#",
      image: "/sertifikat/Prompt Design in Agent Platform.png",
    },
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      year: "2025",
      desc: "Dasar-dasar jaringan komputer, model OSI dan TCP/IP, IPv4/IPv6, switching, routing, dan konfigurasi perangkat Cisco.",
      badge: "🌐",
      color: "bg-[#FEF3C7] text-[#92400E]",
      link: "#",
      image: "/sertifikat/Cisco.jpeg",
    },
  ];

  return (
    <section id="pengalaman" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1917] mb-3 tracking-tight">{t("cert.title")}</h2>
          <p className="text-[#78716C] text-base max-w-md">{t("cert.desc")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certificates.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} onOpenModal={setSelectedCert} />
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#E7E5E4] flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-[#A8A29E]">Sertifikasi terus diperbarui sesuai perkembangan teknologi.</p>
          <a
            href="https://github.com/FikihRizaldi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1917] hover:text-[#78350F] transition-colors group"
          >
            {t("cert.cta")}
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </div>

      {/* Modal Lightbox Popup */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl transition-all animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E5E4] bg-[#FAFAF9]">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedCert.badge}</span>
                <div>
                  <h3 className="text-base font-bold text-[#1C1917]">{selectedCert.title}</h3>
                  <p className="text-xs text-[#78716C]">{selectedCert.issuer} · {selectedCert.year}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-full bg-[#E7E5E4] hover:bg-[#D6D3D1] text-[#1C1917] flex items-center justify-center transition-colors font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body - Image Preview */}
            <div className="relative w-full h-[60vh] max-h-[500px] bg-[#1C1917] p-2 flex items-center justify-center">
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 800px"
                priority
              />
            </div>

            {/* Modal Footer - Details */}
            <div className="p-6 bg-white border-t border-[#E7E5E4]">
              <p className="text-sm text-[#44403C] leading-relaxed mb-4">{selectedCert.desc}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2 rounded-full bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524] transition-colors"
                >
                  Tutup Pratinjau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

