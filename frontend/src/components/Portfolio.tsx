"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/Providers";
import { usePortfolio, Project } from "../context/PortfolioContext";

const projects = [
  {
    title: "Simo System",
    category: "Enterprise Web System",
    year: "2025",
    role: "Fullstack Software Developer",
    desc: "Platform kontrol operasional terintegrasi untuk pemantauan progres warehouse, logistik, quality control, dan audit log operasional industri secara real-time.",
    tags: ["React", "Node.js", "Fullstack", "Management System", "Tailwind CSS"],
    image: "/Simo.png",
    github: "https://github.com/Arsyacoo/Simo-System.git",
    live: "https://github.com/Arsyacoo/Simo-System.git",
  },
  {
    title: "MLOps Tarif Transportasi Online",
    category: "Machine Learning & DevOps",
    year: "2024",
    role: "Machine Learning Engineer",
    desc: "Mini pipeline MLOps otomatis untuk estimasi tarif transportasi online, mencakup versioning model dengan MLflow, kontainerisasi Docker, dan deployment REST API.",
    tags: ["Python", "MLflow", "Docker", "FastAPI", "Scikit-Learn"],
    image: "/mlops.png",
    github: "https://github.com/FikihRizaldi/Mini-Pipeline-MLOps-untuk-Estimasi-Tarif-Transportasi-Online",
    live: "https://github.com/FikihRizaldi/Mini-Pipeline-MLOps-untuk-Estimasi-Tarif-Transportasi-Online",
  },
  {
    title: "Battery Health Decision Tree",
    category: "Data Science & Diagnostics",
    year: "2024",
    role: "Data Scientist",
    desc: "Sistem klasifikasi cerdas kesehatan baterai berbasis algoritma Decision Tree untuk menganalisis degradasi kapasitas dan status kesehatan komponen secara akurat.",
    tags: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Data Analytics"],
    image: "/battery.png",
    github: "https://github.com/FikihRizaldi/Battery-Health-Decision-Tree-.git",
    live: "https://github.com/FikihRizaldi/Battery-Health-Decision-Tree-.git",
  },
  {
    title: "Upsite Web Platform",
    category: "Modern Web Platform",
    year: "2024",
    role: "Fullstack Web Developer",
    desc: "Aplikasi web modern berkecepatan tinggi dengan optimasi antarmuka intuitif, arsitektur komponen modular, dan performa responsif lintas perangkat.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "/Upsite.png",
    github: "https://github.com/FikihRizaldi/UpSite",
    live: "https://github.com/FikihRizaldi/UpSite",
  },
  {
    title: "Smart Learning Sora AI",
    category: "Generative AI Application",
    year: "2024",
    role: "AI Developer",
    desc: "Platform pembelajaran adaptif interaktif berbasis Generative AI dan LLM untuk personalisasi materi belajar secara kontekstual sesuai kebutuhan pengguna.",
    tags: ["Generative AI", "LLM", "Python", "React", "FastAPI"],
    image: "/sora.png",
    github: "https://github.com/FikihRizaldi/Smart-Learning",
    live: "https://github.com/FikihRizaldi/Smart-Learning",
  },
];

function ProjectCard({ project, index }: { project: Project | (typeof projects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`group bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Information */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full order-2 lg:order-1">
          <div>
            {/* Meta header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                {project.category}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-500">{project.year}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight mb-2 tracking-tight">
              {project.title}
            </h3>

            {/* Role indicator */}
            <div className="text-xs font-semibold text-slate-500 mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Peran: <span className="text-slate-800">{project.role}</span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              {project.desc}
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-indigo-600 rounded-full transition-all duration-200 shadow-xs active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub Code</span>
            </a>

            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-200 rounded-full transition-all duration-200 active:scale-95"
            >
              <span>Lihat Detail</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Preview Image Mockup */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner group/img">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const { data } = usePortfolio();
  const displayProjects = data.projects && data.projects.length > 0 ? data.projects : projects;

  return (
    <section id="proyek" className="py-24 sm:py-32 bg-white/50 border-t border-slate-200/70 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {t("work.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            {t("work.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t("work.subtitle")}
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-8 sm:space-y-10">
          {displayProjects.map((project, i) => (
            <ProjectCard key={(project as any).id || project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
