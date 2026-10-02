# Stappenplan: klanten vinden zoals in die Reddit-post (maar gratis)

## Eerst even eerlijk
De post komt via een AI-account dat tools aanprijst (Swokei, Soro). "200 sites in 12 maanden" kun je niet controleren. Het **idee** klopt wel: zoek zaken zonder (goede) site, maak eerst een demo, stuur een persoonlijk bericht. Dat doe jij al, alleen nu sneller.

## Hun spullen en wat jij gebruikt

| Zij | Kost | Jij gebruikt | Kost |
|---|---|---|---|
| Apollo (leads) | ~€50+/mnd | `leads.py` + Google Maps | gratis |
| Swokei (site checken + berichten) | betaald | `leads.py` maakt openingszin, `berichten.md` | gratis |
| Soro (SEO-blogs) | betaald | later, met Claude zelf | gratis |
| Claude Code (sites bouwen) | | Claude Code | heb je |
| Cloudflare (hosting) | gratis | Cloudflare Pages | gratis |

Apollo is ook vooral voor Amerikaanse bedrijven met e-mailadressen. Voor een kapper in Hengelo is Google Maps veel beter.

## Elke week (± 3 uur)

**1. Leads verzamelen (één keer per plaats)**
- Op je computer: `python3 leads.py Hengelo` → je krijgt een CSV met alle zaken, de zaken **zonder site** staan bovenaan.
- Open de CSV in Excel of Google Sheets. Klik op de Google Maps-link om te checken of het klopt.
- Andere plaatsen: Enschede, Borne, Delden, Almelo.
- Kies per week **10 zaken**. Liefst met goede reviews op Google (die hebben geld en klanten).

**2. Demo's maken (maandag/dinsdag)**
- Per zaak een demo met Claude Code: naam, foto's van hun Google Maps/Instagram, openingstijden, telefoon.
- Zet de demo gratis online op Cloudflare Pages (`zaaknaam.pages.dev`).
- Max 30 min per demo. Het hoeft niet perfect, het moet hún zaak laten zien.

**3. Contact (woensdag t/m zaterdag)**
- Binnenlopen of DM met de demo-link (zie `berichten.md`).
- Na 4–5 dagen één keer opvolgen.

**4. Bijhouden**
- In de CSV een kolom erbij: *benaderd / reactie / klant / nee*.
- Na 4 weken kijk je: hoeveel van de 40 werden klant? Onder 1 op 20 → bericht of demo aanpassen.

## SEO (zie `seo.md`)
- **Nu:** SEO-basis in elke klantsite + Google-pakket als extra verkopen.
- **Deze week:** je eigen Google Bedrijfsprofiel maken.
- **Na 2 à 3 klanten:** eigen site + elke week 1 blog (12 onderwerpen staan klaar).
- Maandpakket (site + video's + Google-posts) als vaste inkomsten.

## Het programma draaien
`leads.py` werkt niet vanuit deze cloud (het internet is hier afgeschermd), wel op je eigen computer:
1. Installeer Python 3 (python.org) als je dat nog niet hebt.
2. Download `leads.py`, open een terminal in die map, typ `python3 leads.py Hengelo` (Windows: `py leads.py Hengelo`).
3. Of laat Claude Code op je computer het voor je doen.
