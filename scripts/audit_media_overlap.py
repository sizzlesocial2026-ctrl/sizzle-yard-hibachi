from html.parser import HTMLParser
from pathlib import Path
import argparse
import hashlib


MEDIA_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".mov"}


class MediaRefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        for key in ("src", "href", "poster", "content"):
            value = data.get(key)
            if value and Path(value.split("?", 1)[0]).suffix.lower() in MEDIA_EXTENSIONS:
                self.refs.append(value)


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def normalize_ref(page, ref):
    ref = ref.split("?", 1)[0]
    if ref.startswith(("http://", "https://")):
        parts = ref.split("/", 3)
        if len(parts) == 4 and parts[3].startswith("assets/"):
            ref = parts[3]
        else:
            return None
    if ref.startswith(("#", "tel:", "sms:", "mailto:")):
        return None
    return (page.parent / ref).resolve()


def page_media_refs(root):
    refs = []
    for page in sorted(root.glob("*.html")):
        parser = MediaRefParser()
        parser.feed(page.read_text(errors="ignore"))
        for ref in parser.refs:
            local = normalize_ref(page, ref)
            refs.append({
                "page": page,
                "ref": ref,
                "path": local,
                "exists": bool(local and local.exists()),
            })
    return refs


def all_media(root):
    files = []
    for path in root.rglob("*"):
        if path.is_file() and path.suffix.lower() in MEDIA_EXTENSIONS:
            files.append(path)
    return sorted(files)


def hash_index(paths):
    index = {}
    for path in paths:
        index.setdefault(sha256(path), []).append(path)
    return index


def relative(path, root):
    return path.relative_to(root).as_posix()


def print_overlap(label, overlaps, yard_root, social_root):
    print(f"{label}: {len(overlaps)}")
    for digest, yard_paths, social_paths in overlaps:
        print(f"OVERLAP {digest[:12]}")
        print("  Yard:")
        for path in yard_paths:
            print(f"    {relative(path, yard_root)}")
        print("  Social:")
        for path in social_paths:
            print(f"    {relative(path, social_root)}")


def print_social_unused_candidates(social_root, social_ref_paths):
    referenced = set(social_ref_paths)
    referenced_hashes = {sha256(path) for path in social_ref_paths}
    unused = [
        path
        for path in all_media(social_root)
        if path not in referenced and sha256(path) not in referenced_hashes
    ]
    print(f"Social unused media candidates: {len(unused)}")
    print("(Excluded files whose content hash matches a Social page-used asset.)")
    for path in unused:
        print(f"  {relative(path, social_root)}")


def main():
    parser = argparse.ArgumentParser(description="Audit Sizzle Yard media against Sizzle Social media.")
    parser.add_argument("--yard-root", default=".", help="Sizzle Yard project root")
    parser.add_argument(
        "--social-root",
        default="/Users/sizzlesocial/Documents/hibachi/sizzle-social-site",
        help="Sizzle Social site project root",
    )
    parser.add_argument(
        "--list-social-unused",
        action="store_true",
        help="List media files in the Social project that are not referenced by Social HTML pages.",
    )
    args = parser.parse_args()

    yard_root = Path(args.yard_root).resolve()
    social_root = Path(args.social_root).resolve()

    yard_refs = page_media_refs(yard_root)
    social_refs = page_media_refs(social_root)

    missing = [item for item in yard_refs + social_refs if not item["exists"]]
    if missing:
        print("Missing media references:")
        for item in missing:
            root = yard_root if str(item["page"]).startswith(str(yard_root)) else social_root
            print(f"  {relative(item['page'], root)} -> {item['ref']}")
        raise SystemExit(1)

    yard_ref_paths = sorted({item["path"] for item in yard_refs if item["path"]})
    social_ref_paths = sorted({item["path"] for item in social_refs if item["path"]})
    yard_ref_hashes = hash_index(yard_ref_paths)
    social_ref_hashes = hash_index(social_ref_paths)

    page_overlaps = [
        (digest, yard_ref_hashes[digest], social_ref_hashes[digest])
        for digest in sorted(yard_ref_hashes.keys() & social_ref_hashes.keys())
    ]

    yard_all_paths = all_media(yard_root)
    social_all_paths = all_media(social_root)
    yard_all_hashes = hash_index(yard_all_paths)
    social_all_hashes = hash_index(social_all_paths)
    all_overlaps = [
        (digest, yard_all_hashes[digest], social_all_hashes[digest])
        for digest in sorted(yard_all_hashes.keys() & social_all_hashes.keys())
    ]

    yard_names = {path.name for path in yard_ref_paths}
    social_names = {path.name for path in social_ref_paths}
    filename_overlaps = sorted(yard_names & social_names)

    print(f"Yard page media references: {len(yard_refs)}")
    print(f"Yard unique page media files: {len(yard_ref_paths)}")
    print(f"Social page media references: {len(social_refs)}")
    print(f"Social unique page media files: {len(social_ref_paths)}")
    print_overlap("Exact page media hash overlaps", page_overlaps, yard_root, social_root)
    print(f"Page media filename overlaps: {len(filename_overlaps)}")
    for name in filename_overlaps:
        print(f"  {name}")
    print(f"Yard all local media files: {len(yard_all_paths)}")
    print(f"Social all local media files: {len(social_all_paths)}")
    print_overlap("Exact all-media hash overlaps", all_overlaps, yard_root, social_root)

    if args.list_social_unused:
        print_social_unused_candidates(social_root, social_ref_paths)

    if page_overlaps or all_overlaps or filename_overlaps:
        raise SystemExit(1)

    print("Media overlap audit passed.")


if __name__ == "__main__":
    main()
