import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.resolve("dist/client");
const port = Number(process.env.PORT ?? 5173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(urlPath) {
  const file = path.resolve(root, `.${decodeURIComponent(urlPath)}`);

  // Never serve files outside dist/client.
  if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
    return null;
  }

  // Mirror Vercel's static resolution: /docs/introduction -> /docs/introduction/index.html
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    return path.join(file, "index.html");
  }

  // /docs/introduction.html -> /docs/introduction
  if (!fs.existsSync(file) && fs.existsSync(`${file}.html`)) {
    return `${file}.html`;
  }

  return file;
}

function sendFile(res, file, status = 200) {
  res.writeHead(status, {
    "content-type":
      contentTypes[path.extname(file)] ?? "application/octet-stream",
  });
  fs.createReadStream(file).pipe(res);
}

http
  .createServer((req, res) => {
    const url = new URL(req.url ?? "/", `http://localhost:${port}`);
    const file = resolveFile(url.pathname);

    if (file && fs.existsSync(file) && fs.statSync(file).isFile()) {
      sendFile(res, file);
      return;
    }

    // Unknown paths hydrate the client-side 404 route.
    sendFile(res, path.join(root, "__spa-fallback.html"));
  })
  .listen(port, () => {
    console.log(`Previewing dist/client at http://localhost:${port}`);
  });
