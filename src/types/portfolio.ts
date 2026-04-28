export type ProjectCategory = "competition" | "personal";

export interface PortfolioMetric {
  label: string;
  value: string;
}

export interface PortfolioImage {
  src: string;
  title: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  category: ProjectCategory;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  detailImages?: PortfolioImage[];
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
