import { SectionHeading } from "../components/SectionHeading";
import { education } from "../data/education";

export function Education() {
  return (
    <section
      id="education"
      className="section education-section"
      aria-labelledby="education-title"
    >
      <SectionHeading
        number="04"
        label="Foundations"
        title="Learning, carried forward."
        id="education-title"
      />
      <div className="education-list">
        {education.map((entry) => (
          <article key={entry.degree}>
            <div className="mono education-period">{entry.period}</div>
            <div>
              <h3>{entry.degree}</h3>
              <p>{entry.institution}</p>
            </div>
            <span className="mono education-status">{entry.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
