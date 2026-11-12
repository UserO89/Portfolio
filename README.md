# The Evidence Index

Vladyslav Shaposhnikov’s frontend-only portfolio: React, TypeScript, Vite, and custom CSS. Six editorial sections connect evidence-backed skills to selected projects and professional experience. The category grid, search, combined filters, sorting, contextual evidence panels, reverse skill links, and internal case studies work without a backend.

## Run locally

Use Node.js 22.12+ (Node 22 LTS recommended).

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. The development server binds to `127.0.0.1`.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

Production output is `dist/`. Fonts are self-hosted through Fontsource; no analytics, external font requests, paid services, or runtime APIs are required. Font licenses are included in `public/licenses/`. A scoped `minimatch` override patches the lint toolchain’s transitive dependency; lint and tests verify compatibility.

## Deploy to GitHub Pages

1. Push this repository to GitHub, using the `main` branch (or update the workflow’s branch).
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` installs the lockfile, runs lint and tests, builds with TypeScript checking, and uploads **only `dist/`**.
4. The workflow derives `/repository-name/` from the actual repository. For an `owner.github.io` repository, it uses `/` instead. No repository name is assumed.
5. For a custom domain, set repository Actions variable `VITE_BASE_PATH` to `/` and configure the domain in GitHub Pages. Add `public/CNAME` only after supplying the real domain.

To build locally with a project path in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/your-repository/'
npm run build
Remove-Item Env:VITE_BASE_PATH
```

The path must start and end with `/`. All navigation uses document anchors, so case-study URLs and refreshes work on static hosting. Vite rewrites assets and the favicon for the chosen base; configured CV paths use the same base. Publication itself requires a GitHub repository, push, and Pages configuration; this implementation does not push or change account settings.

## Edit content

| File                               | Purpose                                                            |
| ---------------------------------- | ------------------------------------------------------------------ |
| `src/data/profile.ts`              | Name, location, introduction, about text                           |
| `src/data/experience.ts`           | Employment and its stable evidence anchor                          |
| `src/data/projects.ts`             | Project descriptions, contributions, limitations, and case studies |
| `src/data/education.ts`            | Degree entries                                                     |
| `src/data/skills.json`             | **Canonical published skills and evidence relationships**          |
| `src/data/skills-review.ts`        | Unpublished candidates and owner confirmation requirements         |
| `links.json`                       | Contact details, public repositories, optional CV                  |
| `src/types.ts`                     | Shared content types, categories, exact status labels              |
| `src/styles/global.css`            | Typography, colors, spacing, responsive layouts, motion            |
| `src/components/ProjectVisual.tsx` | Original conceptual diagrams, explicitly not screenshots           |

### External links and CV

The original `links.json` had invalid JSON. Its supplied contact information and verified public project repositories were preserved in a named configuration structure. Optional values are `null`; missing or invalid values hide public actions. Email, GitHub, and LinkedIn are configured. eGrant’s supplied repository returned public HTTP 404 on November 12, 2026 and stays unlinked. University AI has no supplied repository.

Only put **approved, public** repository URLs into `repositories`. Runtime URL checks verify URL format and protocol, not repository visibility. Recheck public access before publishing a new link. External links open with `noopener noreferrer`. Unavailable repositories have a text status; internal case studies remain accessible.

To add a CV, place the actual PDF at `public/cv/vladyslav.pdf` and set `cv` to `"cv/vladyslav.pdf"`. Only filenames matching `cv/<letters-numbers-underscores-hyphens>.pdf` are accepted. Supply the file and configuration together to avoid a missing download. Use `null` to hide it. Do not enter placeholder URLs.

### Add a project

Add a typed `Project` to `src/data/projects.ts` with a unique `project.*` ID and unique anchor. Add an optional repository configuration under that ID. Connect at least one published skill to it in `skills.json`. The project list, case study, evidence lookup, and reverse skill links are derived automatically. For an additional project, give it a dedicated conceptual visual in `ProjectVisual.tsx`, or use an approved real screenshot with meaningful alt text.

### Add or update a skill

Edit `src/data/skills.json`. Each record needs a unique ID, name, one of the categories in `src/types.ts`, one exact status, a nonempty explanation, and normally at least one real `project.*` or `experience.*` evidence ID. The index now separates **Data & Databases**, **DevOps & Developer Tools**, and **Engineering & Delivery**. Example structure:

