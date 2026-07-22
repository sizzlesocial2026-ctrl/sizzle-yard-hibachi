# Current Site Media Overlap Audit

Date: 2026-07-07

Scope: Sizzle Yard Hibachi website media checked against the local current Sizzle Social Hibachi website project.

Important limitation: live DNS lookup for `sizzlesocialhibachi.com` and `sizzleyardhibachi.com` failed during the first curl attempt in this audit session, so this report is based on local project files and the current deployed Yard source tree. Re-run a live crawl when DNS is available.

## Sources Checked

Sizzle Social local site:

- `/Users/sizzlesocial/Documents/hibachi/sizzle-social-site`
- Pages included: home, thank-you, Los Angeles pages, Orange County pages, review page where applicable.

Sizzle Yard local site:

- `/Users/sizzlesocial/Documents/yard hibachi`
- Pages included: home, thank-you, and all current city pages in the project root.

## Page-Referenced Media Result

- Sizzle Social referenced media count: 39 references
- Sizzle Social unique referenced files: 26
- Sizzle Yard referenced media count: 60 references
- Sizzle Yard unique referenced files: 19
- Exact SHA-256 overlap between Social referenced media and Yard referenced media: 0
- Filename overlap between Social referenced media and Yard referenced media: 0
- Missing Yard referenced media: 0
- Missing Social referenced media: 0

## Full Local Media Result

- Sizzle Social all local media files checked: 119
- Sizzle Social unique media hashes: 107
- Sizzle Yard all local media files checked: 29
- Sizzle Yard unique media hashes: 29
- Exact SHA-256 overlap across all local media files: 0

## Yard Website Media Currently Referenced

- `assets/brand/sizzle-yard-hibachi-logo-192.png`
- `assets/generated/sizzle-yard-city-party-alhambra-clean.jpg`
- `assets/generated/sizzle-yard-city-party-arcadia.jpg`
- `assets/generated/sizzle-yard-city-party-burbank-clean.jpg`
- `assets/generated/sizzle-yard-city-party-extra-party.jpg`
- `assets/generated/sizzle-yard-city-party-glendale-clean.jpg`
- `assets/generated/sizzle-yard-city-party-los-angeles.jpg`
- `assets/generated/sizzle-yard-city-party-monterey-park-clean.jpg`
- `assets/generated/sizzle-yard-city-party-orange-county-clean.jpg`
- `assets/generated/sizzle-yard-city-party-pasadena.jpg`
- `assets/generated/sizzle-yard-city-party-rosemead-clean.jpg`
- `assets/generated/sizzle-yard-city-party-san-gabriel-clean.jpg`
- `assets/generated/sizzle-yard-city-party-temple-city-clean.jpg`
- `assets/generated/sizzle-yard-party-birthday-vertical.jpg`
- `assets/generated/sizzle-yard-party-dancing-wide.jpg`
- `assets/generated/sizzle-yard-party-fire-staff-wide.jpg`
- `assets/generated/sizzle-yard-party-food-square.jpg`
- `assets/generated/sizzle-yard-party-game-wide.jpg`
- `assets/generated/sizzle-yard-party-table-vertical.jpg`

## Social Website Media Currently Referenced

- `assets/images/brand/sizzle-social-logo-web.jpg`
- `assets/images/food/chicken.jpg`
- `assets/images/food/fried-rice.jpg`
- `assets/images/food/hibachi-combo-fire-package.jpg`
- `assets/images/food/shrimp.jpg`
- `assets/images/full-menu-60-package.jpg`
- `assets/images/party/carrd-video-poster.jpg`
- `assets/images/site-crops/backyard-party-interaction.jpg`
- `assets/images/site-crops/birthday-table-guests.jpg`
- `assets/images/site-crops/chef-cooking-party.jpg`
- `assets/images/site-crops/city-backyard-long-table-setup.jpg`
- `assets/images/site-crops/city-daytime-patio-dinner.jpg`
- `assets/images/site-crops/city-la-night-hibachi-party.jpg`
- `assets/images/site-crops/city-oc-ocean-backyard-setup.jpg`
- `assets/images/site-crops/city-oc-private-chef-night.jpg`
- `assets/images/site-crops/guests-fried-rice-party.jpg`
- `assets/images/site-crops/night-fire-show-guests.jpg`
- `assets/images/site-crops/real-backyard-grill-table-setup.jpg`
- `assets/images/site-crops/real-birthday-water-show.jpg`
- `assets/images/site-crops/real-chef-party-circle.jpg`
- `assets/images/site-crops/real-guests-fire-torches.jpg`
- `assets/images/site-crops/real-private-party-table-setup.jpg`
- `assets/images/site-crops/real-sunset-backyard-setup.jpg`
- `assets/images/site-crops/wide-birthday-party.jpg`
- `assets/images/site-crops/wide-patio-setup.jpg`
- `assets/videos/birthday-hibachi-party.mp4`

## Conclusion

No exact image or video reuse was found between the current Sizzle Yard Hibachi website, including city pages, and the local current Sizzle Social Hibachi website project.

Continue to reject any future Sizzle Yard media candidate if it matches Social by file hash, filename, visible branding, phone number, menu, QR code, ad creative, or recognizable prior campaign usage.

## Automation Added

Added `scripts/audit_media_overlap.py` and package command `audit:media` so this check can be repeated before future Sizzle Yard deployments.

Current command result:

- `python3 scripts/check_site.py`: passed
- `python3 scripts/audit_media_overlap.py`: passed
- `check_site.py` now scans every root-level HTML page, so Sizzle Yard city pages are included automatically.
