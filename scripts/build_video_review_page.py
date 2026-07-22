from html import escape
from pathlib import Path
import os
import shutil


ROOT = Path(__file__).resolve().parents[1]
CANDIDATE_LIST = Path("/private/tmp/sizzle-video-candidates.txt")
REVIEW_ROOT = Path("/private/tmp/sizzle-yard-video-review")
REVIEW_VIDEO_ROOT = REVIEW_ROOT / "videos"
OUTPUT = REVIEW_ROOT / "index.html"
MAPPING = REVIEW_ROOT / "source_mapping.csv"


def file_url(path):
    return path.resolve().as_uri()


def load_candidates():
    if CANDIDATE_LIST.exists():
        paths = [Path(line.strip()) for line in CANDIDATE_LIST.read_text().splitlines() if line.strip()]
    else:
        video_root = Path(
            "/Users/sizzlesocial/Library/Containers/com.tencent.xinWeChat/Data/Documents/"
            "xwechat_files/wxid_6jnqjjqo3h4k12_e01f/msg/video"
        )
        paths = sorted(video_root.rglob("*.mp4"))

    rows = []
    for path in paths:
        if path.exists():
            rows.append({
                "path": path,
                "size_mb": path.stat().st_size / 1024 / 1024,
                "month": path.parent.name,
            })
    return rows


def copy_review_files(candidates):
    REVIEW_VIDEO_ROOT.mkdir(parents=True, exist_ok=True)
    lines = ["review_file,original_source,size_mb"]
    for index, item in enumerate(candidates, start=1):
        source = item["path"]
        month = item["month"]
        destination = REVIEW_VIDEO_ROOT / f"sizzle-yard-review-{index:02d}-{month}{source.suffix.lower()}"
        if destination.exists():
            destination.chmod(0o644)
            destination.unlink()
        shutil.copyfile(source, destination)
        os.chmod(destination, 0o644)
        item["review_path"] = destination
        lines.append(f"{destination.name},{source},{item['size_mb']:.2f}")
    MAPPING.write_text("\n".join(lines) + "\n")


def build_page(candidates):
    cards = []
    for index, item in enumerate(candidates, start=1):
        path = item["path"]
        review_path = item["review_path"]
        cards.append(
            f"""
            <article class="card">
              <div class="meta">
                <strong>#{index:02d}</strong>
                <span>{escape(item["month"])}</span>
                <span>{item["size_mb"]:.1f} MB</span>
              </div>
              <video controls muted preload="metadata" src="{escape(review_path.relative_to(REVIEW_ROOT).as_posix())}"></video>
              <p>{escape(path.name)}</p>
              <p class="source">Original: {escape(str(path))}</p>
              <label><input type="checkbox"> possible Yard fit</label>
              <label><input type="checkbox"> reject: privacy / brand / unsafe / not party</label>
            </article>
            """
        )

    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sizzle Yard Video Review</title>
  <style>
    body {{
      margin: 0;
      font-family: Inter, Arial, sans-serif;
      background: #fff8ef;
      color: #211b18;
    }}
    header {{
      position: sticky;
      top: 0;
      z-index: 2;
      padding: 18px 22px;
      background: rgba(255, 248, 239, 0.94);
      border-bottom: 1px solid rgba(33, 27, 24, 0.14);
      backdrop-filter: blur(12px);
    }}
    h1 {{
      margin: 0 0 6px;
      font-size: clamp(1.4rem, 4vw, 2.2rem);
    }}
    header p {{
      max-width: 900px;
      margin: 0;
      color: #67564d;
      line-height: 1.5;
    }}
    main {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      padding: 18px;
    }}
    .card {{
      display: grid;
      gap: 10px;
      padding: 12px;
      background: #fff;
      border: 1px solid rgba(33, 27, 24, 0.14);
      border-radius: 8px;
      box-shadow: 0 10px 26px rgba(33, 27, 24, 0.08);
    }}
    .meta {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      color: #8a3d21;
      font-size: 0.88rem;
    }}
    video {{
      width: 100%;
      aspect-ratio: 9 / 16;
      max-height: 520px;
      background: #111;
      border-radius: 6px;
      object-fit: contain;
    }}
    p {{
      margin: 0;
      overflow-wrap: anywhere;
      color: #67564d;
      font-size: 0.88rem;
    }}
    .source {{
      font-size: 0.76rem;
      color: #907b70;
    }}
    label {{
      display: flex;
      align-items: center;
      gap: 8px;
      color: #211b18;
      font-size: 0.92rem;
      font-weight: 700;
    }}
  </style>
</head>
<body>
  <header>
    <h1>Sizzle Yard Video Review</h1>
    <p>
      Temporary local review page only. Use it to choose videos that are clearly Sizzle Yard appropriate:
      birthday/backyard/party feeling, no Sizzle Social branding, no obvious privacy issue, and no unsafe large fire.
      Checking boxes here is only a visual aid; final approved files still need to be copied into the Yard media folders.
    </p>
  </header>
  <main>
    {''.join(cards)}
  </main>
</body>
</html>
"""


def main():
    candidates = load_candidates()
    copy_review_files(candidates)
    OUTPUT.write_text(build_page(candidates))
    print(f"Built {OUTPUT}")
    print(f"Mapping {MAPPING}")
    print(f"Candidates: {len(candidates)}")


if __name__ == "__main__":
    main()
