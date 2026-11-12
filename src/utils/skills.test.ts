import { describe, expect, it } from "vitest";
import { evidence, skills, skillsFor } from "../data/portfolio";
import { categories, statuses } from "../types";
import { pendingSkills } from "../data/skills-review";
import { projects } from "../data/projects";
import type { Skill } from "../types";
import { defaultFilters, filterSkills, validatePortfolio } from "./skills";
import { safeCv, safeExternal, safeRepository } from "./links";

describe("published evidence graph", () => {
  it("allows explicitly unlinked skills only with an explanatory note", () => {
    const react = skills.find((skill) => skill.id === "react")!;
    expect(react.evidenceState).toBe("unlinked");
    expect(react.evidence).toEqual([]);
    expect(() => validatePortfolio(skills, evidence)).not.toThrow();
    const replace = (change: Partial<Skill>) =>
      skills.map((skill) =>
        skill.id === react.id ? { ...react, ...change } : skill,
      );
    expect(() =>
      validatePortfolio(replace({ evidenceNote: "" }), evidence),
    ).toThrow("needs an evidence note");
    expect(() =>
      validatePortfolio(replace({ evidenceState: "linked" }), evidence),
    ).toThrow("No evidence");
    expect(() =>
      validatePortfolio(replace({ evidence: ["project.uniai"] }), evidence),
    ).toThrow("Unlinked skill has evidence references");
  });
  it("keeps requested skill statuses and owner-provided project assignments", () => {
    const check = (
      id: string,
      status: Skill["status"],
      category: Skill["category"],
      refs: Skill["evidence"],
    ) => {
      const skill = skills.find((entry) => entry.id === id)!;
      expect(skill).toBeDefined();
      expect(skill.status).toBe(status);
      expect(skill.category).toBe(category);
      expect(skill.evidence).toEqual(refs);
    };
    check("ai-orchestration", "Exploring", "AI & LLM Systems", [
      "project.uniai",
    ]);
    check("llm-output-validation", "Exploring", "AI & LLM Systems", [
      "project.uniai",
    ]);
    check("mysql", "Practiced", "Data & Databases", [
      "project.egrant",
      "project.dataviz",
    ]);
    check("postgresql", "Studied", "Data & Databases", []);
    check("mongodb", "Studied", "Data & Databases", ["project.egrant"]);
    check("tabulator", "Studied", "Frontend Development", ["project.dataviz"]);
    for (const id of ["playwright", "cypress"])
      check(id, "Practiced", "Quality Assurance & Testing", [
        "project.dataviz",
      ]);
    check("docker", "Practiced", "DevOps & Developer Tools", [
      "project.egrant",
    ]);
    check("react", "Studied", "Frontend Development", []);
    check("typescript", "Practiced", "Frontend Development", []);
    check("linux", "Practiced", "DevOps & Developer Tools", []);
    const architecture = skills.find((skill) => skill.id === "microservices")!;
    expect(architecture.evidence).toEqual([
      "project.egrant",
      "project.dataviz",
      "project.uniai",
    ]);
    expect(architecture.explanation).toMatch(/research.*not a completed/i);
  });
  it("accepts a new evidence-backed skill without changing a fixed count", () => {
    expect(() =>
      validatePortfolio(
        [
          ...skills,
          {
            ...skills[0],
            id: "new-approved-skill",
            name: "New approved skill",
          },
        ],
        evidence,
      ),
    ).not.toThrow();
  });
  it("rejects invalid statuses, categories and duplicate relationships", () => {
    expect(() =>
      validatePortfolio(
        [
          { ...skills[0], status: "Expert" } as unknown as Skill,
          ...skills.slice(1),
        ],
        evidence,
      ),
    ).toThrow("Unknown status");
    expect(() =>
      validatePortfolio(
        [
          { ...skills[0], category: "Unapproved" } as unknown as Skill,
          ...skills.slice(1),
        ],
        evidence,
      ),
    ).toThrow("Unknown category");
    expect(() =>
      validatePortfolio(
        [
          {
            ...skills[0],
            evidence: [skills[0].evidence[0], skills[0].evidence[0]],
          },
          ...skills.slice(1),
        ],
        evidence,
      ),
    ).toThrow("Duplicate relationship");
  });
  it("validates every published skill and both types of evidence", () => {
    expect(() => validatePortfolio(skills, evidence)).not.toThrow();
    expect(evidence.filter((entry) => entry.kind === "project")).toHaveLength(
      projects.length,
    );
    expect(evidence.some((entry) => entry.kind === "experience")).toBe(true);
    expect(new Set(skills.map((skill) => skill.category))).toEqual(
      new Set(categories),
    );
    expect(new Set(skills.map((skill) => skill.status))).toEqual(
      new Set(statuses),
    );
  });
  it("keeps owner-review candidates out of the published dataset", () => {
    const pendingIds = new Set(pendingSkills.map((skill) => skill.id));
    expect(skills.filter((skill) => pendingIds.has(skill.id))).toEqual([]);
  });
  it("rejects missing references, duplicate skill IDs and skills without evidence", () => {
    expect(() =>
      validatePortfolio(
        [{ ...skills[0], evidence: ["project.missing"] }],
        evidence,
      ),
    ).toThrow("Missing evidence");
    expect(() => validatePortfolio([...skills, skills[0]], evidence)).toThrow(
      "Duplicate or empty skill ID",
    );
    expect(() =>
      validatePortfolio([{ ...skills[0], evidence: [] }], evidence),
    ).toThrow("No evidence");
  });
  it("rejects broken anchors, kinds and orphaned reverse relationships", () => {
    expect(() =>
      validatePortfolio(skills, [
        ...evidence,
        { ...evidence[0], id: "project.extra" },
      ]),
    ).toThrow("Missing or duplicate anchor");
    expect(() =>
      validatePortfolio(skills, [
        { ...evidence[0], kind: "experience" },
        ...evidence.slice(1),
      ]),
    ).toThrow("Evidence kind mismatch");
    expect(() =>
      validatePortfolio(skills, [
        ...evidence,
        { ...evidence[0], id: "project.extra", anchor: "extra" },
      ]),
    ).toThrow("no reverse relationships");
  });
  it("derives reverse project/experience skills from the same graph", () => {
    for (const entry of evidence)
      expect(skillsFor(entry.id)).toEqual(
        skills.filter((skill) => skill.evidence.includes(entry.id)),
      );
  });
  it("keeps RAG and embeddings in a research context", () => {
    for (const id of [
      "rag",
      "embeddings",
      "information-retrieval",
      "llm-evaluation",
    ]) {
      const skill = skills.find((entry) => entry.id === id)!;
      expect(skill.status).toBe("Exploring");
      expect(skill.evidence).toEqual(["project.uniai"]);
      expect(skill.explanation).toMatch(/research/i);
    }
  });
});

