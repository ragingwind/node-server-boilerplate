import { Socket } from 'node:net';
import { Http } from './type';

export async function createHttpRequest(method: string, path: string): Promise<Http.Request> {
  const request = new Http.Request(new Socket());
  request.method = method;
  request.url = path;

  return request;
}

export function createHttpResponse(req: Http.Request): Http.Response {
  return new Http.Response(req);
}

export function interopDefault(mod: any) {
  return mod && (mod.default || mod);
}

export function isResSent(res: Http.Response) {
  return res.end || res.headersSent;
}
