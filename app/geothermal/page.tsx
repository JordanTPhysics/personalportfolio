"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const GeothermalMap = dynamic(() => import("@/components/GeothermalMap"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[600px] w-full animate-pulse rounded-xl bg-slate-200"
      aria-label="Loading map"
    />
  ),
});

export default function GeothermalDashboardPage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-h1 font-space-mono font-bold tracking-tight text-foreground">
            Global Geothermal Activity 
          </h1>
          <p className="mt-3 max-w-2xl text-body text-slate-600">
            Geothermal Activity and Volcano Dashboard for identifying new renewable opportunities
          </p>
        </header>
        
        <section aria-label="Map">
          <GeothermalMap />
        </section>
        <footer className="mt-6 text-body font-semibold text-white bg-slate-600-transparent p-2 rounded-lg">
          Geothermal data: <Link className="underline text-blue-400" href="https://globalenergymonitor.org/projects/global-geothermal-power-tracker/summary-tables/">GEM</Link>. Volcano data: <Link className="underline text-blue-400" href="https://ckan.publishing.service.gov.uk/dataset/compiled-lists-of-active-volcanoes-along-with-active-and-potential-geothermal-sites-worldwide/resource/57ffbad2-6c1b-42e0-b8a9-2d14958f2030">gov.uk</Link> and <Link className="underline text-blue-400" href="https://volcano.si.edu/">Smithsonian</Link>.
          Map © OpenStreetMap.
        </footer>
      </div>
    </main>
  );
}
