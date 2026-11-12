import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProjectVisual } from "./ProjectVisual";
import { projects } from "../data/projects";
import { Projects } from "../sections/Projects";

describe("project presentation", () => {
  it("preserves the university knowledge to source-grounded answer concept", () => {
    const markup = renderToStaticMarkup(<ProjectVisual id="project.uniai" />);
    expect(markup).toContain('class="research-flow"');
    expect(markup).toContain("Official sources");
    expect(markup).toContain("A useful answer.");
    expect(markup).toContain("A traceable source.");
    expect(markup).toContain("PROPOSED ARCHITECTURE");
  });
  it("gives unknown projects a neutral visual", () => {
    const markup = renderToStaticMarkup(<ProjectVisual id="project.future" />);
    expect(markup).toContain("neutral-visual");
    expect(markup).not.toContain("lifecycle-roles");
  });
  it("emphasizes planning, coordination and quality equally for Resort", () => {
    const markup = renderToStaticMarkup(<ProjectVisual id="project.resort" />);
    for (const label of ["Planning", "Coordination", "Quality"])
      expect(markup).toContain(`<h4>${label}</h4>`);
    expect(markup).not.toContain("MY FOCUS");
  });
  it("shows Resort as completed without a completion date", () => {
    const resort = projects.find((project) => project.id === "project.resort")!;
    expect(resort.expectedCompletion).toBeUndefined();
    expect(resort.status).toBe("Completed");
    const markup = renderToStaticMarkup(<Projects onSkill={() => {}} />);
    const resortMarkup = markup
      .split('id="resort-empire"')[1]
      .split("</article>")[0];
    expect(resortMarkup).toContain('class="project-status">Completed</span>');
    expect(resortMarkup).not.toContain("Expected completion:");
    expect(resortMarkup).not.toContain('class="project-deadline');
    expect(projects.map((project) => project.id)).toEqual([
      "project.uniai",
      "project.egrant",
      "project.resort",
      "project.dataviz",
    ]);
  });
});
