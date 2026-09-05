import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const paths = (await readdir(root, { recursive: true }))
  .map(file => file.replaceAll("\\", "/"))
  .filter(file => file === "index.html" || file === "resume.pdf" || file === "favicon.svg" || file === "offline-image.svg"
    || /^(assets|images)\/.*\.(js|css|woff2?|png|jpe?g|webp|svg)$/i.test(file)).sort();
const files = await Promise.all(paths.map(async file => {
  const bytes = await readFile(path.join(root, file));
  return { path: file, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") };
}));
const version = createHash("sha256").update(JSON.stringify(files)).digest("hex").slice(0, 16);
const manifest = { version, bytes: files.reduce((sum, file) => sum + file.bytes, 0), files };
await writeFile(path.join(root, "offline-manifest.json"), JSON.stringify(manifest));
const workerPath = path.join(root, "sw.js");
const worker = await readFile(workerPath, "utf8");
if (!worker.includes("__PORTFOLIO_BUILD__")) throw new Error("Missing service worker build marker.");
await writeFile(workerPath, worker.replaceAll("__PORTFOLIO_BUILD__", version));
console.log("Offline manifest: " + files.length + " files, " + (manifest.bytes / 1048576).toFixed(1) + " MB, build " + version);
