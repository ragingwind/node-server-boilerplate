import { Http } from './type';
import path from 'node:path';
import glob from 'fast-glob';

import { interopDefault } from './utils';

export class HttpRoute {
  #routes: Map<string, Http.RequestHandler> = new Map();

  async update(root: string) {
    this.#routes.clear();
    const routes = await glob(path.join(root, '*.ts'));

    for (const route of routes) {
      if (!Buffer.isBuffer(route)) {
        const handler = interopDefault(await import(route));
        this.add(path.basename(route, '.ts'), handler);
      }
    }

    console.log(
      'routes',
      this.#routes,
      await glob(path.join(root, '*.ts')),
      path.join(root, '*.ts')
    );
  }

  async run(
    req: Http.Request,
    res: Http.Response,
    options?: Http.ServerOptions
  ) {
    const url = new URL(req.url ?? '', `http://${req.headers.host}`);
    const route = url.pathname?.split('/').pop() ?? '/';
    const handler = this.#routes.get(route);

    if (handler) {
      await handler(req, res, options);
    } else {
      res.writeHead(404);
      res.end();
    }
  }

  add(route: string, handler: Http.RequestHandler) {
    this.#routes.set(route, handler);
  }

  route(route: string) {
    return this.#routes.get(route);
  }
}
