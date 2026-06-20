import { assetUrl } from "./assetUrl";

export interface ResponsiveImageSources {
  original: string;
  srcSet: string;
}

const CLOSING_VISUAL_PATH = "images/ed3b9c61-6574-47e7-9f1f-f1a1d9248eb8.png";

export function responsiveImageSources(imagePath: string): ResponsiveImageSources {
  const normalizedPath = imagePath.replace(/^\/+/, "");

  if (normalizedPath === CLOSING_VISUAL_PATH) {
    return {
      original: assetUrl(normalizedPath),
      srcSet: [
        `${assetUrl("images/generated/closing-visual-960.webp")} 960w`,
        `${assetUrl("images/generated/closing-visual-1672.webp")} 1672w`,
        `${assetUrl("images/generated/closing-visual-2560.webp")} 2560w`
      ].join(", ")
    };
  }

  const fileName = normalizedPath.split("/").at(-1) ?? normalizedPath;
  const fileStem = fileName.replace(/\.[^.]+$/, "");

  return {
    original: assetUrl(normalizedPath),
    srcSet: [
      `${assetUrl(`images/generated/${fileStem}-480.webp`)} 480w`,
      `${assetUrl(`images/generated/${fileStem}-960.webp`)} 960w`
    ].join(", ")
  };
}
