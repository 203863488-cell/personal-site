import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve("public/images");
const outputDirectory = path.join(sourceDirectory, "generated");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const widths = [480, 960];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const sourceFiles = (await readdir(sourceDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name);

await Promise.all(
  sourceFiles.flatMap((fileName) => {
    const sourcePath = path.join(sourceDirectory, fileName);
    const fileStem = path.parse(fileName).name;

    return widths.map((width) =>
      sharp(sourcePath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(path.join(outputDirectory, `${fileStem}-${width}.webp`))
    );
  })
);

console.log(`Generated responsive WebP previews for ${sourceFiles.length} images.`);
