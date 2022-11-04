import path from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-ignore
import request from 'supertest';

import { HttpServer } from '../server';

const routeRoot = path.resolve('./tests/fixtures/api');

it('should return server instance', async () => {
  const server = await HttpServer.create({ routeRoot });
  const res = await request(server.get()).get('/hello');

  expect(res.text).toBeDefined();
});
