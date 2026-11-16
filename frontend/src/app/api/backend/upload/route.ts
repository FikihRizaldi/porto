import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://onlbginwahcjjoqqkpwo.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    const isPdf = file.type === "application/pdf" || file.name?.endsWith(".pdf");
    const isImage = file.type?.startsWith("image/") || /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name || "");

    // Upload files (PDF or Images) to Supabase Storage and return clean public URL
    if ((isPdf || isImage) && supabaseKey) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = file.name?.split(".").pop()?.toLowerCase() || (isPdf ? "pdf" : "png");
        const folder = isPdf ? "cv" : "images";
        const sanitizedName = file.name
          ? file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
          : `${Date.now()}.${ext}`;
        const fileName = isPdf ? `cv/CV_Muhamad_Fikih_Rizaldi.pdf` : `${folder}/${Date.now()}_${sanitizedName}`;

        const contentType = file.type || (isPdf ? "application/pdf" : `image/${ext === "jpg" ? "jpeg" : ext}`);

        const { error } = await supabase.storage
          .from("porto-files")
          .upload(fileName, buffer, {
            contentType,
            upsert: true,
          });

        if (!error) {
          const { data: publicData } = supabase.storage
            .from("porto-files")
            .getPublicUrl(fileName);

          return NextResponse.json({
            message: "File berhasil diunggah ke Supabase Storage",
            url: publicData.publicUrl,
          });
        }
        // Fall through to base64 if storage fails
        console.error("Supabase storage error:", error.message);
      } catch (storageErr) {
        console.error("Storage upload failed, falling back to base64:", storageErr);
      }
    }

    // Fallback: Return as base64 Data URL (for images or if storage unavailable)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const mimeType = file.type || "image/png";
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      message: "File berhasil diunggah",
      url: dataUrl,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

