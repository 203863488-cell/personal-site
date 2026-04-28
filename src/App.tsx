import { BackgroundLines } from "./components/BackgroundLines";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useHashRoute } from "./hooks/useHashRoute";
import { LanguageProvider } from "./i18n";
import { CompetitionPage } from "./pages/CompetitionPage";
import { HomePage } from "./pages/HomePage";
import { PersonalProjectsPage } from "./pages/PersonalProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

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
      <div className="min-h-screen overflow-x-hidden bg-[#F8FAF7] text-[#1F2933] antialiased">
        <BackgroundLines />
        <Navbar currentRoute={route} />
        <main className="relative z-10">{renderPage()}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
