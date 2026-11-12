import type { ComponentType } from "react";

function UniversityVisual() {
  return (
    <div className="project-visual research-visual">
      <div className="visual-top mono">
        <span>RESEARCH NOTE</span>
        <span>PROPOSED ARCHITECTURE</span>
      </div>
      <div className="research-flow">
        <div className="research-source">
          University
          <br />
          knowledge<span>Official sources</span>
        </div>
        <div className="flow-connector" aria-hidden="true" />
        <div className="research-target">
          A useful answer.
          <br />
          <em>A traceable source.</em>
        </div>
      </div>
      <div className="visual-bottom mono">
        Sources → Retrieval → Grounded response<span>↗</span>
      </div>
    </div>
  );
}

function DataVisual() {
  return (
    <div className="project-visual data-visual">
      <div className="visual-top mono">
        <span>FROM DATA TO UNDERSTANDING</span>
        <span>EXPLORATION</span>
      </div>
      <svg
        className="chart-illustration"
        viewBox="0 0 520 200"
        role="img"
        aria-label="Conceptual line-chart illustration, not actual project data"
      >
        <path
          className="chart-grid"
          d="M15 30H505M15 80H505M15 130H505M15 180H505M15 15V180M135 15V180M255 15V180M375 15V180M505 15V180"
        />
        <path
          className="chart-secondary"
          d="M15 160 75 120 135 140 195 90 255 115 315 65 375 85 435 40 505 55"
        />
        <path
          className="chart-primary"
          d="M15 165 75 155 135 110 195 125 255 75 315 95 375 40 435 65 505 20"
        />
        <circle cx="375" cy="40" r="5" />
      </svg>
      <div className="visual-bottom mono">
        Import / Validate / Explore / Visualize<span>↗</span>
      </div>
      <span className="illustration-caption">
        Concept illustration · not an application screenshot
      </span>
    </div>
  );
}

function ExtractionVisual() {
  return (
    <div className="project-visual extraction-visual">
      <div className="visual-top mono">
        <span>DOCUMENT → STRUCTURED INFORMATION</span>
        <span>EXTRACTION</span>
      </div>
      <div className="extraction-flow">
        <div className="document-motif" aria-hidden="true">
          <span />
          <span />
          <span />
          <div className="document-highlight" />
          <span />
          <span />
        </div>
        <span className="flow-arrow" aria-hidden="true">
          →
        </span>
        <div className="extracted-fields">
          <div>
            <span>01</span> Extract
          </div>
          <div>
            <span>02</span> Validate
          </div>
          <div>
            <span>03</span> Map & review
          </div>
        </div>
      </div>
      <div className="visual-bottom mono">
        A value is only useful with context.<span>↗</span>
      </div>
      <span className="illustration-caption">
        Conceptual workflow · no real document data
      </span>
    </div>
  );
}

function ResortVisual() {
  return (
    <div className="project-visual process-visual">
      <div className="visual-top mono">
        <span>SUPPORTING THE DEVELOPMENT LIFECYCLE</span>
        <span>TEAM DELIVERY</span>
      </div>
      <div className="lifecycle-roles">
        <div>
          <span className="mono">01 / MAKE IT ACTIONABLE</span>
          <h4>Planning</h4>
          <p>
            Sprint scope
            <br />
            Backlog & priorities
          </p>
        </div>
        <div>
          <span className="mono">02 / CONNECT THE WORK</span>
          <h4>Coordination</h4>
          <p>
            Requirements
            <br />
            Team communication
          </p>
        </div>
        <div>
          <span className="mono">03 / CHECK EXPECTATIONS</span>
          <h4>Quality</h4>
          <p>
            Test scenarios
            <br />
            Acceptance checks
          </p>
        </div>
      </div>
      <div className="visual-bottom mono">
        Shared delivery. Clear expectations.<span>↗</span>
      </div>
    </div>
  );
}

function NeutralVisual() {
  return (
    <div className="project-visual neutral-visual">
      <div className="visual-top mono">
        <span>PROJECT NOTES</span>
        <span>CONTEXT & CONTRIBUTION</span>
      </div>
      <p>
        Understand the problem.
        <br />
        Examine the work.
      </p>
      <div className="visual-bottom mono">
        The case study carries the evidence.
      </div>
    </div>
  );
}

const projectVisuals: Partial<Record<string, ComponentType>> = {
  "project.uniai": UniversityVisual,
  "project.dataviz": DataVisual,
  "project.egrant": ExtractionVisual,
  "project.resort": ResortVisual,
};

export function ProjectVisual({ id }: { id: string }) {
  const Visual = projectVisuals[id] ?? NeutralVisual;
  return <Visual />;
}
