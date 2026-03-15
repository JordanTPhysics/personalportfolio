'use client';

import { faro, getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

export default function FrontendObservability() {
  // skip if already initialized
  if (faro.api) {
    return null;
  }

  try {
    const faro = initializeFaro({
      url: 'https://faro-collector-prod-gb-south-1.grafana.net/collect/adaa2fe0ffa4e7dc1d82d14aa43b1527',
      app: {
        name: 'DataDrivenOutcomes',
        namespace: 'webjs',
        version: '1.0.0',
        environment: 'production',
      },

      instrumentations: [
        // Mandatory, omits default instrumentations otherwise.
        ...getWebInstrumentations(),

        // Tracing package to get end-to-end visibility for HTTP requests.
        new TracingInstrumentation(),
      ],
    });
  } catch (e) {
    return null;
  }
  return null;
}