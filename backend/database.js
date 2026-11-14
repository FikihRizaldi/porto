const { DatabaseSync } = require("node:sqlite");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// Ensure data folder exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "portfolio.db");
const db = new DatabaseSync(dbPath);

// Enable WAL mode for better concurrency and durability
db.exec("PRAGMA journal_mode = WAL;");

function initDatabase() {
  // 1. Admin Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Profile Settings Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS profile_settings (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      initials TEXT NOT NULL,
      headline_prefix TEXT NOT NULL,
      headline_highlight TEXT NOT NULL,
      status_badge TEXT NOT NULL,
      avatar_url TEXT NOT NULL,
      handwritten_note TEXT NOT NULL,
      resume_url TEXT NOT NULL,
      available_tagline TEXT NOT NULL,
      copyright_text TEXT NOT NULL
    );
  `);

  // 3. Hero Cards Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS hero_cards (
      card_index INTEGER PRIMARY KEY,
      card_type TEXT NOT NULL,
      data TEXT NOT NULL
    );
  `);

  // 4. Projects Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      year TEXT NOT NULL,
      role TEXT NOT NULL,
      desc TEXT NOT NULL,
      tags TEXT NOT NULL,
      image TEXT NOT NULL,
      github TEXT NOT NULL,
      live TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );
  `);

  // 5. Skill Categories Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS skill_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      badge TEXT NOT NULL,
      skills TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );
  `);

  // 6. Experience & Education Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      role TEXT NOT NULL,
      organization TEXT NOT NULL,
      period TEXT NOT NULL,
      location TEXT NOT NULL,
      description TEXT NOT NULL,
      tags TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );
  `);

  // 7. Certificates Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      year TEXT NOT NULL,
      desc TEXT NOT NULL,
      badge TEXT NOT NULL,
      color TEXT NOT NULL,
      image TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );
  `);

  // 8. Contact Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY,
      email TEXT NOT NULL,
      instagram_url TEXT NOT NULL,
      linkedin_url TEXT NOT NULL,
      github_url TEXT NOT NULL,
      contact_badge TEXT NOT NULL,
      contact_title TEXT NOT NULL,
      contact_subtitle TEXT NOT NULL
    );
  `);

  seedInitialData();
}

function seedInitialData() {
  // Check admin user
  const adminStmt = db.prepare("SELECT * FROM admin_users WHERE username = ?");
  const existingAdmin = adminStmt.get("admin");
  if (!existingAdmin) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("admin123", salt); // Default password: admin123
    const insertAdmin = db.prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)");
    insertAdmin.run("admin", hash);
    console.log("[DB] Seeded default admin account: admin / admin123");
  }

  // Check profile_settings
  const profileStmt = db.prepare("SELECT * FROM profile_settings WHERE id = 1");
  if (!profileStmt.get()) {
    const insertProfile = db.prepare(`
      INSERT INTO profile_settings (
        id, name, initials, headline_prefix, headline_highlight,
        status_badge, avatar_url, handwritten_note, resume_url,
        available_tagline, copyright_text
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertProfile.run(
      1,
      "Muhamad Fikih Rizaldi",
      "FR",
      "A developer and researcher for",
      "intelligent systems & modern web",
      "Open for full-time positions",
      "/profile.png",
      "Hey, nice to have you here",
      "/CV_Muhamad_Fikih_Rizaldi.pdf",
      "Available for Opportunities · Yogyakarta (UTC+7)",
      "Built using Next.js, TypeScript & Gemini API"
    );
    console.log("[DB] Seeded profile settings");
  }

  // Check hero_cards
  const heroStmt = db.prepare("SELECT COUNT(*) as count FROM hero_cards");
  const heroCount = heroStmt.get().count;
  if (heroCount === 0) {
    const insertCard = db.prepare("INSERT INTO hero_cards (card_index, card_type, data) VALUES (?, ?, ?)");

    // Card 0: Photo Card
    insertCard.run(
      0,
      "photo",
      JSON.stringify({
        image: "/profile.png",
        note: "Hey, nice to have you here",
      })
    );

    // Card 1: Bio Quote Card
    insertCard.run(
      1,
      "philosophy",
      JSON.stringify({
        author: "Muhamad Fikih Rizaldi",
        initials: "FR",
        subtitle: "AMIKOM Yogyakarta · Informatika",
        quote: "Building high-impact machine learning pipelines and modern fullstack architectures that translate complex problems into fast, scalable software.",
        core_focus: "AI & Modern Web",
      })
    );

    // Card 2: Academic & Track Card
    insertCard.run(
      2,
      "academic",
      JSON.stringify({
        tag: "Pendidikan & Track",
        period: "2022 — Sekarang",
        university: "Universitas AMIKOM Yogyakarta",
        degree: "S1 Informatika",
        concentration: "Pemrograman",
        interest_focus: "Machine Learning, AI, Data & Modern Web",
        gpa: "IPK 3.82 / 4.00",
        status: "Mahasiswa Aktif",
        location: "Sleman, Yogyakarta",
      })
    );

    // Card 3: Tech Stack Card
    insertCard.run(
      3,
      "tech_stack",
      JSON.stringify({
        title: "What I build with",
        subtitle: "Core Technology Stack",
        items: [
          {
            category: "AI & Machine Learning",
            tech: "Python · Docker · MLflow",
          },
          {
            category: "Modern Fullstack",
            tech: "Next.js · React · TypeScript",
          },
          {
            category: "Database & API",
            tech: "FastAPI · PostgreSQL",
          },
        ],
        button_text: "Explore 5 Case Studies →",
        button_link: "#proyek",
      })
    );

    // Card 4: Socials Card
    insertCard.run(
      4,
      "socials",
      JSON.stringify({
        title: "My socials",
        linkedin_handle: "/in/fikihrizaldi",
        linkedin_url: "https://linkedin.com/in/fikihrizaldi",
        instagram_handle: "Instagram",
        instagram_url: "https://www.instagram.com/fikihrz_/",
        github_handle: "GitHub",
        github_url: "https://github.com/FikihRizaldi",
        resume_url: "/CV_Muhamad_Fikih_Rizaldi.pdf",
        email: "fikihrz31@gmail.com",
        footer_note: "Ready for full-time & collaboration opportunities.",
      })
    );

    console.log("[DB] Seeded 5 hero deck cards");
  }

  // Check projects
  const projStmt = db.prepare("SELECT COUNT(*) as count FROM projects");
  if (projStmt.get().count === 0) {
    const insertProj = db.prepare(`
      INSERT INTO projects (title, category, year, role, desc, tags, image, github, live, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertProj.run(
      "Simo System",
      "Enterprise Web System",
      "2025",
      "Fullstack Software Developer",
      "Platform kontrol operasional terintegrasi untuk pemantauan progres warehouse, logistik, quality control, dan audit log operasional industri secara real-time.",
      JSON.stringify(["React", "Node.js", "Fullstack", "Management System", "Tailwind CSS"]),
      "/Simo.png",
      "https://github.com/Arsyacoo/Simo-System.git",
      "https://github.com/Arsyacoo/Simo-System.git",
      0
    );

    insertProj.run(
      "MLOps Tarif Transportasi Online",
      "Machine Learning & DevOps",
      "2024",
      "Machine Learning Engineer",
      "Mini pipeline MLOps otomatis untuk estimasi tarif transportasi online, mencakup versioning model dengan MLflow, kontainerisasi Docker, dan deployment REST API.",
      JSON.stringify(["Python", "MLflow", "Docker", "FastAPI", "Scikit-Learn"]),
      "/mlops.png",
      "https://github.com/FikihRizaldi/Mini-Pipeline-MLOps-untuk-Estimasi-Tarif-Transportasi-Online",
      "https://github.com/FikihRizaldi/Mini-Pipeline-MLOps-untuk-Estimasi-Tarif-Transportasi-Online",
      1
    );

    insertProj.run(
      "Battery Health Decision Tree",
      "Data Science & Diagnostics",
      "2024",
      "Data Scientist",
      "Sistem klasifikasi cerdas kesehatan baterai berbasis algoritma Decision Tree untuk menganalisis degradasi kapasitas dan status kesehatan komponen secara akurat.",
      JSON.stringify(["Python", "Scikit-learn", "Pandas", "Matplotlib", "Data Analytics"]),
      "/battery.png",
      "https://github.com/FikihRizaldi/Battery-Health-Decision-Tree-.git",
      "https://github.com/FikihRizaldi/Battery-Health-Decision-Tree-.git",
      2
    );

    insertProj.run(
      "Upsite Web Platform",
      "Modern Web Platform",
      "2024",
      "Fullstack Web Developer",
      "Aplikasi web modern berkecepatan tinggi dengan optimasi antarmuka intuitif, arsitektur komponen modular, dan performa responsif lintas perangkat.",
      JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"]),
      "/Upsite.png",
      "https://github.com/FikihRizaldi/UpSite",
      "https://github.com/FikihRizaldi/UpSite",
      3
    );

    insertProj.run(
      "Smart Learning Sora AI",
      "Generative AI Application",
      "2024",
      "AI Developer",
      "Platform pembelajaran adaptif interaktif berbasis Generative AI dan LLM untuk personalisasi materi belajar secara kontekstual sesuai kebutuhan pengguna.",
      JSON.stringify(["Generative AI", "LLM", "Python", "React", "FastAPI"]),
      "/sora.png",
      "https://github.com/FikihRizaldi/Smart-Learning",
      "https://github.com/FikihRizaldi/Smart-Learning",
      4
    );

    console.log("[DB] Seeded 5 projects");
  }

  // Check skill_categories
  const skillStmt = db.prepare("SELECT COUNT(*) as count FROM skill_categories");
  if (skillStmt.get().count === 0) {
    const insertSkill = db.prepare(`
      INSERT INTO skill_categories (title, description, badge, skills, order_index)
      VALUES (?, ?, ?, ?, ?)
    `);

    insertSkill.run(
      "AI & Machine Learning",
      "Merancang model prediktif, integrasi LLM, dan automasi deployment pipeline MLOps siap produksi.",
      "Machine Intelligence",
      JSON.stringify(["Python", "Scikit-Learn", "MLflow", "Docker", "FastAPI", "Google Gemini API", "LLMs", "Decision Trees"]),
      0
    );

    insertSkill.run(
      "Modern Web Engineering",
      "Membangun antarmuka web interaktif yang cepat, scalable, ramah SEO, dan mengutamakan pengalaman pengguna.",
      "Web Applications",
      JSON.stringify(["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "HTML5 & Modern CSS", "RESTful APIs"]),
      1
    );

    insertSkill.run(
      "Data Analytics & Infrastructure",
      "Mengolah dan memvalidasi dataset kompleks menjadi wawasan bisnis yang terstruktur dan dapat ditindaklanjuti.",
      "Data & Systems",
      JSON.stringify(["Pandas", "NumPy", "SQL", "Matplotlib", "Git & GitHub", "Linux CLI", "Cloud Computing"]),
      2
    );

    console.log("[DB] Seeded skill categories");
  }

  // Check experiences
  const expStmt = db.prepare("SELECT COUNT(*) as count FROM experiences");
  if (expStmt.get().count === 0) {
    const insertExp = db.prepare(`
      INSERT INTO experiences (type, role, organization, period, location, description, tags, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertExp.run(
      "work",
      "Software Developer",
      "Simo System",
      "2025 — Sekarang",
      "Project-based",
      "Merancang dan mengembangkan sistem kontrol manajemen operasional terpadu untuk monitoring alur kerja gudang, aktivitas logistik, dan pencatatan audit log pabrik.",
      JSON.stringify(["React", "Node.js", "Fullstack", "Management System"]),
      0
    );

    insertExp.run(
      "work",
      "Machine Learning & AI Developer",
      "Independent & Research Projects",
      "2024 — Sekarang",
      "Yogyakarta",
      "Membangun pipeline MLOps otomatis untuk estimasi tarif transportasi, model klasifikasi kesehatan baterai dengan Decision Tree, dan aplikasi edukasi adaptif berbasis LLM (Google Gemini).",
      JSON.stringify(["Python", "MLflow", "Docker", "FastAPI", "Scikit-Learn"]),
      1
    );

    insertExp.run(
      "work",
      "Fullstack Web Developer",
      "Freelance & Collaborative Projects",
      "2023 — 2024",
      "Remote",
      "Membangun berbagai solusi situs web modern (UpSite) berkinerja tinggi dengan arsitektur komponen modular dan fokus pada pengalaman pengguna yang intuitif.",
      JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "REST API"]),
      2
    );

    insertExp.run(
      "education",
      "S1 Informatika",
      "Universitas AMIKOM Yogyakarta",
      "2022 — Sekarang",
      "Yogyakarta, Indonesia",
      "Fokus pendalaman kurikulum pada Pemrograman, Kecerdasan Buatan (Artificial Intelligence), Algoritma & Struktur Data, Rekayasa Perangkat Lunak, dan Basis Data Skala Besar.",
      JSON.stringify(["IPK 3.82", "Informatika", "Pemrograman", "Artificial Intelligence"]),
      3
    );

    console.log("[DB] Seeded experiences");
  }

  // Check certificates
  const certStmt = db.prepare("SELECT COUNT(*) as count FROM certificates");
  if (certStmt.get().count === 0) {
    const insertCert = db.prepare(`
      INSERT INTO certificates (title, issuer, year, desc, badge, color, image, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertCert.run(
      "Google Gemini AI Developer",
      "Lastmile x SmartBridge Indonesia",
      "2026",
      "Program intensif membangun aplikasi berbasis Google Gemini AI: prompt engineering, integrasi API, dan solusi Generative AI.",
      "AI & LLM",
      "bg-indigo-50 text-indigo-700 border-indigo-200",
      "/Sertifikat/lastmile.jpeg",
      0
    );

    insertCert.run(
      "Machine Learning Operations (MLOps) for Generative AI",
      "Google",
      "2026",
      "Implementasi MLOps untuk Generative AI: deployment model, pipeline ML, monitoring, dan siklus hidup model di Google Cloud.",
      "MLOps",
      "bg-blue-50 text-blue-700 border-blue-200",
      "/Sertifikat/Machine Learning Operations (MLOps) for Generative AI.png",
      1
    );

    insertCert.run(
      "Prompt Design in Agent Platform",
      "Google",
      "2026",
      "Teknik prompt efektif di Google Agent Platform: prompt engineering, agent workflow, dan optimasi respons AI generatif.",
      "Prompt Eng",
      "bg-violet-50 text-violet-700 border-violet-200",
      "/Sertifikat/Prompt Design in Agent Platform.png",
      2
    );

    insertCert.run(
      "CCNA: Introduction to Networks",
      "Cisco Networking Academy",
      "2025",
      "Fundamental arsitektur jaringan komputer, model OSI & TCP/IP, protokol IPv4/IPv6, switching, routing, dan konfigurasi perangkat.",
      "Networks",
      "bg-slate-100 text-slate-800 border-slate-200",
      "/Sertifikat/Cisco.jpeg",
      3
    );

    console.log("[DB] Seeded certificates");
  }

  // Check contacts
  const contactStmt = db.prepare("SELECT * FROM contacts WHERE id = 1");
  if (!contactStmt.get()) {
    const insertContact = db.prepare(`
      INSERT INTO contacts (id, email, instagram_url, linkedin_url, github_url, contact_badge, contact_title, contact_subtitle)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertContact.run(
      1,
      "fikihrz31@gmail.com",
      "https://www.instagram.com/fikihrz_/",
      "https://linkedin.com/in/fikihrizaldi",
      "https://github.com/FikihRizaldi",
      "Mari Terhubung",
      "Punya ide atau proyek kolaborasi? Mari diskusikan bersama.",
      "Saya selalu terbuka untuk berdiskusi seputar peluang karir di bidang AI/ML, web development, atau riset teknologi baru."
    );

    console.log("[DB] Seeded contact details");
  }
}

// Helper methods to read & write cleanly
module.exports = {
  db,
  initDatabase,
};

