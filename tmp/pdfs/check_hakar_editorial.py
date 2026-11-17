import ast
import html
import re
from pathlib import Path
import pdfplumber

root = Path(r"C:\Projects\ENOA\tkk")
src = Path(r"C:\Users\Admin\.codex\attachments\a9f8b71c-068b-4d79-91e2-b6b4e2322e12\Вставленный текст.txt").read_text(encoding="utf-8-sig")
script = ast.parse((root / "tmp/pdfs/build_hakar_editorial_v2.py").read_text(encoding="utf-8"))
lore = next(ast.literal_eval(n.value) for n in script.body if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == "LORE" for t in n.targets))

def norm(s):
    s = re.sub(r"<br\s*/?>", " ", s)
    s = re.sub(r"<[^>]*>", "", s)
    s = html.unescape(s)
    s = s.replace("**", "").replace("_", "")
    s = re.sub(r"^#+\s*", "", s)
    return re.sub(r"\s+", "", s).lower()

pdf = root / "output/pdf/Хакар — нити Ильбеша.pdf"
with pdfplumber.open(pdf) as doc:
    text = norm(" ".join(page.extract_text() or "" for page in doc.pages))
    variants = [text]
    for page in doc.pages[3:5]:
        for column in range(4):
            left = 60 + column * 118.75
            variants.append(norm(page.crop((left, 0, left + 118.75, page.height)).extract_text() or ""))
    pieces = list(lore)
    for line in src.splitlines():
        line = line.strip()
        if line.startswith("|"):
            cells = [c.strip() for c in line.strip("|").split("|")]
            if cells and cells[0].startswith("**"):
                pieces.extend(c for c in cells if c)
        elif line:
            pieces.append(line)
    missing = [i for i, piece in enumerate(pieces) if not any(norm(piece) in v for v in variants)]
    assert not missing, f"Source fragments missing: {missing}"
    assert len(doc.pages) == 6
    print(f"Verified {len(pieces)} source fragments across {len(doc.pages)} pages; {pdf.stat().st_size} bytes")
