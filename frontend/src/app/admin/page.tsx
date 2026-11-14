"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePortfolio, Project, SkillCategory, ExperienceItem, Certificate } from "../../context/PortfolioContext";

const API_BASE = "/api/backend";

export default function AdminPage() {
  const { data: portfolioData, refreshPortfolio } = usePortfolio();

  // Authentication State
  const [token, setToken] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Forgot Password Emergency Reset State
  const [showForgot, setShowForgot] = useState<boolean>(false);
  const [recoveryKey, setRecoveryKey] = useState<string>("");
  const [forgotNewPass, setForgotNewPass] = useState<string>("");
  const [forgotConfirmPass, setForgotConfirmPass] = useState<string>("");
  const [forgotLoading, setForgotLoading] = useState<boolean>(false);
  const [forgotMsg, setForgotMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  // Active Tab: profile | hero | projects | skills | experience | certificates | contact | password
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  // Local Form States initialized from portfolioData
  const [profileForm, setProfileForm] = useState(portfolioData.profile);
  const [heroCard1, setHeroCard1] = useState<any>({});
  const [heroCard2, setHeroCard2] = useState<any>({});
  const [heroCard3, setHeroCard3] = useState<any>({});
  const [heroCard4, setHeroCard4] = useState<any>({});

  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);

  const [skillsList, setSkillsList] = useState<SkillCategory[]>([]);
  const [editingSkill, setEditingSkill] = useState<SkillCategory | null>(null);

  const [expList, setExpList] = useState<ExperienceItem[]>([]);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [isNewExp, setIsNewExp] = useState<boolean>(false);

  const [certList, setCertList] = useState<Certificate[]>([]);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNewCert, setIsNewCert] = useState<boolean>(false);

  const [contactForm, setContactForm] = useState(portfolioData.contact);

  // Password change state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Sync state when portfolioData loads or updates
  useEffect(() => {
    if (portfolioData) {
      setProfileForm(portfolioData.profile || {});
      setHeroCard1(portfolioData.heroCards?.find((c) => c.index === 1) || {});
      setHeroCard2(portfolioData.heroCards?.find((c) => c.index === 2) || {});
      setHeroCard3(portfolioData.heroCards?.find((c) => c.index === 3) || {});
      setHeroCard4(portfolioData.heroCards?.find((c) => c.index === 4) || {});
      setProjectsList(portfolioData.projects || []);
      setSkillsList(portfolioData.skillCategories || []);
      setExpList(portfolioData.experiences || []);
      setCertList(portfolioData.certificates || []);
      setContactForm(portfolioData.contact || {});
    }
  }, [portfolioData]);

  // Check saved login token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
    }
    setAuthChecking(false);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Emergency Master Key Reset Handler
  const handleResetWithMasterKey = async (e: FormEvent) => {
    e.preventDefault();
    if (forgotNewPass !== forgotConfirmPass) {
      setForgotMsg({ type: "error", text: "Konfirmasi password baru tidak cocok." });
      return;
    }
    setForgotLoading(true);
    setForgotMsg(null);

    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recoveryKey, newPassword: forgotNewPass }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal mereset password.");

      setForgotMsg({ type: "success", text: "Password berhasil di-reset! Silakan login sekarang." });
      setRecoveryKey("");
      setForgotNewPass("");
      setForgotConfirmPass("");
      setTimeout(() => {
        setShowForgot(false);
        setForgotMsg(null);
      }, 2000);
    } catch (err: any) {
      setForgotMsg({ type: "error", text: err.message });
    } finally {
      setForgotLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Gagal masuk. Periksa username dan password.");
      }

      localStorage.setItem("admin_token", json.token);
      setToken(json.token);
      showToast("Selamat datang di Admin Control Center!");
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  // File Upload Helper
  const handleUpload = async (file: File, onSuccess: (url: string) => void) => {
    if (!token) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      showToast("Mengunggah file...");
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal mengunggah file");

      onSuccess(json.url);
      showToast("File berhasil diunggah!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Save Profile Handler
  const handleSaveProfile = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/portfolio/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });

      if (!res.ok) throw new Error("Gagal menyimpan profil.");

      await refreshPortfolio();
      showToast("Profil & Hero berhasil disimpan!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Save Specific Hero Card
  const handleSaveHeroCard = async (cardIndex: number, cardData: any) => {
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/portfolio/hero-cards/${cardIndex}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cardData),
      });

      if (!res.ok) throw new Error(`Gagal menyimpan kartu #${cardIndex}`);

      await refreshPortfolio();
      showToast(`Kartu #${cardIndex} berhasil disimpan!`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Save Project Handler
  const handleSaveProject = async (project: Project) => {
    if (!token) return;
    setSaving(true);
    try {
      const url = isNewProject ? `${API_BASE}/portfolio/projects` : `${API_BASE}/portfolio/projects/${project.id}`;
      const method = isNewProject ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      });

      if (!res.ok) throw new Error("Gagal menyimpan proyek.");

      await refreshPortfolio();
      setEditingProject(null);
      setIsNewProject(false);
      showToast("Proyek berhasil disimpan!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete Project Handler
  const handleDeleteProject = async (id: number) => {
    if (!token || !confirm("Yakin ingin menghapus proyek ini?")) return;
    try {
      const res = await fetch(`${API_BASE}/portfolio/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus proyek.");

      await refreshPortfolio();
      showToast("Proyek berhasil dihapus.");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Save Skill Handler
  const handleSaveSkill = async (cat: SkillCategory) => {
    if (!token) return;
    setSaving(true);
    try {
      const url = cat.id ? `${API_BASE}/portfolio/skills/${cat.id}` : `${API_BASE}/portfolio/skills`;
      const method = cat.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cat),
      });

      if (!res.ok) throw new Error("Gagal menyimpan keahlian.");

      await refreshPortfolio();
      setEditingSkill(null);
      showToast("Kategori keahlian berhasil disimpan!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete Skill Handler
  const handleDeleteSkill = async (id: number) => {
    if (!token || !confirm("Yakin ingin menghapus kategori keahlian ini?")) return;
    try {
      const res = await fetch(`${API_BASE}/portfolio/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus kategori keahlian.");

      await refreshPortfolio();
      showToast("Kategori keahlian berhasil dihapus.");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Save Experience Handler
  const handleSaveExp = async (item: ExperienceItem) => {
    if (!token) return;
    setSaving(true);
    try {
      const url = isNewExp ? `${API_BASE}/portfolio/experience` : `${API_BASE}/portfolio/experience/${item.id}`;
      const method = isNewExp ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Gagal menyimpan riwayat.");

      await refreshPortfolio();
      setEditingExp(null);
      setIsNewExp(false);
      showToast("Riwayat berhasil disimpan!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete Experience Handler
  const handleDeleteExp = async (id: number) => {
    if (!token || !confirm("Yakin ingin menghapus riwayat ini?")) return;
    try {
      const res = await fetch(`${API_BASE}/portfolio/experience/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus riwayat.");

      await refreshPortfolio();
      showToast("Riwayat berhasil dihapus.");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Save Certificate Handler
  const handleSaveCert = async (cert: Certificate) => {
    if (!token) return;
    setSaving(true);
    try {
      const url = isNewCert ? `${API_BASE}/portfolio/certificates` : `${API_BASE}/portfolio/certificates/${cert.id}`;
      const method = isNewCert ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cert),
      });

      if (!res.ok) throw new Error("Gagal menyimpan sertifikat.");

      await refreshPortfolio();
      setEditingCert(null);
      setIsNewCert(false);
      showToast("Sertifikat berhasil disimpan!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete Certificate Handler
  const handleDeleteCert = async (id: number) => {
    if (!token || !confirm("Yakin ingin menghapus sertifikat ini?")) return;
    try {
      const res = await fetch(`${API_BASE}/portfolio/certificates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus sertifikat.");

      await refreshPortfolio();
      showToast("Sertifikat berhasil dihapus.");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Save Contact Handler
  const handleSaveContact = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/portfolio/contact`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contactForm),
      });

      if (!res.ok) throw new Error("Gagal menyimpan kontak.");

      await refreshPortfolio();
      showToast("Informasi kontak berhasil disimpan!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Change Password Handler
  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert("Konfirmasi password baru tidak cocok.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/auth/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal mengubah password.");

      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
      showToast("Password admin berhasil diperbarui!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-sans">
        <p className="animate-pulse text-sm">Memuat Control Center...</p>
      </div>
    );
  }

  // ==========================================
  // VIEW: LOGIN SCREEN
  // ==========================================
  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4 font-sans select-none">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/30 mb-4">
              FR
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Control Center</h1>
            <p className="text-xs text-slate-500 mt-1">
              Masuk untuk mengedit seluruh konten portofolio tanpa deploy ulang.
            </p>
          </div>

          {!showForgot ? (
            <>
              {authError && (
                <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none text-sm text-slate-800 transition-all"
                    placeholder="Username admin"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgot(true)}
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      Lupa Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none text-sm text-slate-800 transition-all"
                    placeholder="Masukkan password admin"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 text-sm mt-2"
                >
                  {authLoading ? "Memverifikasi..." : "Masuk ke Dashboard"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-5 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-900 text-xs leading-relaxed">
                <span className="font-bold block mb-1">🔑 Pemulihan Darurat (Master Key)</span>
                Gunakan <strong>MASTER_RECOVERY_KEY</strong> yang tersimpan di file <code className="bg-white px-1.5 py-0.5 rounded border border-indigo-200 font-mono text-[11px]">backend/.env</code> server Anda. Hanya pemilik server yang memegang kunci ini.
              </div>

              {forgotMsg && (
                <div
                  className={`mb-4 p-3.5 rounded-xl border text-xs font-medium ${
                    forgotMsg.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  {forgotMsg.text}
                </div>
              )}

              <form onSubmit={handleResetWithMasterKey} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Master Recovery Key
                  </label>
                  <input
                    type="password"
                    value={recoveryKey}
                    onChange={(e) => setRecoveryKey(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-indigo-600 outline-none"
                    placeholder="Masukkan master key dari .env"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password Baru (Min. 6 Karakter)
                  </label>
                  <input
                    type="password"
                    value={forgotNewPass}
                    onChange={(e) => setForgotNewPass(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-indigo-600 outline-none"
                    placeholder="Masukkan password baru"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    value={forgotConfirmPass}
                    onChange={(e) => setForgotConfirmPass(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-indigo-600 outline-none"
                    placeholder="Ulangi password baru"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgot(false);
                      setForgotMsg(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {forgotLoading ? "Mereset..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              ← Kembali ke Portofolio Publik
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // VIEW: MAIN ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 font-sans flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2.5 border border-slate-700 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            FR
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">Control Center</h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Backend & SQLite Aktif</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>Lihat Portofolio</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all cursor-pointer"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Sidebar Tabs */}
        <aside className="md:col-span-3 bg-white border border-slate-200/90 rounded-3xl p-3 shadow-xs space-y-1 sticky top-20">
          <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigasi Konten
          </p>
          {[
            { id: "profile", label: "Profil & Hero", icon: "👤" },
            { id: "hero", label: "Kartu Hero Deck (5)", icon: "🗂️" },
            { id: "projects", label: "Proyek (Portfolio)", icon: "🚀" },
            { id: "skills", label: "Keahlian (Skills)", icon: "⚡" },
            { id: "experience", label: "Pengalaman & Edu", icon: "🎓" },
            { id: "certificates", label: "Sertifikat", icon: "📜" },
            { id: "contact", label: "Kontak & Footer", icon: "📬" },
            { id: "password", label: "Keamanan Akun", icon: "🔒" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-left ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="md:col-span-9 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
          
          {/* ========================================================= */}
          {/* TAB 1: PROFIL & HERO */}
          {/* ========================================================= */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Profil & Editorial Hero</h3>
                  <p className="text-xs text-slate-500">Ubah nama, status, headline, dan foto profil.</p>
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profileForm.name || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inisial Monogram (FR)</label>
                  <input
                    type="text"
                    value={profileForm.initials || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, initials: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status Pill Badge</label>
                  <input
                    type="text"
                    value={profileForm.status_badge || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, status_badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-600"
                    placeholder="Open for full-time positions"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Headline Baris 1 (Normal)</label>
                  <input
                    type="text"
                    value={profileForm.headline_prefix || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, headline_prefix: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-600"
                    placeholder="A developer and researcher for"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Headline Baris 2 (Ungu / Sorotan)</label>
                  <input
                    type="text"
                    value={profileForm.headline_highlight || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, headline_highlight: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-600"
                    placeholder="intelligent systems & modern web"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Tulisan Tangan</label>
                  <input
                    type="text"
                    value={profileForm.handwritten_note || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, handwritten_note: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-600"
                    placeholder="Hey, nice to have you here"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL File CV / Resume (PDF)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={profileForm.resume_url || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, resume_url: e.target.value })}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-600"
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold cursor-pointer border border-slate-200 whitespace-nowrap">
                      Upload PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleUpload(e.target.files[0], (url) => {
                              setProfileForm({ ...profileForm, resume_url: url });
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Foto Profil (Avatar)</label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <Image
                        src={profileForm.avatar_url || "/profile.png"}
                        alt="Preview"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={profileForm.avatar_url || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, avatar_url: e.target.value })}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-600"
                        placeholder="/profile.png atau /uploads/..."
                      />
                      <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold cursor-pointer border border-slate-200 whitespace-nowrap">
                        Upload Foto
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleUpload(e.target.files[0], (url) => {
                                setProfileForm({ ...profileForm, avatar_url: url });
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: KARTU HERO DECK (5 KARTU) */}
          {/* ========================================================= */}
          {activeTab === "hero" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Kelola 5 Kartu Hero Deck</h3>
                <p className="text-xs text-slate-500">
                  Ubah data kartu yang tampil bergantian pada kartu bertumpuk di bagian utama.
                </p>
              </div>

              {/* CARD 1: BIO QUOTE */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Kartu 2</span>
                    <h4 className="text-sm font-bold text-slate-900">Filosofi & Kutipan Arsitektur</h4>
                  </div>
                  <button
                    onClick={() => handleSaveHeroCard(1, heroCard1)}
                    disabled={saving}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Simpan Kartu 2
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Penulis</label>
                    <input
                      type="text"
                      value={heroCard1.author || ""}
                      onChange={(e) => setHeroCard1({ ...heroCard1, author: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtitle Kampus</label>
                    <input
                      type="text"
                      value={heroCard1.subtitle || ""}
                      onChange={(e) => setHeroCard1({ ...heroCard1, subtitle: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Kutipan (Quote)</label>
                    <textarea
                      rows={2}
                      value={heroCard1.quote || ""}
                      onChange={(e) => setHeroCard1({ ...heroCard1, quote: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Core Focus Tag</label>
                    <input
                      type="text"
                      value={heroCard1.core_focus || ""}
                      onChange={(e) => setHeroCard1({ ...heroCard1, core_focus: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: AKADEMIK & RESEARCH TRACK */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Kartu 3</span>
                    <h4 className="text-sm font-bold text-slate-900">Jalur Akademik, IPK & Peminatan</h4>
                  </div>
                  <button
                    onClick={() => handleSaveHeroCard(2, heroCard2)}
                    disabled={saving}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Simpan Kartu 3
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Universitas / Kampus</label>
                    <input
                      type="text"
                      value={heroCard2.university || ""}
                      onChange={(e) => setHeroCard2({ ...heroCard2, university: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Jurusan / Program Studi</label>
                    <input
                      type="text"
                      value={heroCard2.degree || ""}
                      onChange={(e) => setHeroCard2({ ...heroCard2, degree: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Konsentrasi Studi</label>
                    <input
                      type="text"
                      value={heroCard2.concentration || ""}
                      onChange={(e) => setHeroCard2({ ...heroCard2, concentration: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      placeholder="Pemrograman"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Fokus Minat & Target</label>
                    <input
                      type="text"
                      value={heroCard2.interest_focus || ""}
                      onChange={(e) => setHeroCard2({ ...heroCard2, interest_focus: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      placeholder="Machine Learning, AI, Data & Modern Web"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Indeks Prestasi (IPK)</label>
                    <input
                      type="text"
                      value={heroCard2.gpa || ""}
                      onChange={(e) => setHeroCard2({ ...heroCard2, gpa: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      placeholder="IPK 3.82"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Status Keaktifan</label>
                    <input
                      type="text"
                      value={heroCard2.status || ""}
                      onChange={(e) => setHeroCard2({ ...heroCard2, status: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      placeholder="Mahasiswa Aktif"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Lokasi Kampus</label>
                    <input
                      type="text"
                      value={heroCard2.location || ""}
                      onChange={(e) => setHeroCard2({ ...heroCard2, location: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      placeholder="Sleman, Yogyakarta"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Periode Angkatan</label>
                    <input
                      type="text"
                      value={heroCard2.period || ""}
                      onChange={(e) => setHeroCard2({ ...heroCard2, period: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      placeholder="2022 — Sekarang"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 3: WHAT I BUILD WITH */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Kartu 4</span>
                    <h4 className="text-sm font-bold text-slate-900">What I Build With (Tech Stack)</h4>
                  </div>
                  <button
                    onClick={() => handleSaveHeroCard(3, heroCard3)}
                    disabled={saving}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Simpan Kartu 4
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Judul Kartu</label>
                    <input
                      type="text"
                      value={heroCard3.title || ""}
                      onChange={(e) => setHeroCard3({ ...heroCard3, title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Teks Tombol Bawah</label>
                    <input
                      type="text"
                      value={heroCard3.button_text || ""}
                      onChange={(e) => setHeroCard3({ ...heroCard3, button_text: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 4: SOCIALS */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Kartu 5</span>
                    <h4 className="text-sm font-bold text-slate-900">Kartu Socials (Gaya Irfan Kurnia)</h4>
                  </div>
                  <button
                    onClick={() => handleSaveHeroCard(4, heroCard4)}
                    disabled={saving}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Simpan Kartu 5
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">URL LinkedIn</label>
                    <input
                      type="text"
                      value={heroCard4.linkedin_url || ""}
                      onChange={(e) => setHeroCard4({ ...heroCard4, linkedin_url: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Handle LinkedIn</label>
                    <input
                      type="text"
                      value={heroCard4.linkedin_handle || ""}
                      onChange={(e) => setHeroCard4({ ...heroCard4, linkedin_handle: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">URL Instagram</label>
                    <input
                      type="text"
                      value={heroCard4.instagram_url || ""}
                      onChange={(e) => setHeroCard4({ ...heroCard4, instagram_url: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">URL GitHub</label>
                    <input
                      type="text"
                      value={heroCard4.github_url || ""}
                      onChange={(e) => setHeroCard4({ ...heroCard4, github_url: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Catatan Kaki Kartu</label>
                    <input
                      type="text"
                      value={heroCard4.footer_note || ""}
                      onChange={(e) => setHeroCard4({ ...heroCard4, footer_note: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PROYEK (PORTFOLIO) */}
          {/* ========================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Kelola Proyek & Studi Kasus</h3>
                  <p className="text-xs text-slate-500">Tambah, ubah, atau hapus proyek portofolio.</p>
                </div>
                {!editingProject && (
                  <button
                    onClick={() => {
                      setEditingProject({
                        title: "",
                        category: "",
                        year: new Date().getFullYear().toString(),
                        role: "",
                        desc: "",
                        tags: [],
                        image: "/placeholder.png",
                        github: "",
                        live: "",
                        order_index: projectsList.length,
                      });
                      setIsNewProject(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    + Tambah Proyek Baru
                  </button>
                )}
              </div>

              {/* Editing / Creating Form Modal / Inline */}
              {editingProject ? (
                <div className="p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900">
                      {isNewProject ? "Tambah Proyek Baru" : `Edit Proyek: ${editingProject.title}`}
                    </h4>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Batal
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Proyek</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tahun</label>
                      <input
                        type="text"
                        value={editingProject.year}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Peran Anda</label>
                      <input
                        type="text"
                        value={editingProject.role}
                        onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Ringkas</label>
                      <textarea
                        rows={3}
                        value={editingProject.desc}
                        onChange={(e) => setEditingProject({ ...editingProject, desc: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tags Teknologi (Pisahkan dengan koma)
                      </label>
                      <input
                        type="text"
                        value={editingProject.tags?.join(", ") || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                        placeholder="React, Node.js, Python, Docker"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">URL GitHub</label>
                      <input
                        type="text"
                        value={editingProject.github}
                        onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">URL Live / Demo</label>
                      <input
                        type="text"
                        value={editingProject.live}
                        onChange={(e) => setEditingProject({ ...editingProject, live: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gambar / Thumbnail Proyek</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={editingProject.image}
                          onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                        <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold cursor-pointer border border-slate-200 whitespace-nowrap">
                          Upload Gambar
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleUpload(e.target.files[0], (url) => {
                                  setEditingProject({ ...editingProject, image: url });
                                });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleSaveProject(editingProject)}
                      disabled={saving}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-xs"
                    >
                      {saving ? "Menyimpan..." : "Simpan Proyek"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {projectsList.map((p) => (
                    <div
                      key={p.id || p.title}
                      className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-indigo-300 transition-colors bg-white shadow-2xs"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image src={p.image || "/placeholder.png"} alt={p.title} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                            {p.category} · {p.year}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{p.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{p.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(p);
                            setIsNewProject(false);
                          }}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => p.id && handleDeleteProject(p.id)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: KEAHLIAN (SKILLS) */}
          {/* ========================================================= */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Kelola Kategori Keahlian</h3>
                  <p className="text-xs text-slate-500">Edit kategori dan daftar teknologi yang Anda kuasai.</p>
                </div>
              </div>

              {editingSkill ? (
                <div className="p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/20 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">Edit Kategori Keahlian</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Kategori</label>
                      <input
                        type="text"
                        value={editingSkill.title}
                        onChange={(e) => setEditingSkill({ ...editingSkill, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={editingSkill.badge}
                        onChange={(e) => setEditingSkill({ ...editingSkill, badge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi</label>
                      <textarea
                        rows={2}
                        value={editingSkill.description}
                        onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Daftar Skills (Pisahkan koma)</label>
                      <input
                        type="text"
                        value={editingSkill.skills.join(", ")}
                        onChange={(e) =>
                          setEditingSkill({
                            ...editingSkill,
                            skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingSkill(null)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleSaveSkill(editingSkill)}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {skillsList.map((cat) => (
                    <div key={cat.id || cat.title} className="p-5 rounded-2xl border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                            {cat.badge}
                          </span>
                          <h4 className="text-base font-bold text-slate-900 mt-1">{cat.title}</h4>
                        </div>
                        <button
                          onClick={() => setEditingSkill(cat)}
                          className="px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{cat.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s) => (
                          <span key={s} className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: PENGALAMAN & PENDIDIKAN */}
          {/* ========================================================= */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Pengalaman Kerja & Pendidikan</h3>
                  <p className="text-xs text-slate-500">Kelola riwayat karir dan rekam jejak akademik.</p>
                </div>
                {!editingExp && (
                  <button
                    onClick={() => {
                      setEditingExp({
                        type: "work",
                        role: "",
                        organization: "",
                        period: "2026 — Sekarang",
                        location: "Yogyakarta",
                        description: "",
                        tags: [],
                        order_index: expList.length,
                      });
                      setIsNewExp(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    + Tambah Riwayat Baru
                  </button>
                )}
              </div>

              {editingExp ? (
                <div className="p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/20 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">
                    {isNewExp ? "Tambah Riwayat Baru" : `Edit: ${editingExp.role}`}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tipe</label>
                      <select
                        value={editingExp.type}
                        onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      >
                        <option value="work">Pengalaman Kerja / Proyek</option>
                        <option value="education">Pendidikan Formal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Peran / Gelar</label>
                      <input
                        type="text"
                        value={editingExp.role}
                        onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        placeholder="Software Developer / S1 Informatika"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Perusahaan / Institusi</label>
                      <input
                        type="text"
                        value={editingExp.organization}
                        onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        placeholder="Simo System / Universitas AMIKOM"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Periode</label>
                      <input
                        type="text"
                        value={editingExp.period}
                        onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        placeholder="2024 — Sekarang"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Aktivitas</label>
                      <textarea
                        rows={3}
                        value={editingExp.description}
                        onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Pisahkan koma)</label>
                      <input
                        type="text"
                        value={editingExp.tags?.join(", ") || ""}
                        onChange={(e) =>
                          setEditingExp({
                            ...editingExp,
                            tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingExp(null)}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold border border-slate-200"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleSaveExp(editingExp)}
                      className="px-5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {expList.map((item) => (
                    <div
                      key={item.id || item.role}
                      className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-indigo-300 transition-colors bg-white shadow-2xs"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {item.type === "education" ? "Pendidikan" : "Kerja"} · {item.period}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">{item.role}</h4>
                        <p className="text-xs text-indigo-600 font-semibold">{item.organization}</p>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingExp(item);
                            setIsNewExp(false);
                          }}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => item.id && handleDeleteExp(item.id)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: SERTIFIKAT */}
          {/* ========================================================= */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Sertifikasi Terverifikasi</h3>
                  <p className="text-xs text-slate-500">Kelola sertifikat dan foto lisensi keahlian.</p>
                </div>
                {!editingCert && (
                  <button
                    onClick={() => {
                      setEditingCert({
                        title: "",
                        issuer: "",
                        year: new Date().getFullYear().toString(),
                        desc: "",
                        badge: "AI & Tech",
                        color: "bg-indigo-50 text-indigo-700 border-indigo-200",
                        image: "/placeholder.png",
                        order_index: certList.length,
                      });
                      setIsNewCert(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    + Tambah Sertifikat Baru
                  </button>
                )}
              </div>

              {editingCert ? (
                <div className="p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/20 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">
                    {isNewCert ? "Tambah Sertifikat Baru" : `Edit: ${editingCert.title}`}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Sertifikat</label>
                      <input
                        type="text"
                        value={editingCert.title}
                        onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Penerbit (Issuer)</label>
                      <input
                        type="text"
                        value={editingCert.issuer}
                        onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        placeholder="Google / Cisco"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Terbit</label>
                      <input
                        type="text"
                        value={editingCert.year}
                        onChange={(e) => setEditingCert({ ...editingCert, year: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={editingCert.badge}
                        onChange={(e) => setEditingCert({ ...editingCert, badge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        placeholder="AI & LLM / MLOps"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Kompetensi</label>
                      <textarea
                        rows={2}
                        value={editingCert.desc}
                        onChange={(e) => setEditingCert({ ...editingCert, desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gambar Sertifikat</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={editingCert.image}
                          onChange={(e) => setEditingCert({ ...editingCert, image: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                        <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold cursor-pointer border border-slate-200 whitespace-nowrap">
                          Upload Foto
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleUpload(e.target.files[0], (url) => {
                                  setEditingCert({ ...editingCert, image: url });
                                });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingCert(null)}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold border border-slate-200"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleSaveCert(editingCert)}
                      className="px-5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certList.map((cert) => (
                    <div
                      key={cert.id || cert.title}
                      className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-3">
                          <Image src={cert.image || "/placeholder.png"} alt={cert.title} fill className="object-cover" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                          {cert.badge} · {cert.year}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">{cert.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{cert.issuer}</p>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 mt-3">
                        <button
                          onClick={() => {
                            setEditingCert(cert);
                            setIsNewCert(false);
                          }}
                          className="px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => cert.id && handleDeleteCert(cert.id)}
                          className="px-3 py-1 text-xs font-bold rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: KONTAK & FOOTER */}
          {/* ========================================================= */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Kontak, Medsos & Teks Footer</h3>
                  <p className="text-xs text-slate-500">Ubah alamat email, tautan media sosial, dan copyright footer.</p>
                </div>
                <button
                  onClick={async () => {
                    await handleSaveContact();
                    await handleSaveProfile();
                  }}
                  disabled={saving}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={contactForm.email || ""}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Instagram</label>
                  <input
                    type="text"
                    value={contactForm.instagram_url || ""}
                    onChange={(e) => setContactForm({ ...contactForm, instagram_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL LinkedIn</label>
                  <input
                    type="text"
                    value={contactForm.linkedin_url || ""}
                    onChange={(e) => setContactForm({ ...contactForm, linkedin_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL GitHub</label>
                  <input
                    type="text"
                    value={contactForm.github_url || ""}
                    onChange={(e) => setContactForm({ ...contactForm, github_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Status Footer Kanan</label>
                  <input
                    type="text"
                    value={profileForm.available_tagline || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, available_tagline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    placeholder="Available for Opportunities · Yogyakarta (UTC+7)"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teks Copyright Footer Kiri</label>
                  <input
                    type="text"
                    value={profileForm.copyright_text || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, copyright_text: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    placeholder="Built using Next.js, TypeScript & Gemini API"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: KEAMANAN & GANTI PASSWORD */}
          {/* ========================================================= */}
          {activeTab === "password" && (
            <div className="max-w-md space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Ubah Password Admin</h3>
                <p className="text-xs text-slate-500">Pastikan password baru Anda aman dan mudah diingat.</p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password Saat Ini</label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    placeholder="Masukkan password lama"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password Baru (Min. 6 Karakter)</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    placeholder="Masukkan password baru"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    placeholder="Ulangi password baru"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Memperbarui..." : "Perbarui Password"}
                </button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

