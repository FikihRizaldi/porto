"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/Providers";

const projects = [
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
    desc: "Analisis dan pemodelan prediktif klasifikasi kesehatan baterai menggunakan algoritma Machine Learning Decision Tree.",
    tags: ["Scikit-learn", "Pandas", "Matplotlib", "Python"],
    image: "/battery.png",
    github: "https://github.com/FikihRizaldi/Battery-Health-Decision-Tree",
    live: "https://github.com/FikihRizaldi/Battery-Health-Decision-Tree",
  },
  {
    title: "Upsite Web Development",
    role: "Fullstack Web Developer",
    desc: "Aplikasi web modern dengan performa tinggi yang dirancang untuk mengoptimalkan antarmuka dan pengalaman pengguna.",
    tags: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    image: "/Upsite.png",
    github: "https://github.com/FikihRizaldi/UpSite",
    live: "https://github.com/FikihRizaldi/UpSite",
  },
  {
    title: "Smart Learning Sora AI",
    role: "AI Developer",
    desc: "Sistem cerdas pembelajaran interaktif memanfaatkan kemampuan AI generatif dari Sora AI untuk meningkatkan personalisasi belajar.",
    tags: ["Generative AI", "LLM", "React", "Python"],
    image: "/sora.png",
    github: "https://github.com/FikihRizaldi/Smart-Learning",
    live: "https://github.com/FikihRizaldi/Smart-Learning",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => window.open(project.github, "_blank")}
      className={`group bg-white rounded-2xl overflow-hidden border border-card-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Header Banner with Image */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-dark hover:bg-white hover:scale-110 transition-all shadow-lg"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-dark hover:bg-white hover:scale-110 transition-all shadow-lg"
              aria-label="Live Demo"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <span className="text-sm font-semibold text-primary">{project.role}</span>
        <h3 className="text-xl font-bold text-dark mt-1 mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-text leading-relaxed mb-4 text-sm">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-bg-light text-gray-text border border-card-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  
  return (
    <section id="portofolio" className="py-24 bg-bg-light relative">
      {/* Decorative bg element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t("port.subtitle")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t("port.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
