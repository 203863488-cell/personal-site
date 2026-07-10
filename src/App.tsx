import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { BackgroundLines } from "./components/BackgroundLines";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useHashRoute } from "./hooks/useHashRoute";
import { LanguageProvider } from "./i18n";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const route = useHashRoute();

  return (
    <LanguageProvider>
      <AppErrorBoundary>
        <div className="min-h-screen overflow-x-hidden bg-[#F8FAF7] text-[#1F2933] antialiased">
          <BackgroundLines />
          <Navbar currentRoute={route} />
          <main className="relative z-10">
            <AppRoutes route={route} />
          </main>
          <Footer />
        </div>
      </AppErrorBoundary>
    </LanguageProvider>
  );
}

export default App;
