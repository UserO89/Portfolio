import rawSkills from "./skills.json";
import { projects } from "./projects";
import { experience } from "./experience";
import { validatePortfolio } from "../utils/skills";
import type { Evidence, Skill } from "../types";

export const skills = rawSkills as Skill[];
export const evidence: Evidence[] = [...projects, experience];
export const evidenceById = Object.fromEntries(
  evidence.map((entry) => [entry.id, entry]),
);
export const skillsFor = (id: string) =>
  skills.filter((skill) => skill.evidence.some((ref) => ref === id));

if (import.meta.env.DEV) validatePortfolio(skills, evidence);
