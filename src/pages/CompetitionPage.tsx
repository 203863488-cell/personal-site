import { projectCollections } from "../data/projectCatalog";
import { ProjectCollectionPage } from "./ProjectCollectionPage";

export function CompetitionPage() {
  return <ProjectCollectionPage pageKey="competition" projects={projectCollections.competition} />;
}
