#!/usr/bin/env python3
"""
Lead-zoeker voor lokale zaken (gratis, geen account of API-sleutel nodig).

Wat het doet:
  1. Haalt alle zaken in een plaats op uit OpenStreetMap (kappers, restaurants,
     winkels, sportscholen, ...). Ketens (met een merknaam) worden overgeslagen.
  2. Kijkt per zaak: geen website / alleen Facebook of Instagram / wel website.
  3. Heeft een zaak een website? Dan checkt het snel wat er mis is
     (geen https, niet mobielvriendelijk, traag, geen beschrijving voor Google,
     oud copyright-jaartal, ...).
  4. Zet alles in een CSV die je in Excel of Google Sheets opent, met per zaak
     een persoonlijke openingszin voor je bericht.

Gebruik (Python 3, niks extra installeren):
  python3 leads.py Hengelo
  python3 leads.py Enschede --geen-check      (sneller, sites niet checken)
  python3 leads.py Hengelo --alleen-zonder-site

Let op: OpenStreetMap is niet compleet. Check een lead altijd even in
Google Maps (link staat in de CSV) voordat je erheen gaat.
"""

import argparse
import csv
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from datetime import date

OVERPASS_URLS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
]
USER_AGENT = "Mozilla/5.0 (lead-zoeker; lokaal gebruik)"

# Soorten zaken die vaak een simpele site nodig hebben.
AMENITY = "restaurant|cafe|fast_food|bar|pub|ice_cream|dentist|veterinary|driving_school|childcare"
LEISURE = "fitness_centre|sports_centre|dance"

TYPE_NL = {
    "hairdresser": "kapper", "beauty": "schoonheidssalon", "bakery": "bakker",
    "butcher": "slager", "florist": "bloemist", "clothes": "kleding",
    "restaurant": "restaurant", "cafe": "café", "fast_food": "snackbar/afhaal",
    "bar": "bar", "pub": "kroeg", "car_repair": "garage", "tattoo": "tattoo",
    "fitness_centre": "sportschool", "massage": "massage", "nails": "nagelstudio",
    "dentist": "tandarts", "driving_school": "rijschool", "ice_cream": "ijssalon",
}

SOCIAL = ("facebook.com", "instagram.com", "fb.com", "fb.me", "tiktok.com", "linktr.ee")


def overpass_query(plaats):
    p = plaats.replace('"', "")
    return f"""
[out:json][timeout:120];
area["name"="{p}"]["boundary"="administrative"]["admin_level"~"^(8|10)$"]->.a;
(
  nwr["shop"]["name"](area.a);
  nwr["craft"]["name"](area.a);
  nwr["amenity"~"^({AMENITY})$"]["name"](area.a);
  nwr["leisure"~"^({LEISURE})$"]["name"](area.a);
);
out center tags;
"""


def haal_zaken_op(plaats):
    data = urllib.parse.urlencode({"data": overpass_query(plaats)}).encode()
    laatste_fout = None
    for url in OVERPASS_URLS:
        try:
            req = urllib.request.Request(url, data=data, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.load(r).get("elements", [])
        except Exception as e:  # probeer de volgende server
            laatste_fout = e
    sys.exit(f"Kon OpenStreetMap niet bereiken: {laatste_fout}")


def maak_zaak(el):
    t = el.get("tags", {})
    soort = t.get("shop") or t.get("craft") or t.get("amenity") or t.get("leisure") or ""
    site = t.get("website") or t.get("contact:website") or t.get("url") or ""
    socials = [t.get(k, "") for k in ("contact:facebook", "facebook", "contact:instagram", "instagram")]
    socials = [s for s in socials if s]
    if site and any(s in site.lower() for s in SOCIAL):
        socials.append(site)
        site = ""
    adres = " ".join(x for x in (t.get("addr:street", ""), t.get("addr:housenumber", "")) if x)
    plaats = t.get("addr:city", "")
    return {
        "naam": t.get("name", ""),
        "soort": TYPE_NL.get(soort, soort),
        "adres": adres,
        "postcode": t.get("addr:postcode", ""),
        "plaats": plaats,
        "telefoon": t.get("phone") or t.get("contact:phone") or "",
        "email": t.get("email") or t.get("contact:email") or "",
        "website": site,
        "social": " ".join(socials),
        "merk": t.get("brand", ""),
    }


def check_site(url):
    """Snelle check van een website. Geeft (score 0-10, lijst met problemen)."""
    if not url.startswith("http"):
        url = "http://" + url
    problemen = []
    try:
        start = time.time()
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=15) as r:
            html = r.read(1_500_000).decode("utf-8", errors="ignore")
            eind_url = r.geturl()
        laadtijd = time.time() - start
    except Exception:
        return 0, ["site werkt niet (offline of fout)"]

    low = html.lower()
    if not eind_url.startswith("https"):
        problemen.append("geen https (browser zegt 'niet veilig')")
    if 'name="viewport"' not in low and "name='viewport'" not in low:
        problemen.append("niet mobielvriendelijk")
    if laadtijd > 3:
        problemen.append(f"traag ({laadtijd:.1f} sec)")
    if 'name="description"' not in low and "name='description'" not in low:
        problemen.append("geen beschrijving voor Google")
    titel = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
    if not titel or len(titel.group(1).strip()) < 5:
        problemen.append("geen goede paginatitel")
    jaren = [int(j) for j in re.findall(r"(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?(20\d\d)", low)]
    if jaren and max(jaren) < date.today().year - 2:
        problemen.append(f"verouderd (copyright {max(jaren)})")
    if "tel:" not in low:
        problemen.append("geen klikbaar telefoonnummer")
    if len(re.sub(r"<[^>]+>", " ", html).split()) < 80:
        problemen.append("weinig tekst (lastig vindbaar)")
    return max(0, 10 - 2 * len(problemen)), problemen


