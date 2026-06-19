import { assetUrl } from "./assetUrl";

export interface ResponsiveImageSources {
  original: string;
  srcSet: string;
}

export function responsiveImageSources(imagePath: string): ResponsiveImageSources {
  const normalizedPath = imagePath.replace(/^\/+/, "");
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
