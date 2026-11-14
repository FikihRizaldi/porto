import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolioStore";

export async function GET() {
  try {
    const data = getPortfolioData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (body && typeof body === "object") {
      savePortfolioData(body);
      return NextResponse.json({ message: "Portofolio berhasil disimpan!" });
    }
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return PUT(req);
}

