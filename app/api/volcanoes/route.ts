import { NextResponse } from "next/server";
import { volcanoes } from "../../geothermal/volcano-data";

export async function GET() {
  return NextResponse.json(volcanoes);
}
