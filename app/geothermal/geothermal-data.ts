import { readFileSync } from "fs";
import { join } from "path";
import { parseCsv } from "@/lib/csv";

export interface GeothermalPlant {
  id: string;
  name: string;
  localName: string | null;
  technology: string;
  owner: string;
  country: string;
  lastUpdated: string;
  lat: number;
  lng: number;
  capacityMW: number;
  status: string;
  yearOperational?: number;
}

/** CSV row shape matching GeothermalPower.csv headers */
type CsvRow = {
  "Date Last Researched": string;
  "Country/Area": string;
  "Project Name": string;
  "Unit Name": string;
  "Project Name in Local Language / Script": string;
  "Unit Capacity (MW)": string;
  Technology: string;
  Status: string;
  "Start Year": string;
  Owner: string;
  Latitude: string;
  Longitude: string;
  "GEM unit ID": string;
};

const CSV_COLUMNS: (keyof CsvRow)[] = [
  "Date Last Researched",
  "Country/Area",
  "Project Name",
  "Unit Name",
  "Project Name in Local Language / Script",
  "Unit Capacity (MW)",
  "Technology",
  "Status",
  "Start Year",
  "Owner",
  "Latitude",
  "Longitude",
  "GEM unit ID",
];

function parseNumber(value: string): number | undefined {
  const n = parseFloat(value);
  return Number.isNaN(n) ? undefined : n;
}

function parseYear(value: string): number | undefined {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? undefined : n;
}

function rowToPlant(row: CsvRow): GeothermalPlant | null {
  const lat = parseNumber(row.Latitude);
  const lng = parseNumber(row.Longitude);
  if (lat == null || lng == null) return null;

  const capacityMW = parseNumber(row["Unit Capacity (MW)"]) ?? 0;
  const name =
    row["Unit Name"] && row["Unit Name"].trim() !== "" && row["Unit Name"] !== "--"
      ? `${row["Project Name"]} (${row["Unit Name"]})`
      : row["Project Name"];
  const localName = row["Project Name in Local Language / Script"]?.trim() || null;

  return {
    id: row["GEM unit ID"] || `${row["Project Name"]}-${row["Unit Name"]}`.replace(/\s+/g, "-"),
    name,
    localName: localName || null,
    technology: row.Technology?.trim() || "",
    owner: row.Owner?.trim() || "",
    country: row["Country/Area"]?.trim() || "",
    lastUpdated: row["Date Last Researched"]?.trim() || "",
    lat,
    lng,
    capacityMW,
    status: row.Status?.trim() || "",
    yearOperational: parseYear(row["Start Year"]),
  };
}

function loadGeothermalPlants(): GeothermalPlant[] {
  const csvPath = join(process.cwd(), "public", "resources", "GeothermalPower.csv");
  const csv = readFileSync(csvPath, "utf-8");
  const rows = parseCsv<CsvRow>(csv, CSV_COLUMNS, { hasHeader: true });
  const plants: GeothermalPlant[] = [];
  for (const row of rows) {
    const plant = rowToPlant(row);
    if (plant) plants.push(plant);
  }
  return plants;
}

export const geothermalPlants: GeothermalPlant[] = loadGeothermalPlants();
