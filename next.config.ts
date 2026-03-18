import type { NextConfig } from "next";

// Single timestamp for Last-Modified (set when config loads ≈ build/deploy time)
const lastModified = new Date().toUTCString();

// Content Security Policy: allow self, Google Analytics, Grafana Faro, Leaflet tiles
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.grafana.net https://faro-collector-prod-gb-south-1.grafana.net",
  "frame-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      // Security and CSP (all pages)
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
      // Hashed JS/CSS/chunks – safe to cache 1 year (filenames change on deploy)
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          { key: "Last-Modified", value: lastModified },
        ],
      },
      // Public static assets (favicon, images, etc.)
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff2?|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
          { key: "Last-Modified", value: lastModified },
        ],
      },
      // Sitemap and robots – short cache, revalidate daily
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
          { key: "Last-Modified", value: lastModified },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
          { key: "Last-Modified", value: lastModified },
        ],
      },
    ];
  },
};

export default nextConfig;
