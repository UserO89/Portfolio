import { useState } from "react";
import { skillsFor } from "../data/portfolio";
import { statusDetails, type Project, type Skill } from "../types";
import {
  prioritizeProjectSkills,
  projectSkillPreviewCount,
} from "../utils/project-skills";

interface Props {
  project: Pick<Project, "id" | "anchor" | "name">;
  onSkill: (skill: Skill) => void;
}

export function ProjectSkills({ project, onSkill }: Props) {
  const [expanded, setExpanded] = useState(false);
  const associated = prioritizeProjectSkills(project.id, skillsFor(project.id));
  const visible = expanded
    ? associated
    : associated.slice(0, projectSkillPreviewCount);
  const listId = `${project.anchor}-skills`;

  return (
    <div className="project-evidence">
      <span className="mono">CONNECTED SKILLS</span>
      <div className="project-skills-content">
        <div
          id={listId}
          className="skill-links"
          role="group"
          aria-label={`Skills for ${project.name}`}
        >
          {visible.map((skill, index) => (
            <a
              key={skill.id}
              href="#skills"
              className={
                index >= projectSkillPreviewCount
                  ? "project-skill-revealed"
                  : undefined
              }
              title={`${skill.name} — ${statusDetails[skill.status].label}`}
              onClick={() => onSkill(skill)}
            >
              {skill.name}
            </a>
          ))}
        </div>
        {associated.length > projectSkillPreviewCount && (
          <button
            type="button"
            className="project-skills-toggle"
            aria-expanded={expanded}
            aria-controls={listId}
            aria-describedby={`${project.anchor}-title`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : `Show all skills (${associated.length})`}
          </button>
        )}
      </div>
    </div>
  );
}
