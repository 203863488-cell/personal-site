import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgPage = repositoryName?.endsWith(".github.io");

const base = process.env.VITE_BASE ?? (
  repositoryName ? (isUserOrOrgPage ? "/" : `/${repositoryName}/`) : "./"
);

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
