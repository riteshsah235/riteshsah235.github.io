<div align="center">

# Ritesh Sah | Portfolio

**AI/ML Engineer. B.S. Data Science & Applications, IIT Madras.**

[![Live site](https://img.shields.io/badge/live-riteshsah235.github.io-2ea44f?style=for-the-badge)](https://riteshsah235.github.io/)
[![GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-181717?style=for-the-badge&logo=github)](https://pages.github.com/)
[![Contributions data](https://img.shields.io/badge/contributions-auto--updated%20hourly-blue?style=for-the-badge&logo=githubactions&logoColor=white)](.github/workflows/contrib.yml)

[Live site](https://riteshsah235.github.io/) · [Projects](#projects) · [Project structure](#project-structure) · [Run locally](#run-locally)

</div>

---

## Overview

A fast, single-page personal portfolio built with plain HTML, CSS and JavaScript. There is no framework and no build step, so the files in this repository are exactly what is served.

The page presents an "About" dossier, live project demos with animated previews, a filterable tech stack, a GitHub activity heatmap and contact links.

## Highlights

- **Dossier-style About section** with a halftone portrait rendered on a canvas from the GitHub profile photo, plus a live IST clock.
- **Animated project cards.** Each card has a pure CSS preview marked "Illustrative preview". On hover it fades to a real screenshot marked "Demo capture". Touch devices show the animation only, and `prefers-reduced-motion` shows a still frame.
- **Filterable tech stack** grouped by AI/ML, backend, frontend, tools and languages (Python, JavaScript, TypeScript, Java, SQL, HTML and CSS).
- **GitHub activity heatmap** drawn from the public contribution graph of [`riteshsah235`](https://github.com/riteshsah235), refreshed every hour by a GitHub Action.
- **Responsive layout** for desktop and mobile with a floating pill navigation.

## Projects

| Project | What it is | Live demo | Code |
| --- | --- | --- | --- |
| **CS Arena** | Play-and-learn computer science quiz game with explained questions and timed 1v1 duels | [Open](https://cs-arena-kz30.onrender.com/) | [cs-arena](https://github.com/riteshsah235/cs-arena) |
| **Bomb Tag** | Real-time multiplayer party game for 2 to 8 friends with room invites | [Open](https://bomb-tag-arena.onrender.com/) | [bomb-tag-arena](https://github.com/riteshsah235/bomb-tag-arena) |
| **NexusLife** | AI assistant that reads email and prepares action cards for review | [Open](https://nexuslife-dg8a.onrender.com/) | Private repository |

The demos run on free hosting, so the first request after a quiet period can take a little while to wake up.

## Project structure

```text
.
├── index.html                     # Page markup (must stay at the root for GitHub Pages)
├── assets/
│   ├── css/
│   │   └── style.css              # All styles, animations and responsive rules
│   ├── js/
│   │   └── app.js                 # Halftone portrait, filters, clock, heatmap rendering
│   └── images/
│       ├── profile.jpg            # GitHub profile photo, rendered as the halftone portrait in About
│       ├── cs-arena.jpg           # "Demo capture" screenshots shown on card hover
│       ├── bomb-tag.jpg
│       └── nexuslife.jpg
├── data/
│   └── contrib.json               # Contribution graph data (generated, do not edit by hand)
├── scripts/
│   └── update_contrib.py          # Builds data/contrib.json from the public contribution graph
├── .github/
│   └── workflows/
│       └── contrib.yml            # Hourly job that runs the script and commits the result
├── .nojekyll                      # Serve files as they are, without Jekyll processing
└── README.md
```

## How the activity heatmap stays current

```text
GitHub Action (hourly, minute 17)
        │
        ▼
scripts/update_contrib.py  ──►  reads github.com/users/riteshsah235/contributions
        │
        ▼
data/contrib.json  (committed to main)
        │
        ▼
assets/js/app.js  ──►  draws the heatmap and shows the "Updated" time in IST
```

- The page reads `data/contrib.json`, which comes straight from GitHub's own public contribution graph.
- If that file cannot be loaded, the page falls back to a cached public feed and labels it as possibly lagging.
- New contributions can take up to an hour to appear, plus a few minutes of browser and Pages caching.
- The job can also be started by hand from the **Actions** tab (`Update contributions`, then **Run workflow**).

## Run locally

Requires only Python 3. Serve the folder over HTTP so the data file can be fetched:

```bash
git clone https://github.com/riteshsah235/riteshsah235.github.io.git
cd riteshsah235.github.io
python3 -m http.server 8000
```

Open <http://localhost:8000>. To refresh the contribution data locally:

```bash
python3 scripts/update_contrib.py
```

## Deployment

The site is served by GitHub Pages from the `main` branch root of the user site repository, [`riteshsah235/riteshsah235.github.io`](https://github.com/riteshsah235/riteshsah235.github.io), at <https://riteshsah235.github.io/>. This repository is the single source of truth, so any push to `main` updates the live site. The relative paths in `index.html` work from the root and from a subfolder.

## Customising

| To change | Edit |
| --- | --- |
| Text, sections, links, project cards | `index.html` |
| Colours, spacing, animations | `assets/css/style.css` |
| Behaviour, filters, heatmap rendering | `assets/js/app.js` |
| Card screenshots | `assets/images/` (keep the file names or update `index.html`) |

The resume tile is marked "Coming soon" until a resume file is added.

## Design credit

The layout takes its structure from [rmoon.me](https://rmoon.me/): a dark page, a dossier-style About section, a card grid and floating navigation. All text, visuals, animations and code here are original.

## Contact

- GitHub: [riteshsah235](https://github.com/riteshsah235)
- Email: [riteshsah235@gmail.com](mailto:riteshsah235@gmail.com)

---

<div align="center">

© 2026 Ritesh Sah. All rights reserved.

</div>
