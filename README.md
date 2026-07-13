# Yu Chen — Personal Homepage

A self-contained static homepage. No build step, no framework.

- **`index.html`** — the whole site (HTML + inline CSS + a little vanilla JS).
- **`assets/`** — portrait and company logos.
- Favicons + `site.webmanifest` at the root.
- **`.nojekyll`** — tells GitHub Pages to serve the folder as-is (no Jekyll build).

## Design

A blue-led, dual-theme (light/dark) system. Accents: blue `#2563d9`, cyan `#0e8f9e`,
and a scarce coral spark `#e5556f`. Type is an Apple-style system sans — `-apple-system`
/ SF Pro on Apple devices, with **Inter** (Google Fonts) as the cross-platform stand-in.
Research is a reverse-chronological timeline; the hero name carries a blue→cyan→coral
gradient over an animated aurora. Motion respects `prefers-reduced-motion`.

## Preview

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy (GitHub Pages)

Push the contents of this folder to `RockyChen0205.github.io`. Because `.nojekyll`
is present, Pages serves the static files directly.

> The previous Jekyll version is preserved in `../rocky-new-jekyll-backup/` (it had
> automatic Google Scholar citation counts; that feature is not in the static site —
> it can be re-added with a small client-side fetch if wanted).
