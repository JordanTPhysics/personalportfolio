import { readFileSync } from "fs";
import { join } from "path";
import { parseCsv } from "@/lib/csv";

export interface VolcanoScrapedDetails {
  volcanoNumber: string;
  name: string;
  landform: string;
  types: string[];
  rockTypesMajor: string[];
  rockTypesMinor: string[];
  tectonicSetting: string[];
  population5km: number;
  population10km: number;
  population30km: number;
  population100km: number;
  lastKnownEruption: string;
  eruptionCount: number;
  scrapeError: string | null;
}

type CsvRow = {
  volcano_number: string;
  volcano_name: string;
  volcano_landform: string;
  volcano_types: string;
  rock_types_major: string;
  rock_types_minor: string;
  tectonic_setting: string;
  population_5km: string;
  population_10km: string;
  population_30km: string;
  population_100km: string;
  last_known_eruption: string;
  all_eruptions: string;
  validation_warnings: string;
  scrape_error: string;
};

const CSV_COLUMNS: (keyof CsvRow)[] = [
  "volcano_number",
  "volcano_name",
  "volcano_landform",
  "volcano_types",
  "rock_types_major",
  "rock_types_minor",
  "tectonic_setting",
  "population_5km",
  "population_10km",
  "population_30km",
  "population_100km",
  "last_known_eruption",
  "all_eruptions",
  "validation_warnings",
  "scrape_error",
];

function parsePipeList(value: string): string[] {
  return value
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parsePopulation(value: string): number {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? 0 : n;
}

function countEruptions(allEruptions: string): number {
  if (!allEruptions.trim()) return 0;
  return allEruptions.split("||").filter((e) => e.trim()).length;
}

function rowToDetails(row: CsvRow): VolcanoScrapedDetails | null {
  const volcanoNumber = row.volcano_number?.trim();
  if (!volcanoNumber) return null;

  return {
    volcanoNumber,
    name: row.volcano_name?.trim() || "",
    landform: row.volcano_landform?.trim() || "",
    types: parsePipeList(row.volcano_types || ""),
    rockTypesMajor: parsePipeList(row.rock_types_major || ""),
    rockTypesMinor: parsePipeList(row.rock_types_minor || ""),
    tectonicSetting: parsePipeList(row.tectonic_setting || ""),
    population5km: parsePopulation(row.population_5km),
    population10km: parsePopulation(row.population_10km),
    population30km: parsePopulation(row.population_30km),
    population100km: parsePopulation(row.population_100km),
    lastKnownEruption: row.last_known_eruption?.trim() || "",
    eruptionCount: countEruptions(row.all_eruptions || ""),
    scrapeError: row.scrape_error?.trim() || null,
  };
}

function loadScrapedDetails(): Map<string, VolcanoScrapedDetails> {
  const csvPath = join(
    process.cwd(),
    "public",
    "resources",
    "VolcanoScrapedData.csv"
  );
  const csv = readFileSync(csvPath, "utf-8");
  const rows = parseCsv<CsvRow>(csv, CSV_COLUMNS, { hasHeader: true });
  const map = new Map<string, VolcanoScrapedDetails>();

  for (const row of rows) {
    const details = rowToDetails(row);
    if (details) map.set(details.volcanoNumber, details);
  }

  return map;
}

export const volcanoScrapedByNumber: Map<string, VolcanoScrapedDetails> =
  loadScrapedDetails();
