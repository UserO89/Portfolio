import { SectionHeading } from "../components/SectionHeading";
import { experience } from "../data/experience";
import { skillsFor } from "../data/portfolio";
import type { Skill } from "../types";

export function Experience({ onSkill }: { onSkill: (skill: Skill) => void }) {
  return (
    <section
      id="experience"
      className="section experience-section"
      aria-labelledby="experience-heading"
    >
      <SectionHeading
        number="01"
        label="In practice"
        title="Where software meets reality."
        id="experience-heading"
      />
      <div className="experience-entry" id={experience.anchor}>
        <div className="experience-identity">
          <span className="mono">PROFESSIONAL EXPERIENCE</span>
          <h3>{experience.name}</h3>
          <p className="experience-period">{experience.period}</p>
          <span className="mono">{experience.arrangement}</span>
        </div>
        <div className="experience-body">
          <h4>{experience.role}</h4>
          <p>{experience.description}</p>
          <span className="mono experience-skills-label">IN PRACTICE</span>
          <div className="skill-links">
            {skillsFor(experience.id).map((skill) => (
              <a href="#skills" key={skill.id} onClick={() => onSkill(skill)}>
                {skill.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
