"use client";

import { useLanguage } from "../context/Providers";

export default function Contact() {
  const { t } = useLanguage();
  
  return (
    <section id="kontak" className="py-24 bg-bg-light relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t("contact.subtitle")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-gray-text max-w-xl mx-auto text-lg">
            {t("contact.desc")}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full" />
        </div>

        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-card-border transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30 relative group overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h3 
            className="text-2xl md:text-3xl font-bold text-dark mb-6 relative z-10"
            dangerouslySetInnerHTML={{ __html: t("contact.action.title") }}
          />
          <p className="text-gray-text mb-12 leading-relaxed max-w-2xl mx-auto text-lg relative z-10">
            {t("contact.action.desc")}
          </p>
          
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=fikihrz31@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-lg">{t("contact.form.submit")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
