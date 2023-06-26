# Introduktion

Välkommen till Glitchborne Groove projektet, en webbplasts för ett konceptuellt streetwear varumärke. Syftet med detta projekt är att skapa en interaktiv och realistisk webbplats där man kan utforska märket och designen.

Denna webbplats är skapad för att ge en inblick på den estetika designen av Glitchborne. Man kan utforska klädkollektioner, få en djupare blick till inspiration bakom designen i features sektionen.

NOTE: Glitchborne Groove är ett konceptuellt varumärke, kommer kläderna inte att vara tillgängliga för köp. Allt innehåll är endast för demonstration.


# Ladda ner projekt och testa
NOTE: Webbplatsen använder fetch för att ladda data och det rekommenderas att du använder en live-server för att undvika problem med CORS. Http-server är ett bra alternativ.

1. Installera den globalt med `npm install --global http-server`
2. Starta servern i projektets mapp med `http-server . -p 8000`
3. Öppna webbläsaren på http://localhost:8000

# Överblick av HTML sidorna

* `index.html`: Detta är webbplatsens startsida och är placerad i projektets rot. Startsida innehåller en visuall introduktion till märket i form av bilder och en uppmärksamhets fångande text.
* `shop.html`: Denna sida fungerar som produktkatalogen för webbplatsen, där alla produkter visas i ett rutnätslayout. Varje produkt har en thumbnail-bild, namn och pris. 
* `product.html`: Detta är sidan för specifika produkter. När en användare klickar på en produkt, kommer de till denna sida. Denna sida innehåller produktdetaljer, inklusive flera bilder, produktbeskrivning, storleksinformation och så vidare.
* `features.html`: Denna sida består av en samling artiklar, såsom lookbooks, bildkataloger och liknande. Varje artikel presenteras med en bild, titel, beskrivning, kategori och publiseringsdatum.
* `article.html`: Detta är sidan som en användare kommer till när de klickar på en artikel. Det innehåller hela artikelinnehållet, inklusive text och bilder.
* `locations.html`: Denna sida innehåller information om fysiska butiker som varumärket har.
* `credit.html`: Denna sida listar de resurser och verktyg som har varit till hjälp vid skapandet av denna webbplats. 
* `contact.html`: Detta är kontaktsidan, som inkluderar ett kontaktformulär och vanliga frågor. 
* `terms-of-use.html`: Detta är sidan som innehåller användarvillkoren för webbplatsen. Villkoren är strukturerade i avsnitt för enkel läsning.
* `refund.html`: Denna sida innehåller information om frakt och återbetalningspolicyn. Informationen är uppdelad i tydliga avsnitt för frakt och återbetalning.
* `privacy.html`: Denna sida innehåller information om hur användarnas information hanteras. 


# Överblick av projectet

### Assets

Mappen `assets` innehåller alla tillgångar som projektet använder. 

- `brand` mappen innehåller varumärkesspecifika tillgångar som logotyp och logotypmärke. 
- `designs` mappen innehåller kläddesigner. 
- `icons` mappen inkluderar alla nödvändiga ikoner och är importerad från svgREPO, en webbplats där du kan ladda ner ikoner och SVG-filer gratis. 
- `images` mappen innehåller både alla bilder för innehållet och mockups för produkterna.

### Data

Mappen `data` innehåller data som webbplatsen använder, detta är data som dynamiskt laddas in på webbplatsen med JavaScript. Det finns för närvarande två filer i data-mappen, `product.json` och `articles.json`. `product.json` är ett JSON-objekt som innehåller all data om produkterna och `articles.json` innehåller all information och länkar till bilder för funktioner och artikel sidan.

### Pages

Mappen `pages` skapades för att undvika att projektroten blir rörig och den innehåller alla sidor förutom `index.html`, vilket är startsidan. 

### Scripts

Mappen `scripts` inkluderar all JavaScript för projektet och är indelat i två mappar till: `components` som innehåller komponentspecifik kod och `pages` som innehåller sid-spesifik kod. Alla filer i komponentmappen ska aldrig direkt importeras av några sidor, utan det importeras istället in i `main.js` filen och detta är skriptet som alla sidor importerar. Detta beror på att vissa händelser måste synkroniseras och därför är det bättre att ha en gemensam JavaScript-fil för ingången. JavaScript-filerna för sidor är kod som är sid-spesifik och detta importeras direkt till HTML-sidorna.

### Styles

Mappen `styles` innehåller all CSS i projektet, denna mapp är indelad i tre ytterligare mappar, `base`, `components` och `pages`. `components` och `pages` mapparna är mycket lika JavaScript-strukturen, komponenterna är komponentspecifik CSS, sidorna är sid-spesifika. Det finns dock en mapp till och det är `base`, denna mapp innehåller alla CSS-återställningar, variabler, globala klasser, layoutklasser och så vidare. Både komponent- och basfiler importeras till `main.css` filen och dessa stilar och klasser är tillgängliga för alla sidor. HTML-sidorna importerar `main.css` och dess sid-spesifika stilar.

Till exempel:
```
<link rel="stylesheet" href="../styles/main.css" />
<link rel="stylesheet" href="../styles/pages/contact.css" />
```

