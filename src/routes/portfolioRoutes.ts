import type { ProjectCategory } from "../types/portfolio";

/**
 * Central route contract for the hash-based portfolio.
 *
 * GitHub Pages serves this app as a static site, so every in-app page is kept
 * behind `#...`. New pages should extend this file first, then wire data and UI
 * around the route instead of scattering string literals through components.
 */
export const portfolioRoutes = {
  home: "/",
  competition: "/competition",
  personal: "/personal",
  contact: "/contact",
  projectPrefix: "/project/"
} as const;

export const portfolioHrefs = {
  home: "#/",
  competition: "#/competition",
  personal: "#/personal",
  contact: "#/contact"
} as const;

const categoryHrefs: Record<ProjectCategory, string> = {
  competition: portfolioHrefs.competition,
  personal: portfolioHrefs.personal
};

export function getProjectHref(projectId: string) {
  return `#${portfolioRoutes.projectPrefix}${encodeURIComponent(projectId)}`;
}

export function getCategoryHref(category: ProjectCategory) {
  return categoryHrefs[category];
}

export function getProjectIdFromRoute(route: string) {
  if (!route.startsWith(portfolioRoutes.projectPrefix)) {
    return null;
  }

  const encodedId = route.slice(portfolioRoutes.projectPrefix.length);

  try {
    return decodeURIComponent(encodedId);
  } catch {
    return encodedId;
  }
}
