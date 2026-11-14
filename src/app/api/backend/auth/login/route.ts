import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const username = (body.username || "").trim().toLowerCase();
    const password = (body.password || "").trim();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    if (username === "admin" && (password === "admin123" || password === "admin")) {
      const token = "admin-session-token-" + Date.now();
      return NextResponse.json({
        message: "Login berhasil",
        token,
        user: { id: 1, username: "admin" },
      });
    }

    return NextResponse.json(
      { error: "Username atau password salah. Pastikan gunakan: admin / admin123" },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Terjadi kesalahan pada server login." },
      { status: 500 }
    );
  }
}

