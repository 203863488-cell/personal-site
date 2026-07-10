import type { PortfolioProject, ProjectCategory } from "../types/portfolio";
import { allProjects } from "./allProjects";
import { competitionProjects } from "./competitionProjects";
import { personalProjects } from "./personalProjects";

/**
 * Single catalog boundary for project data.
 *
 * Page components should depend on this module instead of knowing how project
 * arrays are assembled. Adding a new collection then becomes a data/catalog
 * change first, with routing and UI connected separately.
 */
export const projectCollections: Record<ProjectCategory, PortfolioProject[]> = {
  competition: competitionProjects,
  personal: personalProjects
};

export function findProjectById(projectId: string) {
  return allProjects.find((project) => project.id === projectId);
}
