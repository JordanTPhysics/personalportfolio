import { readFileSync } from "fs";
import { join } from "path";
import { parseCsv } from "@/lib/csv";

export interface Volcano {
  id: string;
  name: string;
  lat: number;
  lng: number;
  country: string;
  lastEruption: string;
  summitElevation: number;
  volcanoType: string;
  alertLevel: string;
  colorCode: string;
  region: string;
}

/** CSV row shape matching VolcanoData.csv headers */
type CsvRow = {
  VolcanoNumber: string;
  VolcanoName: string;
  State: string;
  VolcanicSubregion: string;
  SummitElevM: string;
  LatitudeDecimal: string;
  LongitudeDecimal: string;
};

const CSV_COLUMNS: (keyof CsvRow)[] = [
  "VolcanoNumber",
  "VolcanoName",
  "State",
  "VolcanicSubregion",
  "SummitElevM",
  "LatitudeDecimal",
  "LongitudeDecimal",
];

function parseNumber(value: string): number | undefined {
  const n = parseFloat(value);
  return Number.isNaN(n) ? undefined : n;
}

function rowToVolcano(row: CsvRow): Volcano | null {
  const lat = parseNumber(row.LatitudeDecimal);
  const lng = parseNumber(row.LongitudeDecimal);
  if (lat == null || lng == null) return null;

  const summitElevation = parseNumber(row.SummitElevM) ?? 0;

  return {
    id: row.VolcanoNumber?.trim() || "",
    name: row.VolcanoName?.trim() || "",
    lat,
    lng,
    country: row.State?.trim() || "",
    lastEruption: "",
    summitElevation,
    volcanoType: "",
    alertLevel: "",
    colorCode: "GREEN",
    region: row.VolcanicSubregion?.trim() || "",
  };
}

function loadVolcanoes(): Volcano[] {
  const csvPath = join(process.cwd(), "public", "resources", "VolcanoData.csv");
  const csv = readFileSync(csvPath, "utf-8");
  const rows = parseCsv<CsvRow>(csv, CSV_COLUMNS, { hasHeader: true });
  const volcanoes: Volcano[] = [];
  for (const row of rows) {
    const volcano = rowToVolcano(row);
    if (volcano) volcanoes.push(volcano);
  }
  return volcanoes;
}

export const volcanoes: Volcano[] = loadVolcanoes();
