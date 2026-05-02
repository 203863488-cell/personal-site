import { lazy, Suspense, type ReactNode } from "react";
import { HomePage } from "../pages/HomePage";
import { getProjectIdFromRoute, portfolioRoutes } from "./portfolioRoutes";

const CompetitionPage = lazy(() => import("../pages/CompetitionPage").then((module) => ({ default: module.CompetitionPage })));
const PersonalProjectsPage = lazy(() => import("../pages/PersonalProjectsPage").then((module) => ({ default: module.PersonalProjectsPage })));
const ProjectDetailPage = lazy(() => import("../pages/ProjectDetailPage").then((module) => ({ default: module.ProjectDetailPage })));

interface AppRoutesProps {
  route: string;
}

function PageFallback() {
  return (
    <div className="section-shell min-h-[50vh] pt-32">
      <div className="paper-card p-8">
        <p className="section-kicker">Loading</p>
        <p className="mt-4 text-sm text-[#5D6673]">正在加载页面内容...</p>
      </div>
    </div>
  );
}

function resolveRoute(route: string): ReactNode {
  if (route === portfolioRoutes.competition) {
    return <CompetitionPage />;
  }

  if (route === portfolioRoutes.personal) {
    return <PersonalProjectsPage />;
  }

  const projectId = getProjectIdFromRoute(route);

  if (projectId !== null) {
    return <ProjectDetailPage projectId={projectId} />;
  }

  return <HomePage />;
}

/**
 * Routing stays isolated from the app chrome so future pages can be added by
 * editing route definitions here, without touching providers, nav, or footer.
 */
export function AppRoutes({ route }: AppRoutesProps) {
  return <Suspense fallback={<PageFallback />}>{resolveRoute(route)}</Suspense>;
}
