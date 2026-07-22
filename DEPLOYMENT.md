# Sizzle Yard Hibachi Deployment

## Recommended Stack

- Hosting: Vercel
- DNS: Cloudflare
- Leads: Google Sheet or Airtable
- Tracking: GA4 + Google Ads conversion tracking

## Vercel Setup

1. Create or log into Vercel.
2. Create a new project from this folder.
3. Framework preset: `Other`
4. Build command: leave empty
5. Output directory: `.`
6. Deploy.

## Domain

Recommended domain:

```text
sizzleyardhibachi.com
```

After deployment:

1. Add domain in Vercel.
2. Point DNS from Cloudflare to Vercel.
3. Update `robots.txt` and `sitemap.xml` if the final domain is different.
4. Put the final website URL into Google Business Profile.

## Before Ads

Confirm these values in [script.js](/Users/sizzlesocial/Documents/yard%20hibachi/script.js):

```js
googleTagId: "AW-18300535067",
googleAdsConversionId: "AW-18300535067",
googleAdsLeadConversionLabel: "-udBCPKQj8scEJuCsJZE",
googleAdsPhoneConversionLabel: "ET_PCNLU-8scEJuCsJZE",
googleAdsSmsConversionLabel: "zPsiCNXU-8scEJuCsJZE"
```

Also confirm:

```js
formEndpoint: "https://script.google.com/macros/s/AKfycbwbIBuKgH286c8RTI8ebXUv90wqgo2p81oszPZNvNB4NO94NXmOXqeo-lsPLR0ykSglZg/exec"
```

The live pages no longer load a separate `config.js` file because some browser ad blockers can block generic config filenames and break lead tracking.
