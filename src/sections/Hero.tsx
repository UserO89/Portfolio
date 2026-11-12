import { Icon } from "../components/Icon";
import { profile } from "../data/profile";
import { links } from "../utils/links";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="hero-kicker mono">
        <span>
          <span className="square" /> An engineer’s working index
        </span>
        <span>{profile.location}</span>
      </div>
      <div className="hero-main">
        <div className="hero-statement" aria-label="Software. With evidence.">
          <span>Software.</span>
          <span className="hero-second">
            With <em>evidence.</em>
          </span>
        </div>
        <div className="hero-profile">
          <span className="mono eyebrow">{profile.role}</span>
          <h1 id="hero-name">
            {profile.name.split(" ")[0]}
            <br />
            {profile.name.split(" ").slice(1).join(" ")}
            <span className="signal">.</span>
          </h1>
          <p>{profile.introduction}</p>
          <div className="hero-actions">
            <a className="button button-dark hero-button" href="#projects">
              Selected work
            </a>
            <a className="text-link hero-link" href="#skills">
              Explore expertise
            </a>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <p className="hero-note">
          <span className="index-mark" aria-hidden="true">
            ↳
          </span>{" "}
          Every skill has a story.
          <br />
          <span>Here’s the work behind it.</span>
        </p>
        <div className="practice-links">
          <a href="#data-visualization">
            <span className="mono">01 / BUILD</span>Full-stack applications{" "}
            <Icon name="diagonal" />
          </a>
          <a href="#egrant">
            <span className="mono">02 / CONNECT</span>AI & data systems{" "}
            <Icon name="diagonal" />
          </a>
          <a href="#uniqa">
            <span className="mono">03 / VERIFY</span>Software quality{" "}
            <Icon name="diagonal" />
          </a>
        </div>
      </div>
      <div className="hero-foot mono">
        <span>Independent work. Shared projects. Real experience.</span>
        <div>
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub <Icon name="diagonal" />
            </a>
          )}
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <Icon name="diagonal" />
            </a>
          )}
          {links.cv && (
            <a href={links.cv} download>
              CV <Icon name="diagonal" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
