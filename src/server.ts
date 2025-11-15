// src/server.ts

import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const angularAppEngine = new AngularAppEngine();

/**
 * This is the main handler Netlify uses for your Angular SSR app.
 * You can optionally add custom API routes before delegating to Angular.
 */
export async function netlifyAppEngineHandler(
  request: Request,
): Promise<Response> {
  const context = getContext();

  // Example API endpoints (optional):
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * Request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