```json
{
  "id": "python",
  "name": "Python",
  "category": "Backend & APIs",
  "status": "Practiced",
  "evidence": ["project.egrant"],
  "explanation": "Developed Python AI-orchestrator service logic and tests."
}
```

Relationships exist **only on skills**. Projects and experience derive their associated skills with `skillsFor`, rather than copying labels into presentation components. Work experience is an independent evidence type, never a project. Development validation and automated tests reject duplicate IDs, missing evidence, unknown categories/statuses, invalid anchors, kind mismatches, duplicate relationships, and entries with no reverse relationships.

The owner explicitly requested React, TypeScript, and Linux without project links for now. These records use `evidence: []`, `evidenceState: "unlinked"`, and a nonempty `evidenceNote`. Their panels display **Project evidence has not been linked yet**, with no invented project action. This is an explicit exception: an empty evidence array without that state and explanatory note still fails validation. To link one later, add actual evidence IDs and remove `evidenceState`/`evidenceNote` (or set the state to `"linked"`). Skill experience/knowledge and linked project evidence are independent fields.

The original supplied CSV initialized V1 with **only `publish=yes` rows**. V1.1 adds owner-approved evidence from the current employment description and the corrected Resort role. The source CSV is not imported at runtime. Future edits belong in `skills.json`; apply the publication gate and review explanations when importing another matrix. `src/data/skills-review.ts` holds unsupported or editorially deferred candidates and their confirmation requirements; it is not imported into the public site. Tests check that pending candidates stay unpublished, without asserting a fixed skill count. Approve a skill by adding its evidence-backed record and removing the corresponding pending candidate.

Skill colors now describe practical experience and knowledge. Store one of these exact values in `skills.json`; the shared labels and explanations live in `src/types.ts`:

- **Practiced** → green, **Practical experience**: experienced through practical use in projects or work.
- **Studied** → yellow, **Studied / Knowledge**: studied the topic and have knowledge of its concepts and use.
- **Exploring** → blue, **Studying / Exploring**: currently studying, learning, or exploring the topic.

Existing color assignments were preserved during this concept change: Applied → Practiced, In Progress → Studied, and Exploring → Exploring. The old In Progress value is no longer a skill status. A project’s own development/research status is separate and unchanged. Team technology does not imply individual ownership.

## Architecture and accessibility

`src/sections/` contains the six page sections; `src/components/` contains navigation, headings, icons, and conceptual project diagrams. `src/utils/` contains independently tested filtering, data validation, and link handling. Components use stable evidence IDs and data files instead of duplicating skill names.

The expertise grid shows all categories and skills by default, with three columns on large screens, two on laptops, and one on mobile. Skills are curated for breadth: related tasks share one entry and retain their specifics in the explanation. Compact chips use green for practical experience, yellow for studied knowledge, and blue for studying/exploring. A shared legend, tooltips, screen-reader text, and the selected skill panel explain these meanings without repeating a visible label on every chip. Search and filters hide empty categories; selecting a skill opens a contextual panel within its category. Native buttons, selects, disclosures, labeled fields, a live result count, skip link, visible focus styles, and reduced-motion support keep the index keyboard accessible. Escape closes the panel; the close control returns focus to its skill. The understated, narrow search field matches skill names only; project names, employers, and evidence descriptions are excluded. There is no pagination. Filters combine, sorting is deterministic, and reset restores the default index.

Project order is defined by `src/data/projects.ts`, currently University AI Assistant → eGrant → Resort Empire → the Data Visualization thesis, following the owner’s recency ordering. Update the editorial numbers when moving entries. Stable IDs preserve evidence links when entries move. `ProjectVisual.tsx` maps each known ID explicitly and provides a neutral visual for future projects. Resort Empire is marked Completed following the owner’s confirmation, with no completion date displayed or configured. The owner-maintained education file includes the English Philology degree and was preserved exactly in the latest revision.

## Content review and next steps

See [CONTENT_REVIEW.md](CONTENT_REVIEW.md) for missing owner inputs, withheld content, source limitations, and useful v2 improvements, and [VALIDATION.md](VALIDATION.md) for executed checks and the outstanding browser QA. Keep private content packs, employer artifacts, real grant documents, and third-party screenshots out of `public/`. `portfolio-context/` is ignored and is never a production asset directory.
