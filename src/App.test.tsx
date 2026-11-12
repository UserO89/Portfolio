import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "./App";
import { projects } from "./data/projects";
import { experience } from "./data/experience";
import { links, repositoryFor } from "./utils/links";
import { existsSync } from "node:fs";

const markup = renderToStaticMarkup(<App />);

describe("rendered document structure", () => {
  it("uses the reference hero wording and compact text-only actions", () => {
    expect(markup).toContain("With <em>evidence.</em>");
    expect(markup).toContain(
      'class="button button-dark hero-button" href="#projects">Selected work</a>',
    );
    expect(markup).toContain(
      'class="text-link hero-link" href="#skills">Explore expertise</a>',
    );
  });
  it("renders the six sections in the requested order", () => {
    const ids = [
      "hero-name",
      "experience",
      "skills",
      "projects",
      "education",
      "contact",
    ];
    const positions = ids.map((id) => markup.indexOf(`id="${id}"`));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(markup.match(/<h1\b/g)).toHaveLength(1);
  });
  it("resolves every rendered internal link to a unique actual anchor", () => {
    const ids = Array.from(
      markup.matchAll(/\sid="([^"]+)"/g),
      (match) => match[1],
    );
    expect(new Set(ids).size).toBe(ids.length);
    for (const match of markup.matchAll(/href="#([^"]+)"/g))
      expect(ids).toContain(match[1]);
    for (const entry of [...projects, experience])
      expect(ids).toContain(entry.anchor);
  });
  it("keeps case studies available independently of public repositories", () => {
    for (const project of projects)
      expect(markup).toContain(`id="${project.anchor}-case"`);
    expect(markup.match(/class="case-study"/g)).toHaveLength(projects.length);
    expect(markup).not.toContain('href="#"');
    expect(markup).not.toContain("hackathon-rocket/AI-orchestrator");
    expect(repositoryFor("project.egrant")).toBeNull();
    expect(repositoryFor("project.uniai")).toBeNull();
    expect(markup).toContain("Repository not publicly available");
    if (!links.cv) expect(markup).not.toContain("Download CV");
    else
      expect(
        existsSync(`public/${links.cv.replace(import.meta.env.BASE_URL, "")}`),
      ).toBe(true);
  });
  it("sets safe new-tab attributes and accessible control labels", () => {
    for (const match of markup.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))
      expect(match[0]).toContain('rel="noopener noreferrer"');
    expect(markup).toContain("Skip to content");
    expect(markup).toContain('aria-label="Main navigation"');
    expect(markup).toContain('aria-live="polite"');
    expect(markup).toContain("Search skills");
  });
});
