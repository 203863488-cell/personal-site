import { useEffect, useState } from "react";
import { portfolioRoutes } from "../routes/portfolioRoutes";

function getHashRoute() {
  const route = window.location.hash.replace(/^#/, "");
  return route || portfolioRoutes.home;
}

export function useHashRoute() {
  const [route, setRoute] = useState(getHashRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(getHashRoute());

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (route === portfolioRoutes.contact) {
      const alignContactSection = () => {
        const contactSection = document.getElementById("contact");
        if (!contactSection) {
          return;
        }

        const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
        const targetTop = window.scrollY + contactSection.getBoundingClientRect().top - headerHeight - 16;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
      };

      const frameId = window.requestAnimationFrame(alignContactSection);
      const settleTimer = window.setTimeout(alignContactSection, 300);
      const contentVisibilityTimer = window.setTimeout(alignContactSection, 900);

      return () => {
        window.cancelAnimationFrame(frameId);
        window.clearTimeout(settleTimer);
        window.clearTimeout(contentVisibilityTimer);
      };
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  return route;
}
