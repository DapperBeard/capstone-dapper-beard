# Dapper Beard Barber Shop website

The one-page website for Dapper Beard Barber Shop, 24A Mayor Gil Fernando Ave, San Roque, Marikina City. It's a static site: plain HTML, CSS and a small JavaScript file, with no framework and no build step.

## What's where

- `site/` is the website, and the only folder that gets deployed.
- `design/` is the approved design from the claude.ai design canvas (`Dapper-Beard.dc.html`). It's the reference for how the site should look and behave. It's never edited and never deployed.
- `handoff/` holds the phase-by-phase instructions for building, deploying and finishing the site.

## Preview locally

```bash
python3 -m http.server 8000 --directory site
```

Then open http://localhost:8000.

## Making changes

Design changes happen in the design canvas first, never directly in code. Once a change is approved there, port it to `site/` with a short Claude Code prompt.

Content still to confirm (hours, prices, TikTok, the verified map and review links) is marked in `site/index.html` with HTML comments that start with `FILL:`.
