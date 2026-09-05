import { lazy, Suspense, useState } from "react";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { BackgroundLines } from "./components/BackgroundLines";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useHashRoute } from "./hooks/useHashRoute";
import { LanguageProvider } from "./i18n";
import { AppRoutes } from "./routes/AppRoutes";
import { usePresentationDevice } from "./presentation/usePresentationDevice";
import { readSession, writeSession } from "./presentation/interaction";

const TouchExperience = lazy(() => import("./presentation/TouchExperience").then(module => ({ default: module.TouchExperience })));

function App() {
  const route = useHashRoute();
  const presentationDevice = usePresentationDevice();
  const [ordinary, setOrdinary] = useState(() => readSession("portfolio-ordinary-browsing") === "true");
  const [presentationSession, setPresentationSession] = useState(false);
  const showPresentation = route === "/present" || presentationSession || (presentationDevice && !ordinary);

  const exitPresentation = () => {
    writeSession("portfolio-ordinary-browsing", "true");
    setOrdinary(true);
    setPresentationSession(false);
    window.location.hash = "/";
  };

  return (
    <LanguageProvider>
      <AppErrorBoundary>
        {showPresentation ? (
          <Suspense fallback={<div className="section-shell pt-16" role="status">正在打开演示 · Loading presentation…</div>}>
            <TouchExperience route={route} onExit={exitPresentation} onOpenProject={() => setPresentationSession(true)} />
          </Suspense>
        ) : (
        <div className="min-h-screen overflow-x-hidden bg-[#F8FAF7] text-[#1F2933] antialiased">
          <BackgroundLines />
          <Navbar currentRoute={route} />
          <main className="relative z-10">
            <AppRoutes route={route} />
          </main>
          <Footer />
          {presentationDevice && <button className="fixed bottom-5 right-5 z-40 rounded-full bg-[#1F2933] px-5 py-3 text-sm text-white shadow-xl" onClick={() => {
            writeSession("portfolio-ordinary-browsing", "false");
            setOrdinary(false);
            window.location.hash = "/present";
          }}>演示模式 / Present</button>}
        </div>
        )}
      </AppErrorBoundary>
    </LanguageProvider>
  );
}

export default App;
