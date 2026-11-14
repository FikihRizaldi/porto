const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
require("dotenv").config();

const { db, initDatabase } = require("./database");

// Initialize database & tables
initDatabase();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "fikih-portfolio-secret-key-2026";

// Middlewares
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:3000", "https://fikihporto.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some((o) => origin.startsWith(o)) || origin.includes("vercel.app")) {
        callback(null, true);
      } else {
        callback(null, true); // allow all for portfolio
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static folder for uploaded media — use /tmp on Vercel
const uploadsDir = process.env.VERCEL
  ? "/tmp/uploads"
  : path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    cb(null, `${basename}_${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
});

// Auth Middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Akses ditolak. Token tidak ditemukan." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Sesi telah berakhir atau token tidak valid." });
  }
}

// ==========================================
// 1. PUBLIC API - GET COMPLETE PORTFOLIO
// ==========================================
app.get("/api/portfolio", (req, res) => {
  try {
    // 1. Profile settings
    const profile = db.prepare("SELECT * FROM profile_settings WHERE id = 1").get();

    // 2. Hero cards
    const rawCards = db.prepare("SELECT * FROM hero_cards ORDER BY card_index ASC").all();
    const heroCards = rawCards.map((c) => ({
      index: c.card_index,
      type: c.card_type,
      ...JSON.parse(c.data),
    }));

    // 3. Projects
    const rawProjects = db.prepare("SELECT * FROM projects ORDER BY order_index ASC, id DESC").all();
    const projects = rawProjects.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags || "[]"),
    }));

    // 4. Skill categories
    const rawSkills = db.prepare("SELECT * FROM skill_categories ORDER BY order_index ASC, id ASC").all();
    const skillCategories = rawSkills.map((s) => ({
      ...s,
      skills: JSON.parse(s.skills || "[]"),
    }));

    // 5. Experiences & Education
    const rawExp = db.prepare("SELECT * FROM experiences ORDER BY order_index ASC, id ASC").all();
    const experiences = rawExp.map((e) => ({
      ...e,
      tags: JSON.parse(e.tags || "[]"),
    }));

    // 6. Certificates
    const certificates = db.prepare("SELECT * FROM certificates ORDER BY order_index ASC, id ASC").all();

    // 7. Contacts
    const contact = db.prepare("SELECT * FROM contacts WHERE id = 1").get();

    res.json({
      profile,
      heroCards,
      projects,
      skillCategories,
      experiences,
      certificates,
      contact,
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ error: "Gagal mengambil data portofolio" });
  }
});

// ==========================================
// 2. AUTHENTICATION APIS & ANTI-BRUTE FORCE
// ==========================================
const loginAttempts = new Map();

function rateLimitLogin(req, res, next) {
  const ip = req.ip || req.connection?.remoteAddress || "global";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 menit
  const maxAttempts = 15;

  let record = loginAttempts.get(ip);
  if (!record || now > record.resetTime) {
    record = { count: 0, resetTime: now + windowMs };
  }

  if (record.count >= maxAttempts) {
    const remainingMin = Math.ceil((record.resetTime - now) / 60000);
    return res.status(429).json({
      error: `Terlalu banyak percobaan gagal. Akses dikunci sementara demi keamanan. Coba lagi dalam ${remainingMin} menit.`,
    });
  }

  req.loginRateRecord = record;
  req.loginIp = ip;
  next();
}

app.post("/api/auth/login", rateLimitLogin, (req, res) => {
  const { username, password } = req.body;
  const ip = req.loginIp;
  const record = req.loginRateRecord;

  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password wajib diisi." });
  }

  const user = db.prepare("SELECT * FROM admin_users WHERE username = ?").get(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    record.count += 1;
    loginAttempts.set(ip, record);
    const sisa = Math.max(0, 5 - record.count);
    return res.status(401).json({
      error: `Username atau password salah. Sisa kesempatan: ${sisa}x`,
    });
  }

  // Reset rate limit on success
  loginAttempts.delete(ip);

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    message: "Login berhasil",
    token,
    user: { id: user.id, username: user.username },
  });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.put("/api/auth/password", requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Password saat ini dan baru wajib diisi." });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: "Password baru minimal 6 karakter." });
  }

  const user = db.prepare("SELECT * FROM admin_users WHERE id = ?").get(req.user.id);
  if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(400).json({ error: "Password saat ini tidak sesuai." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);
  db.prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?").run(hash, req.user.id);

  res.json({ message: "Password berhasil diperbarui." });
});

// Master Emergency Password Reset (Uses MASTER_RECOVERY_KEY from .env)
app.post("/api/auth/reset-password", (req, res) => {
  const { recoveryKey, newPassword } = req.body;
  const masterKey = process.env.MASTER_RECOVERY_KEY || "fikih-recovery-key-9921";

  if (!recoveryKey || !newPassword) {
    return res.status(400).json({ error: "Master Recovery Key dan Password Baru wajib diisi." });
  }

  if (recoveryKey.trim() !== masterKey.trim()) {
    return res.status(403).json({ error: "Master Recovery Key tidak valid." });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: "Password baru minimal 6 karakter." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  const primaryAdmin = db.prepare("SELECT id, username FROM admin_users LIMIT 1").get();
  if (primaryAdmin) {
    db.prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?").run(hash, primaryAdmin.id);
  }

  res.json({ message: "Password berhasil di-reset menggunakan Master Recovery Key!" });
});

// ==========================================
// 3. FILE UPLOAD API
// ==========================================
app.post("/api/upload", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Tidak ada file yang diunggah." });
  }

  // Construct URL
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: "File berhasil diunggah",
    filename: req.file.filename,
    url: fileUrl,
  });
});

// ==========================================
// 4. ADMIN MUTATIONS - PROFILE & HERO
// ==========================================
app.put("/api/portfolio/profile", requireAuth, (req, res) => {
  const {
    name,
    initials,
    headline_prefix,
    headline_highlight,
    status_badge,
    avatar_url,
    handwritten_note,
    resume_url,
    available_tagline,
    copyright_text,
  } = req.body;

  db.prepare(`
    UPDATE profile_settings SET
      name = ?, initials = ?, headline_prefix = ?, headline_highlight = ?,
      status_badge = ?, avatar_url = ?, handwritten_note = ?, resume_url = ?,
      available_tagline = ?, copyright_text = ?
    WHERE id = 1
  `).run(
    name,
    initials,
    headline_prefix,
    headline_highlight,
    status_badge,
    avatar_url,
    handwritten_note,
    resume_url,
    available_tagline,
    copyright_text
  );

  res.json({ message: "Profil berhasil diperbarui." });
});

app.put("/api/portfolio/hero-cards/:index", requireAuth, (req, res) => {
  const cardIndex = parseInt(req.params.index, 10);
  const data = req.body;

  db.prepare(`
    UPDATE hero_cards SET data = ? WHERE card_index = ?
  `).run(JSON.stringify(data), cardIndex);

  res.json({ message: `Kartu hero #${cardIndex} berhasil diperbarui.` });
});

