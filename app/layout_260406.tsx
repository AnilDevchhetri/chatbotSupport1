import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "3step ai support ",
  description: "Instantly resolve customer questions with an assistant that reads your docs and speaks with empathy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"

    >
      <body className={`${inter.className} bg-[#050509] text-zinc-100 antialiased`}>

        {/* 🌌 GLOBAL BACKGROUND */}
        <div className="fixed inset-0 -z-50 overflow-hidden">

          {/* Base dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#050509] via-[#0a0a1a] to-[#050509]" />

          {/* Glow Orbs */}
          <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />

          {/* Center Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)]" />

          {/* Grid overlay (optional futuristic feel) */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Top fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-transparent to-transparent opacity-80" />
        </div>

        {children}

      </body>
    </html>
  );
}
