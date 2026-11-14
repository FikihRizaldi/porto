import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolioStore";

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;
    const path = slug.join("/");
    const body = await req.json().catch(() => ({}));
    const current = getPortfolioData();

    if (path === "profile") {
      current.profile = { ...current.profile, ...body };
      savePortfolioData(current);
      return NextResponse.json({ message: "Profil berhasil diperbarui!" });
    }

    if (path.startsWith("hero-cards")) {
      const cardIndex = parseInt(slug[1] || "0", 10);
      const cards = [...(current.heroCards || [])];
      const idx = cards.findIndex((c) => c.index === cardIndex);
      if (idx >= 0) {
        cards[idx] = { ...cards[idx], index: cardIndex, ...body };
      } else {
        cards.push({ index: cardIndex, ...body });
      }
      current.heroCards = cards;
      savePortfolioData(current);
      return NextResponse.json({ message: `Kartu #${cardIndex} berhasil disimpan!` });
    }

    if (path.startsWith("projects")) {
      const projId = parseInt(slug[1] || "0", 10);
      current.projects = (current.projects || []).map((p) =>
        p.id === projId || p.id === body.id ? { ...p, ...body } : p
      );
      savePortfolioData(current);
      return NextResponse.json({ message: "Proyek berhasil diperbarui!" });
    }

    if (path.startsWith("skills")) {
      const skillId = parseInt(slug[1] || "0", 10);
      current.skillCategories = (current.skillCategories || []).map((s) =>
        s.id === skillId || s.id === body.id ? { ...s, ...body } : s
      );
      savePortfolioData(current);
      return NextResponse.json({ message: "Kategori keahlian berhasil diperbarui!" });
    }

    if (path.startsWith("experience")) {
      const expId = parseInt(slug[1] || "0", 10);
      current.experiences = (current.experiences || []).map((e) =>
        e.id === expId || e.id === body.id ? { ...e, ...body } : e
      );
      savePortfolioData(current);
      return NextResponse.json({ message: "Riwayat berhasil diperbarui!" });
    }

    if (path.startsWith("certificates")) {
      const certId = parseInt(slug[1] || "0", 10);
      current.certificates = (current.certificates || []).map((c) =>
        c.id === certId || c.id === body.id ? { ...c, ...body } : c
      );
      savePortfolioData(current);
      return NextResponse.json({ message: "Sertifikat berhasil diperbarui!" });
    }

    if (path === "contact") {
      current.contact = { ...current.contact, ...body };
      savePortfolioData(current);
      return NextResponse.json({ message: "Kontak berhasil diperbarui!" });
    }

    return NextResponse.json({ message: "OK" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;
    const path = slug.join("/");
    const body = await req.json().catch(() => ({}));
    const current = getPortfolioData();

    if (path === "projects") {
      const newProj = { ...body, id: Date.now() };
      current.projects = [newProj, ...(current.projects || [])];
      savePortfolioData(current);
      return NextResponse.json({ message: "Proyek berhasil ditambahkan!", id: newProj.id });
    }

    if (path === "skills") {
      const newSkill = { ...body, id: Date.now() };
      current.skillCategories = [...(current.skillCategories || []), newSkill];
      savePortfolioData(current);
      return NextResponse.json({ message: "Kategori keahlian berhasil ditambahkan!", id: newSkill.id });
    }

    if (path === "experience") {
      const newExp = { ...body, id: Date.now() };
      current.experiences = [newExp, ...(current.experiences || [])];
      savePortfolioData(current);
      return NextResponse.json({ message: "Riwayat berhasil ditambahkan!", id: newExp.id });
    }

    if (path === "certificates") {
      const newCert = { ...body, id: Date.now() };
      current.certificates = [...(current.certificates || []), newCert];
      savePortfolioData(current);
      return NextResponse.json({ message: "Sertifikat berhasil ditambahkan!", id: newCert.id });
    }

    return NextResponse.json({ message: "OK" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params;
    const section = slug[0];
    const id = parseInt(slug[1] || "0", 10);
    const current = getPortfolioData();

    if (section === "projects") {
      current.projects = (current.projects || []).filter((p) => p.id !== id);
      savePortfolioData(current);
      return NextResponse.json({ message: "Proyek berhasil dihapus." });
    }

    if (section === "skills") {
      current.skillCategories = (current.skillCategories || []).filter((s) => s.id !== id);
      savePortfolioData(current);
      return NextResponse.json({ message: "Kategori keahlian berhasil dihapus." });
    }

    if (section === "experience") {
      current.experiences = (current.experiences || []).filter((e) => e.id !== id);
      savePortfolioData(current);
      return NextResponse.json({ message: "Riwayat berhasil dihapus." });
    }

    if (section === "certificates") {
      current.certificates = (current.certificates || []).filter((c) => c.id !== id);
      savePortfolioData(current);
      return NextResponse.json({ message: "Sertifikat berhasil dihapus." });
    }

    return NextResponse.json({ message: "OK" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

