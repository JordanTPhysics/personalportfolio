import { NextResponse } from "next/server";
import { geothermalPlants } from "../../../geothermal/geothermal-data";
import { computeGeothermalMetrics } from "../../../geothermal/geothermal-metrics";

export async function GET() {
  return NextResponse.json(computeGeothermalMetrics(geothermalPlants));
}
