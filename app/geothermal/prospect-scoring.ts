import { haversineKm } from "@/lib/geo";
import type { GeothermalPlant } from "./geothermal-data";
import type { Volcano } from "./volcano-data";
import type { VolcanoScrapedDetails } from "./volcano-scraped-data";

export type ProspectTier = "high" | "medium" | "low";

export interface ProspectFactors {
  heatActivity: number;
  geologicalFit: number;
  populationAccess: number;
  elevationFit: number;
  regionalPrecedent: number;
  similarityToPlants: number;
}

export interface GeothermalProspect {
  volcanoId: string;
  volcanoName: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  summitElevation: number;
  score: number;
  tier: ProspectTier;
  factors: ProspectFactors;
  nearestPlantKm: number | null;
  nearestPlantName: string | null;
  reasoning: string[];
  details: VolcanoScrapedDetails;
}

const EXCLUSION_RADIUS_KM = 20;
const PLANT_VOLCANO_RADIUS_KM = 40;
const REGIONAL_PRECEDENT_RADIUS_KM = 150;

const GEOTHERMAL_LANDFORMS = new Set([
  "caldera",
  "cluster",
  "composite",
  "shield",
  "minor (basaltic)",
]);

const GEOTHERMAL_TYPE_KEYWORDS = [
  "caldera",
  "volcanic field",
  "stratovolcano",
  "fumarole",
  "maar",
  "shield",
  "lava dome",
  "pyroclastic cone",
];

const GEOTHERMAL_ROCK_KEYWORDS = [
  "basalt",
  "trachybasalt",
  "andesite",
  "rhyolite",
  "trachyte",
  "dacite",
  "phonolite",
  "tephrite",
];

const GEOTHERMAL_TECTONIC_KEYWORDS = [
  "rift zone",
  "subduction zone",
  "hotspot",
  "intraplate",
];

const ACTIVE_PLANT_STATUSES = new Set([
  "operating",
  "construction",
  "pre-construction",
  "mothballed",
]);

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function matchesKeyword(value: string, keywords: string[]): boolean {
  const lower = normalize(value);
  return keywords.some((kw) => lower.includes(kw));
}

function parseEruptionYear(eruption: string): number | null {
  if (!eruption.trim()) return null;

  const unknownMatch = eruption.match(/unknown/i);
  if (unknownMatch) return null;

  const ceMatch = eruption.match(/(\d+)\s*CE/i);
  if (ceMatch) return parseInt(ceMatch[1], 10);

  const bceMatch = eruption.match(/(\d+)\s*BCE/i);
  if (bceMatch) return -parseInt(bceMatch[1], 10);

  return null;
}

function scoreHeatActivity(details: VolcanoScrapedDetails): {
  score: number;
  note: string;
} {
  const year = parseEruptionYear(details.lastKnownEruption);
  const currentYear = new Date().getFullYear();

  if (year != null && year > 0) {
    const yearsAgo = currentYear - year;
    if (yearsAgo <= 50) {
      return { score: 95, note: `Recent eruption (${year} CE) indicates active heat source` };
    }
    if (yearsAgo <= 200) {
      return { score: 80, note: `Erupted within last 200 years (${year} CE)` };
    }
    if (yearsAgo <= 1000) {
      return { score: 65, note: `Historical activity within last millennium (${year} CE)` };
    }
    return { score: 45, note: `Last eruption ${year} CE — dormant but geologically young` };
  }

  if (year != null && year < 0) {
    const yearsAgo = currentYear - year;
    if (yearsAgo <= 5000) {
      return { score: 55, note: `Holocene-era activity (${Math.abs(year)} BCE)` };
    }
    return { score: 35, note: `Ancient eruptive history (${Math.abs(year)} BCE)` };
  }

  if (/evidence credible/i.test(details.lastKnownEruption)) {
    return { score: 50, note: "Credible evidence of past activity without confirmed date" };
  }

  if (details.eruptionCount >= 5) {
    return { score: 60, note: `${details.eruptionCount} recorded eruptions suggest sustained heat` };
  }

  return { score: 30, note: "Limited eruptive history data" };
}

