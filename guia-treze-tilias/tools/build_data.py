"""Gera public/data.json e as fotos otimizadas a partir de tools/places.py.

Uso: python3 tools/build_data.py   (a partir da pasta guia-treze-tilias)
As fotos vêm do Wix da Asturtílias e ficam em cache em tools/.cache/.
"""
import io, json, os, re, sys, unicodedata, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "tools"))
import places  # noqa: E402

from PIL import Image  # noqa: E402

CACHE = os.path.join(ROOT, "tools", ".cache")
PHOTOS = os.path.join(ROOT, "public", "assets", "photos")
os.makedirs(CACHE, exist_ok=True)
os.makedirs(PHOTOS, exist_ok=True)


def fold(s):
    s = unicodedata.normalize("NFD", s or "")
    return "".join(c for c in s if unicodedata.category(c) != "Mn").lower()


def digits(p):
    d = re.sub(r"\D", "", p)
    if d.startswith("55") and len(d) > 11:
        d = d[2:]
    return d


def tel(p):
    d = digits(p)
    return f"+55{d}" if len(d) >= 10 else d


def wa(p):
    d = digits(p)
    return f"https://wa.me/55{d}" if len(d) >= 10 else None


def fetch_photo(mid):
    raw = os.path.join(CACHE, mid.replace("~", "_"))
    if not os.path.exists(raw):
        # versão reduzida servida pelo próprio Wix (evita baixar originais de 15 MB)
        url = f"https://static.wixstatic.com/media/{mid}/v1/fit/w_1400,h_1400,q_85/{mid.split('~')[0]}.jpg"
        with urllib.request.urlopen(url, timeout=60) as r:
            open(raw, "wb").write(r.read())
    return raw


def make_sizes(mid, slug):
    im = Image.open(fetch_photo(mid))
    im = im.convert("RGB")
    out = {}
    for w in (480, 960):
        c = im.copy()
        if c.width > w:
            c = c.resize((w, round(c.height * w / c.width)), Image.LANCZOS)
        name = f"{slug}-{w}.webp"
        c.save(os.path.join(PHOTOS, name), "WEBP", quality=78, method=6)
        out[str(w)] = f"/assets/photos/{name}"
    out["ratio"] = round(im.width / im.height, 3)
    # marca/logo x fotografia: logos têm poucas cores e fundo chapado
    small = im.resize((64, 64))
    q = {(r // 16, g // 16, b // 16) for r, g, b in small.getdata()}
    corners = [small.getpixel(xy) for xy in ((0, 0), (63, 0), (0, 63), (63, 63))]
    flat = max(max(c) - min(c) for c in zip(*corners)) < 24
    out["logo"] = len(q) < 90 or (flat and len(q) < 160)
    return out


def main():
    cats = [{"id": cid, "name": name, "slug": slug, "group": g} for cid, name, slug, g in places.CATEGORIES]
    groups = [{"id": g, "name": n, "lede": l, "cats": [c["id"] for c in cats if c["group"] == g]} for g, n, l in places.GROUPS]

    byid = {}
    for p in places.P:
        if "alias" in p:
            byid[p["alias"]]["cats"] += [c for c in p["cats"] if c not in byid[p["alias"]]["cats"]]
            continue
        assert p["id"] not in byid, p["id"]
        byid[p["id"]] = dict(p, cats=list(p["cats"]))

    out = []
    internal = []
    for pid, p in byid.items():
        hide = set(p.get("hide") or [])
        p = dict(p)
        # dado em dúvida: some só a ação afetada (pendência fica no documento interno)
        if "directions" in hide:
            p.pop("coords", None); p.pop("map", None)
        if "phone" in hide:
            p.pop("phones", None); p.pop("whatsapp", None); p.pop("phoneLabel", None)
        for k in ("email", "facebook", "ref"):
            if k in hide:
                p.pop(k, None)
        if "addressNumber" in hide and p.get("address"):
            p["address"] = re.sub(r",\s*\d+.*$", "", p["address"])
        rec = {
            "id": pid,
            "name": p["name"],
            "cats": p["cats"],
            "kind": p.get("kind") or ("service" if not p.get("address") else "place"),
            "summary": p.get("summary"),
            "text": p.get("text"),
            "address": p.get("address"),
            "address2": p.get("address2"),
            "district": p.get("district"),
            "ref": p.get("ref"),
            "hours": p.get("hours"),
            "note": p.get("note"),
            "phones": [{"label": ph, "tel": tel(ph)} for ph in (p.get("phones") or [])],
            "phoneLabel": p.get("phoneLabel"),
            "emergency": p.get("emergency"),
            "whatsapp": wa(p["whatsapp"]) if p.get("whatsapp") else None,
            "email": p.get("email"),
            "site": p.get("site"),
            "instagram": p.get("instagram"),
            "facebook": p.get("facebook"),
            "map": p.get("map"),
            "coords": list(p["coords"]) if p.get("coords") else None,
            "tour": p.get("tour"),
            "tourNote": p.get("tourNote"),
            "legacy": p.get("legacy"),
            "label": p.get("label"),
            "link": {"label": p["link"][0], "url": p["link"][1]} if p.get("link") else None,
            "group": p.get("group"),
        }
        pend = [c for c in (p.get("confirm") or []) if c]
        if p.get("photo"):
            try:
                rec["photo"] = make_sizes(p["photo"], pid)
            except Exception as e:  # noqa: BLE001
                print("FOTO FALHOU", pid, e)
                rec["photo"] = None
                pend.append("Foto do cadastro não pôde ser baixada.")
        else:
            rec["photo"] = None
        if pend or hide:
            internal.append({"id": pid, "name": p["name"], "hidden": sorted(hide), "notes": pend})
        rec["search"] = fold(" ".join(filter(None, [p["name"], p.get("summary"), p.get("address"), p.get("district"), p.get("label"),
                                                    " ".join(c["name"] for c in cats if c["id"] in p["cats"])])))
        out.append({k: v for k, v in rec.items() if k == "cats" or v not in (None, [], "")})

    # foto de abertura: Monumento Águia do Tirol, em tamanho maior
    hero = Image.open(fetch_photo("313f8c_6001480980ed48bca3b5dfea4181a19c~mv2_d_5158_3439_s_4_2.jpg")).convert("RGB")
    for w in (800, 1600):
        c = hero.resize((w, round(hero.height * w / hero.width)), Image.LANCZOS)
        c.save(os.path.join(PHOTOS, f"abertura-{w}.webp"), "WEBP", quality=74, method=6)

    # pendências: só para uso interno (não vão para public/)
    json.dump(internal, open(os.path.join(ROOT, "tools", "pendencias.json"), "w"), ensure_ascii=False, indent=1)
    data = {"source": "Asturtílias – www.trezetilias.com.br (lido em 23/11/2026)", "groups": groups, "categories": cats, "places": out}
    json.dump(data, open(os.path.join(ROOT, "public", "data.json"), "w"), ensure_ascii=False, separators=(",", ":"))
    print(len(out), "cadastros;", sum(1 for r in out if r.get("coords")), "com coordenadas;",
          sum(1 for r in out if r.get("photo")), "com foto")
    for c in cats:
        n = sum(1 for r in out if c["id"] in r["cats"])
        print(f"  {c['id']:>2} {c['name']}: {n}")


if __name__ == "__main__":
    main()
