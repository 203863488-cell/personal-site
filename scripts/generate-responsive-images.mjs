import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve("public/images");
const outputDirectory = path.join(sourceDirectory, "generated");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const widths = [480, 960];
const closingImageName = "ed3b9c61-6574-47e7-9f1f-f1a1d9248eb8.png";
const closingImageWidths = [960, 1672, 2560];

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

await Promise.all(
  closingImageWidths.map((width) =>
    sharp(path.join(sourceDirectory, closingImageName))
      .rotate()
      .resize({ width, kernel: sharp.kernel.lanczos3 })
      .sharpen({ sigma: 0.7 })
      .webp({ quality: 92, effort: 6, smartSubsample: true })
      .toFile(path.join(outputDirectory, `closing-visual-${width}.webp`))
  )
);

console.log(`Generated responsive WebP previews for ${sourceFiles.length} images.`);
