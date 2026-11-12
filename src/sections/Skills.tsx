import { Icon } from "../components/Icon";
import { SectionHeading } from "../components/SectionHeading";
import { skills, evidenceById } from "../data/portfolio";
import { categories, statuses, statusDetails } from "../types";
import {
  defaultFilters,
  filterSkills,
  statusClass,
  type Filters,
  type Sort,
} from "../utils/skills";

interface Props {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  selected: string | null;
  setSelected: (id: string | null) => void;
}

export function Skills({ filters, setFilters, selected, setSelected }: Props) {
  const filtered = filterSkills(skills, filters);
  const update = (change: Partial<Filters>) => {
    setFilters({ ...filters, ...change });
    setSelected(null);
  };
  const reset = () => {
    setFilters(defaultFilters);
    setSelected(null);
  };
  const hasFilters = Object.keys(defaultFilters).some(
    (key) =>
      filters[key as keyof Filters] !== defaultFilters[key as keyof Filters],
  );
  return (
    <section
      id="skills"
      className="section skills-section"
      aria-labelledby="skills-title"
    >
      <SectionHeading
        number="02"
        label="The evidence index"
        title="Less claiming. More connecting."
        id="skills-title"
      >
        <p className="section-description">
          Explore the disciplines behind my work. Select a skill to see how it
          connects to a project, professional experience, or ongoing research.
        </p>
      </SectionHeading>
      <div className="index-toolbar">
        <label className="search-field">
          <Icon name="search" />
          <span className="sr-only">Search skills</span>
          <input
            id="skill-search"
            type="search"
            placeholder="Find a skill…"
            value={filters.query}
            onChange={(event) => update({ query: event.target.value })}
          />
        </label>
        <label className="select-field">
          <span>Category</span>
          <select
            value={filters.category}
            onChange={(event) => update({ category: event.target.value })}
          >
            <option>All categories</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="select-field">
          <span>Experience / Knowledge</span>
          <select
            value={filters.status}
            onChange={(event) => update({ status: event.target.value })}
          >
            <option>All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusDetails[status].label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="index-meta">
        <p id="skills-results" role="status" aria-live="polite">
          <span className="signal">{filtered.length}</span> / {skills.length}{" "}
          skills ·{" "}
          {
            categories.filter((category) =>
              filtered.some((skill) => skill.category === category),
            ).length
          }{" "}
          categories
        </p>
        <div>
          <label className="sort-label">
            Sort by{" "}
            <select
              value={filters.sort}
              onChange={(event) => update({ sort: event.target.value as Sort })}
            >
              <option value="name">Skill A–Z</option>
              <option value="status">Experience / Knowledge</option>
            </select>
          </label>
          <button
            className="reset-button"
            onClick={reset}
            disabled={!hasFilters}
          >
            Reset <span aria-hidden="true">↺</span>
          </button>
        </div>
      </div>
      <div className="expertise-grid">
        {categories.map((category, index) => {
          const categorySkills = filtered.filter(
            (skill) => skill.category === category,
          );
          if (!categorySkills.length) return null;
          const activeSkill = categorySkills.find(
            (skill) => skill.id === selected,
          );
          const panelId = `category-proof-${index}`;
          return (
            <section
              key={category}
              className={`expertise-category expertise-category-${index}`}
              aria-labelledby={`category-${index}`}
            >
              <header className="category-header">
                <span className="mono category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 id={`category-${index}`}>{category}</h3>
                <span className="mono category-count">
                  {categorySkills.length}
                </span>
              </header>
              <ul className="expertise-skills">
                {categorySkills.map((skill) => (
                  <li key={skill.id}>
                    <button
                      id={`skill-${skill.id}`}
                      className={`expertise-skill expertise-${statusClass(skill.status)}${selected === skill.id ? " is-selected" : ""}`}
                      title={`${skill.name} — ${statusDetails[skill.status].label}`}
                      aria-expanded={selected === skill.id}
                      aria-controls={panelId}
                      onClick={() =>
                        setSelected(selected === skill.id ? null : skill.id)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setSelected(null);
                      }}
                    >
                      <span className="expertise-skill-name">{skill.name}</span>
                      <span className="sr-only">
                        {" "}
                        — {statusDetails[skill.status].label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div
                id={panelId}
                className="expertise-proof"
                role="region"
                hidden={!activeSkill}
                aria-labelledby={
                  activeSkill ? `skill-${activeSkill.id}` : `category-${index}`
                }
              >
                {activeSkill && (
                  <>
                    <div className="proof-heading">
                      <span className="mono">
                        {statusDetails[activeSkill.status].contextTitle}
                      </span>
                      <button
                        aria-label={`Close evidence for ${activeSkill.name}`}
                        onClick={() => {
                          setSelected(null);
                          document
                            .getElementById(`skill-${activeSkill.id}`)
                            ?.focus({ preventScroll: true });
                        }}
                      >
                        <Icon name="minus" />
                      </button>
                    </div>
                    <h4>{activeSkill.name}</h4>
                    <span
                      className={`status status-${statusClass(activeSkill.status)}`}
                    >
                      <span aria-hidden="true" />
                      {statusDetails[activeSkill.status].label}
                    </span>
                    <p>{activeSkill.explanation}</p>
                    {activeSkill.evidenceState === "unlinked" && (
                      <p className="evidence-note">
                        {activeSkill.evidenceNote}
                      </p>
                    )}
                    <div className="proof-links">
                      {activeSkill.evidence.map((ref) => (
                        <a
                          className="text-link"
                          key={ref}
                          href={`#${evidenceById[ref].anchor}`}
                        >
                          View {evidenceById[ref].name}
                          <Icon name="diagonal" />
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          );
        })}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h3>No matching skills.</h3>
          <p>Try another skill name, or clear the filters.</p>
          <button className="text-link" onClick={reset}>
            Reset the index <Icon />
          </button>
        </div>
      )}
      <div className="index-footer">
        <div className="status-legend">
          {statuses.map((status) => (
            <span
              className={`status status-${statusClass(status)}`}
              key={status}
            >
              <span aria-hidden="true" />
              {statusDetails[status].label}
            </span>
          ))}
          <span className="legend-note">Select a skill for context.</span>
        </div>
      </div>
      <details className="status-guide">
        <summary>What do the colors mean?</summary>
        {statuses.map((status) => (
          <p key={status}>
            <strong>{statusDetails[status].label}</strong> —{" "}
            {statusDetails[status].description}
          </p>
        ))}
      </details>
    </section>
  );
}
