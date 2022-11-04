export default function handler(req, res) {
  const body = 'hello from hello.js';
  res
    .writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/plain'
    })
    .end(body);
}