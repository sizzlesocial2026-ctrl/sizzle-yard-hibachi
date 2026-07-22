# Sizzle Yard Hibachi Deployment Result

Date: 2026-07-01

Vercel account/team: sizzleyard2026-9501's projects

Project name: sizzle-yard-hibachi

Live URL:
https://sizzle-yard-hibachi.vercel.app/

Custom domain:
https://sizzleyardhibachi.com/

WWW domain:
https://www.sizzleyardhibachi.com/

Verified:
- Homepage loads successfully.
- Logo and hero content render.
- Phone/SMS link uses +1 626-681-5258.
- Temporary Stripe deposit link is present.
- Booking form section is visible.
- Custom domain loads successfully.
- Vercel shows valid configuration for sizzleyardhibachi.com and www.sizzleyardhibachi.com.
- ICANN/domain email verification completed by owner.
- Google Business Profile website URL updated to https://sizzleyardhibachi.com/.
- Local site check passed after adding instant estimate, city page links, and updated lead fields.

Next:
- Finish the first Google Ads campaign draft and publish only after final review.
- Verify Google Ads detects the Sizzle Yard lead, phone, and SMS conversion actions.

Pending deployment package:
`/private/tmp/sizzle-yard-deploy/sizzle-yard-hibachi-quote-update.zip`

Latest pending deployment package after phone update:
`/private/tmp/sizzle-yard-deploy/sizzle-yard-hibachi-phone-366-update.zip`

## 2026-07-01 Follow-up

Deployment retry from CLI still failed with:

```text
Error: Not able to load user because of unexpected error: fetch failed
```

Vercel account is logged in as `sizzleyard2026-9501`, and the dashboard shows the existing `sizzle-yard-hibachi` project. The dashboard currently says production deployment should be done by Git connection or `vercel --prod`; there is no safe zip upload replacement shown for the existing project.

## Phone Update

- Website source now uses `(626) 681-5258` / `+16266815258`.
- Google Business Profile phone remains unchanged to match this number.
- Local site check passed.
- Deployment retry still failed with `fetch failed`, so the phone update is local and packaged but not confirmed live yet.

## GitHub Repository

- GitHub repo created: `https://github.com/sizzlesocial2026-ctrl/sizzle-yard-hibachi`
- Local temporary Git repo prepared at `/private/tmp/sizzle-yard-git-1782929973`.
- Initial commit created: `Initial Sizzle Yard Hibachi website`.
- Push failed from terminal because the local command environment cannot resolve `github.com`.
- Website files uploaded through GitHub web upload.
- Vercel project connected to GitHub repository.
- Trigger commit created on GitHub: `4dd2b22` / `Create deploy-trigger.txt`.
- Vercel production deployment from GitHub completed and showed `Ready`.
- Live custom domain verified at `https://sizzleyardhibachi.com/?v=4dd2b22`.
- Verified live phone/SMS uses `(626) 681-5258` / `+16266815258`.
- Verified live page includes instant estimate fields and local city page links.

## 2026-07-08 Tracking Robustness Update

- Website tracking and lead settings were moved into `script.js`.
- HTML pages no longer load a separate `config.js` file, because Chrome ad blockers can block generic config filenames and prevent lead capture / conversion testing.
- Current Sizzle Yard Google Ads ID is `AW-18300535067`.
- Old Sizzle Social-style Ads ID references should not be reused for Yard.
- Production deployment completed: `dpl_CxtqaCZ6nBVWWfXefgXaj8mNrqQP`.
- Custom domain `https://sizzleyardhibachi.com/` verified on the new deployment.
- Live homepage now loads `script.js` directly and no longer references `config.js`.
- Live browser test submitted `TEST Codex Do Not Contact`; Google Sheet `Sizzle Yard Hibachi Leads` received it in `Leads` row 18 at 2026-07-08 04:20:52 PT. After verification, the test row was deleted and re-search confirmed no matching test lead remained.
- Google Ads account `Sizzle Yard Hibachi 140-928-8080` was checked after deployment: billing card is present. Before publishing, `Sizzle Yard - SMS Click` still showed as not verified and Google Ads warned that an ad blocker was active in Chrome.
- Google Ads campaign published on 2026-07-08: `Sizzle Yard - Search Leads - SoCal`.
- Published settings: Search campaign, leads objective, calls + lead form conversions, Southern California only, English language, 15 exact/phrase-style hibachi keywords, one responsive search ad, average daily budget `US$20.00/day`.
- Important correction before publishing: removed the broad `United States` location target and kept `Southern California` only.
- Post-publish Ads verification on 2026-07-08: campaign ID `24017259817`, account `Sizzle Yard Hibachi 140-928-8080`, campaign name visible in Google Ads overview, ad status `符合条件` / eligible, new bid strategy learning, start date 2026-07-08, clicks 0, impressions 0, cost $0.00 at first check.
- Live ad preview verified in the Yard Ads account: `Sizzle Yard Hibachi | Hibachi At Home | Birthday Hibachi Party`, URL path `sizzleyardhibachi.com/hibachi/birthday`.
- Google Business Profile verified and publicly manageable. Public profile shows website `sizzleyardhibachi.com`, phone `(626) 681-5258`, Maps link `https://maps.app.goo.gl/HuKRDXf7StnUpv5q8?g_st=ic`, and no reviews yet.
- First Google Business Profile update post was submitted from the Yard profile on 2026-07-08 with birthday hibachi at home copy and Yard pricing. Google may take time to surface the full post body publicly.
- Remaining optimization risk: Google Search/Profile manager displayed a private Google Ads summary and sponsored preview for `sizzle social hibachi` while managing the Yard profile. Do not edit Social from this workflow; investigate account/profile ad summary linkage separately if it continues showing in Yard management.
