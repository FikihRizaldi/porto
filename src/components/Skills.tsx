"use client";

import { useLanguage } from "../context/Providers";
import { usePortfolio } from "../context/PortfolioContext";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    description: "Merancang model prediktif, integrasi LLM, dan automasi deployment pipeline MLOps siap produksi.",
    badge: "Machine Intelligence",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    skills: ["Python", "Scikit-Learn", "MLflow", "Docker", "FastAPI", "Google Gemini API", "LLMs", "Decision Trees"],
  },
  {
    title: "Modern Web Engineering",
    description: "Membangun antarmuka web interaktif yang cepat, scalable, ramah SEO, dan mengutamakan pengalaman pengguna.",
    badge: "Web Applications",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "HTML5 & Modern CSS", "RESTful APIs"],
  },
  {
    title: "Data Analytics & Infrastructure",
    description: "Mengolah dan memvalidasi dataset kompleks menjadi wawasan bisnis yang terstruktur dan dapat ditindaklanjuti.",
    badge: "Data & Systems",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm9-7.5c0-.621.504-1.125 1.125-1.125h2.25C16.496 4.5 17 5.004 17 5.625v14.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0112 19.875V5.625zm-4.5 7.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125H8.625A1.125 1.125 0 017.5 19.875v-6.75z" />
      </svg>
    ),
    skills: ["Pandas", "NumPy", "SQL", "Matplotlib", "Git & GitHub", "Linux CLI", "Cloud Computing"],
  },
];

export default function Skills() {
  const { t } = useLanguage();
  const { data } = usePortfolio();
  const categories = data.skillCategories && data.skillCategories.length > 0 ? data.skillCategories : skillCategories;

  return (
    <section id="keahlian" className="py-24 sm:py-32 bg-white/50 border-t border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {t("skills.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, i) => (
            <div
              key={(cat as any).id || cat.title}
              className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group"
            >
              <div>
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-colors">
                    {(cat as any).icon || (
                      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                    {cat.badge}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/70">
                {cat.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium group-hover:border-indigo-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
