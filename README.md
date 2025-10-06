# Beers App

Angular aplikacija za otkrivanje različitih vrsta piva koristeći PUNK API (https://api.adscanner.tv/punkapi/v2/):

## Značajke aplikacije

- Lista piva sa paginacijom
- Napredni filteri prema naziv i, razini alkohola
- Spremanje favorita u Session Storage s mogučnošću filtra
- Sortiranje prema uzlaznom ili silaznom redoslijedu
- URL za vođenje "State-a" za aktivne filtere i redni broj stranice
- In-memory Caching servis i Skeletoni dok se podaci učitavaju
- Responzivni dizajn
- "Error handling" mehanizam i mogućnost ponavljanja ukoliko API baci grešku

---

## Korištene tehnologije i arhitektura

- Angular v20 i standalone komponente
- State management - Signali za reaktivan state, zajedno sa RxJS-om za asinkrone radnje poput HTTP zahtjeva i debouncanih promjena u poljima
- Styling - SCSS sa modularnom strukturom zajedno sa Angular Material komponentama
- Facade Pattern - BeersFacade se koristi za abstrakciju interakcije kompleksnog state managementa i servisa
- Ostali Design Patterni - Container/Presentational pattern, Injector pattern
- **Servisi:**
  - **Caching servis** – in-memory cacheiranje za API pozive
  - **Session storage servis** – servis za spremanje omiljenih piva u Session storage
  - **Url servis** – sinkronizacija state-a aplikacije i URL parametara
  - **Interceptor servis** – globalni HttpInterceptor za hvatanje grešaka u cijeloj aplikaciji (puno problema s API-jem, dosta je nestabilan)
  - **Modal servis** – dinamički servis za kreiranje i upravljanje modalima
- Testiranje - Unit testovi sa relativno visokom pokrivenošću koda (90%)

---

### Kloniranje repositoryja

Za kloniranje repositoryja:

<pre> `git clone https://github.com/frubes05/beers-app.git` </pre>

### Instalacija dependencyja

Za instalaciju projektnih ovisnosti (dependencies): <pre> `npm install` </pre>

## Pokretanje aplikacije

Za pokretanje projekta: <pre> `npm start` </pre>

Aplikacija će biti dostupna na adresi `http://localhost:4200/`.

---

## Formatiranje koda

Aplikacija koristi Prettier za automatsko formatiranje koda.
Konfiguracija se nalazi u `.prettierrc` i `.vscode/settings.json` datotekama.

Za ručno formatiranje pokrenuti: <pre> `npm run format` </pre>

---

## Testiranje koda

Aplikacija koristi Karma i Jasmine za testiranje Angular komponenti, servisa, direktiva i ostalih modula.

Za ručno izvršavanje testova: <pre> `npm run test` </pre>

---
