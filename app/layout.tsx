
import type { Metadata } from "next";
import { Kode_Mono, Titillium_Web, Science_Gothic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
});

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium-web",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});

const scienceGothic = Science_Gothic({
  variable: "--font-science-gothic",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Data Driven Business Management | Data Analytics for Small Business",
  description: "Independent data analytics partner helping small businesses make better decisions. Make more money, save money, and understand customers through practical data science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${kodeMono.variable} ${titilliumWeb.variable} ${scienceGothic.variable} antialiased min-h-screen bg-[#F7F6F2]`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
