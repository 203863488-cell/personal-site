import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const requiredFiles = [
  "index.html",
  "resume.pdf",
  "robots.txt",
  "sitemap.xml",
  "sw.js",
  "offline-image.svg"
];

await Promise.all(requiredFiles.map((file) => access(path.resolve("dist", file))));

const indexHtml = await readFile(path.resolve("dist/index.html"), "utf8");
const requiredMarkers = [
  "203863488@qq.com",
  "og:title",
  "application/ld+json",
  "/personal-site/"
];

for (const marker of requiredMarkers) {
  if (!indexHtml.includes(marker)) {
    throw new Error(`dist/index.html is missing required marker: ${marker}`);
  }
}

const projectSourceFiles = [
  "src/data/competitionProjects.ts",
  "src/data/personalProjects.ts"
];
const projectSourceText = (await Promise.all(projectSourceFiles.map((file) => readFile(path.resolve(file), "utf8")))).join("\n");
const siteCopyText = await readFile(path.resolve("src/data/siteCopy.ts"), "utf8");
const sourceText = `${projectSourceText}\n${siteCopyText}`;

for (const marker of [
  "2026电赛电源题",
  "2026-contest-ac-ac",
  "省级二等奖",
  "PF 0.989",
  "没有参与软件代码实现",
  "images/contest-2026-three-phase-waveform.jpg",
  "100V 半桥 / 全桥功率板",
  "隔离辅助电源板",
  "engineeringHighlights",
  "images/auxiliary-power-schematic-buck.png",
  "images/full-bridge-power-schematic-main.png",
  "images/ed3b9c61-6574-47e7-9f1f-f1a1d9248eb8.png"
]) {
  if (!sourceText.includes(marker)) {
    throw new Error(`Project source is missing required marker: ${marker}`);
  }
}

for (const forbiddenPlaceholder of ["example@email.com", "Resume Placeholder"]) {
  if (sourceText.includes(forbiddenPlaceholder) || indexHtml.includes(forbiddenPlaceholder)) {
    throw new Error(`Placeholder content is still present: ${forbiddenPlaceholder}`);
  }
}

const projectIds = [
  ...projectSourceText.matchAll(/\bid:\s*"([^"]+)"[\s\S]{0,80}\bcategory:\s*"(?:competition|personal)"/g)
].map((match) => match[1]);

if (projectIds.length !== new Set(projectIds).size) {
  throw new Error("Project IDs must be unique.");
}

