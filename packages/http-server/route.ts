import { Http } from './type';
import path from 'node:path';
import glob from 'fast-glob';

import { interopDefault } from './utils';

export class HttpRoute {
  #routes: Map<string, Http.RequestHandler> = new Map();

  async update(root: string) {
    this.#routes.clear();
    const routes = await glob(path.join(root, '*.js'));

    for (const route of routes) {
      if (!Buffer.isBuffer(route)) {
        const handler = interopDefault(await import(route));
        this.add(path.basename(route, '.js'), handler);
      }
    }
  }

  async run(req: Http.Request, res: Http.Response) {
    const route = req.url?.split('/').pop() ?? '/';
    const handler = this.#routes.get(route);

    if (handler) {
      await handler(req, res);
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
