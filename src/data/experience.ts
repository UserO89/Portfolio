import type { Evidence } from "../types";

export const experience = {
  id: "experience.uniqa",
  kind: "experience",
  name: "UNIQA",
  shortName: "UNIQA",
  anchor: "uniqa",
  role: "Junior QA",
  period: "Jun 2026 — Present",
  arrangement: "Part-time",
  description:
    "Quality assurance for enterprise applications through manual testing and work with automated tests in Tricentis Tosca. I create and execute tests, document the checks, compare observed behavior with expectations, and communicate testing findings within the QA workflow.",
} satisfies Evidence & {
  role: string;
  period: string;
  arrangement: string;
  description: string;
};
