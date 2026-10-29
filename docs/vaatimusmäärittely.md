# Vaatimusmäärittely

**Versio:** 0.3  
**Päivämäärä:** 29.10.2026  
**Laatija:** Study Group 10  
**Tila:** Keskeneräinen

## 1. Tausta ja tavoite

Elokuva-harrastajilla on hankala seurata toistensa elokuvasuosituksia.

**Tavoite:** Ryhmän jäsenet näkevät toistensa elokuvasuositukset helposti ja voivat keskustella niistä.

**Onnistumisen mittarit:** Sovitaan asiakkaan kanssa

- Ryhmän jäsen näkee muiden ryhmäjäsenien suositukset.
- 

## 2. Käyttäjät ja roolit

| Rooli | Tarve | Oikeudet |
|---|---|---|
| Ryhmän jäsen | Nähdä ryhmän muiden jäsenten elokuvasuositukset ja jakaa omat elokuvasuositukset. | Katsella ryhmän jäsenten suosituksia ja lisätä omia suosituksiaan ryhmään. |
| Ryhmän ylläpitäjä | Hallinnoida ryhmän jäseniä ja ryhmää. | Jäsenten oikeuksien lisäksi hyväksyä ja poistaa käyttäjiä ryhmästä. |
| Ulkopuolinen käyttäjä | Nähdä elokuvat, julkiset arvostelut ja jaetut listat. | Nähdä elokuvat,julkiset arvostelut ja jaetut listat. Pystyy rekisteröytymään. |

**Esimerkin rajaus:** Sovellus on aluksi yhdelle ryhmälle tarkoitettu. Monen ryhmän tuki on jatkokehitysidea.

## 3. Käyttötilanne

1. Ryhmän jäsen kirjoittaa elokuva-arvostelun.
2. Elokuva-arvostelu tulee muille ryhmän jäsenille näkyviin ryhmän sivulle.
3. Ryhmän jäsenet voivat keskustella arvostelusta.


## 4. Toiminnalliset vaatimukset

Jokaisella vaatimuksella on yksilöllinen tunniste. **Must** tarkoittaa ensimmäisen käyttökelpoisen version kannalta välttämätöntä, **Should** tärkeää mutta lykättävissä olevaa ja **Could** mahdollista lisäominaisuutta.

| ID | Vaatimus | Prioriteetti |
|---|---|---|
| FR-01 | Käyttäjänä voin arvostella elokuvan. | must |
| FR-02 | Käyttäjänä voin hakea arvosteltavia elokuvia. | must |
| FR-03 | Käyttäjänä voin perustaa ryhmän. | must |
| FR-04 | Ryhmän ylläpitäjänä voin kutsua jäseniä ryhmään. | must |
| FR-05 | Ryhmän jäsenenä voin nähdä muiden ryhmän jäsenien arvosteluja. | must |
| FR-06 | Ulkopuolisena voin rekisteröityä käyttäjäksi. | must |
| FR-07 | Ulkopuolisena voin kirjautua käyttäjätililleni. | must |
| FR-08 | Ryhmän jäsenenä voin poistua ryhmästä. | should |
| FR-09 | Käyttäjänä voin poistaa käyttäjätilini. | should |
| FR-10 | Ryhmän ylläpitäjänä voin poistaa ryhmän. | should |
| FR-11 | Käyttäjänä voin poistaa arvosteluni. | should |
| FR-12 | Ulkopuolisena voin hakea elokuvia. | should |
| FR-13 | Ulkopuolisena voin lukea julkisia arvosteluja. | should |
| FR-14 | Käyttäjänä voin luoda listan elokuvista. | should |
| FR-15 | Ulkopuolisena voin nähdä minulle jaettuja listoja. | should |
| FR-16 | Käyttäjänä voin poistaa luomani listan. | should |
| FR-17 | Ryhmän ylläpitäjänä voin luoda ryhmälle elokuvalistan. | should |
| FR-18 | Ryhmän ylläpitäjänä voin poistaa ryhmälle luodun elokuvalistan. | should |
| FR-19 | Ryhmän ylläpitäjänä voin lisätä ryhmälle muita ylläpitäjiä. | should |
| FR-20 | Ryhmän ylläpitäjänä voin poistaa jäseniä ryhmästä. | should |
| FR-21 | Ulkopuolisena voin hakea elokuvia tunnisteiden perusteella. | should |
| FR-22 | Ulkopuolisena voin nähdä ajankohtaisia elokuvia etusivulla. | could |
| FR-23 | Käyttäjänä voin saada elokuvasuosituksia. | could |
| FR-24 | Ulkopuolisena voin nähdä missä teattereissa ja milloin elokuvan voi nähdä. | could |
| FR-25 | Ulkopuolisena voin nähdä käyttäjän julkiset arvostelut käyttäjän profiilista. | could |
| FR-26 | Ulkopuolisena voin nähdä julkisia ryhmiä. | could |
| FR-27 | Ryhmän jäsenenä voin jakaa ryhmälle listojani. | could |
| FR-28 | Käyttäjänä saan elokuvasuosituksia tekoälyltä. | wont now |


