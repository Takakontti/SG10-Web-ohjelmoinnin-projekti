# Vaatimusmäärittely

**Versio:** 1.1  
**Päivämäärä:** 2.11.2026  
**Laatija:** Study Group 10  
**Tila:** Hyväksytty

## 1. Tausta ja tavoite

Elokuva-harrastajilla on hankala seurata toistensa elokuvasuosituksia.

**Tavoite:** Ryhmän jäsenet näkevät toistensa elokuvasuositukset helposti ja voivat keskustella niistä.

**Onnistumisen mittarit:**

- Ryhmän jäsen näkee muiden ryhmäjäsenien arvostelut.
- Ryhmän ylläpitäjä voi kutsua jäseniä ryhmään.

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
| FR-01 | [Käyttäjänä voin arvostella elokuvan.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/5) | must |
| FR-02 | [Käyttäjänä voin hakea arvosteltavia elokuvia.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/6) | must |
| FR-03 | [Käyttäjänä voin perustaa ryhmän.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/7) | must |
| FR-04 | [Ryhmän ylläpitäjänä voin kutsua jäseniä ryhmään.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/8) | must |
| FR-05 | [Ryhmän jäsenenä voin nähdä muiden ryhmän jäsenien arvosteluja.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/9) | must |
| FR-06 | [Ulkopuolisena voin rekisteröityä käyttäjäksi.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/10) | must |
| FR-07 | [Ulkopuolisena voin kirjautua käyttäjätililleni.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/24) | must |
| FR-08 | [Ryhmän jäsenenä voin poistua ryhmästä.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/12) | should |
| FR-09 | [Käyttäjänä voin poistaa käyttäjätilini.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/13) | should |
| FR-10 | [Ryhmän ylläpitäjänä voin poistaa ryhmän.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/14) | should |
| FR-11 | [Käyttäjänä voin poistaa arvosteluni.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/15) | should |
| FR-12 | [Ulkopuolisena voin hakea elokuvia.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/16) | should |
| FR-13 | [Ulkopuolisena voin lukea julkisia arvosteluja.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/17) | should |
| FR-14 | [Käyttäjänä voin luoda listan elokuvista.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/18) | should |
| FR-15 | [Ulkopuolisena voin nähdä minulle jaettuja listoja.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/19) | should |
| FR-16 | [Käyttäjänä voin poistaa luomani listan.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/20) | should |
| FR-17 | [Ryhmän ylläpitäjänä voin luoda ryhmälle elokuvalistan.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/21) | should |
| FR-18 | [Ryhmän ylläpitäjänä voin poistaa ryhmälle luodun elokuvalistan.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/22) | should |
| FR-19 | [Ryhmän ylläpitäjänä voin lisätä ryhmälle muita ylläpitäjiä.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/23) | should |
| FR-20 | [Ryhmän ylläpitäjänä voin poistaa jäseniä ryhmästä.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/11) | should |
| FR-21 | [Ulkopuolisena voin hakea elokuvia tunnisteiden perusteella.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/26) | should |
| FR-22 | [Käyttäjänä voin muokata arvostelujani.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/40) | should |
| FR-23 | [Käyttäjänä voin vaihtaa sähköpostini.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/41) | should |
| FR-24 | [Käyttäjänä voin vaihtaa salasanani.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/42) | should |
| FR-25 | [Käyttäjänä voin palauttaa unohtuneen salasanani.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/43) | should |
| FR-26 | [Ryhmän jäsenenä voin lähettää viestejä ryhmän ryhmäkeskusteluun.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/44) | should |
| FR-27 | [Ryhmän jäsenenä voin nähdä julkiset ryhmät, joihin toinen ryhmän jäsen kuuluu.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/48) | could |
| FR-28 | [Omistajana voin nähdä tilastoja sovelluksen käytöstä.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/49) | could |
| FR-29 | [Ulkopuolisena voin nähdä ajankohtaisia elokuvia etusivulla.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/25) | could |
| FR-30 | [Käyttäjänä voin saada elokuvasuosituksia.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/27) | could |
| FR-31 | [Käyttäjänä voin piilottaa elokuvaehdotukset, jotka eivät kiinnosta.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/45) | could |
| FR-32 | [Ulkopuolisena voin nähdä, missä teattereissa ja milloin elokuvan voi nähdä.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/28) | could |
| FR-33 | [Ulkopuolisena voin nähdä, minkälainen näytös elokuvalla on elokuvateatterissa.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/47) | could |
| FR-34 | [Ulkopuolisena voin nähdä käyttäjän julkiset arvostelut käyttäjän profiilista.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/29) | could |
| FR-35 | [Ulkopuolisena voin hakea julkisia ryhmiä.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/30) | could |
| FR-36 | [Käyttäjänä voin pyytää liittymislupaa julkiseen ryhmään.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/46) | could |
| FR-37 | [Ryhmän jäsenenä voin jakaa ryhmälle listojani.](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/31) | could |
| FR-38 | Käyttäjänä saan elokuvasuosituksia tekoälyltä. | wont now |

## 5. Ei-toiminnalliset vaatimukset

| ID | Vaatimus | Todentaminen |
|---|---|---|
| NFR-01 | Sovelluksen tulee näyttää asialliselta. | Hyväksymistesti |
| NFR-02 | Sovelluksen tulee toimia mobiililaitteella. | Käyttöliittymätesti |
| NFR-03 | Salasanat tallennetaan vain turvallisella yksisuuntaisella salasanatiivisteellä. | Toteutuksen ja tietokannan tarkistus |
| NFR-04 | Käyttäjä ei voi hakea tai muuttaa toisen käyttäjän tietoja ilman roolinsa mukaista oikeutta. | API:n käyttöoikeustesti |
| NFR-05 | Sovelluksen tulee olla suomenkielinen. | Käyttöliittymätesti |
| NFR-06 | Arvosteluilla tulee olla maksimipituus tietoturvasyistä. | API:n käyttötarkoitustesti |
| NFR-07 | Salasanan tulee olla tarpeeksi vahva. | Tietoturvatesti |

## 6. Tiedot ja alustava tietomalli

Sovellus tallentaa vähintään seuraavat tiedot:

- **Käyttäjä:** tunniste, käyttäjätunnus, sähköposti, salasanatiiviste ja arvostelut.
- **Ryhmä:** tunniste, nimi, jäsenet ja ylläpitäjät.

## 7. Projektin rajaus

**Ensimmäiseen julkaisuun (MVP) sisältyvät:** FR-01 - FR-07

**Ei toteuteta tässä kahdeksan viikon projektissa:** FR-38

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

- [Definition of Done](./definition-of-done.md)

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

| Kenttä | Arvo |
|---|---|
| Asiakkaan edustaja | Lasse Haverinen |
| Hyväksytty versio | 1.0 |
| Hyväksynnän päivämäärä | 30.10.2026 |
| Mahdolliset ehdot | _________________________ |

## 12. Versiohistoria

| Versio | Päivä | Muutos |
|---|---|---|
| 0.1 | 27.10.2026 | Alustava vaatimusmäärittely. |
| 0.2 | 28.10.2026 | Vaatimuusmäärittely täydennetty. |
| 0.3 | 29.10.2026 | Lisätty asiakkaan vastaukset kysymyksiin. |
| 0.4 | 29.10.2026 | Täydennetty vaatimuksia vastausten perusteella. |
| 1.0 | 30.10.2026 | Viimeistelty hyväksytetty vaatimusmäärittely. |
| 1.1 | 2.11.2026 | Poistettu alleviivaukset, koska ne eivät näy GitHubissa. Lisätty vaatimuksille linkit niitä koskeviin issueihin. |