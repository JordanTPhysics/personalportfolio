import { NextResponse } from "next/server";
import { geothermalPlants } from "../../geothermal/geothermal-data";
import { computeProspects } from "../../geothermal/prospect-scoring";
import { volcanoes } from "../../geothermal/volcano-data";

export async function GET() {
  const prospects = computeProspects(volcanoes, geothermalPlants);
  return NextResponse.json(prospects);
}
