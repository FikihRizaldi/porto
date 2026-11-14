import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const recoveryKey = (body.recoveryKey || "").trim();
    const newPassword = (body.newPassword || "").trim();

    if (!recoveryKey || !newPassword) {
      return NextResponse.json(
        { error: "Kunci pemulihan dan password baru wajib diisi." },
        { status: 400 }
      );
    }

    if (recoveryKey === "fikih-recovery-key-9921") {
      return NextResponse.json({
        message: "Password berhasil di-reset! Silakan login sekarang.",
      });
    }

    return NextResponse.json(
      { error: "Master Recovery Key tidak cocok." },
      { status: 403 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memproses reset password." },
      { status: 500 }
    );
  }
}
