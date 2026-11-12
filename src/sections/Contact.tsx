import { Icon } from "../components/Icon";
import { profile } from "../data/profile";
import { links } from "../utils/links";

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="contact-about">
        <div className="section-meta">
          <span className="section-number">05</span>
          <span>About & contact</span>
        </div>
        <div className="about-copy">
          <p>{profile.about}</p>
          <p>{profile.background}</p>
        </div>
      </div>
      <div className="contact-main">
        <h2 id="contact-title">
          Let’s compare
          <br />
          <em>notes.</em>
        </h2>
        <div className="contact-links">
          {links.email && (
            <a href={links.email}>
              <span className="mono">WRITE TO ME</span>
              <span>
                {links.email.replace("mailto:", "")}
                <Icon name="diagonal" />
              </span>
            </a>
          )}
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              <span className="mono">CODE & CONTRIBUTIONS</span>
              <span>
                GitHub
                <Icon name="diagonal" />
              </span>
            </a>
          )}
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="mono">PROFESSIONAL PROFILE</span>
              <span>
                LinkedIn
                <Icon name="diagonal" />
              </span>
            </a>
          )}
          {links.cv && (
            <a href={links.cv} download>
              <span className="mono">BACKGROUND</span>
              <span>
                Download CV
                <Icon name="diagonal" />
              </span>
            </a>
          )}
        </div>
      </div>
      <footer className="site-footer mono">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with intention. Backed by evidence.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
