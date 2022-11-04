import path from 'node:path';
import { expect, it } from 'vitest';

import { HttpRoute } from '../route';
import { createHttpRequest, createHttpResponse } from '../utils';

async function createMockRequest(method: string, path: string) {
  const req = await createHttpRequest(method, path);
  const res = createHttpResponse(req);

  return {
    req,
    res,
  };
}

it('should return hello route', async () => {
  const route = new HttpRoute();
  expect(route).toBeDefined();

  await route.update(path.resolve('./tests/fixtures/api'));
  expect(route.route('hello')).toBeDefined();
});

it('should response 200', async () => {
  const { req, res } = await createMockRequest('GET', '/hello');
  const route = new HttpRoute();

  await route.update(path.resolve('./tests/fixtures/api'));
  await route.run(req, res);

  expect(res.statusCode).toBe(200);
  expect(res.statusMessage).toBe('OK');
});

it('should response 404', async () => {
  const { req, res } = await createMockRequest('GET', '/no-path');
  const route = new HttpRoute();

  await route.update(path.resolve('./tests/fixtures/api'));
  await route.run(req, res);

  expect(res.statusCode).toBe(404);
});
