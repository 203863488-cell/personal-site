export type ProjectCategory = "competition" | "personal";

export interface PortfolioMetric {
  label: string;
  value: string;
  kind?: "design" | "measured";
}

export interface PortfolioTechnicalParameter extends PortfolioMetric {
  note?: string;
}

export type PortfolioImageKind = "prototype" | "schematic" | "waveform" | "test" | "software";

export interface PortfolioImage {
  src: string;
  title: string;
  description: string;
  kind: PortfolioImageKind;
}

export interface PortfolioLink {
  label: string;
  href: string;
}

export interface PortfolioQuickOverview {
  objective: string;
  challenge: string;
  contribution: string;
  outcome: string;
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
  quickOverview: PortfolioQuickOverview;
  responsibilities: string[];
  metrics: PortfolioMetric[];
  keyComponents?: PortfolioTechnicalParameter[];
  operatingPrinciples?: string[];
  engineeringHighlights?: string[];
  diagramTitle: string;
  diagramNodes: string[];
  designPoints: string[];
  progress: string;
  validation: string[];
  improvements: string[];
  links?: PortfolioLink[];
}
