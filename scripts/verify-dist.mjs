import { access, readFile, stat } from "node:fs/promises";
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

for (const projectId of ["half-bridge-llc", "totem-pole-pfc", "competition-interface-strategy"]) {
  if (!siteCopyText.includes(`href: "#/project/${projectId}"`)) {
    throw new Error(`Homepage evidence card is missing project link: ${projectId}`);
  }
}

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
