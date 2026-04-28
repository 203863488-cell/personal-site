import { useEffect, useState } from "react";
import { BackgroundLines } from "./components/BackgroundLines";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CompetitionPage } from "./pages/CompetitionPage";
import { HomePage } from "./pages/HomePage";
import { PersonalProjectsPage } from "./pages/PersonalProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

function getHashRoute() {
  const route = window.location.hash.replace(/^#/, "");
  return route || "/";
}

function App() {
  const [route, setRoute] = useState(getHashRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(getHashRoute());

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (route === "/contact") {
      window.requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

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
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAF7] text-[#1F2933] antialiased">
      <BackgroundLines />
      <Navbar currentRoute={route} />
      <main className="relative z-10">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
