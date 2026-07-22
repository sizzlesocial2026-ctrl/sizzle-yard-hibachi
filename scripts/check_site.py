from html.parser import HTMLParser
from pathlib import Path

PAGES = sorted(path.name for path in Path(".").glob("*.html"))

STATIC_FILES = [
    "robots.txt",
    "sitemap.xml",
    "site.webmanifest",
    "vercel.json",
]


class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if data.get("id"):
            self.ids.append(data["id"])
        for key in ("src", "href"):
            if data.get(key):
                self.refs.append(data[key])


def path_exists(ref):
    if ref.startswith(("http", "sms:", "tel:", "mailto:", "#")):
        return True

    path, _, _query = ref.partition("?")
    path, _, anchor = path.partition("#")
    if not path:
        return True

    candidate = Path(path)
    if candidate.exists():
        return True

    if candidate.suffix == "" and Path(f"{path}.html").exists():
        return True

    return False


missing = {}

for page in PAGES:
    parser = RefParser()
    parser.feed(Path(page).read_text())
    bad = [ref for ref in parser.refs if not path_exists(ref)]
    if bad:
        missing[page] = bad

if missing:
    for page, refs in missing.items():
        print(f"{page}:")
        for ref in refs:
            print(f"  missing {ref}")
    raise SystemExit(1)

for static_file in STATIC_FILES:
    if not Path(static_file).exists():
        print(f"missing {static_file}")
        raise SystemExit(1)

print("Site check passed.")
