"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import type { GeothermalMetrics } from "./geothermal-metrics";
import { formatMW } from "./geothermal-metrics";
import type { GeothermalProspect } from "./prospect-scoring";
import type { VolcanoDashboardMetrics } from "./volcano-metrics";

const GeothermalMap = dynamic(() => import("@/components/GeothermalMap"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full animate-pulse rounded-xl bg-slate-200"
      aria-label="Loading map"
    />
  ),
});

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  accent: string;
  onClick?: () => void;
}

function MetricCard({ label, value, detail, accent, onClick }: MetricCardProps) {
  const className =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-left transition-colors duration-200";

  const content = (
    <>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={`text-xl font-bold leading-tight ${accent}`}>{value}</p>
      <p className="text-xs text-slate-600">{detail}</p>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} group cursor-pointer hover:border-orange-700 hover:bg-orange-700`}
        aria-label={`${label}: ${value}. Click to view details.`}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 group-hover:text-orange-100">
          {label}
        </p>
        <p
          className={`text-xl font-bold leading-tight ${accent} group-hover:text-white`}
        >
          {value}
        </p>
        <p className="text-xs text-slate-600 group-hover:text-orange-100">
          {detail}
        </p>
      </button>
    );
  }

  return (
    <article className={className} aria-label={label}>
      {content}
    </article>
  );
}

interface ScrollableListCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

function ScrollableListCard({ title, subtitle, children }: ScrollableListCardProps) {
  return (
    <article className="flex min-h-36 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="shrink-0 border-b border-slate-100 px-3 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
          {title}
        </h2>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">{children}</div>
    </article>
  );
}

interface GeothermalDashboardProps {
  metrics: GeothermalMetrics;
  prospects: GeothermalProspect[];
  volcanoMetrics: VolcanoDashboardMetrics;
}

export default function GeothermalDashboard({
  metrics,
  prospects,
  volcanoMetrics,
}: GeothermalDashboardProps) {
  const [tableOpen, setTableOpen] = useState(false);

  useEffect(() => {
    if (!tableOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTableOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [tableOpen]);

  const { aggregates, volcanoesByCountry, geothermalByCountry } = volcanoMetrics;

  return (
    <main className="flex h-full flex-col gap-2 overflow-hidden px-3 py-2 sm:px-4">
      <header className="shrink-0">
          <h1 className="text-h2 font-space-mono font-bold tracking-tight text-foreground">
            Global Geothermal Dashboard
          </h1>
      </header>

      <div className="flex min-h-0 flex-1 gap-3 lg:flex-row">
        <section
          aria-label="Global map"
          className="min-h-0 min-w-0 flex-[3] lg:flex-[5]"
        >
          <GeothermalMap className="h-full" />
        </section>

        <aside
          aria-label="Dashboard metrics"
          className="flex min-h-0 min-w-0 flex-[2] flex-col gap-2 overflow-y-auto lg:flex-[3]"
        >
          <section
            aria-label="Capacity overview"
            className="grid shrink-0 grid-cols-2 gap-2"
          >
            <MetricCard
              label="Operating"
              value={formatMW(metrics.operating.capacityMW)}
              detail={`${metrics.operating.unitCount.toLocaleString()} units`}
              accent="text-green-700"
            />
            <MetricCard
              label="Construction"
              value={formatMW(metrics.construction.capacityMW)}
              detail={`${metrics.construction.unitCount.toLocaleString()} units`}
              accent="text-amber-700"
            />
            <MetricCard
              label="In planning"
              value={formatMW(metrics.planning.capacityMW)}
              detail={`${metrics.planning.unitCount.toLocaleString()} units`}
              accent="text-blue-700"
            />
            <MetricCard
              label="Pipeline"
              value={formatMW(metrics.pipelineTotalMW)}
              detail={`${metrics.pipelineUnitCount.toLocaleString()} units total`}
              accent="text-slate-800"
            />
          </section>

          <MetricCard
            label="Prospects"
            value={prospects.length.toLocaleString()}
            detail="Score 70+ · click to view"
            accent="text-orange-700"
            onClick={() => setTableOpen(true)}
          />

          <section
            aria-label="Volcano aggregates"
            className="grid shrink-0 grid-cols-2 gap-2"
          >
            <MetricCard
              label="Recorded eruptions"
              value={aggregates.totalRecordedEruptions.toLocaleString()}
              detail={`Across ${aggregates.volcanoesWithDetails.toLocaleString()} volcanoes`}
              accent="text-red-700"
            />
            <MetricCard
              label="Total pop. (30 km)"
              value={aggregates.totalPopulation30km.toLocaleString()}
              detail="Sum of nearby population"
              accent="text-purple-700"
            />
            <MetricCard
              label="Avg pop. (30 km)"
              value={aggregates.averagePopulation30km.toLocaleString()}
              detail="Per volcano with data"
              accent="text-purple-700"
            />
            <MetricCard
              label="Rock types"
              value={aggregates.rockTypesByCount.length.toLocaleString()}
              detail="Distinct types recorded"
              accent="text-stone-700"
            />
          </section>

          <ScrollableListCard
            title="Volcanoes by rock type"
            subtitle="Ordered by volcano count"
          >
            <ul className="space-y-1.5 text-xs">
              {aggregates.rockTypesByCount.map(({ rockType, volcanoCount }) => (
                <li
                  key={rockType}
                  className="flex items-start justify-between gap-2 text-slate-700"
                >
                  <span className="min-w-0 leading-snug">{rockType}</span>
                  <span className="shrink-0 font-mono font-semibold text-slate-900">
                    {volcanoCount}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollableListCard>

          <div className="grid min-h-40 flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
            <ScrollableListCard
              title="Volcanoes by country"
              subtitle="Ordered by count"
            >
              <ul className="space-y-1.5 text-xs">
                {volcanoesByCountry.map(({ country, volcanoCount }) => (
                  <li
                    key={country}
                    className="flex items-center justify-between gap-2 text-slate-700"
                  >
                    <span className="truncate">{country}</span>
                    <span className="shrink-0 font-mono font-semibold text-slate-900">
                      {volcanoCount}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollableListCard>

            <ScrollableListCard
              title="Geothermal by country"
              subtitle="Ordered by MW"
            >
              <ul className="space-y-1.5 text-xs">
                {geothermalByCountry.map(({ country, capacityMW, unitCount }) => (
                  <li
                    key={country}
                    className="flex items-center justify-between gap-2 text-slate-700"
                  >
                    <span className="min-w-0 truncate">{country}</span>
                    <span className="shrink-0 text-right font-mono font-semibold text-slate-900">
                      {formatMW(capacityMW)}
                      <span className="block text-[10px] font-normal text-slate-500">
                        {unitCount} units
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollableListCard>
          </div>

          <section className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <h2 className="font-semibold text-slate-800">Methodology</h2>
            <p className="mt-1 leading-relaxed">
              Capacity sums GEM unit ratings. Prospects score volcanoes on heat
              activity, geology, population, elevation, regional precedent, and
              similarity to plant-adjacent sites. Sites within 20 km of existing
              plants are excluded.
            </p>
          </section>

          <footer className="mt-auto shrink-0 rounded-lg bg-slate-600-transparent p-2 text-xs font-medium text-white">
            Data:{" "}
            <Link
              className="text-blue-300 underline"
              href="https://globalenergymonitor.org/projects/global-geothermal-power-tracker/summary-tables/"
            >
              GEM
            </Link>
            ,{" "}
            <Link
              className="text-blue-300 underline"
              href="https://volcano.si.edu/"
            >
              GVP
            </Link>
            . Map © OpenStreetMap.
          </footer>
        </aside>
      </div>

      {tableOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="prospects-table-title"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/50"
              aria-label="Close prospects table"
              onClick={() => setTableOpen(false)}
            />
            <div className="relative z-10 flex max-h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3">
                <div>
                  <h2
                    id="prospects-table-title"
                    className="font-space-mono text-lg font-bold text-slate-900"
                  >
                    Geothermal prospects
                  </h2>
                  <p className="text-sm text-slate-600">
                    Top {Math.min(25, prospects.length)} of {prospects.length}{" "}
                    scored volcano sites
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTableOpen(false)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="sticky top-0 bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Volcano
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Country
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Score
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Type
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Pop. 30 km
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Last eruption
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-700">
                        Nearest plant
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {prospects.slice(0, 25).map((prospect) => (
                      <tr key={prospect.volcanoId} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {prospect.volcanoName}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {prospect.country}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-900">
                          {prospect.score}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {prospect.details.types.slice(0, 2).join(", ") || "—"}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {prospect.details.population30km.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {prospect.details.lastKnownEruption || "—"}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {prospect.nearestPlantKm != null
                            ? `${Math.round(prospect.nearestPlantKm)} km`
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
