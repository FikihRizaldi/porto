import fs from "fs";
import path from "path";

export interface ProfileSettings {
  id?: number;
  name: string;
  initials: string;
  headline_prefix: string;
  headline_highlight: string;
  status_badge: string;
  avatar_url: string;
  handwritten_note: string;
  resume_url: string;
  available_tagline: string;
  copyright_text: string;
}

export interface HeroCard {
  index: number;
  type: string;
  [key: string]: any;
}

export interface Project {
  id?: number;
  title: string;
  category: string;
  year: string;
  role: string;
  desc: string;
  tags: string[];
  image: string;
  github: string;
  live: string;
  order_index?: number;
}

export interface SkillCategory {
  id?: number;
  title: string;
  description: string;
  badge: string;
  skills: string[];
  order_index?: number;
}

export interface ExperienceItem {
  id?: number;
  type: "work" | "education";
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  order_index?: number;
}

export interface Certificate {
  id?: number;
  title: string;
  issuer: string;
  year: string;
  desc: string;
  badge: string;
  color: string;
  image: string;
  order_index?: number;
}

export interface ContactSettings {
  id?: number;
  email: string;
  instagram_url: string;
  linkedin_url: string;
  github_url: string;
  contact_badge: string;
  contact_title: string;
  contact_subtitle: string;
}