# Javascript Funktionalitet Documentation

## main.js
`main.js` är den primära JavaScript-filen som importeras till varje sida. Den ansvarar för att hantera globala händelser och importera komponenter.

* `dropdown`: Hanterar funktionaliteten för dropdown menyn i huvud navigationen.
* `menuPane`: Ansvarar för mobila menyns funktionalitet.
* `accordion`: Kontrollerar beteendet för alla "accordion" element.
* `cartPane`: Hanterar kundvagnspanelen funktionalitet.

#### DOMContentLoaded
`main.js` har ansvar att initiera all component kod. Detta görs genom att koppla en händelse lyssnare some lyssnar efter "DOMContentLoaded", när sidan har laddas så initierar `main.js` alla componenter. 

```
window.addEventListener("DOMContentLoaded", async (event) => {
	...
});
```

#### applyMarginMain()
`applyMarginMain` är en funktion som beräknar höjden på `<header>` elementet och sätter top marginalen på <main> elementet till detta värde. Detta säkerställer att `<main>` elementets innehåll inte överlappas av `<header>` elementet.
```
function applyMarginMain() {
	const headerHeight = document.querySelector("header").offsetHeight;
	document.querySelector("main").style['margin-top'] = `${headerHeight}px`;
}
```
Denna funktion anväands inte bara då DOMContentLoaded händelsen händer men den måste också köras varje gång skärmen ändrar storkel. Detta är på grund av att <header> elementet ändrar höjd vid vissa breakpoints.

```
window.addEventListener("resize", applyMarginMain)
```


## _accordion.js
Kontrollerar beteendet för alla "accordion" element.

#### toggleAccordion
Styr öppning och stängning av en individuell accordion. Om en panel är öppen stängs den, och om den är stängd öppnas den, medan alla andra paneler stängs. 

#### _closeAllAccordions
Stänger alla öppna accordions utom den som är activ (den man interagerar med). Detta åstadkommes genom att ställa in maxHeight för varje accordion-body (delen som har innehållet) till null och ta bort klassen "accordion--open". 

#### init
 Initialiserar funktionaliteten för alla accordions på sidan genom att fästa en click händelse lyssnare på varje accordion och ställa in toggleAccordion som callback.

```
function _closeAllAccordions(accordions, current) { ... }

function toggleAccordion(event) { ... }

function init() { ... }

export { init, toggleAccordion };
```

NOTE: Anledningar till varför toogleAccordion är exporterad och inte är en privat funktion är pågrund av att den behövs användas i `main.js` i respons till "productLoaded" händelsen.



## _cart-pane.js
Hanterar kundvagnspanelen funktionalitet.

#### _toggleCartPane
Öppnar och stänger kundvagnspanelen.

#### _updateCartPane
Uppdaterar bredden på kundvagnspanelen beroende på skärmstorleken, endast om panelen är öppen.

#### init
Initierar händelselyssnare på elementet som har klassen cart-pane__toggle, och en händelselyssnare för att uppdatera kundvagnspanelen vid skärmstorleksändring.

```
const cartPane = document.querySelector(".cart-pane");

function _toggleCartPane() { ... }

function _updateCartPane() { ... }

function init() { ... }

export { init };
```

## _dropdown.js
Hanterar funktionaliteten för dropdown menyn i huvud navigationen.
#### _recenterDropdownOnResize
Uppdaterar dropdown menyens x-axel position baserat på förälder elementetts koordinater.
#### init
Initerar lyssnare på händelsen resize för att centrera dropdown menyen både vid initialisering och när skärmen ändras.

## _menu-pane.js
Ansvarar för mobila menyns funktionalitet.

#### _toggleMenuPane
Öppnar och stänger menyn.


#### _updateMenuPane
Ser till att menyn täcker hela skärmens bredd när skärmen är liten och annars täcker halva bredden.

#### applyMarginMenuPane
Justerar menyns position på sidan baserat på höjden av sidhuvudet.

#### init
Initerar händelselyssnare för att uppdatera menyn och ändra dess position.

```
let menuPane = document.querySelector(".menu-pane");

function _toggleMenuPane() { ... }

function _updateMenuPane() { ... }

function applyMarginMenuPane() { ... }

function init() {... }

export { init };
```

## article.js
Denna kod ansvarar för inläsning och visning av en specifik artikel från articles.json filen. Den matchar artikelns ID med sökparameterns ID i webbadressen och presenterar motsvarande artikel.


## product.js
Denna kod ansvarar för inläsning och visning av en specifik produkt från products.json filen. Den matchar produktens ID med sökparameterns ID i webbadressen och presenterar motsvarande produkt.


## features.js
Denna kod hanterar inläsning av alla artiklar och placerar dem i ett rutnät på `features.html` sidan för att presentera ett samlingsutbud av artiklar.


## shop.js
Denna kod hanterar inläsning av alla produkter och arrangerar dem i ett rutnät på `shop.html` sidan för att presentera ett samlingsutbud av produkter. När inläsningen är klar, utlöses händelsen productsLoaded.

