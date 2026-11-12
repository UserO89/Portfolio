import { projectSkillPriorities } from "../data/project-skill-priorities";
import type { ProjectId, Skill } from "../types";

export const projectSkillPreviewCount = 6;

export function prioritizeProjectSkills(
  projectId: ProjectId,
  associated: readonly Skill[],
): Skill[] {
  const priorities = projectSkillPriorities[projectId] ?? [];
  const rank = new Map(priorities.map((id, index) => [id, index]));
  return [...associated].sort(
    (a, b) =>
      (rank.get(a.id) ?? priorities.length) -
        (rank.get(b.id) ?? priorities.length) || a.name.localeCompare(b.name),
  );
}
