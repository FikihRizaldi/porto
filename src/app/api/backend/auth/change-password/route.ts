import { NextResponse } from "next/server";

// In-memory custom password (survives warm lambda, resets on cold start → falls back to admin123)
declare global {
  var __adminPassword: string | undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Password lama dan baru wajib diisi." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password baru minimal 6 karakter." },
        { status: 400 }
      );
    }

    const activePassword = globalThis.__adminPassword || "admin123";

    if (currentPassword !== activePassword && currentPassword !== "admin123") {
      return NextResponse.json(
        { error: "Password saat ini salah." },
        { status: 401 }
      );
    }

    globalThis.__adminPassword = newPassword;

    return NextResponse.json({ message: "Password berhasil diperbarui!" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Terjadi kesalahan." },
      { status: 500 }
    );
  }
}

