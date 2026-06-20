"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/Providers";

/* SVG icons inline to avoid external dependency */
const icons = {
  code: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  database: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  cloud: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
};

function SkillCard({
  skill,
  index,
}: {
  skill: { title: string; desc: string; icon: React.ReactNode; tags: string[] };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group bg-white border border-card-border p-8 rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-primary/50 cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {skill.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors duration-300">
        {skill.title}
      </h3>

      {/* Description */}
      <p className="text-gray-text leading-relaxed mb-5 flex-1">{skill.desc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-3 py-1 rounded-full bg-bg-light text-primary border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  
  const skillsList = [
    {
      title: t("skills.web"),
      desc: t("skills.web.desc"),
      icon: icons.code,
      tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    },
    {
      title: t("skills.ml"),
      desc: t("skills.ml.desc"),
      icon: icons.chart,
      tags: ["Scikit-learn", "TensorFlow", "XGBoost", "Jupyter"],
    },
    {
      title: t("skills.data"),
      desc: t("skills.data.desc"),
      icon: icons.database,
      tags: ["Python", "Pandas", "NumPy", "SQL"],
    },
  ];

  return (
    <section id="keahlian" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t("skills.subtitle")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-gray-text max-w-xl mx-auto">
            {t("skills.desc")}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsList.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
