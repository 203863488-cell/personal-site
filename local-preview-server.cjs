const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname);
const prefix = "/personal-site";
const port = Number(process.argv[2] || 4173);

const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function send(res, filePath) {
  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const contentType = mime[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, {
      "cache-control": "no-store",
      "content-type": contentType,
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
  } catch {
    res.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    res.end("Bad request");
    return;
  }

  if (pathname === "/") {
    res.writeHead(302, { location: `${prefix}/` });
    res.end();
    return;
  }

  if (pathname === prefix) {
    pathname = `${prefix}/`;
  }

  if (!pathname.startsWith(`${prefix}/`)) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  let relativePath = pathname.slice(prefix.length);
  if (relativePath === "/" || relativePath === "") {
    relativePath = "/index.html";
  }

  const filePath = path.resolve(root, `.${relativePath}`);
  if (!(filePath === root || filePath.startsWith(`${root}${path.sep}`))) {
    res.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stat) => {
    if (!error && stat.isFile()) {
      send(res, filePath);
      return;
    }

    if ((req.headers.accept || "").includes("text/html")) {
      send(res, path.join(root, "index.html"));
      return;
    }

    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Local preview: http://127.0.0.1:${port}${prefix}/`);
});
