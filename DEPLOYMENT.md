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

Fill these in [config.js](/Users/sizzlesocial/Documents/yard%20hibachi/config.js):

```js
googleTagId: "",
googleAdsConversionId: "",
googleAdsLeadConversionLabel: "",
googleAdsPhoneConversionLabel: "",
googleAdsSmsConversionLabel: ""
```

Also set:

```js
formEndpoint: ""
```

when Google Sheet / Airtable lead capture is ready.