const projectQuickOverviewCount = [...projectSourceText.matchAll(/\bquickOverview:\s*\{/g)].length;
if (projectQuickOverviewCount !== projectIds.length) {
  throw new Error(`Every project must define quickOverview. Expected ${projectIds.length}, found ${projectQuickOverviewCount}.`);
}

const translationStart = siteCopyText.indexOf("const projectTranslations");
const translationText = translationStart >= 0 ? siteCopyText.slice(translationStart) : "";
const translatedQuickOverviewCount = [...translationText.matchAll(/\bquickOverview:\s*\{/g)].length;
if (translatedQuickOverviewCount !== projectIds.length) {
  throw new Error(`Every English project translation must define quickOverview. Expected ${projectIds.length}, found ${translatedQuickOverviewCount}.`);
}

const allowedImageKinds = new Set(["prototype", "schematic", "waveform", "test", "software"]);
for (const [label, text] of [["project", projectSourceText], ["translated project", translationText]]) {
  const imageCount = [...text.matchAll(/\bsrc:\s*"images\/[^"]+"/g)].length;
  const imageKinds = [...text.matchAll(/\bsrc:\s*"images\/[^"]+"[\s\S]{0,600}?\bkind:\s*"([^"]+)"/g)].map((match) => match[1]);

  if (imageKinds.length !== imageCount) {
    throw new Error(`Every ${label} detail image must define a kind. Expected ${imageCount}, found ${imageKinds.length}.`);
  }

  const invalidKind = imageKinds.find((kind) => !allowedImageKinds.has(kind));
  if (invalidKind) {
    throw new Error(`Invalid project image kind: ${invalidKind}`);
  }
}

const projectLinks = [...projectSourceText.matchAll(/\bhref:\s*"([^"]+)"/g)].map((match) => match[1]);
for (const href of projectLinks) {
  const url = new URL(href);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(`Project link must use HTTP(S): ${href}`);
  }
}

const shareDialogSource = await readFile(path.resolve("src/components/ui/ShareQrDialog.tsx"), "utf8");
if (!shareDialogSource.includes("window.location.href")) {
  throw new Error("QR sharing must encode the current page URL.");
}

const deletedProjectId = ["competition", "interface", "strategy"].join("-");
if (sourceText.includes(deletedProjectId)) {
  throw new Error(`Deleted project ID is still referenced: ${deletedProjectId}`);
}

for (const projectId of ["2026-contest-ac-ac", "half-bridge-llc", "totem-pole-pfc", "flyback"]) {
  if (!siteCopyText.includes(`href: "#/project/${projectId}"`)) {
    throw new Error(`Homepage evidence card is missing project link: ${projectId}`);
  }
}

const contestImageNames = [
  "contest-2026-system-bench.jpg",
  "contest-2026-pfc-power-meter.jpg",
  "contest-2026-three-phase-waveform.jpg",
  "contest-2026-system-waveform-bench.jpg",
  "contest-2026-mains-test-setup.jpg"
];

await Promise.all(
  contestImageNames.flatMap((fileName) => {
    const fileStem = path.parse(fileName).name;
    return [
      access(path.resolve("public/images", fileName)),
      access(path.resolve("public/images/generated", `${fileStem}-480.webp`)),
      access(path.resolve("public/images/generated", `${fileStem}-960.webp`))
    ];
  })
);

const publicFileNames = await readdir(path.resolve("public"), { recursive: true });
for (const privateSourceName of [
  "A题_AC-AC变换电路(1).pdf",
  "codex-clipboard-5566bdeb-af5d-4bbc-885f-69eff45e9cd7.png",
  "codex-clipboard-b87de873-1cb9-488a-a604-576d314f10ba.png",
  "codex-clipboard-1926f4e3-d6ba-48af-8b63-e19ced108559.png"
]) {
  if (publicFileNames.some((fileName) => fileName.endsWith(privateSourceName))) {
    throw new Error(`Private reference file must not be published: ${privateSourceName}`);
  }
}

const capabilityImages = [
  "capability-calculation.jpg",
  "capability-magnetics.jpg",
  "capability-pcb-layout.jpg",
  "capability-stm32g4-control.jpg",
  "capability-closed-loop-debug.jpg",
  "capability-test-record.jpg"
];

const serviceWorkerText = await readFile(path.resolve("public/sw.js"), "utf8");
if (!serviceWorkerText.includes('CACHE_NAME = "portfolio-source-v20260807-1"')) {
  throw new Error("Service worker cache version must be bumped for the current deployment.");
}

if (!serviceWorkerText.includes("networkFirstNavigation")) {
  throw new Error("Service worker navigation must prefer fresh network content before cached app shell.");
}

if (!serviceWorkerText.includes("ignoreVary: true")) {
  throw new Error("Service worker cache matching must tolerate Vary differences for offline module requests.");
}

await Promise.all(
  capabilityImages.flatMap((fileName) => {
    if (!siteCopyText.includes(`images/${fileName}`)) {
      throw new Error(`Capability image is not referenced by homepage copy: ${fileName}`);
    }

    if (!serviceWorkerText.includes(`images/generated/${path.parse(fileName).name}-480.webp`)) {
      throw new Error(`Capability image is not precached for weak networks: ${fileName}`);
    }

    const fileStem = path.parse(fileName).name;
    return [
      access(path.resolve("public/images", fileName)),
      access(path.resolve("public/images/generated", `${fileStem}-480.webp`)),
      access(path.resolve("public/images/generated", `${fileStem}-960.webp`))
    ];
  })
);

const referencedImages = new Set(
  [...sourceText.matchAll(/["`](images\/[^"`]+\.(?:jpe?g|png))["`]/gi)].map((match) => match[1])
);

await Promise.all(
  [...referencedImages].flatMap((imagePath) => {
    const fileStem = path.parse(imagePath).name;

    return [
      access(path.resolve("public", imagePath)),
      access(path.resolve("public/images/generated", `${fileStem}-480.webp`)),
      access(path.resolve("public/images/generated", `${fileStem}-960.webp`))
    ];
  })
);

await Promise.all(
  [960, 1672, 2560].map((width) =>
    access(path.resolve("public/images/generated", `closing-visual-${width}.webp`))
  )
);

const resumeStats = await stat(path.resolve("dist/resume.pdf"));
if (resumeStats.size < 100_000) {
  throw new Error("dist/resume.pdf appears to be a placeholder or incomplete file.");
}

console.log("Distribution verification passed.");
