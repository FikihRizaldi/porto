"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/Providers";

const projects = [
  {
    title: "Simo System",
    role: "Software Developer",
    desc: "Pengembangan sistem manajemen dan operasional (Simo System) berbasis web.",
    tags: ["Web System", "Fullstack", "Management"],
    image: "/Simo.png",
    github: "https://github.com/Arsyacoo/Simo-System.git",
    live: "https://github.com/Arsyacoo/Simo-System.git",
  },
  {
    title: "MLOps Tarif Transportasi Online",
    role: "Machine Learning Engineer",
    desc: "Membangun model prediksi tarif transportasi online terintegrasi dengan pipeline MLOps untuk automasi deployment.",
    tags: ["Python", "MLflow", "Docker", "FastAPI"],
    image: "/mlops.png",
    github: "https://github.com/FikihRizaldi/Mini-Pipeline-MLOps-untuk-Estimasi-Tarif-Transportasi-Online",
    live: "https://github.com/FikihRizaldi/Mini-Pipeline-MLOps-untuk-Estimasi-Tarif-Transportasi-Online",
  },
  {
    title: "Battery Health Decision Tree",
    role: "Data Scientist",
    desc: "Analisis dan pemodelan prediktif klasifikasi kesehatan baterai menggunakan algoritma Decision Tree.",
    tags: ["Scikit-learn", "Pandas", "Matplotlib", "Python"],
    image: "/battery.png",
    github: "https://github.com/FikihRizaldi/Battery-Health-Decision-Tree-.git",
    live: "https://github.com/FikihRizaldi/Battery-Health-Decision-Tree-.git",
  },
  {
    title: "Upsite Web Development",
    role: "Fullstack Web Developer",
    desc: "Aplikasi web modern dengan performa tinggi untuk mengoptimalkan antarmuka dan pengalaman pengguna.",
    tags: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    image: "/Upsite.png",
    github: "https://github.com/FikihRizaldi/UpSite",
    live: "https://github.com/FikihRizaldi/UpSite",
  },
  {
    title: "Smart Learning Sora AI",
    role: "AI Developer",
    desc: "Sistem pembelajaran interaktif memanfaatkan AI generatif untuk meningkatkan personalisasi belajar.",
    tags: ["Generative AI", "LLM", "React", "Python"],
    image: "/sora.png",
    github: "https://github.com/FikihRizaldi/Smart-Learning",
    live: "https://github.com/FikihRizaldi/Smart-Learning",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
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
      className={`group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={() => window.open(project.github, "_blank")}
    >
      {/* Outer bezel */}
      <div className="ring-1 ring-black/5 bg-black/[0.03] p-1.5 rounded-[1.5rem] transition-all duration-300 group-hover:ring-[#D6D3D1] group-hover:shadow-xl group-hover:shadow-stone-200/80 group-hover:-translate-y-1">
        {/* Inner core */}
        <div className="bg-white rounded-[calc(1.5rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
          {/* Thumbnail */}
          <div className="relative h-52 w-full bg-[#F5F5F4] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            {/* Hover links overlay */}
            <div className="absolute inset-0 bg-[#1C1917]/0 group-hover:bg-[#1C1917]/50 flex items-center justify-center gap-3 transition-all duration-300">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1C1917] hover:bg-white shadow-sm"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1C1917] hover:bg-white shadow-sm"
                aria-label="Live Demo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Card body */}
          <div className="p-6">
            <div className="text-[11px] font-semibold text-[#92400E] bg-[#FEF3C7] px-2.5 py-1 rounded-full inline-block mb-3">
              {project.role}
            </div>
            <h3 className="text-base font-bold text-[#1C1917] mb-2 leading-snug group-hover:text-[#78350F] transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-[#78716C] leading-relaxed mb-4">{project.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-[#F5F5F4] text-[#78716C]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="portofolio" className="py-28 bg-[#FAFAF9]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1917] mb-3 tracking-tight">{t("port.title")}</h2>
          <p className="text-[#78716C] text-base max-w-md">{t("port.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
