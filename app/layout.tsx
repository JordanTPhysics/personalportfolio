
import type { Metadata } from "next";
import { Space_Mono, Titillium_Web, Science_Gothic } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaroInit from "@/components/FaroInit";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        className={`${spaceMono.variable} ${titilliumWeb.variable} ${scienceGothic.variable} antialiased min-h-screen bg-[#F7F6F2]`}
      >
        <FaroInit/>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
