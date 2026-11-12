// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { skills } from "./data/portfolio";
import { statusDetails } from "./types";

let root: Root;
let container: HTMLDivElement;

beforeEach(async () => {
  (
    globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    callback(0);
    return 0;
  });
  HTMLElement.prototype.scrollIntoView = vi.fn();
  window.history.replaceState(null, "", "/");
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(<App />));
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

function click(element: Element | null | undefined) {
  if (!(element instanceof HTMLElement))
    throw new Error("Expected an interactive element");
  act(() => element.click());
}
function search(value: string) {
  const input = container.querySelector<HTMLInputElement>("#skill-search")!;
  act(() => {
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )!.set!.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

describe("expertise interactions", () => {
  it("navigates from an expanded project skill to its matching expertise and back", () => {
    const project = container.querySelector("#data-visualization")!;
    expect(
      [...project.querySelectorAll(".skill-links a")].some(
        (link) => link.textContent === "Playwright",
      ),
    ).toBe(false);
    click(project.querySelector(".project-skills-toggle"));
    click(
      [...project.querySelectorAll(".skill-links a")].find(
        (link) => link.textContent === "Playwright",
      ),
    );
    expect(
      container.querySelector<HTMLInputElement>("#skill-search")!.value,
    ).toBe("Playwright");
    const button = container.querySelector("#skill-playwright")!;
    expect(button.getAttribute("aria-expanded")).toBe("true");
    const panel = document.getElementById(
      button.getAttribute("aria-controls")!,
    )!;
    expect(panel.querySelector("a")?.getAttribute("href")).toBe(
      "#data-visualization",
    );
    expect(
      container.querySelector<HTMLButtonElement>(
        "#data-visualization .project-skills-toggle",
      )?.textContent,
    ).toBe("Show less");
  });
  it("filters the new knowledge meanings independently of project progress", () => {
    const select = container.querySelectorAll<HTMLSelectElement>(
      ".select-field select",
    )[1];
    expect([...select.options].map((option) => option.textContent)).toEqual([
      "All statuses",
      "Practical experience",
      "Studied / Knowledge",
      "Studying / Exploring",
    ]);
    act(() => {
      select.value = "Studied";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    const buttons = [
      ...container.querySelectorAll<HTMLButtonElement>(".expertise-skill"),
    ];
    expect(buttons).toHaveLength(
      skills.filter((skill) => skill.status === "Studied").length,
    );
    expect(
      buttons.every((button) => button.classList.contains("expertise-studied")),
    ).toBe(true);
    click(buttons[0]);
    expect(
      container.querySelector(".expertise-proof:not([hidden]) .status")
        ?.textContent,
    ).toBe("Studied / Knowledge");
    expect(container.querySelector(".proof-heading .mono")?.textContent).toBe(
      "KNOWLEDGE & CONTEXT",
    );
  });
  it("discloses unlinked evidence without inventing a project action", () => {
    for (const id of ["react", "typescript", "linux"]) {
      click(container.querySelector(`#skill-${id}`));
      const panel = container.querySelector(".expertise-proof:not([hidden])")!;
      expect(panel.querySelector(".evidence-note")?.textContent).toBe(
        "Project evidence has not been linked yet.",
      );
      expect(panel.querySelectorAll(".proof-links a")).toHaveLength(0);
      expect(panel.querySelector(".status")?.textContent).toBe(
        statusDetails[skills.find((skill) => skill.id === id)!.status].label,
      );
    }
    search("MongoDB");
    expect(container.querySelector(".category-header h3")?.textContent).toBe(
      "Data & Databases",
    );
    click(container.querySelector("#skill-mongodb"));
    expect(
      container
        .querySelector(".expertise-proof:not([hidden]) a")
        ?.getAttribute("href"),
    ).toBe("#egrant");
  });
  it("keeps chip statuses available without visible repeated labels", () => {
    const buttons = [
      ...container.querySelectorAll<HTMLButtonElement>(".expertise-skill"),
    ];
    expect(buttons.length).toBeGreaterThan(0);
    for (const button of buttons) {
      const skill = skills.find((entry) => `skill-${entry.id}` === button.id)!;
      expect(button.title).toContain(statusDetails[skill.status].label);
      expect(button.querySelector(".sr-only")?.textContent).toContain(
        statusDetails[skill.status].label,
      );
      expect(button.querySelector(".status")).toBeNull();
      expect(button.className).toContain(
        `expertise-${skill.status.toLowerCase().replaceAll(" ", "-")}`,
      );
    }
    click(container.querySelector("#skill-rag"));
    expect(
      container.querySelector(".expertise-proof:not([hidden]) .status")
        ?.textContent,
    ).toBe("Studying / Exploring");
  });
  it("shows all skills, combines filters, hides empty categories, and resets", () => {
    expect(container.querySelectorAll(".expertise-skill")).toHaveLength(
      skills.length,
    );
    search("UNIQA");
    expect(container.querySelectorAll(".expertise-skill")).toHaveLength(0);
    search("Testing");
    expect(container.querySelectorAll(".expertise-category")).toHaveLength(1);
    const selects = container.querySelectorAll<HTMLSelectElement>(
      ".select-field select",
    );
    act(() => {
      selects[1].value = "Exploring";
      selects[1].dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(container.querySelectorAll(".expertise-category")).toHaveLength(0);
    expect(container.textContent).toContain("No matching skills.");
    click(container.querySelector(".reset-button"));
    expect(container.querySelectorAll(".expertise-skill")).toHaveLength(
      skills.length,
    );
    act(() => {
      selects[0].value = "Backend & APIs";
      selects[0].dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(container.querySelectorAll(".expertise-category")).toHaveLength(1);
    expect(container.querySelector(".category-header h3")?.textContent).toBe(
      "Backend & APIs",
    );
  });
  it("opens focusable evidence and closes it with Escape", () => {
    const button = container.querySelector<HTMLButtonElement>("#skill-python")!;
    button.focus();
    // Native buttons supply Enter/Space activation in browsers; click is the resulting DOM action.
    click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    const panel = document.getElementById(
      button.getAttribute("aria-controls")!,
    )!;
    expect(panel.hidden).toBe(false);
    expect(panel.querySelector("a")?.getAttribute("href")).toBe("#egrant");
    act(() =>
      button.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      ),
    );
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(panel.hidden).toBe(true);
    expect(document.activeElement).toBe(button);
  });
  it("follows experience and project tags back to the matching evidence panel", () => {
    const experienceLink = [
      ...container.querySelectorAll("#uniqa .skill-links a"),
    ].find((link) => link.textContent === "Test Design & Documentation");
    click(experienceLink);
    expect(
      container.querySelector<HTMLInputElement>("#skill-search")!.value,
    ).toBe("Test Design & Documentation");
    expect(
      container
        .querySelector(".expertise-proof:not([hidden]) a")
        ?.getAttribute("href"),
    ).toBe("#uniqa");
    const projectLink = [
      ...container.querySelectorAll("#resort-empire .skill-links a"),
    ].find((link) => link.textContent?.includes("Requirements Clarification"));
    click(projectLink);
    expect(
      container.querySelector<HTMLInputElement>("#skill-search")!.value,
    ).toBe("Requirements Clarification");
    const evidenceLink = container.querySelector<HTMLAnchorElement>(
      ".expertise-proof:not([hidden]) a",
    )!;
    expect(evidenceLink.getAttribute("href")).toBe("#resort-empire");
    expect(document.getElementById(evidenceLink.hash.slice(1))).not.toBeNull();
  });
});
