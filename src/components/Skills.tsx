"use client";

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "../context/Providers";

const icons = {
  cloud: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  code: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm9-7.5c0-.621.504-1.125 1.125-1.125h2.25C16.496 4.5 17 5.004 17 5.625v14.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0112 19.875V5.625zm-4.5 7.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125H8.625A1.125 1.125 0 017.5 19.875v-6.75z" />
    </svg>
  ),
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

interface SkillItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  tags: string[];
  accent: string;
  iconBg: string;
}

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`group bg-white border border-[#E7E5E4] rounded-2xl p-7 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/80 hover:border-[#D6D3D1] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`w-11 h-11 ${skill.iconBg} rounded-xl flex items-center justify-center mb-5 ${skill.accent}`}>
        {skill.icon}
      </div>
      <h3 className="text-[15px] font-semibold text-[#1C1917] mb-2.5 leading-snug">{skill.title}</h3>
      <p className="text-sm text-[#78716C] leading-relaxed mb-6 flex-1">{skill.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {skill.tags.map((tag) => (
          <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F5F5F4] text-[#78716C]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  const skillsList: SkillItem[] = [
    {
      title: "Artificial Intelligence & Generative AI",
      desc: "Mengembangkan aplikasi AI menggunakan LLM, Prompt Engineering, dan RAG. Berpengalaman integrasi Google Gemini API dan Google Cloud.",
      icon: icons.cloud,
      tags: ["Python", "Gemini API", "LangChain", "FAISS", "RAG", "Vertex AI", "BigQuery"],
      accent: "text-[#92400E]",
      iconBg: "bg-[#FEF3C7]",
    },
    {
      title: "Full Stack Development",
      desc: "Membangun aplikasi web responsif dengan React dan Next.js, serta backend dengan FastAPI dan Node.js.",
      icon: icons.code,
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "Node.js", "Git"],
      accent: "text-[#1E40AF]",
      iconBg: "bg-[#DBEAFE]",
    },
    {
      title: "Machine Learning & Data",
      desc: "Pengolahan data, pemodelan ML, analisis, dan visualisasi untuk menghasilkan insight berbasis data yang akurat.",
      icon: icons.chart,
      tags: ["Scikit-learn", "TensorFlow", "Pandas", "NumPy", "SQL", "Jupyter", "Python"],
      accent: "text-[#14532D]",
      iconBg: "bg-[#DCFCE7]",
    },
  ];

  return (
    <section id="keahlian" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1917] mb-3 tracking-tight">{t("skills.title")}</h2>
          <p className="text-[#78716C] text-base max-w-md">{t("skills.desc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skillsList.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
