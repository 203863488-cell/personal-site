import { lazy, Suspense } from "react";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { BackgroundLines } from "./components/BackgroundLines";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useHashRoute } from "./hooks/useHashRoute";
import { LanguageProvider } from "./i18n";
import { HomePage } from "./pages/HomePage";

const CompetitionPage = lazy(() => import("./pages/CompetitionPage").then((module) => ({ default: module.CompetitionPage })));
const PersonalProjectsPage = lazy(() => import("./pages/PersonalProjectsPage").then((module) => ({ default: module.PersonalProjectsPage })));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage").then((module) => ({ default: module.ProjectDetailPage })));

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

function App() {
  const route = useHashRoute();

  const renderPage = () => {
    if (route === "/competition") {
      return <CompetitionPage />;
    }

    if (route === "/personal") {
      return <PersonalProjectsPage />;
    }

    if (route.startsWith("/project/")) {
      return <ProjectDetailPage projectId={decodeURIComponent(route.replace("/project/", ""))} />;
    }

    return <HomePage />;
  };

  return (
    <LanguageProvider>
      <AppErrorBoundary>
        <div className="min-h-screen overflow-x-hidden bg-[#F8FAF7] text-[#1F2933] antialiased">
          <BackgroundLines />
          <Navbar currentRoute={route} />
          <main className="relative z-10">
            <Suspense fallback={<PageFallback />}>{renderPage()}</Suspense>
          </main>
          <Footer />
        </div>
      </AppErrorBoundary>
    </LanguageProvider>
  );
}

export default App;