describe("index search and filters", () => {
  it("searches skill names without case or surrounding-space sensitivity", () => {
    expect(
      filterSkills(skills, {
        ...defaultFilters,
        query: "  pYtHoN  ",
      }).map((skill) => skill.id),
    ).toEqual(["python"]);
  });
  it("does not match project names", () => {
    expect(
      filterSkills(skills, {
        ...defaultFilters,
        query: "University AI Assistant",
      }),
    ).toEqual([]);
  });
  it("does not match employers or evidence descriptions", () => {
    expect(filterSkills(skills, { ...defaultFilters, query: "UNIQA" })).toEqual(
      [],
    );
    expect(
      filterSkills(skills, {
        ...defaultFilters,
        query: "enterprise applications",
      }),
    ).toEqual([]);
  });
  it("combines search, category and status", () => {
    const result = filterSkills(skills, {
      ...defaultFilters,
      query: "API",
      category: "Backend & APIs",
      status: "Practiced",
    });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (skill) =>
          skill.category === "Backend & APIs" &&
          skill.status === "Practiced" &&
          skill.name.toLowerCase().includes("api"),
      ),
    ).toBe(true);
  });
  it("supports empty results and restores the full index with defaults", () => {
    expect(
      filterSkills(skills, {
        ...defaultFilters,
        query: "no-such-skill",
      }),
    ).toEqual([]);
    expect(filterSkills(skills, defaultFilters)).toHaveLength(skills.length);
  });
  it("sorts deterministically without mutating the source", () => {
    const original = skills.map((skill) => skill.id);
    const sorted = filterSkills(skills, {
      ...defaultFilters,
      sort: "status",
    });
    expect(sorted.map((skill) => statuses.indexOf(skill.status))).toEqual(
      sorted.map((skill) => statuses.indexOf(skill.status)).sort(),
    );
    expect(skills.map((skill) => skill.id)).toEqual(original);
    const byCategory = filterSkills(skills, {
      ...defaultFilters,
      sort: "category",
    });
    expect(byCategory[0].category).toBe(categories[0]);
  });
});

describe("safe configured links", () => {
  it("hides absent, placeholder and executable external URLs", () => {
    for (const value of [
      null,
      "",
      "#",
      "https://example.com/foo",
      "javascript:alert(1)",
      "http://github.com/a/b",
      "https://user:password@github.com/a/b",
    ])
      expect(safeExternal(value)).toBeNull();
  });
  it("requires an actual GitHub repository-shaped URL", () => {
    expect(safeRepository("https://github.com/UserO89")).toBeNull();
    expect(safeRepository("https://other.site/user/repo")).toBeNull();
    expect(safeRepository("https://github.com/user/repo")).toBe(
      "https://github.com/user/repo",
    );
  });
  it("resolves a configured CV under a GitHub Pages base", () => {
    expect(safeCv(null, "/portfolio/")).toBeNull();
    expect(safeCv("../cv.pdf", "/portfolio/")).toBeNull();
    expect(safeCv("cv/vladyslav.pdf", "/portfolio/")).toBe(
      "/portfolio/cv/vladyslav.pdf",
    );
  });
});
