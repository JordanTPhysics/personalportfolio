// components/FaroInit.tsx
"use client";

import { useEffect } from "react";
import { initializeFaro, getWebInstrumentations } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export default function FaroInit() {
  useEffect(() => {
    initializeFaro({
      url: "https://faro-collector-prod-gb-south-1.grafana.net/collect/adaa2fe0ffa4e7dc1d82d14aa43b1527",
      app: {
        name: "portfolio-tracker",
        version: "1.0.0",
        environment: "production",
      },
      instrumentations: [
        ...getWebInstrumentations(),
        new TracingInstrumentation(),
      ],
    });
  }, []);

  return null;
}