def openingszin(z):
    if z["status"] == "geen website":
        return (f"Ik zocht {z['naam']} op Google, maar kon geen website vinden. "
                f"Daardoor gaan mensen die zoeken naar een {z['soort'] or 'zaak'} in "
                f"{z['plaats'] or 'de buurt'} nu waarschijnlijk naar een ander.")
    if z["status"] == "alleen social":
        return (f"Ik zag dat {z['naam']} wel op social media staat, maar geen eigen website heeft. "
                f"Mensen die op Google zoeken vinden jullie daardoor lastig.")
    if z["problemen"]:
        eerste = z["problemen"].split(";")[0].strip()
        return f"Ik keek even naar de website van {z['naam']} en zag een paar dingen, onder andere: {eerste}."
    return ""


def main():
    ap = argparse.ArgumentParser(description="Vind lokale zaken zonder (goede) website.")
    ap.add_argument("plaats", help="bijv. Hengelo")
    ap.add_argument("--geen-check", action="store_true", help="websites niet checken (sneller)")
    ap.add_argument("--alleen-zonder-site", action="store_true", help="alleen zaken zonder eigen website")
    ap.add_argument("-o", "--uit", help="naam van het CSV-bestand")
    args = ap.parse_args()

    print(f"Zaken ophalen in {args.plaats}...")
    zaken = [maak_zaak(el) for el in haal_zaken_op(args.plaats)]
    zaken = [z for z in zaken if z["naam"] and not z["merk"]]  # ketens eruit
    gezien, uniek = set(), []
    for z in zaken:
        sleutel = (z["naam"].lower(), z["adres"].lower())
        if sleutel not in gezien:
            gezien.add(sleutel)
            uniek.append(z)
    zaken = uniek
    print(f"{len(zaken)} zaken gevonden (zonder ketens).")

    for i, z in enumerate(zaken, 1):
        z["plaats"] = z["plaats"] or args.plaats
        z["score"], z["problemen"] = "", ""
        if not z["website"]:
            z["status"] = "alleen social" if z["social"] else "geen website"
        else:
            z["status"] = "heeft website"
            if not args.geen_check:
                print(f"  [{i}/{len(zaken)}] check {z['website']}")
                score, problemen = check_site(z["website"])
                z["score"], z["problemen"] = score, "; ".join(problemen)
        z["google_maps"] = "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote(
            f"{z['naam']} {z['adres']} {z['plaats']}")
        z["openingszin"] = openingszin(z)

    if args.alleen_zonder_site:
        zaken = [z for z in zaken if z["status"] != "heeft website"]

    # Beste kansen bovenaan: geen site, dan alleen social, dan slechtste sites.
    volgorde = {"geen website": 0, "alleen social": 1, "heeft website": 2}
    zaken.sort(key=lambda z: (volgorde[z["status"]], z["score"] if z["score"] != "" else 10))

    uit = args.uit or f"leads-{args.plaats.lower().replace(' ', '-')}-{date.today()}.csv"
    velden = ["status", "naam", "soort", "adres", "postcode", "plaats", "telefoon", "email",
              "website", "social", "score", "problemen", "openingszin", "google_maps"]
    with open(uit, "w", newline="", encoding="utf-8-sig") as f:  # utf-8-sig: Excel toont é goed
        w = csv.DictWriter(f, fieldnames=velden, delimiter=";", extrasaction="ignore")
        w.writeheader()
        w.writerows(zaken)

    tel = {s: sum(1 for z in zaken if z["status"] == s) for s in volgorde}
    print(f"\nKlaar: {uit}")
    print(f"  geen website: {tel['geen website']} | alleen social: {tel['alleen social']} | "
          f"heeft website: {tel['heeft website']}")


if __name__ == "__main__":
    main()
