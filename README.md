# Yu Chen — Personal Homepage

A self-contained static homepage. No build step, no framework.

- **`index.html`** — the whole site (HTML + inline CSS + a little vanilla JS).
- **`assets/`** — portrait, company logos, CV, and the self-hosted display font.
- **`google_scholar_crawler/`** — fetches the Scholar citation count (see below).
- Favicons + `site.webmanifest` at the root.
- **`.nojekyll`** — tells GitHub Pages to serve the folder as-is (no Jekyll build).

## Design

Editorial type over a single-accent, cool-neutral palette. Headings are set in
**Newsreader** (self-hosted variable woff2, `opsz` axis); body and UI text use the
system sans — `-apple-system` / SF Pro on Apple devices, Segoe UI on Windows.
One accent: blue `#2563d9` in light, `#5b8dff` in dark.

Both themes come from a single `light-dark()` token block, with an `@supports`
fallback for pre-2024 browsers. The toggle pins `color-scheme` and persists to
`localStorage`; with no stored choice, the OS setting wins.

Research is a reverse-chronological timeline; publications are grouped by year.
Motion respects `prefers-reduced-motion`, materials respect
`prefers-reduced-transparency`, and all content stays visible without JS.

## Citation count

`.github/workflows/google_scholar_crawler.yaml` runs daily, writing Scholar JSON
to the `google-scholar-stats` orphan branch. `index.html` reads it back from
jsDelivr and fills the badge in the Publications heading. On failure the badge
stays hidden rather than showing a number that has gone stale.

## Preview

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy (GitHub Pages)

Pages serves `master` directly, and `.nojekyll` keeps the files as-is.
