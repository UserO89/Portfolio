import { Icon } from "../components/Icon";
import { ProjectVisual } from "../components/ProjectVisual";
import { ProjectSkills } from "../components/ProjectSkills";
import { SectionHeading } from "../components/SectionHeading";
import { projects } from "../data/projects";
import { repositoryFor } from "../utils/links";
import { formatPlannedDate } from "../utils/dates";
import type { Skill } from "../types";

export function Projects({ onSkill }: { onSkill: (skill: Skill) => void }) {
  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        number="03"
        label="Selected work"
        title="The work behind the skills."
        id="projects-title"
      >
        <p id="projects-description" className="section-description">
          Exploring the problems, technical decisions, and contributions behind
          selected projects.
        </p>
      </SectionHeading>
      <div className="project-list">
        {projects.map((project) => {
          const repository = repositoryFor(project.id);
          return (
            <article
              className={`project project-${project.id.split(".")[1]}`}
              key={project.id}
              id={project.anchor}
              aria-labelledby={`${project.anchor}-title`}
            >
              <div className="project-main">
                <div className="project-copy">
                  <div className="project-kicker mono">
                    <span>
                      {project.number} / {project.category}
                    </span>
                    <span className="project-status">{project.status}</span>
                  </div>
                  {project.expectedCompletion && (
                    <p className="project-deadline mono">
                      Expected completion:{" "}
                      <time dateTime={project.expectedCompletion}>
                        {formatPlannedDate(project.expectedCompletion)}
                      </time>
                    </p>
                  )}
                  <h3 id={`${project.anchor}-title`}>
                    {repository ? (
                      <a
                        href={repository}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.name}
                        <Icon name="diagonal" />
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="project-role">
                    <span className="mono">MY ROLE</span>
                    <p>{project.role}</p>
                  </div>
                  <p className="repository-state mono">
                    {repository ? (
                      <a
                        href={repository}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Public GitHub repository <Icon name="diagonal" />
                      </a>
                    ) : (
                      project.repositoryStatus
                    )}
                  </p>
                </div>
                <ProjectVisual id={project.id} />
              </div>
              <details className="case-study">
                <summary>
                  <span>View case study</span>
                  <span className="case-open-label">Close case study</span>
                  <Icon name="plus" />
                </summary>
                <div id={`${project.anchor}-case`} className="case-body">
                  <div className="case-intro">
                    <span className="mono">
                      {project.number} / A CLOSER LOOK
                    </span>
                    <h4>
                      The work behind
                      <br />
                      the summary.
                    </h4>
                  </div>
                  <div className="case-sections">
                    <div>
                      <h4>Problem & objective</h4>
                      <p>{project.objective}</p>
                    </div>
                    <div>
                      <h4>My contribution</h4>
                      <p>{project.contribution}</p>
                    </div>
                    <div>
                      <h4>
                        {project.id === "project.uniai"
                          ? "Research goals & proposed functionality"
                          : "Technical details"}
                      </h4>
                      <ul>
                        {project.technical.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>
                        {project.id === "project.uniai"
                          ? "Research question"
                          : "Engineering lesson"}
                      </h4>
                      <p>{project.lesson}</p>
                    </div>
                    <aside className="scope-note">
                      <span className="mono">SCOPE & STATUS</span>
                      <p>{project.boundary}</p>
                    </aside>
                  </div>
                </div>
              </details>
              <ProjectSkills project={project} onSkill={onSkill} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