export interface PortfolioData {
  profile: ProfileSettings;
  heroCards: HeroCard[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experiences: ExperienceItem[];
  certificates: Certificate[];
  contact: ContactSettings;
}

const defaultPortfolio: PortfolioData = {
  profile: {
    name: "Muhamad Fikih Rizaldi",
    initials: "FR",
    headline_prefix: "A developer and researcher for",
    headline_highlight: "intelligent systems & modern web",
    status_badge: "Open for full-time positions",
    avatar_url: "/profile.png",
    handwritten_note: "Hey, nice to have you here",
    resume_url: "/CV_Muhamad_Fikih_Rizaldi.pdf",
    available_tagline: "Available for Opportunities · Yogyakarta (UTC+7)",
    copyright_text: "Built using Next.js, TypeScript & Gemini API",
  },
  heroCards: [
    {
      index: 0,
      type: "photo",
      image: "/profile.png",
      note: "Hey, nice to have you here",
    },
    {
      index: 1,
      type: "philosophy",
      author: "Muhamad Fikih Rizaldi",
      initials: "FR",
      subtitle: "AMIKOM Yogyakarta · Informatika",
      quote: "Building high-impact machine learning pipelines and modern fullstack architectures that translate complex problems into fast, scalable software.",
      core_focus: "AI & Modern Web",
    },
    {
      index: 2,
      type: "academic",
      tag: "Pendidikan & Track",
      period: "2022 — Sekarang",
      university: "Universitas AMIKOM Yogyakarta",
      degree: "S1 Informatika",
      concentration: "Pemrograman",
      interest_focus: "Machine Learning, AI, Data & Modern Web",
      gpa: "IPK 3.82 / 4.00",
      status: "Mahasiswa Aktif",
      location: "Sleman, Yogyakarta",
    },
    {
      index: 3,
      type: "tech_stack",
      title: "What I build with",
      subtitle: "Core Technology Stack",
      items: [
        { category: "AI & Machine Learning", tech: "Python · Docker · MLflow" },
        { category: "Modern Fullstack", tech: "Next.js · React · TypeScript" },
        { category: "Database & API", tech: "FastAPI · PostgreSQL" },
      ],
      button_text: "Explore 5 Case Studies →",
      button_link: "#proyek",
    },
    {
      index: 4,
      type: "socials",
      title: "My socials",
      linkedin_handle: "/in/muhamad-fikih-rizaldi-b04528374",
      linkedin_url: "https://www.linkedin.com/in/muhamad-fikih-rizaldi-b04528374",
      instagram_handle: "Instagram",
      instagram_url: "https://www.instagram.com/fikihrz_/",
      github_handle: "GitHub",
      github_url: "https://github.com/FikihRizaldi",
      resume_url: "/CV_Muhamad_Fikih_Rizaldi.pdf",
      email: "fikihrz31@gmail.com",
      footer_note: "Ready for full-time & collaboration opportunities.",
    },
  ],
  projects: [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
  ],
  skillCategories: [
    {
      id: 1,
      title: "AI & Machine Learning",
      description: "Merancang model prediktif, integrasi LLM, dan automasi deployment pipeline MLOps siap produksi.",
      badge: "Machine Intelligence",
      skills: ["Python", "Scikit-Learn", "MLflow", "Docker", "FastAPI", "Google Gemini API", "LLMs", "Decision Trees"],
    },
    {
      id: 2,
      title: "Modern Web Engineering",
      description: "Membangun antarmuka web interaktif yang cepat, scalable, ramah SEO, dan mengutamakan pengalaman pengguna.",
      badge: "Web Applications",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "HTML5 & Modern CSS", "RESTful APIs"],
    },
    {
      id: 3,
      title: "Data Analytics & Infrastructure",
      description: "Mengolah dan memvalidasi dataset kompleks menjadi wawasan bisnis yang terstruktur dan dapat ditindaklanjuti.",
      badge: "Data & Systems",
      skills: ["Pandas", "NumPy", "SQL", "Matplotlib", "Git & GitHub", "Linux CLI", "Cloud Computing"],
    },
  ],
  experiences: [
    {
      id: 1,
      type: "work",
      role: "Software Developer",
      organization: "Simo System",
      period: "2025 — Sekarang",
      location: "Project-based",
      description: "Merancang dan mengembangkan sistem kontrol manajemen operasional terpadu untuk monitoring alur kerja gudang, aktivitas logistik, dan pencatatan audit log pabrik.",
      tags: ["React", "Node.js", "Fullstack", "Management System"],
    },
    {
      id: 2,
      type: "work",
      role: "Machine Learning & AI Developer",
      organization: "Independent & Research Projects",
      period: "2024 — Sekarang",
      location: "Yogyakarta",
      description: "Membangun pipeline MLOps otomatis untuk estimasi tarif transportasi, model klasifikasi kesehatan baterai dengan Decision Tree, dan aplikasi edukasi adaptif berbasis LLM (Google Gemini).",
      tags: ["Python", "MLflow", "Docker", "FastAPI", "Scikit-Learn"],
    },
    {
      id: 3,
      type: "work",
      role: "Fullstack Web Developer",
      organization: "Freelance & Collaborative Projects",
      period: "2023 — 2024",
      location: "Remote",
      description: "Membangun berbagai solusi situs web modern (UpSite) berkinerja tinggi dengan arsitektur komponen modular dan fokus pada pengalaman pengguna yang intuitif.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    },
    {
      id: 4,
      type: "education",
      role: "S1 Informatika",
      organization: "Universitas AMIKOM Yogyakarta",
      period: "2022 — Sekarang",
      location: "Yogyakarta, Indonesia",
      description: "Fokus pendalaman kurikulum pada Pemrograman, Kecerdasan Buatan (Artificial Intelligence), Algoritma & Struktur Data, Rekayasa Perangkat Lunak, dan Basis Data Skala Besar.",
      tags: ["IPK 3.82", "Informatika", "Pemrograman", "Artificial Intelligence"],
    },
  ],
  certificates: [
    {
      id: 1,
      title: "Google Gemini AI Developer",
      issuer: "Lastmile x SmartBridge Indonesia",
      year: "2026",
      desc: "Program intensif membangun aplikasi berbasis Google Gemini AI: prompt engineering, integrasi API, dan solusi Generative AI.",
      badge: "AI & LLM",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
      image: "/Sertifikat/lastmile.jpeg",
    },
    {
      id: 2,
      title: "Machine Learning Operations (MLOps) for Generative AI",
      issuer: "Google",
      year: "2026",
      desc: "Implementasi MLOps untuk Generative AI: deployment model, pipeline ML, monitoring, dan siklus hidup model di Google Cloud.",
      badge: "MLOps",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      image: "/Sertifikat/Machine Learning Operations (MLOps) for Generative AI.png",
    },
    {
      id: 3,
      title: "Prompt Design in Agent Platform",
      issuer: "Google",
      year: "2026",
      desc: "Teknik prompt efektif di Google Agent Platform: prompt engineering, agent workflow, dan optimasi respons AI generatif.",
      badge: "Prompt Eng",
      color: "bg-violet-50 text-violet-700 border-violet-200",
      image: "/Sertifikat/Prompt Design in Agent Platform.png",
    },
    {
      id: 4,
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      year: "2025",
      desc: "Fundamental arsitektur jaringan komputer, model OSI & TCP/IP, protokol IPv4/IPv6, switching, routing, dan konfigurasi perangkat.",
      badge: "Networks",
      color: "bg-slate-100 text-slate-800 border-slate-200",
      image: "/Sertifikat/Cisco.jpeg",
    },
  ],
  contact: {
    email: "fikihrz31@gmail.com",
    instagram_url: "https://www.instagram.com/fikihrz_/",
    linkedin_url: "https://www.linkedin.com/in/muhamad-fikih-rizaldi-b04528374",
    github_url: "https://github.com/FikihRizaldi",
    contact_badge: "Mari Terhubung",
    contact_title: "Punya ide atau proyek kolaborasi? Mari diskusikan bersama.",
    contact_subtitle: "Saya selalu terbuka untuk berdiskusi seputar peluang karir di bidang AI/ML, web development, atau riset teknologi baru.",
  },
};

const getStoragePath = () => {
  const tmpDir = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), ".tmp");
  if (!fs.existsSync(tmpDir)) {
    try {
      fs.mkdirSync(tmpDir, { recursive: true });
    } catch (e) {}
  }
  return path.join(tmpDir, "portfolio-live.json");
};

// Global in-memory cache to preserve state across warm serverless functions
declare global {
  var __portfolioCache: PortfolioData | undefined;
}

export function getPortfolioData(): PortfolioData {
  if (globalThis.__portfolioCache) {
    return globalThis.__portfolioCache;
  }

  const filePath = getStoragePath();
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.profile) {
        globalThis.__portfolioCache = parsed;
        return parsed;
      }
    } catch (e) {}
  }

  globalThis.__portfolioCache = defaultPortfolio;
  return defaultPortfolio;
}

export function savePortfolioData(data: PortfolioData): void {
  globalThis.__portfolioCache = data;
  const filePath = getStoragePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}
}

