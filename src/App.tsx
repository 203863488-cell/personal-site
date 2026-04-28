import { useState } from "react";
import { AbilityGrid } from "./components/AbilityGrid";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FeatureCarousel } from "./components/FeatureCarousel";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { PageBackground } from "./components/PageBackground";
import { ProjectSection } from "./components/ProjectSection";
import { SkillMatrix } from "./components/SkillMatrix";
import { Timeline } from "./components/Timeline";
import { PortfolioGateway } from "./components/PortfolioGateway";
import type { Language } from "./types/language";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("totem-pole-pfc");
  const [language, setLanguage] = useState<Language>("zh");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAF7] text-[#1F2933] antialiased">
      <PageBackground />

      <Navbar
        open={menuOpen}
        language={language}
        onToggle={() => setMenuOpen((prev) => !prev)}
        onLanguageToggle={() => setLanguage((current) => (current === "zh" ? "en" : "zh"))}
      />

      <main className="relative z-10">
        <FeatureCarousel language={language} />
        <PortfolioGateway language={language} />
        <Hero language={language} />
        <AbilityGrid language={language} />
        <ProjectSection language={language} selectedProjectId={selectedProjectId} onSelectProject={setSelectedProjectId} />
        <SkillMatrix language={language} />
        <Timeline language={language} />
        <Contact language={language} />
      </main>

      <Footer language={language} />
    </div>
  );
}

export default App;
