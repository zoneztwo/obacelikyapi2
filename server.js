const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Hostinger/Passenger icin NODE_ENV'i zorla production yap
process.env.NODE_ENV = 'production';

const dev = false;
const hostname = undefined;
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Next.js'in tüm istekleri (statik dosyalar dahil) işlemesine izin ver
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
