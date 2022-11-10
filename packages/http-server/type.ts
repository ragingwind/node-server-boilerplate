import * as http from 'node:http';

export namespace Http {
  export type ServerOptions = {
    routeRoot: string;
    params?: Record<string, any>;
  };

  export class Request extends http.IncomingMessage {}

  export class Response extends http.ServerResponse {}

  export class Server extends http.Server {}

  export type RequestHandler = (
    req: Request,
    res: Response,
    options?: ServerOptions
  ) => Promise<Response>;
}
