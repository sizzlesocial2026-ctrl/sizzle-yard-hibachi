# Sizzle Yard Hibachi Video Tool Status

Date: 2026-07-07

Company: Sizzle Yard Hibachi only.

## Current Result

The reliable tool we have right now is the local browser review page:

- Build it with `pnpm run video:review`.
- Open `http://127.0.0.1:4176/` while the temporary review server is running.
- Use it only for reviewing candidates. It does not publish videos to the website.

## What Was Tested

- External install through `pip`, npm, GitHub, and npm registry was blocked because the environment could not resolve external hosts.
- `avconvert` was present but could not export usable website preview clips in this environment.
- Swift and AVFoundation were available after moving caches into the project folder, but they could not decode these WeChat MP4 candidate files for thumbnails or clip export.
- Browser playback works after copying candidates into `/private/tmp/sizzle-yard-video-review/videos`.

## Practical Decision

Do not rely on automated clipping yet.

For now:

1. Use the browser review page to choose candidates.
2. Confirm customer permission and brand safety manually.
3. If a video is approved, use a real video editor or ffmpeg installed outside this restricted environment to crop/compress it.
4. Only place final approved clips into `media/video-approved-yard-only` and `media/video-optimized-web`.

## Candidate Priority

Best candidates from first review:

- #07: backyard long-table adult interaction, strong Sizzle Yard fit, but permission/privacy required.
- #11: grill and guest interaction, useful if cropped to food/griddle/action and privacy handled.
- #26: possible party entertainment/sake gun context, but needs rights and service-offer confirmation.
- #28: food closeup, low privacy risk but weaker sales value.