// ==========================================
// 5. ADMIN MUTATIONS - PROJECTS CRUD
// ==========================================
app.post("/api/portfolio/projects", requireAuth, (req, res) => {
  const { title, category, year, role, desc, tags, image, github, live, order_index } = req.body;

  const result = db.prepare(`
    INSERT INTO projects (title, category, year, role, desc, tags, image, github, live, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    title,
    category,
    year,
    role,
    desc,
    JSON.stringify(tags || []),
    image || "/placeholder.png",
    github || "#",
    live || "#",
    order_index || 0
  );

  res.json({ message: "Proyek baru berhasil ditambahkan.", id: Number(result.lastInsertRowid) });
});

app.put("/api/portfolio/projects/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, category, year, role, desc, tags, image, github, live, order_index } = req.body;

  db.prepare(`
    UPDATE projects SET
      title = ?, category = ?, year = ?, role = ?, desc = ?, tags = ?,
      image = ?, github = ?, live = ?, order_index = ?
    WHERE id = ?
  `).run(
    title,
    category,
    year,
    role,
    desc,
    JSON.stringify(tags || []),
    image,
    github,
    live,
    order_index,
    id
  );

  res.json({ message: "Proyek berhasil diperbarui." });
});

app.delete("/api/portfolio/projects/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.prepare("DELETE FROM projects WHERE id = ?").run(id);
  res.json({ message: "Proyek berhasil dihapus." });
});

// ==========================================
// 6. ADMIN MUTATIONS - SKILLS CRUD
// ==========================================
app.post("/api/portfolio/skills", requireAuth, (req, res) => {
  const { title, description, badge, skills, order_index } = req.body;

  const result = db.prepare(`
    INSERT INTO skill_categories (title, description, badge, skills, order_index)
    VALUES (?, ?, ?, ?, ?)
  `).run(title, description, badge, JSON.stringify(skills || []), order_index || 0);

  res.json({ message: "Kategori keahlian berhasil ditambahkan.", id: Number(result.lastInsertRowid) });
});

app.put("/api/portfolio/skills/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, badge, skills, order_index } = req.body;

  db.prepare(`
    UPDATE skill_categories SET
      title = ?, description = ?, badge = ?, skills = ?, order_index = ?
    WHERE id = ?
  `).run(title, description, badge, JSON.stringify(skills || []), order_index, id);

  res.json({ message: "Kategori keahlian berhasil diperbarui." });
});

app.delete("/api/portfolio/skills/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.prepare("DELETE FROM skill_categories WHERE id = ?").run(id);
  res.json({ message: "Kategori keahlian berhasil dihapus." });
});

// ==========================================
// 7. ADMIN MUTATIONS - EXPERIENCES CRUD
// ==========================================
app.post("/api/portfolio/experience", requireAuth, (req, res) => {
  const { type, role, organization, period, location, description, tags, order_index } = req.body;

  const result = db.prepare(`
    INSERT INTO experiences (type, role, organization, period, location, description, tags, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(type, role, organization, period, location, description, JSON.stringify(tags || []), order_index || 0);

  res.json({ message: "Riwayat berhasil ditambahkan.", id: Number(result.lastInsertRowid) });
});

app.put("/api/portfolio/experience/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { type, role, organization, period, location, description, tags, order_index } = req.body;

  db.prepare(`
    UPDATE experiences SET
      type = ?, role = ?, organization = ?, period = ?, location = ?,
      description = ?, tags = ?, order_index = ?
    WHERE id = ?
  `).run(type, role, organization, period, location, description, JSON.stringify(tags || []), order_index, id);

  res.json({ message: "Riwayat berhasil diperbarui." });
});

app.delete("/api/portfolio/experience/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.prepare("DELETE FROM experiences WHERE id = ?").run(id);
  res.json({ message: "Riwayat berhasil dihapus." });
});

