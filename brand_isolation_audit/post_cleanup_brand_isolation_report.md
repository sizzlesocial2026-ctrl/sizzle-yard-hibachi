# Post-Cleanup Brand Isolation Report

Generated: 2026-07-05

Scope: Sizzle Yard project after deleting unused/duplicate/Sizzle Social-used suspect local media.

## Counts

- INTERNAL: audit/report, not deployed: 4
- INTERNAL: neutral support file: 5
- REVIEW: mentions Social only as boundary warning/reference: 8
- RISK: Ads/shared tracking needs confirmation: 2
- YARD: current project file: 47

## Remaining Risks

- Ads isolation risk resolved on 2026-07-08: Sizzle Yard now uses `AW-18300535067` in `script.js`; HTML pages no longer load `config.js`, and the old `AW-18105083874` reference is treated as historical Social-era risk evidence only.
- Sizzle Yard internal docs still mention Sizzle Social as warnings/boundary notes. These are local-only and ignored by deployment.
- The thank-you page still contains the Stripe deposit button; this is not on the main page, but direct visitors could open it after submission or via direct URL.

## Current Live Asset Policy

- Keep only `assets/brand` and current `assets/generated/sizzle-yard-*` images for the Yard site.
- Do not copy Sizzle Social photos/videos/menu graphics into Yard unless explicitly approved and rebranded.
- New Yard real photos should be saved under a new clearly named folder, e.g. `assets/yard-real-events/`, only after permission/brand check.
