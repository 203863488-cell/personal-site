import assert from "node:assert/strict";
import { createHash, webcrypto } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { isPresentationDevice, swipeDirection } from "../src/presentation/interaction.ts";

test("phone and tablet activation leaves a mouse-driven desktop unchanged", () => {
  assert.equal(isPresentationDevice(true, 1152, 720), true);
  assert.equal(isPresentationDevice(true, 1280, 800), true);
  assert.equal(isPresentationDevice(true, 393, 852), true);
  assert.equal(isPresentationDevice(true, 915, 412), false);
  assert.equal(isPresentationDevice(true, 800, 1280), false);
  for (const [width, height] of [[393, 852], [1152, 720], [1440, 900]]) {
    assert.equal(isPresentationDevice(false, width, height), false);
  }
});

test("horizontal swipes turn one page while taps and vertical reading do not", () => {
  const start = { x: 500, y: 250, time: 0 };
  assert.equal(swipeDirection(start, { x: 240, y: 270, time: 400 }, 1152), 1);
  assert.equal(swipeDirection(start, { x: 730, y: 220, time: 400 }, 1152), -1);
  assert.equal(swipeDirection(start, { x: 500, y: 250, time: 100 }, 393), 0);
  assert.equal(swipeDirection(start, { x: 465, y: 252, time: 300 }, 393), 0);
  assert.equal(swipeDirection(start, { x: 390, y: 560, time: 500 }, 393), 0);
  assert.equal(swipeDirection(start, { x: 220, y: 255, time: 2200 }, 1152), 0);
});

const workerSource = (await readFile(new URL("../public/sw.js", import.meta.url), "utf8")).replaceAll("__PORTFOLIO_BUILD__", "test-build");
const base = "https://portfolio.test/personal-site/";

class MemoryCache {
  entries = new Map();
  key(request) { return typeof request === "string" ? request : request.url; }
  async put(request, response) { this.entries.set(this.key(request), response.clone()); }
  async match(request) { return this.entries.get(this.key(request))?.clone(); }
  async delete(request) { return this.entries.delete(this.key(request)); }
  async keys() { return [...this.entries.keys()].map(url => new Request(url)); }
}

function workerHarness() {
  const files = new Map([
    ["index.html", '<html><script src="/personal-site/assets/main.js"></script></html>'],
    ["assets/main.js", "/* main module */"],
    ["assets/detail.js", "/* lazy-loaded detail module */"],
    ["assets/style.css", "body { color: black; }"],
    ["images/board.jpg", "full resolution engineering image"],
    ["images/generated/board-480.webp", "preview image"],
    ["resume.pdf", "%PDF-1.7 resume contents"]
  ]);
  const manifest = {
    version: "test-build",
    bytes: [...files.values()].reduce((sum, content) => sum + Buffer.byteLength(content), 0),
    files: [...files].map(([path, content]) => ({ path, bytes: Buffer.byteLength(content), sha256: createHash("sha256").update(content).digest("hex") }))
  };
  const responses = new Map([...files].map(([path, body]) => [base + path, body]));
  responses.set(base, files.get("index.html"));
  responses.set(base + "offline-manifest.json", JSON.stringify(manifest));
  const stores = new Map();
  const listeners = {};
  const env = { offline: false, failing: new Set(), corrupt: new Set(), fetches: [] };
  const storage = {
    async open(name) { if (!stores.has(name)) stores.set(name, new MemoryCache()); return stores.get(name); },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); }
  };
  const context = vm.createContext({
    URL, Request, Response, AbortController, setTimeout, clearTimeout, Uint8Array,
    crypto: webcrypto, caches: storage,
    self: {
      registration: { scope: base }, location: { origin: new URL(base).origin },
      navigator: { get onLine() { return !env.offline; } },
      clients: { claim: async () => {} }, skipWaiting() {},
      addEventListener(type, handler) { listeners[type] = handler; }
    },
    fetch: async request => {
      const url = typeof request === "string" ? request : request.url;
      env.fetches.push(url);
      if (env.offline) throw new Error("network unavailable");
      if (env.failing.has(url)) return new Response("unavailable", { status: 503 });
      if (env.corrupt.has(url)) return new Response("placeholder instead of asset");
      if (!responses.has(url)) return new Response("not found", { status: 404 });
      return new Response(responses.get(url));
    }
  });
  vm.runInContext(workerSource, context);
  return {
    ...env, env, stores, storage, responses, manifest,
    async install() {
      let pending;
      listeners.install({ waitUntil(promise) { pending = promise; } });
      await pending;
    },
    async message(type) {
      let pending;
      const messages = [];
      listeners.message({ data: { type }, ports: [{ postMessage(message) { messages.push(message); } }], waitUntil(promise) { pending = promise; } });
      await pending;
      return messages;
    },
    async resource(path, destination, mode = "cors") {
      let response;
      const url = new URL(path, base).href;
      listeners.fetch({ request: { method: "GET", url, destination, mode }, respondWith(result) { response = result; } });
      return await response;
    }
  };
}

