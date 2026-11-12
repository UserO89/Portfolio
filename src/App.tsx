import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./sections/Hero";
import { Experience } from "./sections/Experience";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Education } from "./sections/Education";
import { Contact } from "./sections/Contact";
import { defaultFilters } from "./utils/skills";
import type { Skill } from "./types";

export default function App() {
  const [filters, setFilters] = useState(defaultFilters);
  const [selected, setSelected] = useState<string | null>(null);
  const onSkill = (skill: Skill) => {
    setFilters({ ...defaultFilters, query: skill.name });
    setSelected(skill.id);
    requestAnimationFrame(() =>
      document
        .getElementById(`skill-${skill.id}`)
        ?.focus({ preventScroll: true }),
    );
  };
  useEffect(() => {
    const revealCase = () => {
      let hash = location.hash.slice(1);
      try {
        hash = decodeURIComponent(hash);
      } catch {
        return;
      }
      const target = document.getElementById(hash);
      const details = target?.closest("details");
      if (details) {
        details.open = true;
        requestAnimationFrame(() => target?.scrollIntoView());
      }
    };
    revealCase();
    window.addEventListener("hashchange", revealCase);
    return () => window.removeEventListener("hashchange", revealCase);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <Experience onSkill={onSkill} />
        <Skills
          filters={filters}
          setFilters={setFilters}
          selected={selected}
          setSelected={setSelected}
        />
        <Projects onSkill={onSkill} />
        <Education />
        <Contact />
      </main>
    </>
  );
}
