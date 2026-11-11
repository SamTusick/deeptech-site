# FGCU DeepTech — website

React + Tailwind CSS, built with Vite.

```bash
cd site
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build into dist/
npm run preview   # serve the built dist/ locally
```

```
site/
├── index.html, payload.html, join.html   Page entries (title + meta tags live here)
├── public/assets/img/                    logo.jpg (original), logo-96.png, favicon.png, apple-touch-icon.png
└── src/
    ├── config.js             LAUNCH_DATE, APOGEE_FT, Instagram / GroupMe / Eagle Link URLs
    ├── index.css             Tailwind import, design tokens (@theme), global rules
    ├── components/
    │   ├── Layout.jsx        Page shell: starfield, status strip, altitude rail, header, footer, fade-ins
    │   ├── Chrome.jsx        Status strip, altitude rail, header + mobile drawer, footer
    │   ├── Starfield.jsx     Parallax stars + shooting stars (canvas)
    │   └── ui.jsx            Shared blocks: Label, Section, Facts, Table, List, Card, Btn, Panel…
    └── pages/
        ├── Home.jsx          Target launch, the rocket, Payload Challenge summary, teams, leadership, sponsors
        ├── Payload.jsx       Fall 2026 Rocket Payload Challenge (from the challenge deck)
        └── Join.jsx          GroupMe / Eagle Link / Instagram, meetings, teams
```

Each page is its own HTML entry (a multi-page build, not a single-page app), so URLs stay
`index.html`, `payload.html`, `join.html` and anchors like `index.html#rocket` keep working.
The header and footer are shared components, so edit them once in `Chrome.jsx`.

## Content rule

Everything on the site is real, confirmed club information. If something isn't known yet,
leave it out or say "coming soon" — don't fill the gap with a plausible guess.

## Things to update as they firm up

| What                                                 | Where                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Launch date (drives the "days to go" count)          | `src/config.js`, `LAUNCH_DATE`; plus the text "Around November 30, 2026" in `pages/Home.jsx` |
| Rocket figures (~12 ft, L900, ~5,000 ft, ~Mach 0.55) | `pages/Home.jsx`, `#rocket` section                                                         |
| Team members once selected                           | `pages/Home.jsx` `#team` and `pages/Join.jsx` Teams section                                 |
| Leadership                                           | `LEADERSHIP` in `pages/Home.jsx`                                                            |
| Payload Challenge schedule                           | `SCHEDULE` in `pages/Payload.jsx`                                                           |
| Sponsor names / logos                                | `pages/Home.jsx`, `#sponsors` section                                                       |
| Club email (none yet)                                | add to the footer "Find us" list in `components/Chrome.jsx`                                 |

## Design

- Fonts (Google Fonts, linked in each HTML entry): **Chakra Petch** for headings and labels
  (`font-head`), **Barlow** for reading text (`font-sans`), **IBM Plex Mono** for numbers (`font-num`).
- Colors are FGCU's, defined as Tailwind theme tokens in `src/index.css`: cobalt `#002D72`
  (`cobalt`), emerald `#007749` (`emerald`), with a brightened emerald `#3FD99A` (`signal`)
  used as the one accent color. Text greys are `ink`, `ink-2`, `ink-3`; hairlines are `line`, `line-2`.
- The starfield draws slow parallax stars and an occasional shooting star. All motion is
  disabled under `prefers-reduced-motion`.
- The status strip shows days to the target launch, FGCU's coordinates and Fort Myers. The
  altitude rail on the right (wide screens) is a rocket that climbs as you scroll, reading 0 ft
  at the top of the page to `APOGEE_FT` at the bottom. Narrower screens get a thin progress
  line under the strip instead.
- The Payload Challenge schedule marks past steps and highlights the next one automatically
  based on today's date.
- Elements marked `data-rv` fade in as they scroll into view.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` (at the repo root) builds `site/` and publishes `site/dist` on
every push to `main`. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
The build uses relative asset paths (`base: './'`), so it works at a project subpath too.
