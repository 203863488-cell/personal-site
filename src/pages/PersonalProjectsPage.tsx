import { projectCollections } from "../data/projectCatalog";
import { ProjectCollectionPage } from "./ProjectCollectionPage";

export function PersonalProjectsPage() {
  return <ProjectCollectionPage pageKey="personal" projects={projectCollections.personal} />;
}
