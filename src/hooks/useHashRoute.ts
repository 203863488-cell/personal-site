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
      window.requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  return route;
}
