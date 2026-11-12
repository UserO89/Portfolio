import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const sections = [
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["contact", "Contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    for (const [id] of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <a
        className="wordmark"
        href="#top"
        aria-label="Vladyslav Shaposhnikov, back to introduction"
      >
        <span className="monogram">
          vs<span>.</span>
        </span>
        <span className="wordmark-caption">
          THE EVIDENCE
          <br />
          INDEX / VOL. 01
        </span>
      </a>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        {open ? "Close" : "Menu"} <Icon name={open ? "minus" : "plus"} />
      </button>
      <nav
        id="primary-navigation"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
          }
        }}
      >
        {sections.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            <span className="nav-number">0{index + 1}</span>
            {label}
            {id === "contact" && <Icon name="diagonal" />}
          </a>
        ))}
      </nav>
    </header>
  );
}
