export type ProjectCategory = "competition" | "personal";

export interface PortfolioMetric {
  label: string;
  value: string;
}

export interface PortfolioProject {
  id: string;
  category: ProjectCategory;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  tags: string[];
  status: string;
  goal: string;
  responsibilities: string[];
  metrics: PortfolioMetric[];
  diagramTitle: string;
  diagramNodes: string[];
  designPoints: string[];
  progress: string;
  validation: string[];
  improvements: string[];
}
