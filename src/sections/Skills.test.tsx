import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Skills } from "./Skills";
import { skills } from "../data/portfolio";
import { categories } from "../types";
import { defaultFilters, filterSkills, type Filters } from "../utils/skills";

const render = (
  filters: Filters = defaultFilters,
  selected: string | null = null,
) =>
  renderToStaticMarkup(
    <Skills
      filters={filters}
      selected={selected}
      setFilters={() => {}}
      setSelected={() => {}}
    />,
  );

describe("category expertise rendering", () => {
  it("renders every skill once in its category without a table or pagination", () => {
    const markup = render();
    expect(markup).not.toContain("<table");
    expect(markup).not.toContain("pagination");
    for (const category of categories)
      expect(markup).toContain(category.replaceAll("&", "&amp;"));
    for (const skill of skills) {
      expect(
        markup.match(new RegExp(`id="skill-${skill.id}"`, "g")),
      ).toHaveLength(1);
      const categoryIndex = categories.indexOf(skill.category);
      const categoryMarkup = markup
        .split(`aria-labelledby="category-${categoryIndex}"`)[1]
        .split("</section>")[0];
      expect(categoryMarkup).toContain(`id="skill-${skill.id}"`);
    }
  });
  it("hides empty categories when filtering and supports an empty state", () => {
    const filters = { ...defaultFilters, query: "Testing" };
    const markup = render(filters);
    expect(markup.match(/class="expertise-category /g)).toHaveLength(
      new Set(filterSkills(skills, filters).map((skill) => skill.category))
        .size,
    );
    expect(render({ ...defaultFilters, query: "unmatched-query" })).toContain(
      "No matching skills.",
    );
    expect(
      render({ ...defaultFilters, query: "unmatched-query" }),
    ).not.toContain('class="expertise-category ');
  });
  it("shows selected evidence with a real internal destination", () => {
    const skill = skills.find((entry) => entry.id === "test-case-design")!;
    const markup = render({ ...defaultFilters, query: skill.name }, skill.id);
    expect(markup).toContain('aria-expanded="true"');
    expect(markup).toContain(skill.explanation);
    expect(markup).toContain('href="#uniqa"');
    expect(markup).toContain(`aria-labelledby="skill-${skill.id}"`);
  });
});
