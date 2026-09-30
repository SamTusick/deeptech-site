# FGCU DeepTech — website

Static site. No build step, no dependencies. Open `index.html` in a browser and it works.

```
site/
├── index.html        Home: target launch, the rocket, Payload Challenge summary, teams, leadership, sponsors
├── payload.html      Fall 2026 Rocket Payload Challenge (from the challenge deck)
├── join.html         GroupMe / Eagle Link / Instagram, meetings, teams
└── assets/
    ├── css/main.css  All styling
    ├── js/main.js    Starfield + shooting stars, launch day count, schedule states, nav, fade-ins
    └── img/          logo.jpg (original), logo-96.png (header/footer), favicon.png, apple-touch-icon.png
```

To preview with a server: `cd site && python -m http.server 8000`, then open http://localhost:8000.

## Content rule

Everything on the site is real, confirmed club information. If something isn't known yet,
leave it out or say "coming soon" — don't fill the gap with a plausible guess.

## Things to update as they firm up

| What                                                 | Where                                                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Launch date (drives the "days to go" count)          | `assets/js/main.js`, `LAUNCH_DATE` at the top; plus the text "Around November 30, 2026" in `index.html` |
| Rocket figures (~12 ft, L900, ~5,000 ft, ~Mach 0.55) | `index.html`, `#rocket` section                                                                         |
| Team members once selected                           | `index.html` `#team` and `join.html` Teams section                                                      |
| Sponsor names / logos                                | `index.html`, `#sponsors` section                                                                       |
| Club email (none yet)                                | add to footer "Find us" list on all three pages                                                         |

The header and footer are copied into each of the three pages, so edit all three when those change.

## Design

- Fonts (Google Fonts): **Chakra Petch** for headings and labels, **Barlow** for reading text,
  **IBM Plex Mono** for numbers.
- Colors are FGCU's: cobalt `#002D72` in the backdrop, emerald `#007749`, with a brightened
  emerald `--signal: #3FD99A` used as the one accent color.
- The starfield (`starfield()` in `main.js`) draws slow parallax stars and an occasional
  shooting star. All motion is disabled under `prefers-reduced-motion`.
- The status strip at the top shows days to the target launch (from `LAUNCH_DATE`), FGCU's
  coordinates and Fort Myers. The altitude rail on the right (wide screens) is a rocket that
  climbs as you scroll, reading 0 ft at the top of the page to ~5,000 ft (the predicted
  apogee, `APOGEE_FT` in `altitude()`) at the bottom. Narrower screens get a thin progress
  line under the strip instead.
- The Payload Challenge schedule marks past steps and highlights the next one automatically
  based on today's date (`data-date` on each item).

## Deploying to GitHub Pages

The `site/` directory is the site root. Point Pages at this folder, or:

```bash
git subtree push --prefix site origin gh-pages
```
