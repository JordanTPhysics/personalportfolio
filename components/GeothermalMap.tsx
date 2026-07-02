"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { GiSmokingVolcano } from "react-icons/gi";
import { PiNuclearPlantBold } from "react-icons/pi";
import { HiOutlineLightningBolt } from "react-icons/hi";

interface GeothermalPlant {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  capacityMW: number;
  status: string;
  yearOperational?: number;
}

interface Volcano {
  id?: string;
  name: string;
  lat: number;
  lng: number;
  country: string;
  summitElevation: number;
  volcanoType: string;
  lastEruption: string;
  details: {
    types: string[];
    rockTypesMajor: string[];
    population30km: number;
  } | null;
}

interface ProspectFactors {
  heatActivity: number;
  geologicalFit: number;
  populationAccess: number;
  elevationFit: number;
  regionalPrecedent: number;
  similarityToPlants: number;
}

interface GeothermalProspect {
  volcanoId: string;
  volcanoName: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  summitElevation: number;
  score: number;
  tier: "high" | "medium" | "low";
  factors: ProspectFactors;
  nearestPlantKm: number | null;
  nearestPlantName: string | null;
  reasoning: string[];
}

const TIER_COLORS = {
  high: "#4a90e2",
  medium: "#00b9e4",
  low: "#94a3b8",
} as const;

const FACTOR_LABELS: Record<keyof ProspectFactors, string> = {
  heatActivity: "Heat activity",
  geologicalFit: "Geological fit",
  populationAccess: "Population access",
  elevationFit: "Elevation fit",
  regionalPrecedent: "Regional precedent",
  similarityToPlants: "Similarity to plant sites",
};

const PLANT_ACTIVE_COLOR = "#16a34a";
const PLANT_INACTIVE_COLOR = "#94a3b8";

function plantIconColor(status: string): string {
  const normalized = status.trim().toLowerCase();
  if (normalized === "operating" || normalized === "construction") {
    return PLANT_ACTIVE_COLOR;
  }
  return PLANT_INACTIVE_COLOR;
}

function volcanoActivityColor(lastEruption: string): string {
  if (!lastEruption) return "#9ca3af";
  if (/CE/i.test(lastEruption) && !/unknown/i.test(lastEruption)) return "#dc2626";
  if (/evidence credible/i.test(lastEruption)) return "#f97316";
  return "#9ca3af";
}

interface GeothermalMapProps {
  className?: string;
}

