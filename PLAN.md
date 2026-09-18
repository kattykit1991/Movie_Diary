# Movie Diary

## Project Goal

Die Movie Diary App soll Filme über die TMDB API laden und dynamisch auf der Webseite anzeigen.

Nutzer:innen sollen Filme suchen und als Favoriten in einem persönlichen Journal speichern können. Zu gespeicherten Filmen können eigene Notizen hinterlegt und Filme wieder aus dem Journal gelöscht werden.

### Persönliches Bonus-Ziel

Eine Filmkarte kann geöffnet bzw. erweitert werden und zeigt zusätzliche Informationen zum Film, z. B. Veröffentlichungsdatum, Genre oder Schauspieler:innen.

Welche zusätzlichen Informationen umgesetzt werden, hängt davon ab, welche Daten über die TMDB API verfügbar sind und wie viel Zeit nach Fertigstellung der Grundfunktionen noch bleibt.

---

## Requirements

- Die Anwendung besteht aus zwei Seiten:
  - `index.html` mit `main.js`
  - `journal.html` mit `journal.js`
- Beide Seiten besitzen eine Navigation zwischen Homepage und Journal.
- Auf der Homepage werden Filme über die TMDB API geladen.
- Die geladenen Filme werden mit JavaScript als neue DOM-Elemente gerendert.
- Filme werden als Karten mit Poster, Titel und weiteren Informationen dargestellt.
- Es gibt eine Filmsuche über die TMDB API.
- Suchergebnisse bzw. Rückmeldungen werden in einem Dialog angezeigt.
- Die von der API gelieferten `poster_path`-Werte werden für die Anzeige der Filmposter verwendet.
- Filme können als Favoriten gespeichert werden.
- Favoriten werden als Objekte in einem Array im `localStorage` gespeichert.
- Das Journal liest die gespeicherten Filme aus dem `localStorage` und zeigt sie an.
- Zu gespeicherten Filmen können eigene Notizen hinzugefügt werden.
- Die Notizen werden im jeweiligen Filmobjekt im `localStorage` gespeichert.
- Filme können wieder aus dem Journal gelöscht werden.
- Die Anwendung verwendet DOM, Fetch API und Web Storage.
- Für den Zugriff auf die TMDB API wird ein API Read Access Token benötigt.

---

## Planned Features

- 🏠 **Homepage** → zeigt dynamisch geladene Filme
- 🔎 **Filmsuche** → sucht Filme über die TMDB API
- 🎬 **Movie Cards** → zeigen Poster, Titel und ausgewählte Filminformationen
- ❤️ **Favoriten** → speichert Filme im Journal
- 📖 **Journal** → zeigt gespeicherte Favoriten aus dem `localStorage`
- 📝 **Notizen** → eigene Notizen eintragen, speichern und anzeigen
- 🗑️ **Löschen** → Filme wieder aus dem Journal entfernen
- ✨ **Bonus: Filmdetails** → Filmkarte öffnen/erweitern und zusätzliche Informationen anzeigen

---

## Project Structure

- `README.md`
- `PLAN.md`
- `index.html`
- `main.js`
- `journal.html`
- `journal.js`
- `style.css`
- `.gitignore`

Die genaue Lösung für die API-Konfiguration bzw. den API Token wird beim Einrichten der TMDB API geklärt.

---

## Development Plan

> Grundsatz: Erst soll die Anwendung funktionieren. Styling und Bonusfeatures kommen danach.

1. Git-Repository erstellen und mit GitHub verbinden
2. TMDB-Konto einrichten und API Read Access Token erhalten
3. TMDB API-Dokumentation ansehen
4. Benötigte API-Endpunkte und Aufbau der Bild-URLs verstehen
5. Grobes HTML-Grundgerüst für Homepage und Journal bauen
6. Filme über die API fetchen
7. Gefetchte Filme mit JavaScript als Movie Cards ins DOM rendern
8. freuen wenn funktioniert 🎉
9. Filmsuche über die API bauen
10. Favoriten mit `localStorage` speichern
11. Gespeicherte Filme im Journal anzeigen
12. Notizen hinzufügen und im `localStorage` speichern
13. Filme aus dem Journal löschen
14. Funktionen testen und Fehler beheben
15. Styling verbessern
16. Wenn noch Zeit ist: Bonusfeature für erweiterte Filmdetails

---

## Technologies

- HTML
- CSS
- JavaScript
- DOM
- Fetch API
- Web Storage / `localStorage`
- TMDB API
- Git
- GitHub

---

## Status

- [x] Aufgabenstellung und Anforderungen gesammelt
- [x] Projekt geplant
- [x] Development Plan erstellt
- [ ] README erstellen
- [ ] Git-Repository und GitHub-Repository einrichten
- [ ] TMDB API vorbereiten
- [ ] HTML-Grundgerüst erstellen
- [ ] Filme fetchen und rendern
- [ ] Filmsuche umsetzen
- [ ] Favoriten speichern
- [ ] Journal umsetzen
- [ ] Notizen speichern
- [ ] Filme löschen
- [ ] Funktionen testen
- [ ] Styling und Feinschliff
- [ ] Bonusfeatures
