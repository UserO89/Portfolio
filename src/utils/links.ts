import config from "../../links.json";
import type { ProjectId } from "../types";

export function safeExternal(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.hostname === "example.com" ||
      url.hostname.endsWith(".example.com")
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}
export function safeRepository(value: unknown): string | null {
  const url = safeExternal(value);
  if (!url) return null;
  const parsed = new URL(url);
  return parsed.hostname === "github.com" &&
    /^\/[^/]+\/[^/]+\/?$/.test(parsed.pathname) &&
    !parsed.search &&
    !parsed.hash
    ? url
    : null;
}
export function safeCv(
  value: unknown,
  base = import.meta.env.BASE_URL,
): string | null {
  if (typeof value !== "string" || !/^cv\/[a-zA-Z0-9_-]+\.pdf$/.test(value))
    return null;
  return `${base}${value}`;
}
export const links = {
  github: safeExternal(config.github),
  linkedin: safeExternal(config.linkedin),
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email ?? "")
    ? `mailto:${config.email}`
    : null,
  cv: safeCv(config.cv),
};
export const repositoryFor = (id: ProjectId) =>
  safeRepository((config.repositories as Record<string, string | null>)[id]);
