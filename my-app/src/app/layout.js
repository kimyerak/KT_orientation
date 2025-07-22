import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SparkleBackground from "@/components/SparkleBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "나의 Next.js 웹사이트",
  description: "Next.js App Router로 만든 개인 웹사이트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative overflow-x-hidden`}
      >
        <Header />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
        <SparkleBackground />
      </body>
    </html>
  );
}
