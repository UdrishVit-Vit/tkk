from pathlib import Path
import html
import json
import math
import re
import runpy
import pdfplumber
from PIL import Image

ROOT=Path(__file__).resolve().parent.parent
DATA=runpy.run_path(str(ROOT/"proposals/hakar-three-variants-content.py"))
PREVIEW=ROOT/"tmp/pdfs/hakar-variants"

def norm(text):
    text=html.unescape(str(text)).replace("**","")
    return re.sub(r"\s+","",text).lower()

def fragments(blocks):
    result=[]
    for b in blocks:
        if b[0] in ("p","s","h","title"):
            result.append(b[1])
        elif b[0]=="table":
            result.extend(b[1])
            result.extend(cell for row in b[2] for cell in row)
        elif b[0]=="links":
            result.extend(label for label,url in b[1])
    return result

report=[]
for v in DATA["VARIANTS"]:
    p=ROOT/"output/pdf/hakar-variants"/v["filename"]
    with pdfplumber.open(p) as doc:
        assert len(doc.pages)==6,(v["id"],len(doc.pages))
        expected={
            2:[("title",v["name"]),("p",v["intro"]),DATA["table"](["Уровень","Умения"],v["overview"])] + DATA["COMMON_THREAD"],
            3:v["features"],4:v["price"],5:v["later"],6:v["notes"]+DATA["COMMON_NOTES"],
        }
        checked=0
        for number,blocks in expected.items():
            page=doc.pages[number-1]
            variants=[norm(page.extract_text() or "")]
            bounds={2:[60,113,535],4:[60,82,298,377,456,535],6:[60,215,535]}.get(number,[])
            for left,right in zip(bounds,bounds[1:]):
                variants.append(norm(page.crop((left,0,right,page.height)).extract_text() or ""))
            missing=[t for t in fragments(blocks) if not any(norm(t) in variant for variant in variants)]
            assert not missing,(v["id"],number,[t[:90] for t in missing])
            checked+=len(fragments(blocks))
        # Source text of every price rule is on physical page four.
        assert all(norm(name) in norm(doc.pages[3].extract_text() or "") for name in ["Обожжённые пальцы","Пришитый узел","Рваный шаг","Обратная тяга","Восстановление"])
        report.append({"variant":v["id"],"pages":6,"verified_fragments":checked,"bytes":p.stat().st_size,"price_page":4})
    images=[Image.open(PREVIEW/f'{v["id"]}-{i}.png').convert("RGB") for i in range(1,7)]
    w,h=images[0].size
    sheet=Image.new("RGB",(w*3+40,h*2+30),"#d2c7bc")
    for i,image in enumerate(images):
        sheet.paste(image,((i%3)*(w+10)+10,(i//3)*(h+10)+10))
    sheet.save(PREVIEW/f'contact-{v["id"]}.png')

report.append({"math":{
    "B_wrath_from_strain_3_after_3_slot_casts":1-(5/6)**3,
    "B_wrath_from_strain_3_after_6_slot_casts":1-(5/6)**6,
    "burn_average_at_wizard_5_strain_1":(3+1)*2.5,
    "B_redirect_average_at_wizard_14":3*5*2.5,
    "B_redirect_average_at_wizard_17":3*6*2.5,
    "con_save_plus_2_dc10":.65,
    "con_save_plus_2_dc10_with_preemptive_d4":sum((13+k)/20 for k in range(1,5))/4,
}})
(ROOT/"reports/hakar-three-variants-qa.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(report,ensure_ascii=True,indent=2))
