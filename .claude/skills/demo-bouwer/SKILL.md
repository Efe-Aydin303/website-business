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
- **3 tot 6 echte foto's** van de zaak: gevel/uithangbord, interieur, hun werk (screenshots van Google Maps, Instagram of Knipklok zijn goed). Dit is het belangrijkste wat je vraagt: echte foto's maken een site persoonlijk, getekende plaatjes maken hem AI-achtig.
- 1 of 2 echte reviewzinnen (letterlijk overgenomen) en iets wat alleen deze zaak heeft (verhuisd, familiezaak, lang open, koffie erbij, spreekt Turks/Arabisch)
- Instagram/Facebook/boekingslink (bijv. Knipklok, Fresha, Treatwell)
- tweetalig TR/NL? (vaak handig bij Turkse eigenaren; vraag het)

Staat de zaak in `klantenwerving/leads-*.xlsx`, haal daar adres, score, "wat ze nu gebruiken", "waarom ze een site zouden nemen" en de openingszin uit. Vraag de rest niet opnieuw.

**Nooit verzinnen.** Geen nep-prijzen, nep-reviews, nep-telefoonnummers of nep-openingstijden. Wat je niet weet wordt een zichtbare lege plek: `€ ··`, `06 ·· ·· ·· ··`, `Openingstijden volgen`. Een eigenaar die zijn eigen prijzen fout ziet staan, haakt af. Reviewcijfers alleen als ze echt bekend zijn, met de bron erbij ("4,9 uit 724 reviews op Knipklok").

## Stap 2: een eigen identiteit, geen sjabloon

Waarom: als elke demo dezelfde fonts, kleuren en trucjes krijgt, lijken ze op elkaar en voelt het als AI. (Efe, 2026-10-06: "het is nog steeds AI-achtig en de sites lijken op elkaar".) Daarom kies je per zaak opnieuw, uit wat **deze zaak** heeft.

1. **Kleuren uit de zaak zelf.** Haal 2-3 kleuren uit hun uithangbord, logo, interieur of foto's (in de Code-tab: `python -c` met Pillow om de meest voorkomende kleuren uit de foto's te halen; in de app: kijk naar de foto's). Vul aan met één neutrale achtergrond die daarbij past. Geen standaardpalet per branche.
2. **Kies een richting** uit de lijst hieronder die past bij hoe de zaak er echt uitziet (luxe of eenvoudig, jong of klassiek, Nederlands of Turks/Arabisch publiek). Schrijf in één zin op waarom.
3. **Check `demos/LOG.md`** (maak hem als hij er niet is). Gebruik geen richting, fontpaar of "signatuur-moment" dat in de laatste 5 demo's al voorkwam. Voeg na het bouwen een regel toe: `datum | zaak | richting | fonts | kleuren | signatuur-moment`.

| Richting | Past bij | Fonts (kop + tekst) | Layout-idee |
|---|---|---|---|
| Editorial / tijdschrift | nette kapsalon, salon, schilder | Instrument Serif + Manrope | grote foto's met bijschrift, asymmetrische kolommen, veel wit |
| Straat / collage | barbershop met jong publiek | Archivo Black + IBM Plex Sans | fotocollage met schuine randen, tape-stroken, grote cijfers |
| Ouderwetse vakzaak | klassieke herenkapper, slager, schoenmaker | Rozha One + Work Sans | tegelpatroon of houtnerf als rand, emaille-bordje als kop |
| Nachtzaak / neon | zaak met lichtreclame, shisha, late snackbar | Big Shoulders Display + Barlow | donker, hun neonkleur als enige felle kleur, gloed rond koppen |
| Retro snackbar | cafetaria, frituur | Alfa Slab One + Rubik | menubord-layout, prijzen als op een lichtbak, rood-wit |
| Grill / kebab | Turkse of Arabische grill, bakker | Yeseva One + Nunito Sans | warme foto van de grill groot, menu in kaarten per gerecht |
| Zacht luxe | nagelstudio, beauty, dameskapper | Bodoni Moda + Jost | smalle kolom, foto's in boogvormen, rustige kleuren uit hun salon |
| Speels kleur | nagelstudio met jong publiek | Gloock + Figtree | kleurvlakken uit hun nagelwerk, grote ronde foto's |
| Vakman / betrouwbaar | schilder, klusbedrijf, loodgieter | Zilla Slab + Source Sans 3 | voor/na-foto's, werkgebied, stappenplan |
| Werkplaats | garage, fietsenmaker | Saira Condensed + Barlow | stoere foto's, diensten als werkorder/bon, merkenlogo's in tekst |
| Rustig standaard | vereniging, winkel, overig | Fraunces + Karla | heldere secties, agenda of aanbod centraal |

