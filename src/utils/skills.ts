import {
  categories,
  statuses,
  type Evidence,
  type Skill,
  type SkillStatus,
} from "../types";

export type Sort = "name" | "category" | "status";
export interface Filters {
  query: string;
  category: string;
  status: string;
  sort: Sort;
}
export const defaultFilters: Filters = {
  query: "",
  category: "All categories",
  status: "All statuses",
  sort: "name",
};

export function filterSkills(skills: Skill[], filters: Filters): Skill[] {
  const query = filters.query.trim().toLocaleLowerCase();
  return skills
    .filter(
      (skill) =>
        (filters.category === "All categories" ||
          skill.category === filters.category) &&
        (filters.status === "All statuses" ||
          skill.status === filters.status) &&
        (!query || skill.name.toLocaleLowerCase().includes(query)),
    )
    .sort((a, b) => {
      if (filters.sort === "status")
        return (
          statuses.indexOf(a.status) - statuses.indexOf(b.status) ||
          a.name.localeCompare(b.name)
        );
      if (filters.sort === "category")
        return (
          categories.indexOf(a.category) - categories.indexOf(b.category) ||
          a.name.localeCompare(b.name)
        );
      return a.name.localeCompare(b.name);
    });
}

export const statusClass = (status: SkillStatus) =>
  status.toLowerCase().replaceAll(" ", "-");

export function validatePortfolio(skills: Skill[], evidence: Evidence[]): void {
  const errors: string[] = [];
  const skillIds = new Set<string>();
  const evidenceIds = new Set<string>();
  const anchors = new Set<string>();
  for (const entry of evidence) {
    if (evidenceIds.has(entry.id))
      errors.push(`Duplicate evidence ID: ${entry.id}`);
    if (!entry.anchor || anchors.has(entry.anchor))
      errors.push(`Missing or duplicate anchor: ${entry.id}`);
    if (!entry.id.startsWith(`${entry.kind}.`))
      errors.push(`Evidence kind mismatch: ${entry.id}`);
    evidenceIds.add(entry.id);
    anchors.add(entry.anchor);
  }
  for (const skill of skills) {
    if (!skill.id || skillIds.has(skill.id))
      errors.push(`Duplicate or empty skill ID: ${skill.id}`);
    skillIds.add(skill.id);
    if (!skill.name.trim() || !skill.explanation.trim())
      errors.push(`Missing skill content: ${skill.id}`);
    if (!categories.includes(skill.category))
      errors.push(`Unknown category: ${skill.id}`);
    if (!statuses.includes(skill.status))
      errors.push(`Unknown status: ${skill.id}`);
    if (
      skill.evidenceState !== undefined &&
      skill.evidenceState !== "linked" &&
      skill.evidenceState !== "unlinked"
    )
      errors.push(`Unknown evidence state: ${skill.id}`);
    if (skill.evidenceState === "unlinked") {
      if (skill.evidence.length)
        errors.push(`Unlinked skill has evidence references: ${skill.id}`);
      if (!skill.evidenceNote?.trim())
        errors.push(`Unlinked skill needs an evidence note: ${skill.id}`);
    } else if (!skill.evidence.length) errors.push(`No evidence: ${skill.id}`);
    for (const id of skill.evidence)
      if (!evidenceIds.has(id))
        errors.push(`Missing evidence ${id}: ${skill.id}`);
    if (new Set(skill.evidence).size !== skill.evidence.length)
      errors.push(`Duplicate relationship: ${skill.id}`);
  }
  for (const entry of evidence)
    if (!skills.some((skill) => skill.evidence.includes(entry.id)))
      errors.push(`Evidence has no reverse relationships: ${entry.id}`);
  if (errors.length)
    throw new Error(`Invalid portfolio data:\n${errors.join("\n")}`);
}
