import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "project.uniai",
    kind: "project",
    number: "01",
    anchor: "university-ai",
    name: "University AI Assistant",
    shortName: "University AI",
    category: "AI systems / Research",
    status: "Research / In Progress",
    role: "Master’s thesis researcher",
    summary:
      "Exploring how students could find reliable answers in official university information. Retrieval, source provenance, and answer quality come first.",
    objective:
      "University information is spread across faculty pages, regulations, and administrative documents. The research asks how an AI assistant could help students locate relevant, supported information.",
    contribution:
      "I have researched the thesis direction, potential information sources, system architecture, and evaluation concerns. The implementation approach is still being defined.",
    technical: [
      "Proposed: ingest approved university documents and investigate chunking, embeddings, and retrieval.",
      "Study retrieval-augmented generation and source-grounded answers.",
      "Plan evaluation around source coverage, unsupported statements, and answer quality.",
    ],
    lesson:
      "A plausible answer is not sufficient. The research needs a way to assess where an answer comes from and whether the source actually supports it.",
    boundary:
      "Research and planning only. A working RAG pipeline, chatbot, embeddings database, and deployment are not claimed. Technology choices are not final.",
    repositoryStatus: "Repository not published",
  },
  {
    id: "project.egrant",
    kind: "project",
    number: "02",
    anchor: "egrant",
    name: "eGrant: Beyond OCR",
    shortName: "eGrant",
    category: "AI / Backend / System integration",
    status: "Hackathon prototype",
    role: "AI orchestration & integration",
    summary:
      "Turning document text into structured values that can be checked, traced, and mapped. A team prototype built at the FUTURE MAKERS hackathon.",
    objective:
      "OCR produces text, but grant-document processing also needs trustworthy fields, traceability, and compatibility with a target form. The prototype explored that gap.",
    contribution:
      "I built and refined the Python / FastAPI AI-orchestrator: structured extraction, OCR contract normalization, page-based evidence references, validation, form mapping, and regression / contract checks.",
    technical: [
      "Normalize OCR responses and retain source text and document-page references.",
      "Preserve uncertain and conflicting values for human review.",
      "Use explicit mapping outcomes and compatibility checks between services.",
      "Handle precise money representations and financial consistency checks in the extraction flow.",
    ],
    lesson:
      "Integration depends on explicit contracts. Structured outputs still need deterministic checks and a route back to the original evidence; an LLM response alone is not verification.",
    boundary:
      "My work centered on the AI service. React review screens and the Laravel integration backend were team components. This was a prototype, without a claim of production accuracy or complete end-to-end reliability.",
    repositoryStatus: "Repository not publicly available",
  },
  {
    id: "project.resort",
    kind: "project",
    number: "03",
    anchor: "resort-empire",
    name: "Resort Empire: Paradise Tycoon",
    shortName: "Resort Empire",
    category: "Team delivery / Requirements / QA",
    status: "Completed",
    role: "Team Coordination · Requirements & QA",
    summary:
      "A completed university team project to build an isometric resort-management game. My contribution connected planning, requirements, coordination, and quality throughout development.",
    objective:
      "Develop a resort-management game as a university team while organizing work into manageable sprints and making expected behavior testable.",
    contribution:
      "I organized work between teammates, facilitated planning discussions, clarified requirements, and helped turn project goals into prioritized tasks. Alongside coordination, I prepared QA work, test scenarios, and acceptance checks during implementation.",
    technical: [
      "Planning and Agile delivery: sprint planning, backlog organization, Jira task management, task breakdown, and prioritization.",
      "Coordination and analysis: clarify requirements and actionable tasks, facilitate planning discussions, and connect teammates across implementation areas.",
      "Test scenario preparation for economy, resources, progression, and interface behavior.",
      "Cross-functional coordination with teammates working on UI, controls, data, and gameplay.",
      "Team product: a Unity 2D isometric game targeting Android.",
    ],
    lesson:
      "Clear requirements and actionable tasks give the team a shared starting point. Connecting planning, implementation discussions, and acceptance checks helps keep delivery coordinated.",
    boundary:
      "Team coordination and requirements work were part of my contribution, without a formal Business Analyst or Scrum Master title. QA planning and scenario preparation supported implementation.",
    repositoryStatus: "Public repository",
  },
  {
    id: "project.dataviz",
    kind: "project",
    number: "04",
    anchor: "data-visualization",
    name: "Data Visualization Web Application",
    shortName: "Data Visualization",
    category: "Full-stack / Data visualization",
    status: "Completed · Bachelor’s thesis",
    role: "Full-stack developer",
    summary:
      "From imported tables to useful visual explanations. A full-stack thesis application for exploring datasets, descriptive statistics, and interactive charts.",
    objective:
      "Bring dataset import, inspection, and visualization into one coherent web application, so that tabular data can be understood before it is presented.",
    contribution:
      "I designed and built the thesis application, including the import-to-visualization workflow, dataset semantics, charting interface, and frontend/backend integration.",
    technical: [
      "PHP / Laravel backend with a Vue 3 browser application and REST API integration.",
      "CSV/TXT import, validation, column profiling, and semantic type inference.",
      "Apache ECharts for interactive charts, with descriptive statistical views.",
      "One project corresponds to one dataset. PHPUnit and Vitest were used during development.",
    ],
    lesson:
      "Data types need context: a number can be an identifier rather than a quantity. Keeping that distinction through import, exploration, and charting was an important engineering concern.",
    boundary:
      "Completed academic application. The further information can be found on GitHub page.",
    repositoryStatus: "Public repository",
  },
];