test("offline preparation makes lazy project pages, originals and the PDF available without network", async () => {
  const harness = workerHarness();
  await harness.install();
  const messages = await harness.message("PREPARE_OFFLINE");
  assert.equal(messages.at(-1).type, "complete");
  assert.equal(messages.at(-1).completed, harness.manifest.files.length);
  harness.env.offline = true;
  assert.equal((await harness.message("OFFLINE_STATUS")).at(-1).ready, true);
  assert.match(await (await harness.resource("assets/detail.js", "script")).text(), /detail module/);
  assert.match(await (await harness.resource("assets/style.css", "style")).text(), /color: black/);
  assert.match(await (await harness.resource("images/board.jpg", "image")).text(), /full resolution/);
  assert.match(await (await harness.resource("resume.pdf", "document", "navigate")).text(), /^%PDF/);
  assert.match(await (await harness.resource("./", "document", "navigate")).text(), /main.js/);
});

test("a failed download cannot mark the presentation ready and retry reuses verified files", async () => {
  const harness = workerHarness();
  await harness.install();
  const failedUrl = base + "resume.pdf";
  harness.env.failing.add(failedUrl);
  assert.equal((await harness.message("PREPARE_OFFLINE")).at(-1).type, "error");
  assert.equal((await harness.message("OFFLINE_STATUS")).at(-1).ready, false);
  const downloadedOriginals = harness.env.fetches.filter(url => url === base + "images/board.jpg").length;
  harness.env.failing.clear();
  assert.equal((await harness.message("PREPARE_OFFLINE")).at(-1).type, "complete");
  assert.equal(harness.env.fetches.filter(url => url === base + "images/board.jpg").length, downloadedOriginals);
});

test("an HTTP 200 placeholder is rejected when its digest does not match the real image", async () => {
  const harness = workerHarness();
  await harness.install();
  harness.env.corrupt.add(base + "images/board.jpg");
  assert.equal((await harness.message("PREPARE_OFFLINE")).at(-1).type, "error");
  assert.equal((await harness.message("OFFLINE_STATUS")).at(-1).ready, false);
});

test("a missing cached file invalidates a previous offline completion", async () => {
  const harness = workerHarness();
  await harness.install();
  await harness.message("PREPARE_OFFLINE");
  const pack = await harness.storage.open("portfolio-offline-test-build");
  await pack.delete(base + "assets/detail.js");
  assert.equal((await harness.message("OFFLINE_STATUS")).at(-1).ready, false);
});

test("temporary server errors fall back to the saved page instead of returning an error document", async () => {
  const harness = workerHarness();
  await harness.install();
  harness.env.failing.add(base);
  assert.match(await (await harness.resource("./", "document", "navigate")).text(), /main.js/);
});
