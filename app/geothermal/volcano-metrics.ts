import type { GeothermalPlant } from "./geothermal-data";
import type { Volcano } from "./volcano-data";

export interface RockTypeCount {
  rockType: string;
  volcanoCount: number;
}

export interface VolcanoAggregates {
  totalVolcanoes: number;
  volcanoesWithDetails: number;
  totalRecordedEruptions: number;
  totalPopulation30km: number;
  averagePopulation30km: number;
  rockTypesByCount: RockTypeCount[];
}

export interface CountryVolcanoCount {
  country: string;
  volcanoCount: number;
}

export interface CountryGeothermalMW {
  country: string;
  capacityMW: number;
  unitCount: number;
}

export interface VolcanoDashboardMetrics {
  aggregates: VolcanoAggregates;
  volcanoesByCountry: CountryVolcanoCount[];
  geothermalByCountry: CountryGeothermalMW[];
}

function incrementMap(map: Map<string, number>, key: string, amount = 1): void {
  if (!key) return;
  map.set(key, (map.get(key) ?? 0) + amount);
}

export function computeVolcanoAggregates(volcanoes: Volcano[]): VolcanoAggregates {
  const rockTypeCounts = new Map<string, number>();
  let volcanoesWithDetails = 0;
  let totalRecordedEruptions = 0;
  let totalPopulation30km = 0;
  let populationSampleSize = 0;

  for (const volcano of volcanoes) {
    const details = volcano.details;
    if (!details || details.scrapeError) continue;

    volcanoesWithDetails += 1;
    totalRecordedEruptions += details.eruptionCount;
    totalPopulation30km += details.population30km;
    populationSampleSize += 1;

    const rockTypes = new Set([
      ...details.rockTypesMajor,
      ...details.rockTypesMinor,
    ]);
    for (const rockType of rockTypes) {
      incrementMap(rockTypeCounts, rockType);
    }
  }

  const rockTypesByCount: RockTypeCount[] = [...rockTypeCounts.entries()]
    .map(([rockType, volcanoCount]) => ({ rockType, volcanoCount }))
    .sort((a, b) => b.volcanoCount - a.volcanoCount);

  return {
    totalVolcanoes: volcanoes.length,
    volcanoesWithDetails,
    totalRecordedEruptions,
    totalPopulation30km,
    averagePopulation30km:
      populationSampleSize > 0
        ? Math.round(totalPopulation30km / populationSampleSize)
        : 0,
    rockTypesByCount,
  };
}

export function computeVolcanoesByCountry(
  volcanoes: Volcano[]
): CountryVolcanoCount[] {
  const counts = new Map<string, number>();

  for (const volcano of volcanoes) {
    incrementMap(counts, volcano.country || "Unknown");
  }

  return [...counts.entries()]
    .map(([country, volcanoCount]) => ({ country, volcanoCount }))
    .sort((a, b) => b.volcanoCount - a.volcanoCount);
}

export function computeGeothermalByCountry(
  plants: GeothermalPlant[]
): CountryGeothermalMW[] {
  const mwByCountry = new Map<string, number>();
  const unitsByCountry = new Map<string, number>();

  for (const plant of plants) {
    const country = plant.country || "Unknown";
    incrementMap(mwByCountry, country, plant.capacityMW);
    incrementMap(unitsByCountry, country);
  }

  return [...mwByCountry.entries()]
    .map(([country, capacityMW]) => ({
      country,
      capacityMW,
      unitCount: unitsByCountry.get(country) ?? 0,
    }))
    .sort((a, b) => b.capacityMW - a.capacityMW);
}

export function computeVolcanoDashboardMetrics(
  volcanoes: Volcano[],
  plants: GeothermalPlant[]
): VolcanoDashboardMetrics {
  return {
    aggregates: computeVolcanoAggregates(volcanoes),
    volcanoesByCountry: computeVolcanoesByCountry(volcanoes),
    geothermalByCountry: computeGeothermalByCountry(plants),
  };
}