// ==========================================
// 8. ADMIN MUTATIONS - CERTIFICATES CRUD
// ==========================================
app.post("/api/portfolio/certificates", requireAuth, (req, res) => {
  const { title, issuer, year, desc, badge, color, image, order_index } = req.body;

  const result = db.prepare(`
    INSERT INTO certificates (title, issuer, year, desc, badge, color, image, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, issuer, year, desc, badge, color || "bg-indigo-50 text-indigo-700 border-indigo-200", image, order_index || 0);

  res.json({ message: "Sertifikat berhasil ditambahkan.", id: Number(result.lastInsertRowid) });
});

app.put("/api/portfolio/certificates/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, issuer, year, desc, badge, color, image, order_index } = req.body;

  db.prepare(`
    UPDATE certificates SET
      title = ?, issuer = ?, year = ?, desc = ?, badge = ?, color = ?,
      image = ?, order_index = ?
    WHERE id = ?
  `).run(title, issuer, year, desc, badge, color, image, order_index, id);

  res.json({ message: "Sertifikat berhasil diperbarui." });
});

app.delete("/api/portfolio/certificates/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.prepare("DELETE FROM certificates WHERE id = ?").run(id);
  res.json({ message: "Sertifikat berhasil dihapus." });
});

// ==========================================
// 9. ADMIN MUTATIONS - CONTACT
// ==========================================
app.put("/api/portfolio/contact", requireAuth, (req, res) => {
  const { email, instagram_url, linkedin_url, github_url, contact_badge, contact_title, contact_subtitle } = req.body;

  db.prepare(`
    UPDATE contacts SET
      email = ?, instagram_url = ?, linkedin_url = ?, github_url = ?,
      contact_badge = ?, contact_title = ?, contact_subtitle = ?
    WHERE id = 1
  `).run(email, instagram_url, linkedin_url, github_url, contact_badge, contact_title, contact_subtitle);

  res.json({ message: "Informasi kontak berhasil diperbarui." });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 [BACKEND] Express REST API running on http://localhost:${PORT}`);
  console.log(`📁 [BACKEND] Database: ${path.join(__dirname, "data", "portfolio.db")}`);
  console.log(`📸 [BACKEND] Uploads: http://localhost:${PORT}/uploads/`);
});

