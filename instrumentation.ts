import { Context } from '@opentelemetry/api';
import { ReadableSpan, Span, SpanProcessor } from '@opentelemetry/sdk-trace-node';
import { createTracerProvider, getBaseSpanProcessor } from '@netlify/otel/bootstrap';
import { FetchInstrumentation } from '@netlify/otel/instrumentation-fetch';
import { HttpInstrumentation } from '@netlify/otel/instrumentation-http';

/**
 * Span processor to reduce cardinality of span names.
 *
 * Customize with care!
 */
class SpanNameProcessor implements SpanProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve();
  }
  onStart(span: Span, parentContext: Context): void {
    if (span.name.startsWith('GET /_next/static')) {
      span.updateName('GET /_next/static');
    } else if (span.name.startsWith('GET /_next/data')) {
      span.updateName('GET /_next/data');
    }
  }
  onEnd(span: ReadableSpan): void {}
  
  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}

export function register() {
  createTracerProvider({
    serviceName: process.env.OTEL_SERVICE_NAME || 'unknown_service:node',
    serviceVersion: process.env.npm_package_version || '1.0.0',
    deploymentEnvironment: process.env.CONTEXT || 'development',
    siteUrl: process.env.URL || process.env.NETLIFY_URL || '',
    siteId: process.env.NETLIFY_SITE_ID || '',
    siteName: process.env.NETLIFY_SITE_NAME || '',
    spanProcessors: [getBaseSpanProcessor(), new SpanNameProcessor() as any],
    instrumentations: [new FetchInstrumentation(), new HttpInstrumentation()],
  });
}