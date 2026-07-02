import { geothermalPlants } from "./geothermal-data";
import { computeGeothermalMetrics } from "./geothermal-metrics";
import GeothermalDashboard from "./GeothermalDashboard";
import { computeProspects } from "./prospect-scoring";
import { volcanoes } from "./volcano-data";
import { computeVolcanoDashboardMetrics } from "./volcano-metrics";

export default function GeothermalDashboardPage() {
  const metrics = computeGeothermalMetrics(geothermalPlants);
  const prospects = computeProspects(volcanoes, geothermalPlants);
  const volcanoMetrics = computeVolcanoDashboardMetrics(
    volcanoes,
    geothermalPlants
  );

  return (
    <GeothermalDashboard
      metrics={metrics}
      prospects={prospects}
      volcanoMetrics={volcanoMetrics}
    />
  );
}
