import { HttpServer } from '@node-server/http-server';
import path from 'node:path';

// @TODO go to utils, or helper
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const port = 8080;

(async () => {
  const server = await HttpServer.create({
    routeRoot: path.join(__dirname, './api'),
  });

  await server.listen(port);
  console.log(`Listening on ${port}`);
})();
