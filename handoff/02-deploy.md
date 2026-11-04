# Phase 2: deploy

Most of this phase is done by you in the browser, not by Claude Code.

## Steps for the team

1. **Sign-off.** Pierre reviews the phase 1 screenshots or a local preview and signs off in writing. Then merge the site-v1 pull request into `main`.
2. **Hosting account.** Create the Cloudflare account with the shop's email (dapper.beard.cwi@gmail.com), so the owner controls hosting after the project ends. Before relying on it, confirm Cloudflare's current terms allow a business website on the free plan.
3. **Connect the repo.** Create a Pages project, connect it to GitHub, and choose DapperBeard/capstone-dapper-beard. Production branch: `main`. Framework preset: none. Build command: none. Build output directory: `site`. Dashboard labels change over time; if you can't find Pages, look for the option to deploy a static site from a Git repository.
4. **Note the live address** Cloudflare gives you, then run the Claude Code prompt below.
5. **Go public.** After Pierre signs off on the live address, add it to the Google Business Profile's website field and to the Facebook Page.
6. **From now on,** every change goes on its own branch. Cloudflare builds a preview for it, Pierre signs off on the preview, then you merge.

## Claude Code prompt, once the live address exists

```
The site is now live at [LIVE ADDRESS]. Update site/ for it:
- Add a canonical link to [LIVE ADDRESS]/ and set og:url to the same address.
- Make og:image, and the image and logo in the JSON-LD, absolute addresses on [LIVE ADDRESS].
- Add a url field with [LIVE ADDRESS]/ to the JSON-LD.
- Add site/robots.txt allowing everything and pointing to the sitemap, and site/sitemap.xml listing the one page.

ALLOWED TO EDIT
site/index.html (the head only), site/robots.txt and site/sitemap.xml (both new)

DO NOT EDIT
design/**, handoff/**, anything else in site/

Commit on a branch named deploy-urls, push it, and open a pull request into main.
```
