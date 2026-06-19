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

const sourceFiles = [
  "src/data/competitionProjects.ts",
  "src/data/personalProjects.ts",
  "src/data/siteCopy.ts"
];
const sourceText = (await Promise.all(sourceFiles.map((file) => readFile(path.resolve(file), "utf8")))).join("\n");

for (const forbiddenPlaceholder of ["example@email.com", "Resume Placeholder"]) {
  if (sourceText.includes(forbiddenPlaceholder) || indexHtml.includes(forbiddenPlaceholder)) {
    throw new Error(`Placeholder content is still present: ${forbiddenPlaceholder}`);
  }
}

const projectIds = [
  ...sourceText.matchAll(/\bid:\s*"([^"]+)"[\s\S]{0,80}\bcategory:\s*"(?:competition|personal)"/g)
].map((match) => match[1]);

if (projectIds.length !== new Set(projectIds).size) {
  throw new Error("Project IDs must be unique.");
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

const resumeStats = await stat(path.resolve("dist/resume.pdf"));
if (resumeStats.size < 100_000) {
  throw new Error("dist/resume.pdf appears to be a placeholder or incomplete file.");
}

console.log("Distribution verification passed.");
