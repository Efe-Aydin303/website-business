---
name: demo-bouwer
description: Bouwt in één keer een demo-website (één HTML-bestand) voor een lokale zaak zonder site, in de stijl van de branche, met SEO-basis, mobiele check en een DM-tekst. Gebruik bij "maak een demo voor [zaak]".
---

# Demo-bouwer

Voor Efe's websitebusiness: lokale zaken rond Hengelo zonder website krijgen eerst een gratis demo. Efe laat die zien op zijn telefoon of stuurt de link. Een demo kost maximaal 30 minuten en moet er beter uitzien dan wat ze nu hebben (Facebook, gidsen, Knipklok).

Prijzen (bron: Efe, 2026-10-06): website €250 (50% vooraf), onderhoud **€25 per maand**, 3 promo-video's €75 (of €50 samen met een site), Google-pakket €75, maandpakket Google €40 per maand.

## Stap 1: gegevens verzamelen

Vraag alleen wat ontbreekt, in één bericht:
- naam van de zaak, plaats, branche
- adres, telefoon, openingstijden
- diensten met prijzen
- Google-score en aantal reviews
- foto's (links of uploads van Google Maps of Instagram)
- Instagram/Facebook/boekingslink (bijv. Knipklok, Fresha, Treatwell)
- tweetalig TR/NL? (vaak handig bij Turkse eigenaren; vraag het)

Staat de zaak in `klantenwerving/leads-*.xlsx`, haal daar adres, score, "wat ze nu gebruiken", "waarom ze een site zouden nemen" en de openingszin uit. Vraag de rest niet opnieuw.

**Nooit verzinnen.** Geen nep-prijzen, nep-reviews, nep-telefoonnummers of nep-openingstijden. Wat je niet weet wordt een zichtbare lege plek: `€ ··`, `06 ·· ·· ·· ··`, `Openingstijden volgen`. Een eigenaar die zijn eigen prijzen fout ziet staan, haakt af. Reviewcijfers alleen als ze echt bekend zijn, met de bron erbij ("4,9 uit 724 reviews op Knipklok").

## Stap 2: stijl kiezen per branche

Kies de stijl van de branche. Pas kleuren aan als de zaak een eigen logo/kleur heeft (zie foto's). Elke stijl gebruikt Google Fonts en CSS-variabelen op `:root`.

| Branche | Gevoel | Kleuren | Fonts | Wat centraal staat |
|---|---|---|---|---|
| Kapper / barbershop | donker, stoer, premium | bg `#161412`, tekst `#f2ebe0`, goud `#d4ad6a`, lijnen `#3a332e` | Anton (koppen), Instrument Sans, Space Mono (prijzen/labels) | prijslijst, "Bel nu" / "Afspraak maken", openingstijden, foto's van fades |
| Dameskapper / salon / nagelstudio | licht, zacht, verzorgd | bg `#fbf7f4`, tekst `#2b2321`, accent oud-roze `#c98b83`, zacht `#f1e4de` | Cormorant Garamond (koppen), DM Sans | behandelingen met prijzen, foto's van werk, afspraakknop |
| Snackbar / cafetaria / afhaal | warm, vrolijk, hongerig | bg `#fff8ec`, tekst `#2a1608`, rood `#d62828`, geel `#fcbf49` | Bowlby One SC (koppen), Nunito | menukaart met prijzen, "Bel om te bestellen", bezorgen/afhalen, openingstijden |
| Schilder / klusbedrijf | strak, betrouwbaar | bg `#ffffff`, tekst `#14213d`, accent `#1f6feb`, vlak `#eef3fb` | Archivo (koppen), Inter | diensten, voor/na-schuif, werkgebied, "Vraag een offerte" |
| Garage / autobedrijf | industrieel, sterk | bg `#121417`, tekst `#e9ecef`, oranje `#ff7a1a`, staal `#2a2f36` | Oswald (koppen), Inter, JetBrains Mono (labels) | APK/onderhoud/reparatie, merken, "Plan je afspraak", openingstijden |
| Standaard (vereniging, winkel, overig) | net, rustig | bg `#faf7f2`, tekst `#16151a`, accent `#c8102e` of eigen kleur | Playfair Display (koppen), Inter | wat ze doen, activiteiten/aanbod, contact |

Bij tweetalig: TR/NL-knop rechtsboven zoals in de ADD Hengelo-demo (`data-lang` op `<html>`, elementen met `lang="tr"` en `lang="nl"`, keuze onthouden in `localStorage` met try/catch).

## Stap 3: bouwen

Eén bestand `index.html` met alle CSS en JS erin. Mobiel eerst (ontwerp voor 390px breed, daarna groter). Volgorde van de pagina:

1. **Header** (sticky): naam/logo + knop "Bel" of "Afspraak".
2. **Hero**: naam, wat ze doen + plaats ("Barbershop in Hengelo"), de sterkste reden om te komen (score, lange openingstijden, lage prijs), twee knoppen: **Bel nu** (`tel:`) en **Route** (Google Maps-link naar het adres).
3. **Diensten/prijzen of menu** (het belangrijkste blok van de branche).
4. **Foto's** van hun werk/zaak (als die er zijn; anders dit blok weglaten, geen stockfoto's).
5. **Reviews**: alleen echte score + bron, of weglaten.
6. **Openingstijden + adres** met kaartlink.
7. **Contact**: WhatsApp-knop (`https://wa.me/31...`), telefoon, Instagram/boekingslink.
8. **Footer**: naam, adres, en klein: "Demo gemaakt door Efe Webdesign".