### 4.1 Tarkemmat hyväksymiskriteerit: 

- **Tilanne:**  **Kun:**  **Niin:** 
- **Kun:**  **Niin:** 

## 5. Ei-toiminnalliset vaatimukset

| ID | Vaatimus | Todentaminen |
|---|---|---|
| NFR-01 | Sovelluksen tulee näyttää asialliselta. | Hyväksymistesti |
| NFR-02 | Sovelluksen tulee toimia mobiililaitteella. | Käyttöliittymätesti |
| NFR-03 | Salasanat tallennetaan vain turvallisella yksisuuntaisella salasanatiivisteellä | Toteutuksen ja tietokannan tarkistus |
| NFR-04 | Käyttäjä ei voi hakea tai muuttaa toisen käyttäjän tietoja ilman roolinsa mukaista oikeutta. | API:n käyttöoikeustesti |
| NFR-05 | Sovelluksen tulee olla suomenkielinen. | Käyttöliittymätesti |

## 6. Tiedot ja alustava tietomalli

Sovellus tallentaa vähintään seuraavat tiedot:

- **Käyttäjä:** tunniste, käyttäjätunnus, sähköposti, salasanatiiviste ja arvostelut.
- **Ryhmä:** tunniste, nimi, jäsenet ja ylläpitäjät.

## 7. Projektin rajaus

**Ensimmäiseen julkaisuun (MVP) sisältyvät:** FR-01 - FR-07

**Ei toteuteta tässä kahdeksan viikon projektissa:** FR-28

Rajaus ja Must-prioriteetit hyväksytetään asiakkaalla. Niitä voidaan muuttaa, kun toteutuksen työmäärä tarkentuu.

## 8. Toteutusjärjestys ja alustava viikkosuunnitelma

| Viikko | Tavoite ja näytettävä tulos |
|---|---|
| 1 | Vaatimukset, käyttöönottokaavio, tietokantasuunnitelma, backlog, GitHub repositorio ja ensimmäinen Azure-julkaisu hyväksyttyyn pohjaan |
| 2 | 2-3 azureen julkaistua ominaisuutta |
| 3 | Viimeistään tässä vaiheessa kaikki must vaatimukset valmiit |
| 4 | Should vaatimusten työstämistä |
| 5 | Should vaatimusten työstämistä |
| 6 | Could vaatimusten työstämistä |
| 7 | Viimeistely, dokumentit, testaus ja tuotantoversion vakauttaminen |
| 8 | Loppuesitys ja toimivan julkaistun sovelluksen esittely |

## 9. Definition of Done

- [Definition of Done](docs/definition-of-done.md)

## 10. Avoimet kysymykset ja oletukset

| ID | Kysymys asiakkaalle | Tila |
|---|---|---|
| Q-01 | Pitääkö palvelussa olla viestintäominaisuuksia? Jos pitää, minkälaisia? V: WhatsAppin tyyppinen keskustelu palsta ryhmissä. | Suljettu |
| Q-02 | Voiko julkisia ryhmiä hakea? V: Voi hakea.  | Suljettu |
| Q-03 | Voiko julkisiin ryhmiin liittyä ilman kutsua? V: Pystyy pyytää liitymislupaa ryhmään.  | Suljettu |
| Q-04 | Jos elokuvia ei löydy palvelusta, voiko käyttäjä lisätä arvostelun puuttuvaan elokuvaan? V: Ei tarvi. | Suljettu |
| Q-05 | Jos kaksi käyttäjää on yhteisessä ryhmässä, pystyykö käyttäjät nähdä toistensa ryhmiä? V: Käyttäjät eivät näe yksityisiä ryhmiä, mutta julkiset ryhmät näkyvät. | Suljettu |
| Q-06 | Onko arvostelulle tarkkaa maksimipituutta? V: Asiakasta ei haittaa pitkät arvostelut. | Suljettu |

**Oletukset, jotka pitää varmistaa:** 

## 11. Hyväksyntä ja muutosten hallinta

Vaatimusmäärittely käydään asiakkaan kanssa läpi **ennen varsinaisen toteutuksen etenemistä**. Hyväksynnässä tarkistetaan erityisesti tavoitteet, ensimmäisen version rajaus, Must-vaatimukset ja avoimet kysymykset.

| Kenttä | Arvo |
|---|---|
| Asiakkaan edustaja | _________________________ |
| Hyväksytty versio | _________________________ |
| Hyväksynnän päivämäärä | _________________________ |
| Mahdolliset ehdot | _________________________ |

Muutokset kirjataan dokumentin versiohistoriaan ja ~~GitHubin backlogiin.~~ Asiakas ja tiimi arvioivat yhdessä niiden vaikutuksen aikatauluun ja prioriteetteihin.

## 12. Versiohistoria

| Versio | Päivä | Muutos |
|---|---|---|
| 0.1 | 27.10.2026 | Alustava vaatimusmäärittely. |
| 0.2 | 28.10.2026 | Vaatimuusmäärittely täydennetty. |
| 0.3 | 29.10.2026 | Lisätty asiakkaan vastaukset kysymyksiin. |