# Personal technical site

This repository is intended for the personal technical site at `https://masa-mono.github.io/`. It will publish Japanese and English writing through Astro and GitHub Pages. The views expressed on the site are personal and do not represent an employer's official position.

## Current state

The Astro application builds a static site with temporary Japanese and English entry pages. Editorial pages and the publication workflow are separate follow-up work. GitHub Pages is currently unpublished.

## Local development

1. Install the Node.js version in `.nvmrc` (Node.js 24 LTS) and check `node --version`.
2. Run `npm ci` to install exactly the dependencies in `package-lock.json`.
3. Run `npm run dev` and open the local URL printed in the terminal.
4. Run `npm run build` before opening a pull request. This generates the production site in `dist/`.
5. Run `npm run preview` to inspect the production build locally.

The Astro `site` setting is `https://masa-mono.github.io/`, with root `base: '/'`, matching this user's GitHub Pages repository. Building locally does not publish the site.

## Change and review flow

1. Create a branch from the current `main`: `feature/<topic>` for site features, `content/<topic>` for writing, or `fix/<topic>` for corrections. Use lowercase words separated by hyphens.
2. Make one coherent change per branch. Keep credentials, local environment files, private information, and unlicensed material out of commits.
3. Check both Japanese and English versions of any changed content. Verify public claims, links, keyboard access, and image descriptions where relevant.
4. Run `npm ci` and `npm run build`. Open a pull request using the template and record the checks actually performed.
5. Merge into `main` only after review and passing required checks. The Pages deployment workflow is planned for the CI and publication steps; this repository does not deploy yet.

## Recovery

If a published change causes a problem, identify the last stable commit from the Git history and the corresponding successful Pages deployment. Create a `fix/<topic>` branch from current `main`, revert the offending commit with `git revert <commit>`, and open a pull request. After checks pass and the revert is merged, confirm the new Pages deployment succeeded and inspect the affected production URLs. Avoid force pushing or resetting the published branch.

## Licensing and content

The [MIT license](LICENSE) covers source code and configuration in this repository. Article text, photographs, illustrations, logos, and other editorial content are excluded and remain with their respective rights holders unless a file explicitly says otherwise. A link or inclusion in this repository does not grant permission to reuse third-party material.