function scoreGeologicalFit(details: VolcanoScrapedDetails): {
  score: number;
  note: string;
} {
  let points = 0;
  const hits: string[] = [];

  if (GEOTHERMAL_LANDFORMS.has(normalize(details.landform))) {
    points += 25;
    hits.push(details.landform);
  }

  const typeHits = details.types.filter((t) =>
    matchesKeyword(t, GEOTHERMAL_TYPE_KEYWORDS)
  );
  points += Math.min(30, typeHits.length * 10);
  if (typeHits.length) hits.push(...typeHits.slice(0, 2));

  const rockHits = [
    ...details.rockTypesMajor,
    ...details.rockTypesMinor,
  ].filter((r) => matchesKeyword(r, GEOTHERMAL_ROCK_KEYWORDS));
  points += Math.min(25, rockHits.length * 8);
  if (rockHits.length) hits.push(rockHits[0]);

  const tectonicHits = details.tectonicSetting.filter((t) =>
    matchesKeyword(t, GEOTHERMAL_TECTONIC_KEYWORDS)
  );
  points += Math.min(20, tectonicHits.length * 10);
  if (tectonicHits.length) hits.push(tectonicHits[0]);

  const note =
    hits.length > 0
      ? `Favourable geology: ${hits.slice(0, 3).join(", ")}`
      : "Geology less typical of developed geothermal sites";

  return { score: Math.min(100, points), note };
}

function scorePopulationAccess(details: VolcanoScrapedDetails): {
  score: number;
  note: string;
} {
  const pop = details.population30km;
  if (pop >= 1_000_000) {
    return { score: 95, note: `${pop.toLocaleString()} people within 30 km — strong grid demand` };
  }
  if (pop >= 250_000) {
    return { score: 80, note: `${pop.toLocaleString()} people within 30 km` };
  }
  if (pop >= 50_000) {
    return { score: 65, note: `${pop.toLocaleString()} people within 30 km` };
  }
  if (pop >= 10_000) {
    return { score: 45, note: `${pop.toLocaleString()} people within 30 km — modest local demand` };
  }
  if (pop > 0) {
    return { score: 25, note: `Remote location (${pop.toLocaleString()} within 30 km)` };
  }
  return { score: 15, note: "Very low nearby population" };
}

function scoreElevationFit(elevation: number): { score: number; note: string } {
  if (elevation >= 500 && elevation <= 2500) {
    return { score: 80, note: `${elevation} m elevation — typical geothermal range` };
  }
  if (elevation < 500) {
    return { score: 70, note: `${elevation} m elevation — lowland, accessible drilling` };
  }
  if (elevation <= 3500) {
    return { score: 55, note: `${elevation} m elevation — high altitude adds development cost` };
  }
  return { score: 30, note: `${elevation} m elevation — extreme altitude` };
}

function buildPlantProfile(
  volcanoes: Volcano[],
  plants: GeothermalPlant[]
): Map<string, number> {
  const featureWeights = new Map<string, number>();
  const activePlants = plants.filter((p) =>
    ACTIVE_PLANT_STATUSES.has(normalize(p.status))
  );

  for (const plant of activePlants) {
    let nearest: Volcano | null = null;
    let nearestDist = Infinity;

    for (const volcano of volcanoes) {
      if (!volcano.details) continue;
      const dist = haversineKm(plant.lat, plant.lng, volcano.lat, volcano.lng);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = volcano;
      }
    }

    if (!nearest?.details || nearestDist > PLANT_VOLCANO_RADIUS_KM) continue;

    const d = nearest.details;
    const add = (prefix: string, values: string[]) => {
      for (const v of values) {
        const key = `${prefix}:${normalize(v)}`;
        featureWeights.set(key, (featureWeights.get(key) ?? 0) + 1);
      }
    };

    add("landform", [d.landform]);
    add("type", d.types);
    add("rock", [...d.rockTypesMajor, ...d.rockTypesMinor]);
    add("tectonic", d.tectonicSetting);
  }

  return featureWeights;
}

function scoreSimilarityToPlants(
  details: VolcanoScrapedDetails,
  profile: Map<string, number>
): { score: number; note: string } {
  if (profile.size === 0) {
    return { score: 50, note: "No plant-volcano profile available" };
  }

  const features: string[] = [
    `landform:${normalize(details.landform)}`,
    ...details.types.map((t) => `type:${normalize(t)}`),
    ...[...details.rockTypesMajor, ...details.rockTypesMinor].map(
      (r) => `rock:${normalize(r)}`
    ),
    ...details.tectonicSetting.map((t) => `tectonic:${normalize(t)}`),
  ];

  let matchedWeight = 0;
  let totalWeight = 0;
  const matchedLabels: string[] = [];

  for (const [, weight] of profile) {
    totalWeight += weight;
  }

  for (const feature of features) {
    const weight = profile.get(feature);
    if (weight) {
      matchedWeight += weight;
      const label = feature.split(":").slice(1).join(":");
      if (matchedLabels.length < 2) matchedLabels.push(label);
    }
  }

  const ratio = totalWeight > 0 ? matchedWeight / totalWeight : 0;
  const score = Math.min(100, Math.round(ratio * 400 + 20));

  const note =
    matchedLabels.length > 0
      ? `Shares traits with volcanoes near existing plants (${matchedLabels.join(", ")})`
      : "Unusual profile compared to volcanoes near operating plants";

  return { score, note };
}

