export default function handler(req: any, res: any) {
  const body = 'echo from node server';
  res
    .writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/plain',
    })
    .end(body);
}
