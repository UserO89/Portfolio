import type { ProjectId } from "../types";

// Presentation order only. Skill definitions and evidence remain in skills.json.
// Use IDs so labels and project associations are never duplicated here.
export const projectSkillPriorities: Partial<
  Record<ProjectId, readonly string[]>
> = {
  "project.uniai": [
    "rag",
    "information-retrieval",
    "embeddings",
    "ai-orchestration",
    "llm-output-validation",
    "llm-evaluation",
  ],
  "project.egrant": [
    "python",
    "fastapi",
    "llm-integration",
    "ocr-integration",
    "structured-extraction",
    "schema-mapping",
  ],
  "project.resort": [
    "team-coordination",
    "requirements-clarification",
    "scrum",
    "jira",
    "qa-planning",
    "test-case-design",
  ],
  "project.dataviz": [
    "laravel",
    "vue3",
    "mysql",
    "data-visualization",
    "dataset-import",
    "semantic-inference",
  ],
};
