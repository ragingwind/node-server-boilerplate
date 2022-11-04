import http from 'node:http';

import { HttpRoute } from './route';
import { Http } from './type';

export type HttpServerOptions = {
  routeRoot: string;
};

export class HttpServer {
  readonly #server: Http.Server;
  readonly #options: HttpServerOptions; // @TODO improve or remove it
  readonly #routes: HttpRoute;

  constructor(options: HttpServerOptions) {
    this.#options = options;
    this.#routes = new HttpRoute();
    this.#server = http.createServer();
    this.#server.on('request', this.onRequestHandler.bind(this));
  }

  async listen(port?: number | undefined, hostname?: string | undefined) {
    return new Promise((resolve) => {
      this.#server.listen(port, hostname, () => {
        resolve(this.#server);
      });
    });
  }

  async init(root: string) {
    try {
      await this.#routes.update(root);
    } catch (e) {
      console.error('Exception while get routes', e);
    }
  }

  get() {
    return this.#server;
  }

  async onRequestHandler(req: Http.Request, res: Http.Response) {
    await this.#routes.run(req, res);
  }

  static async create(options: HttpServerOptions) {
    const server = new HttpServer(options);
    await server.init(options.routeRoot);

    return server;
  }
}
