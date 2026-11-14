import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "../context/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhamad Fikih Rizaldi — AI & Fullstack Web Developer",
  description:
    "Portofolio profesional Muhamad Fikih Rizaldi — Mahasiswa Informatika Universitas AMIKOM Yogyakarta yang berfokus pada Machine Learning, MLOps, dan Fullstack Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`h-full antialiased ${poppins.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF9F6] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
