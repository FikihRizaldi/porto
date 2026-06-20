"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../context/Providers";

const certificates = [
  {
    title: "Google Gemini AI Developer",
    issuer: "LastMile",
    year: "2026",
    desc: "Program intensif yang mempersiapkan peserta didik untuk peran dunia nyata dalam pengembangan aplikasi AI Generatif berbasis Gemini.",
    badge: "🏅",
    color: "from-[#0284c7] to-[#38bdf8]",
  },
  // {
  //   title: "Data Analysis dengan Python",
  //   issuer: "Dicoding Indonesia",
  //   year: "2024",
  //   desc: "Menguasai teknik analisis data menggunakan Python, Pandas, NumPy, dan Matplotlib untuk menghasilkan insight bisnis yang actionable.",
  //   badge: "📊",
  //   color: "from-[#0369a1] to-[#0ea5e9]",
  // },
  // {
  //   title: "Belajar Dasar Pemrograman Web",
  //   issuer: "Dicoding Indonesia",
  //   year: "2023",
  //   desc: "Mempelajari fundamental pengembangan web mulai dari HTML, CSS, hingga JavaScript untuk membangun halaman web yang responsif dan interaktif.",
  //   badge: "🌐",
  //   color: "from-[#10b981] to-[#34d399]",
  // },
  // {
  //   title: "SQL for Data Science",
  //   issuer: "Coursera / IBM",
  //   year: "2023",
  //   desc: "Memahami penggunaan SQL untuk query data, agregasi, join, dan analisis data skala besar dalam konteks data science.",
  //   badge: "🗄️",
  //   color: "from-[#8b5cf6] to-[#c4b5fd]",
  // },
];

function CertCard({ cert, index }: { cert: (typeof certificates)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl overflow-hidden border border-card-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Top gradient band */}
      <div className={`h-2 w-full bg-gradient-to-r ${cert.color}`} />

      <div className="p-6">
        {/* Badge + Year */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{cert.badge}</span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
            {cert.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-dark mb-1 group-hover:text-primary transition-colors">
          {cert.title}
        </h3>

        {/* Issuer */}
        <div className="text-sm font-semibold text-secondary mb-3">{cert.issuer}</div>

        {/* Description */}
        <p className="text-sm text-gray-text leading-relaxed">{cert.desc}</p>
      </div>
    </div>
  );
}

export default function Experience() {
  const { t } = useLanguage();
  
  const localizedCertificates = [
    {
      title: t("cert.ml"),
      issuer: "LastMile",
      year: "2026",
      desc: t("cert.ml.desc"),
      badge: "🏅",
      color: "from-[#0284c7] to-[#38bdf8]",
    },
    // {
    //   title: t("cert.data"),
    //   issuer: "Dicoding Indonesia",
    //   year: "2024",
    //   desc: t("cert.data.desc"),
    //   badge: "📊",
    //   color: "from-[#0369a1] to-[#0ea5e9]",
    // },
    // {
    //   title: t("cert.web"),
    //   issuer: "Dicoding Indonesia",
    //   year: "2023",
    //   desc: t("cert.web.desc"),
    //   badge: "🌐",
    //   color: "from-[#10b981] to-[#34d399]",
    // },
    // {
    //   title: t("cert.sql"),
    //   issuer: "Coursera / IBM",
    //   year: "2023",
    //   desc: t("cert.sql.desc"),
    //   badge: "🗄️",
    //   color: "from-[#8b5cf6] to-[#c4b5fd]",
    // },
  ];

  return (
    <section id="pengalaman" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t("cert.subtitle")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t("cert.title")}
          </h2>
          <p className="text-gray-text max-w-xl mx-auto">
            {t("cert.desc")}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full" />
        </div>

        <div className={localizedCertificates.length === 1 ? "flex justify-center" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"}>
          {localizedCertificates.map((cert, i) => (
            <div key={i} className={localizedCertificates.length === 1 ? "max-w-md w-full" : ""}>
              <CertCard cert={cert} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/FikihRizaldi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            {t("cert.cta")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
