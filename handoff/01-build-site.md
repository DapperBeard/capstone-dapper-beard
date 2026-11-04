# Phase 1: build the site

Paste everything in the box into Claude Code, opened in the repo root.

```
You're building the Dapper Beard Barber Shop website as a static site.

Read handoff/00-README.md first, then design/Dapper-Beard.dc.html, which is the design's source of truth.

BEFORE CHANGING ANYTHING
Run git status and list the repo's files. If the repo holds anything besides handoff/, design/, a README or a license, stop and show me what's there.

GOAL
Rebuild design/Dapper-Beard.dc.html as a production static site in site/: plain HTML, CSS and vanilla JavaScript, with no framework and no build step. It must look and behave the same as the design at phone and desktop widths.

HOW TO READ THE DESIGN FILE
- The markup inside <x-dc> is a template. The {{ ... }} holes and the <sc-if> and <sc-for> blocks are filled from the class at the bottom of the file (renderVals and state). Resolve them into real HTML.
- style-hover and style-active attributes are :hover and :active styles.
- data-reveal and data-delay are scroll-in animations driven by that script. data-count is the price count-up.
- Build the Responsive frame only: frame 'Responsive', motion 'Full', tabBar true. Drop the 'Phone' frame code path completely: the fake iPhone frame, notch and 9:41 status bar.
- To see the design itself, serve the design folder locally (python3 -m http.server) and open Dapper-Beard.dc.html. It loads React and Babel from unpkg, so it needs internet. Never ship that runtime.

MUST KEEP
- Every section, text, image, link, color, font, size and spacing as designed. Fonts: Familjen Grotesk, IBM Plex Sans and IBM Plex Mono from Google Fonts, with the same fallbacks the design uses.
- Behaviour: the sticky top bar; the bottom tab bar under 760px wide, with its active-section indicator; smooth scrolling to sections; the open-today status pill; the ₱300 count-up; the before/after slider; the "In the shop" carousel arrows; the marquee; the reveal animations.
- The open-today status uses Philippine time (Asia/Manila), not the visitor's device clock. Tuesday is the rest day.
- prefers-reduced-motion turns off the marquee, the count-up and the reveal animations.
- Content still shows if JavaScript fails: apply the hidden starting state of the reveal animations from JavaScript, never from CSS.
- The email in the contact list wraps before the @ sign on narrow screens (dapper.beard.cwi<wbr>@gmail.com), never mid-word.
- The head: title, meta description, Open Graph tags, theme-color, favicon, apple-touch icon, and the HairSalon JSON-LD.
- The accessibility already in the design: alt text, visible focus, 44px tap targets, aria labels.

ONE CONTENT CORRECTION
The postal code for San Roque, Marikina is 1801, not the 1800 the design shows (source: Marikina City's 2023 Facts and Figures). Use 1801 in the visible address and in the JSON-LD.

IMAGES
Use only the images in design/images that the page references. Copy them to site/images/, compress them, keep width and height attributes, and lazy-load everything below the first screen. JPEG is fine; WebP with a JPEG fallback is fine too.

NOT KNOWN YET: LEAVE OUT, DON'T INVENT
Daily opening hours, the beard sculpting price, the Dapper Set price, service durations, TikTok, the Google review link, a map link to the verified listing, geo coordinates, and the final domain. Mark where each would go in site/index.html with an HTML comment starting "FILL:".

ALLOWED TO CREATE OR EDIT
site/** (new), README.md, .gitignore

DO NOT EDIT
design/**, handoff/**

REPO README
Keep it short: what the site is, that design/ is the design reference, how to preview site/ locally, that site/ is the only folder that deploys, and that design changes go through the design canvas first.

CHECK BEFORE YOU COMMIT
1. Screenshot the design (Responsive) and your build at 390x844 and 1280x800, top to bottom, and compare them side by side. Fix every visible difference.
2. Run Lighthouse in mobile mode on the built page and fix anything it flags in red.
3. Confirm no request goes to unpkg, React or Babel.
4. Test every link: tel, mailto, Facebook, Messenger, Instagram and Get directions.
5. Confirm the JSON-LD parses.

COMMIT AND PUSH
Push to a new branch named site-v1 on origin (https://github.com/DapperBeard/capstone-dapper-beard) and open a pull request into main. If main doesn't exist yet, create it first from a commit holding only README.md and .gitignore. Don't merge: we merge after Pierre signs off.

Then report back with: the pull request link, every FILL: spot, the screenshots, the Lighthouse scores, and anything you couldn't match exactly.
```
