import { ArrowLeft, FileText } from "lucide-react";
import { useLanguage } from "../languageContext";
import { AppRoutes } from "../routes/AppRoutes";
import { assetUrl } from "../utils/assetUrl";
import { PresentationPage } from "./PresentationPage";
import "./presentation.css";

export function TouchExperience({ route, onExit, onOpenProject }: {
  route: string; onExit: () => void; onOpenProject: () => void;
}) {
  const { language } = useLanguage();
  const zh = language === "zh";
  return <div className="touch-experience">
    {route === "/" || route === "/present" ? <PresentationPage onExit={onExit} onOpenProject={onOpenProject} /> : <>
      <header className="touch-detail-header">
        <a href="#/present"><ArrowLeft size={18} aria-hidden="true" />{zh ? "返回演示" : "Back to presentation"}</a>
        <span>{zh ? "蓝宏涛 · 电源硬件研发作品集" : "Hongtao Lan · Power hardware portfolio"}</span>
        <a href={assetUrl("resume.pdf")} target="_blank" rel="noopener noreferrer"><FileText size={17} aria-hidden="true" />{zh ? "简历" : "Resume"}</a>
      </header>
      <main><AppRoutes route={route} presentationMode /></main>
    </>}
  </div>;
}
