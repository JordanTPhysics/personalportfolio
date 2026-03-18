'use client';

import { faro, getWebInstrumentations, initializeFaro, NavigationInstrumentation, UserActionInstrumentation } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { useEffect } from 'react';

export default function FrontendObservability() {
  useEffect(() => {
    const w = window as any;
    if (w.__FARO_INITIALIZED === true) return;

    try {
      w.__FARO_INITIALIZED = true;
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
      // If initialization fails, allow a retry.
      w.__FARO_INITIALIZED = false;
      console.error('Faro init failed', e);
    }
  }, []);

  return null;
}