Altijd:
- Een klein vast label "Demo" (hoek van het scherm) en bij formulieren: "Demo: op de echte site gaat dit naar [e-mail]".
- Knoppen minstens 44px hoog, telefoonnummer klikbaar.
- Geen horizontaal scrollen, `img{max-width:100%}`, `prefers-reduced-motion` respecteren.

### Smaakregels (uit Taste Skill / Impeccable)
- Eén duidelijk concept per site, geen "AI-look": geen paarse gradients, geen glassmorphism, geen emoji als iconen, geen drie gelijke kaartjes met icoon-kop-tekst als enige layout.
- Grote, karaktervolle koppen; ruimte tussen secties (64-96px); maximaal 2 fonts + 1 mono.
- Echte inhoud boven versiering. Eén kleine animatie mag (fade-in, hover), niet meer.
- Teksten kort, in de taal van de klant (simpel Nederlands), geen "Welkom op onze website".

### SEO-basis (uit `klantenwerving/seo.md`)
- `<html lang="nl">`, `<title>[Naam] | [Dienst] in [Plaats]</title>`
- `<meta name="description">` van 1-2 zinnen met dienst + plaats.
- Eén `<h1>` met dienst + plaats.
- Naam, adres, telefoon precies zoals op Google Maps.
- JSON-LD `LocalBusiness` (of `HairSalon`, `BeautySalon`, `Restaurant`, `AutoRepair`, `HousePainter`) met name, address, telephone, openingHours, url. Lege velden weglaten, niet verzinnen.
- `<meta name="viewport">`, `og:title`, `og:description`.

## Stap 4: controleren

**Altijd** (ook in de app): lees je eigen HTML na op verzonnen gegevens, kapotte `tel:`/`wa.me`/Maps-links, en of alles op 390px past.

**In de Code-tab (laptop)**, als `playwright-cli` geïnstalleerd is (`npm install -g @playwright/cli`):
`file://` wordt door Playwright CLI geblokkeerd, dus start eerst een lokale server in de map van de demo:
```
python -m http.server 8765        (Windows: py -m http.server 8765)
playwright-cli open http://localhost:8765/
playwright-cli resize 390 844
playwright-cli eval "() => [document.documentElement.scrollWidth, innerWidth]"
playwright-cli screenshot --full-page --filename=demo-390.png
```
De twee getallen van `eval` moeten gelijk zijn (anders scrollt de pagina opzij).
Bekijk de screenshot, klik "Bel nu", "Route" en WhatsApp na (`playwright-cli snapshot` voor de elementen) en check of niets buiten beeld valt. Herhaal op 1280x800. Fix wat fout is en check opnieuw. Is Playwright CLI er niet, zeg dat en doe alleen de handmatige check.

## Stap 5: online zetten

- **In de app**: publiceer als artifact (titel = naam van de zaak). Geef de link. Let op: in een artifact werken `tel:`- en WhatsApp-links niet altijd. Voor het echte binnenlopen is de Cloudflare-versie beter.
- **In de Code-tab**: zet de map `demos/[zaaknaam]/` online met `npx wrangler pages deploy demos/[zaaknaam] --project-name [zaaknaam]` → `https://[zaaknaam].pages.dev`. De eerste keer moet Efe zelf `npx wrangler login` doen. Vraag altijd eerst akkoord voordat je iets online zet.

## Stap 6: DM-tekst

Maak met `klantenwerving/berichten.md` twee teksten, ingevuld met naam, plaats, demo-link en de openingszin uit de leadlijst:
1. **Instagram/Facebook DM** (sjabloon 1)
2. **Binnenloop-zin** (sjabloon 2), met €250 en €25 per maand

Is `berichten.md` niet beschikbaar (bijv. in de app), gebruik dan deze twee:

> Hoi [naam of zaak]! Ik ben Efe, ik maak websites voor zaken hier in [plaats].
> [openingszin]
> Ik heb alvast een voorbeeld gemaakt van hoe een site voor jullie eruit kan zien: [demo-link]
> Mag ik het een keer kort laten zien? Kost je niks om te kijken.

> "Hoi, ik ben Efe uit [plaats]. Ik zag dat jullie nog geen website hebben, dus ik heb er alvast eentje voor jullie gemaakt. Mag ik hem even laten zien? Duurt één minuut." (telefoon laten zien) "Als je hem wil hebben zet ik hem online voor €250. Je betaalt de helft nu en de rest als hij live staat. Daarna €25 per maand en dan regel ik alles: aanpassingen, hosting, dat hij op Google komt."

Geen e-mail naar eenmanszaken. Alleen echte klanten als referentie noemen.

## Oplevering aan Efe

Kort, in simpel Nederlands:
- de link naar de demo
- wat er nog ontbreekt (bijv. "prijzen en telefoon staan leeg, vraag die bij het binnenlopen")
- de twee teksten, klaar om te kopiëren
