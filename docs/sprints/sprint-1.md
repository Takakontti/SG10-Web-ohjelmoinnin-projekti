# Sprint 1

**Ajankohta:** 2-8.11.2026

Sovittiin, että Daniel Nylander hankkii API-avaimen TMDB-palveluun.

## Sprint Goal

Tämän sprintin tavoitteena on saada 2-3 tuotteen ominaisuutta valmiiksi ja julkaista ne azureen.  
Tämän sprintin jälkeen ulkopuolinen voi rekisteröityä sovelluksen käyttäjäksi, arvostella elokuvia ja luoda ryhmän.

## Story-linkit ja DoD

> Jos kaikki user-storyt saadaan hyväksytysti käytyä läpi ennen perjantaita, lisätään lisää user-storyja sprinttiin.

- [FR-01](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/5)
- [FR-02](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/6)
- [FR-03](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/7)
- [FR-06](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/10)
- [FR-07](https://github.com/Takakontti/SG10-Web-ohjelmoinnin-projekti/issues/24)
- [Definition of Done](../definition-of-done.md)

## Sprint review

Tämän sprintin aikana, yksikään vaatimus ei tullut täysin täyteen. Kuitenkin, rekisteröityminen ja sisäänkirjautuminen toimivat backendin kannalta täysin ja frontendin kannalta suurimmaksi osin.  
Vitest-testit kyseisille backend ominaisuuksille ovat lähes täysin valmiit. Niistä puuttuu ainoastaan login-integraatiotesti.  
Playwright E2E-testi rekisteröitymiselle on suurimmaksi osin valmis.  
Dokumentaatiota on pidetty ajan tasalla ja vaaditut kaaviot löytyvät.

Pyritään pysymään vaatimusmäärittelyn mukaisessa aikataulussa.

## Retrospective

8.11.2026 Mennessä tilastot olivat seuraavat.

Daniel Nylander: 28 Committia, 3339 Lisäystä, 546 Poistoa, 4 Valmista taskia.

Ilari Bäckman: 19 Committia, 8777 Lisäystä, 3359 Poistoa, 0 Valmista taskia.

Jarkko Huhtala: 7 Committia, 1090 Lisäystä, 217 Poisto, 0 Valmista taskia.

Onnisunutta: Playwright oli helppokäyttöinen ja hyvä työkalu. Token-evästeen luominen oli yllättävän helppoa. React-Router toimi hyvin.

Parannettavaa: Koodaustaidot olivat ruosteessa. Palautteen saaminen tiimiläisiltä oli viivästynyttä eri koodausaikojen takia. Kykyjä yliarvoitiin hieman. Dokumentointi vei paljon aikaa.

Jatkossa: Pidetään itse kirjaa työtunneista, pyritään saamaan 8h/päivä koodausta aikaan.  
Tehdään docs kansioon punchcards-niminen kansio johon laitetaan tiedostot, missä lukee, kuinka paljon yhtäjaksoista koodausta kukin tiimiläinen on tehnyt päivittäin.  
Koska tiimiläiset heräävät eri aikoihin, pyritään siihen, että koodaaminen tapahtuu pian heräämisen jälkeen. Näin varmistamme, että tiimiläisten koodausajat sijoittuvat mahdollisimman lähelle toisiaan.  
Aamun aluksi kaikki katsovat, että GitHubissa ei ole aktiivista pull requestia. Jos on, niin sen löytänyt henkilö katselmoi sen, paitsi jos kyseisessä koodissa tehdään muiden vastuualueiden koodia.
