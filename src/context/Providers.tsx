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
    "nav.skills": "Keahlian",
    "nav.portfolio": "Portofolio",
    "nav.experience": "Sertifikat",
    "nav.contact": "Kontak",
    "hero.greeting": "Halo, Saya",
    "hero.status": "Mahasiswa",
    "hero.badge.title": "Fast Learner",
    "hero.badge.desc": "Adaptif belajar teknologi baru",
    "hero.desc": "Saya seorang mahasiswa yang memiliki antusiasme tinggi di bidang <span class='font-bold text-[#1C1917]'>Artificial Intelligence</span> dan <span class='font-bold text-[#1C1917]'>Web Development</span>. Siap untuk belajar, berkontribusi, dan memulai perjalanan karir profesional.",
    "hero.availability": "Terbuka untuk Peluang Baru",
    "hero.cta.download": "Download CV",
    "hero.cta.portfolio": "Lihat Proyek",
    "skills.title": "Keahlian",
    "skills.subtitle": "Keterampilan Teknis",
    "skills.desc": "Kombinasi kemampuan pengembangan web modern dan analisis data untuk menciptakan solusi yang komprehensif.",
    "skills.web": "Web Development",
    "skills.web.desc": "Membangun antarmuka pengguna yang interaktif, responsif, dan berkinerja tinggi menggunakan React ecosystem.",
    "skills.ml": "Machine Learning",
    "skills.ml.desc": "Mengembangkan model prediktif, analisis klastering, dan pemrosesan bahasa alami (NLP) dengan Python.",
    "skills.data": "Data Analysis & Processing",
    "skills.data.desc": "Mengolah, membersihkan, dan memvisualisasikan data mentah menjadi insight yang dapat ditindaklanjuti.",
    "port.subtitle": "Kumpulan proyek dan studi kasus yang mencerminkan perjalanan dan kemampuan saya dalam memecahkan masalah teknis.",
    "port.title": "Portofolio",
    "cert.subtitle": "Kompetensi Terverifikasi",
    "cert.title": "Sertifikat & Pencapaian",
    "cert.desc": "Sertifikat yang saya raih sebagai bukti komitmen dalam terus belajar dan mengembangkan diri di bidang teknologi.",
    "cert.cta": "Lihat lebih banyak di GitHub",
    "contact.subtitle": "Mari Berdiskusi",
    "contact.title": "Hubungi Saya",
    "contact.desc": "Punya proyek menarik atau sekadar ingin menyapa? Jangan ragu untuk mengirim pesan.",
    "contact.action.title": "Ayo Bangun Sesuatu yang <span style='color:#78350F'>Luar Biasa</span> Bersama!",
    "contact.action.desc": "Saya selalu terbuka untuk mendiskusikan peran data, proyek analitik, atau peluang partnership. Kirimkan pesan dan hubungi saya via email.",
    "contact.form.name": "Nama Lengkap",
    "contact.form.email": "Alamat Email",
    "contact.form.message": "Pesan",
    "contact.form.submit": "Kirim Pesan",
    "footer.desc": "Membantu perusahaan mengubah data mentah menjadi wawasan bisnis yang strategis melalui Machine Learning dan Web Development.",
    "cert.ml": "Google Gemini AI Developer",
    "cert.ml.desc": "Program intensif yang mempersiapkan peserta didik untuk peran dunia nyata dalam pengembangan aplikasi AI Generatif berbasis Gemini.",
    "cert.data": "Data Analysis dengan Python",
    "cert.data.desc": "Menguasai teknik analisis data menggunakan Python, Pandas, NumPy, dan Matplotlib untuk menghasilkan insight bisnis yang actionable.",
    "cert.web": "Belajar Dasar Pemrograman Web",
    "cert.web.desc": "Mempelajari fundamental pengembangan web mulai dari HTML, CSS, hingga JavaScript untuk membangun halaman web yang responsif dan interaktif.",
    "cert.sql": "SQL for Data Science",
    "cert.sql.desc": "Memahami penggunaan SQL untuk query data, agregasi, join, dan analisis data skala besar dalam konteks data science.",
  },
  en: {
    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.portfolio": "Portfolio",
    "nav.experience": "Certificates",
    "nav.contact": "Contact",
    "hero.greeting": "Hello, I am",
    "hero.status": "Student",
    "hero.badge.title": "Fast Learner",
    "hero.badge.desc": "Adaptive to new technologies",
    "hero.desc": "I am a student highly enthusiastic about <span class='font-bold text-[#1C1917]'>Artificial Intelligence</span> and <span class='font-bold text-[#1C1917]'>Web Development</span>. Ready to learn, contribute, and start my professional career journey.",
    "hero.availability": "Open to New Opportunities",
    "hero.cta.download": "Download CV",
    "hero.cta.portfolio": "View Projects",
    "skills.title": "Skills",
    "skills.subtitle": "Technical Expertise",
    "skills.desc": "A combination of modern web development and data analysis skills to create comprehensive solutions.",
    "skills.web": "Web Development",
    "skills.web.desc": "Building interactive, responsive, and high-performance user interfaces using the React ecosystem.",
    "skills.ml": "Machine Learning",
    "skills.ml.desc": "Developing predictive models, clustering analysis, and natural language processing (NLP) with Python.",
    "skills.data": "Data Analysis & Processing",
    "skills.data.desc": "Processing, cleaning, and visualizing raw data into actionable insights.",
    "port.subtitle": "A collection of projects and case studies reflecting my journey and capabilities in solving technical problems.",
    "port.title": "Portfolio",
    "cert.subtitle": "Verified Competencies",
    "cert.title": "Certificates & Achievements",
    "cert.desc": "Certificates I have earned as proof of my commitment to continuous learning and self-development in technology.",
    "cert.cta": "See more on GitHub",
    "contact.subtitle": "Let's Talk",
    "contact.title": "Contact Me",
    "contact.desc": "Have an interesting project or just want to say hi? Don't hesitate to send a message.",
    "contact.action.title": "Let's Build Something <span style='color:#78350F'>Amazing</span> Together!",
    "contact.action.desc": "I'm always open to discussing data roles, analytics projects, or partnership opportunities. Send a message and contact me via email.",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "footer.desc": "Helping companies turn raw data into strategic business insights through Machine Learning and Web Development.",
    "cert.ml": "Google Gemini AI Developer",
    "cert.ml.desc": "An intensive program that prepares students for real-world roles in developing Gemini-based Generative AI applications.",
    "cert.data": "Data Analysis with Python",
    "cert.data.desc": "Mastered data analysis techniques using Python, Pandas, NumPy, and Matplotlib to generate actionable business insights.",
    "cert.web": "Learn Basic Web Programming",
    "cert.web.desc": "Learned web development fundamentals from HTML, CSS, to JavaScript to build responsive and interactive web pages.",
    "cert.sql": "SQL for Data Science",
    "cert.sql.desc": "Understanding the use of SQL for data querying, aggregation, joining, and large-scale data analysis in the context of data science.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations["id"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within Providers");
  return context;
}
