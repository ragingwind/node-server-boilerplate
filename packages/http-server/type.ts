import * as http from 'node:http';

export namespace Http {
  export class Request extends http.IncomingMessage {}

  export class Response extends http.ServerResponse {}

  export class Server extends http.Server {}

  export type RequestHandler = (
    req: Request,
    res: Response
  ) => Promise<Response>;
}
