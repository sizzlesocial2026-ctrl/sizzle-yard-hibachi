# Sizzle Yard Hibachi Video Review Notes

Date: 2026-07-07

Company: Sizzle Yard Hibachi only.

## Review Rule

Do not place any video on the public website until it passes all of these checks:

- Fits Sizzle Yard Hibachi: backyard birthday, party, guests happy, food, safe small fire moment.
- Does not show Sizzle Social Hibachi branding, phone number, menu, QR code, ad creative, or old watermark.
- Does not show clear children's faces.
- Does not expose home addresses, license plates, private documents, or customer phone numbers.
- Does not make fire look large, risky, crowded, or uncontrolled.
- Does not duplicate a video already used by Sizzle Social Hibachi.

## Workflow

1. Build the local preview page with `npm run video:review`.
2. Open `media/video_review.html`.
3. Mark promising candidates by filename in this document.
4. Copy only approved videos into `media/video-approved-yard-only`.
5. Compress/crop website-ready versions into `media/video-optimized-web`.
6. Record every approved video in `media/source_manifest.csv`.
7. Only then add videos to `index.html` or city pages.

## Candidate Decisions

First-pass browser review from local preview page:

| # | Temporary review file | Decision | Reason |
|---|---|---|---|
| 01 | sizzle-yard-review-01-2026-04.mp4 | Maybe, needs permission | Sunset backyard party feeling is good, but adult guests are clearly visible. Do not use as public main visual unless customer permission is confirmed or the clip is cropped to reduce face focus. |
| 02 | sizzle-yard-review-02-2026-04.mp4 | Reject for website | Looks more like indoor/garage party footage than Sizzle Yard backyard hibachi. |
| 03 | sizzle-yard-review-03-2026-04.mp4 | Reject | Clear child's face visible. |
| 04 | sizzle-yard-review-04-2026-04.mp4 | Reject or heavy caution | Indoor flame moment may feel unsafe for a public sales page. |
| 05 | sizzle-yard-review-05-2026-04.mp4 | Reject for homepage | Dark indoor/low sales value. |
| 06 | sizzle-yard-review-06-2026-04.mp4 | Reject | Child visible at table. |
| 07 | sizzle-yard-review-07-2026-05.mp4 | Strong maybe, needs permission | Adult backyard long-table interaction; this is the closest fit for Sizzle Yard party trust. Use only with permission or a privacy-safe crop/short clip. |
| 08 | sizzle-yard-review-08-2026-05.mp4 | Maybe for entertainment context only | Costume/performance energy could support party feeling, but it may distract from hibachi service and needs brand/rights confirmation. |
| 09 | sizzle-yard-review-09-2026-05.mp4 | Needs deeper review | First frame dark/unclear in browser. |
| 10 | sizzle-yard-review-10-2026-05.mp4 | Reject for website | Beach group clip, not hibachi service. |
| 11 | sizzle-yard-review-11-2026-05.mp4 | Strong maybe, needs permission | Real grill and guest interaction; useful if trimmed to food/griddle/action and privacy is handled. |
| 12 | sizzle-yard-review-12-2026-05.mp4 | Reject for website | Beach group clip, not hibachi service. |
| 13 | sizzle-yard-review-13-2026-05.mp4 | Needs deeper review | First frame unclear in browser. |
| 14 | sizzle-yard-review-14-2026-06.mp4 | Needs deeper review | First frame partly visible; likely outdoor but not enough information from preview. |
| 15 | sizzle-yard-review-15-2026-06.mp4 | Needs deeper review | First frame dark/unclear in browser. |
| 16 | sizzle-yard-review-16-2026-06.mp4 | Needs deeper review | First frame dark/unclear in browser. |
| 17 | sizzle-yard-review-17-2026-06.mp4 | Maybe, low priority | Family/table moment, but not a strong hibachi sales visual. |
| 18 | sizzle-yard-review-18-2026-06.mp4 | Reject | Blurry and flame/torch moment may feel unsafe. |
| 19 | sizzle-yard-review-19-2026-06.mp4 | Reject for website | Beach group clip, not hibachi service. |
| 20 | sizzle-yard-review-20-2026-06.mp4 | Low priority | Setup/equipment/chef prep; not enough party/customer trust for homepage. |
| 21 | sizzle-yard-review-21-2026-06.mp4 | Needs deeper review | First frame dark/unclear in browser. |
| 22 | sizzle-yard-review-22-2026-07.mp4 | Reject unless proven otherwise | First frame shows non-hibachi signage/indoor scene risk. |
| 23 | sizzle-yard-review-23-2026-07.mp4 | Reject unless proven otherwise | First frame shows non-hibachi signage/indoor scene risk. |
| 24 | sizzle-yard-review-24-2026-07.mp4 | Needs deeper review | First frame dark/unclear in browser. |
| 25 | sizzle-yard-review-25-2026-07.mp4 | Reject for homepage | Kitchen prep, not customer party/trust. |
| 26 | sizzle-yard-review-26-2026-07.mp4 | Maybe, needs rights/brand check | The “Sake gun Show” overlay could support party feeling if it is our own service and allowed, but it may create brand/offer confusion. |
| 27 | sizzle-yard-review-27-2026-07.mp4 | Reject for homepage | Too dark for trust-building website use. |
| 28 | sizzle-yard-review-28-2026-07.mp4 | Maybe, low priority | Food closeup has low privacy risk, but it does not show happy customers or a rich party experience. |

Best next candidates for actual short-clip testing: #07, #11, #26, and possibly #28.

Do not add #07 or #11 to public pages until customer permission is confirmed or the edit clearly avoids identifiable guest faces.
