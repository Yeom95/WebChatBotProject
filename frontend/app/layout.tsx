import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// ↓ 추가: 챗봇 UI 전용 디스플레이/본문 폰트 (Figma 시안의 굵은 타이틀 느낌 재현용)
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ====================== 여기부터 추가된 부분 ======================
const baloo2 = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
// ===================================================================

export const metadata: Metadata = {
  title: "Dawg AI Chat",                       // 변경: 프로젝트 이름에 맞게 수정
  description: "FastAPI + Next.js 기반 AI 챗봇", // 변경: 설명 수정
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko" // 변경: en -> ko
      className={`${geistSans.variable} ${geistMono.variable} ${baloo2.variable} ${inter.variable} h-full antialiased`}
    // ↑ 변경: baloo2.variable, inter.variable 두 개를 className에 추가
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
