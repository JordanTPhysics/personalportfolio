import type { GeothermalPlant } from "./geothermal-data";

export type PlantPipelineCategory = "operating" | "construction" | "planning";

export interface PipelineBucket {
  label: string;
  capacityMW: number;
  unitCount: number;
}

export interface GeothermalMetrics {
  operating: PipelineBucket;
  construction: PipelineBucket;
  planning: PipelineBucket;
  pipelineTotalMW: number;
  pipelineUnitCount: number;
  other: PipelineBucket;
}

function normalizeStatus(status: string): string {
  return status.trim().toLowerCase();
}

export function categorizePlantStatus(
  status: string
): PlantPipelineCategory | "other" {
  const normalized = normalizeStatus(status);
  if (normalized === "operating") return "operating";
  if (normalized === "construction") return "construction";
  if (normalized === "pre-construction" || normalized === "announced") {
    return "planning";
  }
  return "other";
}

function emptyBucket(label: string): PipelineBucket {
  return { label, capacityMW: 0, unitCount: 0 };
}

function addToBucket(
  bucket: PipelineBucket,
  capacityMW: number
): PipelineBucket {
  return {
    ...bucket,
    capacityMW: bucket.capacityMW + capacityMW,
    unitCount: bucket.unitCount + 1,
  };
}

export function computeGeothermalMetrics(
  plants: GeothermalPlant[]
): GeothermalMetrics {
  let operating = emptyBucket("Operating");
  let construction = emptyBucket("Under construction");
  let planning = emptyBucket("In planning");
  let other = emptyBucket("Other statuses");

  for (const plant of plants) {
    const category = categorizePlantStatus(plant.status);
    const capacity = plant.capacityMW;

    switch (category) {
      case "operating":
        operating = addToBucket(operating, capacity);
        break;
      case "construction":
        construction = addToBucket(construction, capacity);
        break;
      case "planning":
        planning = addToBucket(planning, capacity);
        break;
      default:
        other = addToBucket(other, capacity);
        break;
    }
  }

  return {
    operating,
    construction,
    planning,
    pipelineTotalMW: construction.capacityMW + planning.capacityMW,
    pipelineUnitCount: construction.unitCount + planning.unitCount,
    other,
  };
}

export function formatMW(value: number): string {
  return `${value.toLocaleString(undefined, {
    maximumFractionDigits: value >= 100 ? 0 : 1,
  })} MW`;
}
