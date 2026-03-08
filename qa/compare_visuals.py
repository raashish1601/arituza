from __future__ import annotations

import json
import sys
from pathlib import Path
from PIL import Image, ImageChops


def compare_images(before_path: Path, after_path: Path, diff_path: Path) -> dict:
    before = Image.open(before_path).convert("RGBA")
    after = Image.open(after_path).convert("RGBA")

    if before.size != after.size:
        width = min(before.width, after.width)
        height = min(before.height, after.height)
        before = before.crop((0, 0, width, height))
        after = after.crop((0, 0, width, height))

    diff = ImageChops.difference(before, after)
    diff_bbox = diff.getbbox()

    if not diff_bbox:
        return {
            "file": before_path.name,
            "different_pixels": 0,
            "different_percent": 0.0
        }

    diff_data = diff.getdata()
    different_pixels = sum(1 for px in diff_data if px != (0, 0, 0, 0))
    total_pixels = before.width * before.height
    percent = (different_pixels / total_pixels) * 100 if total_pixels else 0.0

    diff.save(diff_path)
    return {
        "file": before_path.name,
        "different_pixels": different_pixels,
        "different_percent": round(percent, 4)
    }


def main() -> None:
    before_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "qa/before")
    after_dir = Path(sys.argv[2] if len(sys.argv) > 2 else "qa/after")
    out_dir = Path(sys.argv[3] if len(sys.argv) > 3 else "qa/diff")
    out_dir.mkdir(parents=True, exist_ok=True)

    before_files = {p.name: p for p in before_dir.glob("*.png")}
    after_files = {p.name: p for p in after_dir.glob("*.png")}

    common = sorted(set(before_files).intersection(after_files))
    report = []
    for file_name in common:
        result = compare_images(
            before_files[file_name],
            after_files[file_name],
            out_dir / file_name
        )
        report.append(result)

    summary = {
        "count": len(report),
        "max_diff_percent": max((item["different_percent"] for item in report), default=0.0),
        "avg_diff_percent": round(
            (sum(item["different_percent"] for item in report) / len(report)) if report else 0.0,
            4
        ),
        "files": report
    }

    (out_dir / "visual-diff-report.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