export default function GeothermalMap({ className = "h-[600px]" }: GeothermalMapProps) {
  const [geothermal, setGeothermal] = useState<GeothermalPlant[]>([]);
  const [volcanoes, setVolcanoes] = useState<Volcano[]>([]);
  const [prospects, setProspects] = useState<GeothermalProspect[]>([]);
  const [showPlants, setShowPlants] = useState(true);
  const [showVolcanoes, setShowVolcanoes] = useState(false);
  const [showProspects, setShowProspects] = useState(true);

  useEffect(() => {
    fetch("/api/geothermal")
      .then((r) => r.json())
      .then(setGeothermal);
    fetch("/api/volcanoes")
      .then((r) => r.json())
      .then(setVolcanoes);
    fetch("/api/prospects")
      .then((r) => r.json())
      .then(setProspects);
  }, []);

  const maxCapacity = geothermal.reduce(
    (max, plant) => Math.max(max, plant.capacityMW),
    0
  );

  const getPlantIconSize = (capacityMW: number): number => {
    if (maxCapacity === 0) return 24;
    return Math.max(16, Math.floor((capacityMW / maxCapacity) * 48));
  };

  const getProspectIconSize = (score: number): number => {
    return Math.max(14, Math.floor(score / 100 * 28));
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-slate-200 shadow-lg ${className}`}>
      <div className="absolute top-3 right-3 z-1000 flex flex-col gap-2 rounded-lg bg-white/95 p-3 shadow-md backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Map layers
        </p>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={showPlants}
            onChange={(e) => setShowPlants(e.target.checked)}
            className="accent-green-600"
          />
          <span className="flex items-center gap-1">
            <PiNuclearPlantBold color={PLANT_ACTIVE_COLOR} size={14} />
            <PiNuclearPlantBold color={PLANT_INACTIVE_COLOR} size={14} />
          </span>
          Geothermal plants ({geothermal.length})
        </label>
        {showPlants && (
          <p className="ml-6 text-xs text-slate-500">
            Green = operating/construction · Slate = other
          </p>
        )}
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={showProspects}
            onChange={(e) => setShowProspects(e.target.checked)}
            className="accent-orange-600"
          />
          <HiOutlineLightningBolt color="#ea580c" />
          Prospects ({prospects.length})
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={showVolcanoes}
            onChange={(e) => setShowVolcanoes(e.target.checked)}
            className="accent-red-600"
          />
          <GiSmokingVolcano color="red" />
          All volcanoes ({volcanoes.length})
        </label>
      </div>
      <MapContainer
        key="geothermal-map"
        center={[20, 0]}
        zoom={2}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {showPlants &&
          geothermal.map((plant) => (
            <Marker
              key={plant.id}
              position={[plant.lat, plant.lng]}
              icon={L.divIcon({
                html: renderToStaticMarkup(
                  <PiNuclearPlantBold
                    color={plantIconColor(plant.status)}
                    size={getPlantIconSize(plant.capacityMW)}
                  />
                ),
                className: "",
                iconSize: [32, 32],
                iconAnchor: [16, 16],
              })}
            >
              <Popup>
                <strong>{plant.name}</strong>
                <br />
                {plant.country} · {plant.capacityMW} MW
                <br />
                {plant.status}
              </Popup>
            </Marker>
          ))}
        {showProspects &&
          prospects.map((prospect) => (
            <Marker
              key={prospect.volcanoId}
              position={[prospect.lat, prospect.lng]}
              icon={L.divIcon({
                html: renderToStaticMarkup(
                  <HiOutlineLightningBolt
                    color={TIER_COLORS[prospect.tier]}
                    size={getProspectIconSize(prospect.score)}
                  />
                ),
                className: "",
                iconSize: [32, 32],
                iconAnchor: [16, 16],
              })}
            >
              <Popup maxWidth={320}>
                <strong>{prospect.volcanoName}</strong>
                <br />
                {prospect.country} · Score {prospect.score}/100
                <hr className="my-2" />
                <p className="text-xs font-semibold">Score breakdown</p>
                <ul className="mt-1 list-none space-y-0.5 text-xs">
                  {(Object.keys(prospect.factors) as (keyof ProspectFactors)[]).map(
                    (key) => (
                      <li key={key}>
                        {FACTOR_LABELS[key]}: {prospect.factors[key]}
                      </li>
                    )
                  )}
                </ul>
                {prospect.nearestPlantName && (
                  <p className="mt-2 text-xs">
                    Nearest plant: {prospect.nearestPlantName}
                    {prospect.nearestPlantKm != null &&
                      ` (${Math.round(prospect.nearestPlantKm)} km)`}
                  </p>
                )}
              </Popup>
            </Marker>
          ))}
        {showVolcanoes &&
          volcanoes.map((volcano) => (
            <Marker
              key={volcano.id ?? volcano.name}
              position={[volcano.lat, volcano.lng]}
              icon={L.divIcon({
                html: renderToStaticMarkup(
                  <GiSmokingVolcano
                    color={volcanoActivityColor(volcano.lastEruption)}
                    size={10}
                  />
                ),
                className: "",
                iconSize: [16, 16],
                iconAnchor: [8, 8],
              })}
            >
              <Popup>
                <strong>{volcano.name}</strong>
                <br />
                {volcano.country}
                {volcano.summitElevation > 0 && (
                  <>
                    <br />
                    {volcano.summitElevation} m
                  </>
                )}
                {volcano.details && (
                  <>
                    <br />
                    {volcano.details.types.slice(0, 2).join(", ")}
                    <br />
                    Pop. 30 km: {volcano.details.population30km.toLocaleString()}
                  </>
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
