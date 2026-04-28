export interface AbilityItem {
  title: string;
  description: string;
  points: string[];
  accent: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectDetailBlock {
  title: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  status: "设计中" | "已打板" | "已焊接" | "调试中" | "已验证";
  tags: string[];
  metrics: ProjectMetric[];
  background: string;
  role: string[];
  indicators: string[];
  designPoints: string[];
  verification: string[];
  issues: string[];
  nextSteps: string[];
  diagramTitle: string;
  schematicTitle: string;
  hardwareTitle: string;
  waveformTitle: string;
}

export interface SkillGroup {
  title: string;
  summary: string;
  skills: { name: string; level: string }[];
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
  category: string;
}

export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  tags: string[];
  dashboard: {
    label: string;
    value: string;
  }[];
}
