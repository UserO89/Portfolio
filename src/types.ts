export const categories = [
  "AI & LLM Systems",
  "Data & Databases",
  "Backend & APIs",
  "Frontend Development",
  "Quality Assurance & Testing",
  "DevOps & Developer Tools",
  "Engineering & Delivery",
] as const;
export const statuses = ["Practiced", "Studied", "Exploring"] as const;
export type Category = (typeof categories)[number];
export type SkillStatus = (typeof statuses)[number];
export const statusDetails = {
  Practiced: {
    label: "Practical experience",
    description: "Experienced through practical use in projects or work.",
    contextTitle: "PRACTICAL EXPERIENCE",
  },
  Studied: {
    label: "Studied / Knowledge",
    description:
      "Studied the topic and have knowledge of its concepts and use.",
    contextTitle: "KNOWLEDGE & CONTEXT",
  },
  Exploring: {
    label: "Studying / Exploring",
    description: "Currently studying, learning, or exploring the topic.",
    contextTitle: "LEARNING & CONTEXT",
  },
} satisfies Record<
  SkillStatus,
  { label: string; description: string; contextTitle: string }
>;
export type ProjectId = `project.${string}`;
export type ExperienceId = `experience.${string}`;
export type EvidenceId = ProjectId | ExperienceId;
export interface Skill {
  id: string;
  name: string;
  category: Category;
  status: SkillStatus;
  evidence: EvidenceId[];
  evidenceState?: "linked" | "unlinked";
  evidenceNote?: string;
  explanation: string;
}
export interface Evidence {
  id: EvidenceId;
  name: string;
  shortName: string;
  anchor: string;
  kind: "project" | "experience";
}
export interface Project extends Evidence {
  id: ProjectId;
  kind: "project";
  number: string;
  category: string;
  status: string;
  expectedCompletion?: string;
  role: string;
  summary: string;
  objective: string;
  contribution: string;
  technical: string[];
  lesson: string;
  boundary: string;
  repositoryStatus: string;
}
