// Editorial review queue. This module is never imported by the public site.
// Move a confirmed competency to skills.json with its evidence before removing it here.
export const pendingSkills = [
  {
    id: "defect-reporting",
    name: "Defect Reporting",
    reason:
      "Confirm personally authored defect reports and reporting workflow; testing findings are covered by the Manual Testing evidence.",
  },
  {
    id: "regression-testing",
    name: "Regression Testing",
    reason:
      "Confirm professional regression execution at UNIQA, independently of Resort planning and eGrant contract checks.",
  },
  {
    id: "automation-design",
    name: "Test Automation Design",
    reason:
      "Working with Tosca tests does not establish ownership of automation architecture or frameworks.",
  },
  {
    id: "business-process-testing",
    name: "Business Process Testing",
    reason:
      "Confirm responsibility for business-process coverage and scenario design.",
  },
  {
    id: "requirements-analysis",
    name: "Requirements Analysis",
    reason:
      "Resort requirements clarification is confirmed; confirm broader analysis methods or professional UNIQA scope before expanding this claim.",
  },
  {
    id: "test-data-management",
    name: "Test Data Management",
    reason:
      "No confirmed responsibility for creating or maintaining test datasets.",
  },
  {
    id: "cross-team-qa",
    name: "Cross-team QA Communication",
    reason:
      "Confirm communication across professional teams; current evidence supports communicating findings within the QA workflow.",
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    reason: "Confirm individual prompt design and iteration in eGrant.",
  },
  {
    id: "pydantic",
    name: "Pydantic Schemas",
    reason: "Confirm authored schema design versus integration use.",
  },
  {
    id: "authentication",
    name: "Web Authentication & Authorization",
    reason: "Confirm exact personal implementation area.",
  },
  {
    id: "vite",
    name: "Vite",
    reason: "Original matrix held this standalone skill for editorial review.",
  },
  {
    id: "pinia",
    name: "Pinia",
    reason: "Confirm specific personal implementation.",
  },
  {
    id: "dashboard-ui",
    name: "Interactive Data Interfaces",
    reason: "Original matrix held this standalone skill for editorial review.",
  },
  {
    id: "bug-analysis",
    name: "Defect Identification & Reporting",
    reason:
      "Problem identification is covered by Manual Testing; formal reporting scope still needs confirmation.",
  },
  {
    id: "technical-writing",
    name: "Technical Documentation",
    reason:
      "Confirm authorship of broader technical documents; test documentation is covered by Test Design & Documentation.",
  },
];
