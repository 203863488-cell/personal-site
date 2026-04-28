import { useEffect, useState } from "react";

function getHashRoute() {
  const route = window.location.hash.replace(/^#/, "");
  return route || "/";
}

export function useHashRoute() {
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

  return route;
}
