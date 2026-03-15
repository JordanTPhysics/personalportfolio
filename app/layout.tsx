
import type { Metadata } from "next";
import { Space_Mono, Titillium_Web, Science_Gothic } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import FaroInit from "@/components/FaroInit";
import Script from "next/script";

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
  metadataBase: new URL("https://datadrivenjordan.netlify.app/"),
  title: {
    default: "DataDrivenOutcomes – Data-Driven Business Management",
    template: "%s | DataDrivenOutcomes",
  },
  description:
    "Independent data analytics partner helping small businesses make better decisions. Make more money, save money, and understand customers through practical data science.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://datadrivenjordan.netlify.app/",
    title: "DataDrivenOutcomes – Data-Driven Business Management",
    description:
      "Independent data analytics partner helping small businesses make better decisions. Make more money, save money, and understand customers through practical data science.",
    siteName: "DataDrivenOutcomes",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DataDrivenOutcomes dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataDrivenOutcomes – Data-Driven Business Management",
    description:
      "Independent data analytics partner helping small businesses make better decisions. Make more money, save money, and understand customers through practical data science.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
            <Script
          id="schema-software-app"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "DataDrivenOutcomes",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://datadrivenjordan.netlify.app/",
              description:
                "Data Driven Outcomes for Small Businesses",
              offers: {
                "@type": "Offer",
                price: "100",
                priceCurrency: "GBP",
              },
              softwareAddOn: [
                {
                  "@type": "SoftwareApplication",
                  name: "Data Science Portfolio",
                  description: "Data Science for Small Businesses",
                },
              ],
            }),
          }}
        />
      <body
        className={`${spaceMono.variable} ${titilliumWeb.variable} ${scienceGothic.variable} antialiased min-h-screen bg-[#F7F6F2]`}
      >
        {/* <FaroInit/> */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