function scoreRegionalPrecedent(
  lat: number,
  lng: number,
  plants: GeothermalPlant[]
): { score: number; note: string; nearestKm: number | null; nearestName: string | null } {
  const activePlants = plants.filter((p) =>
    ACTIVE_PLANT_STATUSES.has(normalize(p.status))
  );

  let nearestKm: number | null = null;
  let nearestName: string | null = null;

  for (const plant of activePlants) {
    const dist = haversineKm(lat, lng, plant.lat, plant.lng);
    if (nearestKm == null || dist < nearestKm) {
      nearestKm = dist;
      nearestName = plant.name;
    }
  }

  if (nearestKm == null) {
    return { score: 20, note: "No regional geothermal precedent", nearestKm, nearestName };
  }

  if (nearestKm <= 50) {
    return {
      score: 90,
      note: `Within ${Math.round(nearestKm)} km of ${nearestName} — proven regional resource`,
      nearestKm,
      nearestName,
    };
  }
  if (nearestKm <= REGIONAL_PRECEDENT_RADIUS_KM) {
    return {
      score: 70,
      note: `${Math.round(nearestKm)} km from nearest plant (${nearestName})`,
      nearestKm,
      nearestName,
    };
  }
  if (nearestKm <= 500) {
    return {
      score: 45,
      note: `Distant from existing development (${Math.round(nearestKm)} km)`,
      nearestKm,
      nearestName,
    };
  }

  return {
    score: 25,
    note: `Far from any operating geothermal plant (${Math.round(nearestKm)} km)`,
    nearestKm,
    nearestName,
  };
}

function nearestPlantDistance(
  lat: number,
  lng: number,
  plants: GeothermalPlant[]
): number | null {
  let min: number | null = null;
  for (const plant of plants) {
    const dist = haversineKm(lat, lng, plant.lat, plant.lng);
    if (min == null || dist < min) min = dist;
  }
  return min;
}

function tierFromScore(score: number): ProspectTier {
  if (score >= 70) return "high";
  if (score >= 50) return "medium";
  return "low";
}

const FACTOR_WEIGHTS: Record<keyof ProspectFactors, number> = {
  heatActivity: 0.22,
  geologicalFit: 0.2,
  populationAccess: 0.15,
  elevationFit: 0.08,
  regionalPrecedent: 0.2,
  similarityToPlants: 0.15,
};

export function computeProspects(
  volcanoes: Volcano[],
  plants: GeothermalPlant[],
  options: { minScore?: number; maxResults?: number } = {}
): GeothermalProspect[] {
  const { minScore = 70, maxResults = 200 } = options;
  const profile = buildPlantProfile(volcanoes, plants);
  const prospects: GeothermalProspect[] = [];

  for (const volcano of volcanoes) {
    const details = volcano.details;
    if (!details || details.scrapeError) continue;

    const plantDist = nearestPlantDistance(volcano.lat, volcano.lng, plants);
    if (plantDist != null && plantDist < EXCLUSION_RADIUS_KM) continue;

    const heat = scoreHeatActivity(details);
    const geology = scoreGeologicalFit(details);
    const population = scorePopulationAccess(details);
    const elevation = scoreElevationFit(volcano.summitElevation);
    const regional = scoreRegionalPrecedent(volcano.lat, volcano.lng, plants);
    const similarity = scoreSimilarityToPlants(details, profile);

    const factors: ProspectFactors = {
      heatActivity: heat.score,
      geologicalFit: geology.score,
      populationAccess: population.score,
      elevationFit: elevation.score,
      regionalPrecedent: regional.score,
      similarityToPlants: similarity.score,
    };

    const score = Math.round(
      Object.entries(factors).reduce(
        (sum, [key, value]) =>
          sum + value * FACTOR_WEIGHTS[key as keyof ProspectFactors],
        0
      )
    );

    if (score < minScore) continue;

    prospects.push({
      volcanoId: volcano.id,
      volcanoName: volcano.name,
      country: volcano.country,
      region: volcano.region,
      lat: volcano.lat,
      lng: volcano.lng,
      summitElevation: volcano.summitElevation,
      score,
      tier: tierFromScore(score),
      factors,
      nearestPlantKm: regional.nearestKm,
      nearestPlantName: regional.nearestName,
      reasoning: [
        heat.note,
        geology.note,
        population.note,
        elevation.note,
        regional.note,
        similarity.note,
      ],
      details,
    });
  }

  return prospects
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

export const prospectFactorLabels: Record<keyof ProspectFactors, string> = {
  heatActivity: "Heat activity",
  geologicalFit: "Geological fit",
  populationAccess: "Population access",
  elevationFit: "Elevation fit",
  regionalPrecedent: "Regional precedent",
  similarityToPlants: "Similarity to plant sites",
};
