# Dapper Beard website: Claude Code handoff

Everything Claude Code needs to build and ship the Dapper Beard Barber Shop site to https://github.com/DapperBeard/capstone-dapper-beard.

## What's in this package

- `design/` holds the approved design from the claude.ai canvas: `Dapper-Beard.dc.html`, the runtime that previews it (`support.js`), and the 16 images the page uses. It's reference only: never edited, never deployed.
  One difference from the canvas: the canvas currently opens on the iPhone mockup (frame: Phone). This copy is set to Responsive, because the website is the responsive layout.
- `handoff/` holds these instructions, one file per phase.
- `site/` doesn't exist yet. Phase 1 builds it, and it's the only folder that gets deployed.

## How to run it

1. Clone the repo and unzip this package into its root, so `handoff/` and `design/` sit at the top level.
2. Make sure your machine can push to the repo: `gh auth status`, or `git push --dry-run`.
3. Open Claude Code in the repo root and paste the prompt from `01-build-site.md`.
4. Review what it reports, get Pierre's sign-off, then follow `02-deploy.md`.
5. Once the owner's answers are in and the Google Business Profile is verified, run `03-finalize-content.md`.

## Rules for every phase

- Nothing goes live without Pierre's written sign-off.
- Design changes happen in the design canvas first, never directly in code. Then give Claude Code a short prompt to port them.
- Name, address and phone must match the Google Business Profile exactly: Dapper Beard Barber Shop; 24A Mayor Gil Fernando Ave, San Roque, Marikina City, 1801 Metro Manila; 0992 560 0499.
- Each phase works on its own branch and opens a pull request into `main`. Nothing is pushed straight to `main`.

## Phases

| Phase | File | Needs |
|---|---|---|
| 1. Build the site | `01-build-site.md` | Nothing; ready now |
| 2. Deploy | `02-deploy.md` | Pierre's sign-off on phase 1; a Cloudflare account under the shop's email |
| 3. Finalize content | `03-finalize-content.md` | The owner's answers; a verified Google Business Profile |
