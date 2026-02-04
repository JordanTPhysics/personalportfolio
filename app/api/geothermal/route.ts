import { NextResponse } from "next/server";
import { geothermalPlants } from "../../geothermal/geothermal-data";

export async function GET() {
  return NextResponse.json(geothermalPlants);
}
