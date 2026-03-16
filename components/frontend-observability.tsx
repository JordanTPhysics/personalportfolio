'use client';

import { faro, getWebInstrumentations, initializeFaro, NavigationInstrumentation, UserActionInstrumentation } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { useEffect } from 'react';

export default function FrontendObservability() {
  useEffect(() => {
    // skip if already initialized
    if (faro.api?.pushEvent !== undefined) {
      return;
    }

    try {
      initializeFaro({
        url: 'https://faro-collector-prod-gb-south-1.grafana.net/collect/adaa2fe0ffa4e7dc1d82d14aa43b1527',
        app: {
          name: 'DataDrivenOutcomes',
          namespace: 'webjs',
          version: '1.0.0',
          environment: 'production',
        },
        instrumentations: [
          ...getWebInstrumentations(),
          new TracingInstrumentation(),
          new NavigationInstrumentation(),
          new UserActionInstrumentation(),
        ],

        userActionsInstrumentation: {
          dataAttributeName: "trackerId",
        },
      });
    } catch (e) {
      console.error('Faro init failed', e);
    }
  }, []);

  return null;
}