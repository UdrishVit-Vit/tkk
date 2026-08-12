"""Extract the D&D 2024 bestiary catalogue from the editor's DOCX list."""

from __future__ import annotations

import argparse
import json
import re
from collections import OrderedDict
from pathlib import Path

from docx import Document


ENTRY_RE = re.compile(r"(.+?) \[([^\]]+)\]")
CR_RE = re.compile(r"(?:—|\d+(?:/\d+)?)")


def extract_records(docx_path: Path) -> list[dict[str, str]]:
    document = Document(docx_path)
    values = [paragraph.text.strip().replace("\u00a0", " ") for paragraph in document.paragraphs]
    values = [value for value in values if value]
    records: list[dict[str, str]] = []

    for index, value in enumerate(values):
        match = ENTRY_RE.fullmatch(value)
        if not match or index == 0 or index + 2 >= len(values):
            continue

        documented_cr = values[index - 1]
        source = values[index + 1]
        type_label = values[index + 2]
        if not CR_RE.fullmatch(documented_cr) or source not in {"MM", "PHB", "DMG"}:
            continue

        records.append({
            "title": match.group(1),
            "englishName": match.group(2),
            "source": source,
            "typeLabel": type_label,
            "documentedCr": documented_cr,
        })

    return records


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("docx", type=Path)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--preserve", type=Path)
    args = parser.parse_args()

    records = extract_records(args.docx)
    unique: OrderedDict[str, dict[str, str]] = OrderedDict()
    duplicate_count = 0

    for record in records:
        name = record["englishName"]
        if name in unique:
            duplicate_count += 1
            if unique[name] != record:
                raise ValueError(f"Conflicting duplicate for {name}: {unique[name]} != {record}")
            continue
        unique[name] = record

    preserved_count = 0
    if args.preserve and args.preserve.exists():
        payload = json.loads(args.preserve.read_text(encoding="utf-8"))
        for creature in payload.get("creatures", []):
            name = creature["englishName"]
            if name in unique:
                continue
            unique[name] = {
                "title": creature["title"],
                "englishName": name,
                "source": creature["source"],
                "typeLabel": creature["typeLabel"],
                "documentedCr": creature["cr"],
            }
            preserved_count += 1

    output = {
        "edition": "2024",
        "creatures": list(unique.values()),
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(
        f"Extracted {len(records)} rows, {len(unique)} unique creatures, "
        f"removed {duplicate_count} duplicates, preserved {preserved_count} existing creatures."
    )


if __name__ == "__main__":
    main()
