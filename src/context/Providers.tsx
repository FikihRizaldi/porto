"use client";

import React, { createContext, useContext, useState } from "react";

type Lang = "id" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    "nav.home": "Beranda",
    "nav.work": "Proyek Unggulan",
    "nav.skills": "Keahlian",
    "nav.experience": "Riwayat & Sertifikasi",
    "nav.contact": "Kontak",

    "hero.greeting": "Halo, selamat datang — Saya Fikih",
    "hero.status": "Tersedia untuk Peluang Baru",
    "hero.location": "Yogyakarta, Indonesia",
    "hero.headline": "Pengembang AI & Fullstack Web yang merancang sistem cerdas dan produk digital berkinerja tinggi.",
    "hero.bio": "Mahasiswa Informatika di Universitas AMIKOM Yogyakarta dengan fokus mendalam pada <span class='font-semibold text-slate-900'>Machine Learning, MLOps, dan Rekayasa Web Modern</span>. Menggabungkan ketelitian pemodelan analitik data dengan estetika antarmuka web yang intuitif dan skalabel.",
    "hero.cta.work": "Eksplorasi Proyek",
    "hero.cta.cv": "Unduh CV",
    "hero.cta.contact": "Hubungi Saya",

    "work.badge": "Selected Works",
    "work.title": "Proyek Pilihan & Studi Kasus",
    "work.subtitle": "Eksplorasi nyata memecahkan tantangan melalui Machine Learning, otomatisasi deployment MLOps, dan sistem manajemen web terintegrasi.",
    "work.viewCode": "Lihat Source Code",
    "work.viewLive": "Kunjungi Proyek",

    "skills.badge": "Capabilities & Toolkit",
    "skills.title": "Keahlian Teknis & Alat Kerja",
    "skills.subtitle": "Perpaduan teknologi mutakhir yang saya kuasai untuk membangun produk digital dari tahap riset data hingga deployment produksi.",

    "exp.badge": "Career & Learning Journey",
    "exp.title": "Riwayat Pengalaman & Rekam Jejak",
    "exp.subtitle": "Dedikasi belajar cepat, kontribusi proyek profesional, riwayat pendidikan formal, dan sertifikasi kompetensi terverifikasi.",
    "exp.tab.experience": "Pengalaman & Pendidikan",
    "exp.tab.certificates": "Sertifikat Terverifikasi",
    "exp.viewCert": "Pratinjau Sertifikat",
    "exp.modalClose": "Tutup Modal",

    "contact.badge": "Mari Terhubung",
    "contact.title": "Punya ide atau proyek kolaborasi? Mari diskusikan bersama.",
    "contact.subtitle": "Saya selalu terbuka untuk berdiskusi seputar peluang karir di bidang AI/ML, web development, atau riset teknologi baru.",
    "contact.copy": "Salin Email",
    "contact.copied": "Tersalin ke Clipboard!",
    "contact.sendMail": "Kirim Email Langsung",

    "footer.desc": "Portofolio profesional Muhamad Fikih Rizaldi — Mahasiswa Informatika & Pengembang AI / Fullstack Web.",
    "footer.top": "Kembali ke atas",
  },
  en: {
    "nav.home": "Home",
    "nav.work": "Selected Works",
    "nav.skills": "Capabilities",
    "nav.experience": "Experience & Credentials",
    "nav.contact": "Contact",

    "hero.greeting": "Hey, nice to have you here — I'm Fikih",
    "hero.status": "Available for Opportunities",
    "hero.location": "Yogyakarta, Indonesia",
    "hero.headline": "AI & Fullstack Web Developer designing intelligent systems & high-performance digital products.",
    "hero.bio": "Informatics student at Universitas AMIKOM Yogyakarta with a dedicated focus on <span class='font-semibold text-slate-900'>Machine Learning, MLOps, and Modern Web Engineering</span>. Combining data precision with clean, intuitive, and scalable web interfaces.",
    "hero.cta.work": "Explore Selected Works",
    "hero.cta.cv": "Download Resume",
    "hero.cta.contact": "Get in Touch",

    "work.badge": "Selected Works",
    "work.title": "Featured Projects & Case Studies",
    "work.subtitle": "Real-world engineering solving technical challenges through Machine Learning, MLOps automation, and integrated web systems.",
    "work.viewCode": "View Source Code",
    "work.viewLive": "Visit Project",

    "skills.badge": "Capabilities & Toolkit",
    "skills.title": "Technical Skills & Technologies",
    "skills.subtitle": "A modern technological toolkit used to build digital products from initial data research to production deployment.",

    "exp.badge": "Career & Learning Journey",
    "exp.title": "Experience & Proven Credentials",
    "exp.subtitle": "Fast learner dedication, professional project contributions, academic background, and industry certifications.",
    "exp.tab.experience": "Experience & Education",
    "exp.tab.certificates": "Verified Certificates",
    "exp.viewCert": "Preview Certificate",
    "exp.modalClose": "Close Modal",

    "contact.badge": "Let's Connect",
    "contact.title": "Have an exciting project or idea? Let's build something impactful together.",
    "contact.subtitle": "Always open to discussing new roles, machine learning research, software engineering, or technical partnerships.",
    "contact.copy": "Copy Email",
    "contact.copied": "Copied to Clipboard!",
    "contact.sendMail": "Send an Email",

    "footer.desc": "Professional portfolio of Muhamad Fikih Rizaldi — Informatics student & AI / Fullstack Web Developer.",
    "footer.top": "Back to top",
  },
};

import { PortfolioProvider } from "./PortfolioContext";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations["id"]] || key;
  };

  return (
    <PortfolioProvider>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        {children}
      </LanguageContext.Provider>
    </PortfolioProvider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within Providers");
  return context;
}
