# Phase 3: finalize content

Run this once the owner has answered and the Google Business Profile is verified. Fill in every `[BRACKET]` first. If an answer still isn't in, write `[UNKNOWN]` and Claude Code will leave that spot alone.

## Answers to collect

| Item | From |
|---|---|
| Opening and closing time for each day; confirm Tuesday is the rest day | Owner |
| Beard sculpting price | Owner |
| Dapper Set (haircut + beard sculpting) price | Owner, with Pierre's sign-off |
| TikTok link | Owner, once the account exists |
| Google Maps link to the verified listing, and its coordinates | Google Business Profile |
| Google review link | Google Business Profile |

## Claude Code prompt

```
Fill in the confirmed shop details below. Change content only: no layout, color, font or spacing changes. Each value goes where an HTML comment starting "FILL:" marks it in site/index.html; delete each comment once its spot is filled. If a value below says [UNKNOWN], leave that spot exactly as it is.

HOURS: [HOURS FOR EACH DAY]
- Replace the "Closed Tuesdays" line in the Visit and contact section with the full hours, keeping "Closed Tuesdays".
- Add openingHoursSpecification for each open day to the JSON-LD.

PRICES
- Beard sculpting: ₱[PRICE]
- Dapper Set (haircut + beard sculpting): ₱[PRICE]
- Add each one as a new row in the price list, copying the markup and styling of the Haircut row exactly.
- Set the JSON-LD priceRange from the lowest to the highest price shown.

TIKTOK: [TIKTOK URL]
- Add a TikTok row to the contact list and a TikTok link in the footer, matching the Instagram ones.
- Add it to sameAs in the JSON-LD.

DIRECTIONS: [GOOGLE MAPS LINK OF THE VERIFIED LISTING]
- Point the Get directions button at it.
- Add geo coordinates [LATITUDE, LONGITUDE] to the JSON-LD.

GOOGLE REVIEW LINK: [REVIEW LINK]
- The current design has no review button. Don't add one; just tell me where it could go, so the group can design it first.

ALLOWED TO EDIT
site/index.html

DO NOT EDIT
design/**, handoff/**, and the site's CSS or JavaScript beyond what a new price row strictly needs

Commit on a branch named content-final, push it, and open a pull request into main. Pierre signs off on the Cloudflare preview before anyone merges.
```