Gebruik **niet**: Anton, Instrument Sans, Space Mono (dat is Efe's eigen huisstijl, klantsites moeten anders zijn), Inter, Space Grotesk, Poppins.

Bij tweetalig: TR/NL-knop rechtsboven zoals in de ADD Hengelo-demo (`data-lang` op `<html>`, elementen met `lang="tr"` en `lang="nl"`, keuze onthouden in `localStorage` met try/catch).

## Stap 3: bouwen

Eén bestand `index.html` met alle CSS en JS erin. Mobiel eerst (ontwerp voor 390px breed, daarna groter).

Deze **inhoud** moet erin (volgorde en vorm kies je per richting, niet elke site dezelfde volgorde):
- naam + wat ze doen + plaats, en de sterkste echte reden om te komen
- **Bel nu** (`tel:`) en **Route** (Google Maps-link), en boek/bestel als dat bestaat
- diensten/prijzen of menu
- hun foto's (gevel, binnen, werk)
- echte score + bron, en 1-2 letterlijke reviewzinnen als je die hebt
- openingstijden + adres
- WhatsApp, Instagram/boekingslink
- footer met klein: "Demo gemaakt door Efe Webdesign"

Altijd:
- Een klein vast label "Demo" en bij formulieren: "Demo: op de echte site gaat dit naar [e-mail]".
- Op de telefoon een vaste balk onderin met de 2-3 belangrijkste knoppen (Bel / Boek of Bestel / Route).
- Knoppen minstens 44px hoog. Geen horizontaal scrollen, `img{max-width:100%}`, `prefers-reduced-motion` respecteren.

### Rijk, maar eigen (Efe, 2026-10-06)
Een kale site met tekst en lijstjes is te weinig, maar "rijk" betekent **hun eigen materiaal groot en goed gebruikt**, niet zoveel mogelijk effecten.
- **Foto's dragen de site.** Groot, goed bijgesneden (`object-fit: cover`), met een eigen behandeling die bij de richting past (bijschriften, collage, boogvorm, duotoon in hun kleur). Geen stockfoto's.
- **Precies één signatuur-moment** dat alleen bij deze zaak past en verschilt van de vorige demo's. Voorbeelden: tondeuse-schuif (#0 tot #4) die een kapsel verandert; voor/na-schuif; menu waarmee je een bestelling samenstelt; kleurkiezer voor nagels; kaartje met looproute na een verhuizing; "wat is er mis met je auto?"-kiezer.
- **Echte details als inhoud**: de straatnaam, het aantal reviews, letterlijke reviewzinnen, de openingstijden in de avond, de taal die ze spreken.
- Lege plekken (prijzen, tijden) netjes vormgeven: één zin als "Prijzen volgen" in de stijl van de site, geen rijen met puntjes.
- Getekende SVG-illustraties alleen als er écht geen foto's zijn, en dan typografisch sterk in plaats van clipart.

### Anti-AI-check (doe deze vóór je oplevert)
Loop deze lijst na en haal weg wat erin staat:
- Dezelfde trucjes als de vorige demo (kijk in `demos/LOG.md`): draaiende tekstring, ronde stempel/sticker, schuine lichtkrant (ticker), letters die invallen, mono-labels in hoofdletters boven elke sectie. Maximaal één van deze per site, en nooit dezelfde als de vorige keer.
- Paarse/blauwe gradients, glassmorphism, emoji als iconen, drie gelijke kaartjes met icoon-kop-tekst, alles gecentreerd, overal dezelfde ronde hoeken.
- Algemene zinnen die bij elke zaak passen ("Strakke fades, scherpe lijnen", "Kwaliteit en service staan voorop", "Welkom op onze website"). Vervang door iets wat alleen over deze zaak waar is.
- Verzonnen feiten ("sinds 1998", "het beste van Hengelo", reviews die je niet hebt).
- Vraag jezelf: als ik de naam weghaal, kan dit dan ook de site van een andere kapper zijn? Zo ja, dan is hij nog niet eigen genoeg.

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
