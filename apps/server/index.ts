import { HttpServer } from '@node-server/http-server';
import { Log } from '@node-server/logger';
import path from 'node:path';

import { fileURLToPath } from 'node:url';

// @TODO go to utils, or helper
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export function dirname(metaUrl: string) {
  return fileURLToPath(new URL('.', metaUrl));
}

const port = 8080;

const server = await HttpServer.create({
  routeRoot: path.join(dirname(import.meta.url), './api'),
});

await server.listen(port);
Log.info('server', `Server listening on port ${port}`);
