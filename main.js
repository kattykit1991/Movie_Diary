// ========================================
// API BLERPS
// ========================================

// damit tmdb mich überhaupt reinlässt und mir filme gibt
const options = {
  method: "GET",
  headers: {
    accept: "application/json",

    // API key/token blerps hier rein
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGViMDlmMzc0ZmI2NGU4NDgwYzJmNTU1OTA1MjllOSIsIm5iZiI6MTc4OTczMjc2OC42MTEsInN1YiI6IjZhYWQyN2EwYmFmNmRhODU1MjcxZmU1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wnr-XlCp0lIRPU0X2ss4C50EfCuZMW_eqUwuNu8jPZs",
  },
};

// ========================================
// DOM BLERPS
// ========================================

// DAS ist das große ding wo alle movie cards reingestopft werden
const movieCards = document.querySelector(".movieCards");

// such-blerps
const movieSearch = document.querySelector(".movieSearch");
const searchInput = document.querySelector(".searchInput");

// ========================================
// JOURNAL BLERPS
// ========================================

// gucken ob schon movieblerps im journal wohnen
// wenn nicht dann halt erstmal leeres array
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// ========================================
// GIVE ME MOVIEBLERPS
// ========================================

// gib filme pretty please
fetch("https://api.themoviedb.org/3/movie/popular", options)
  // response ist noch nicht der eigentliche film-kram
  // also erstmal json draus machen
  .then(function (response) {
    return response.json();
  })

  // JETZT haben wir den film-kram
  .then(function (data) {
    console.log(data);

    // jeder movieblerp aus dem results-array
    // bekommt jetzt seine eigene card
    data.results.forEach(function (movie) {
      createMovieCard(movie);
    });
  });

// ========================================
// MOVIE CARDS HIER. JETZT. DANKE.
// ========================================

function createMovieCard(data) {
  // erstmal eine leere card bauen
  const movieCard = document.createElement("div");
  movieCard.className = "movieCard";

  // titel vom movieblerp
  const movieName = document.createElement("h2");
  movieName.textContent = data.title;
  movieName.className = "movieName";

  // poster vom movieblerp
  const movieThumbnail = document.createElement("img");

  // tmdb gibt mir natürlich nur den halben bild-link WEIL WARUM EINFACH xD
  // also tmdb bild-url + poster_path zusammenkleben
  // manche movieblerps haben einfach kein poster weil WARUM AUCH IMMER
  if (data.poster_path) {
    movieThumbnail.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    movieThumbnail.alt = data.title;
  } else {
    movieThumbnail.alt = `No poster available for ${data.title}`;
  }

  movieThumbnail.className = "movieThumbnail";

  // ========================================
  // JOURNAL HERZCHEN BLERPS
  // ========================================

  const journalButton = document.createElement("button");
  journalButton.className = "journalButton";

  // gucken ob dieser movieblerp schon im journal wohnt
  function updateJournalHeart() {
    const alreadySaved = favourites.some(function (movie) {
      return movie.id === data.id;
    });

    if (alreadySaved) {
      // voll = wohnt im journal
      journalButton.textContent = "♥";
      journalButton.classList.add("saved");
      journalButton.title = "Remove from Journal";
    } else {
      // leer = wohnt noch NICHT im journal
      journalButton.textContent = "♡";
      journalButton.classList.remove("saved");
      journalButton.title = "Add to Journal";
    }
  }

  // herz direkt beim card-bauen richtig anzeigen
  updateJournalHeart();

  journalButton.addEventListener("click", function () {
    // nochmal gucken wie der aktuelle stand ist
    const alreadySaved = favourites.some(function (movie) {
      return movie.id === data.id;
    });

    if (alreadySaved) {
      // movieblerp wieder aus dem journal werfen
      favourites = favourites.filter(function (movie) {
        return movie.id !== data.id;
      });

      localStorage.setItem("favourites", JSON.stringify(favourites));

      // herz wieder leer machen
      updateJournalHeart();

      console.log("Movie removed from journal:", data.title);
    } else {
      // ganzen movieblerp ins journal-array stopfen
      favourites.push(data);

      // localStorage kann natürlich keine arrays weil WARUM EINFACH
      // also wieder schön in json-string verwandeln
      localStorage.setItem("favourites", JSON.stringify(favourites));

      // herz jetzt voll machen
      updateJournalHeart();

      // ERFOLG. KONFETTIIII 🎉
      showJournalNotification();

      console.log("Movie added to journal:", data.title);
    }
  });

  // ========================================
  // ALLES IN DIE CARD STOPFEN
  // ========================================

  movieCard.appendChild(movieName);
  movieCard.appendChild(movieThumbnail);
  movieCard.appendChild(journalButton);

  // und die fertige card kommt ins große movieCards-ding
  movieCards.appendChild(movieCard);
}

// ========================================
// HINZUGEFÜGT KONFETTI BLERPS
// ========================================

function showJournalNotification() {
  const notification = document.createElement("div");
  notification.className = "journalNotification";

  notification.innerHTML = `
    <span class="confetti">🎉</span>
    <span>HINZUGEFÜGT!</span>
    <span class="confetti">🎊</span>
  `;

  document.body.appendChild(notification);

  // nach kurzer zeit wieder weg mit dem ding
  setTimeout(function () {
    notification.remove();
  }, 2000);
}

// ========================================
// --TABLE FLIP-- CARD FLIP AHOOOY
// ========================================

// hier kommt später der fancy aufgeklappte movieblerp hin 👀
// mit backdrop und details und trailer und so
//
// ABER NICHT JETZT.
// erstmal sollen die normalen movieblerps funktionieren xD

// ========================================
// SEARCH FOR MOVIEBLERPS
// ========================================

movieSearch.addEventListener("submit", function (event) {
  // formular würde sonst die komplette seite neu laden
  // NEIN DANKE
  event.preventDefault();

  // was hat kat da eigentlich reingeschrieben?
  const searchTerm = searchInput.value.trim();

  // wenn nix drinsteht gibts auch nix zu suchen xD
  if (!searchTerm) {
    return;
  }

  // suchtext url-tauglich machen
  const encodedSearchTerm = encodeURIComponent(searchTerm);

  // tmdb nach dem gewünschten movieblerp fragen
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodedSearchTerm}`,
    options,
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // die alten popular movieblerps müssen erstmal raus
      movieCards.innerHTML = "";

      // und jetzt die suchergebnisse reinstopfen
      data.results.forEach(function (movie) {
        createMovieCard(movie);
      });
    });
});

// ========================================
// MOANA SPICKZETTEL WEIL ICH SONST VERGESSE
// WAS WELCHER BLERPS WAR
// ========================================

// title
// ...offensichtlich der titel xD
// "Moana"

// overview
// der beschreibungs-blerps
// "Teenage Moana answers the Ocean's call..."

// poster_path
// normales hochkant poster für die movie cards und so
// "/cRrf3U1w1HmiFEkKo0Vi85fFjqf.jpg"

// backdrop_path
// DAS GROẞE BREITE BILD
// vielleicht geil als halbtransparenter hintergrund
// für meine aufgeklappte card 👀
// "/c6BPbk05Npt10dwttAxCFo060wtH.jpg"

// release_date
// wann kam der film raus
// "2026-07-08"

// vote_average
// durchschnittliche bewertung
// 7.322

// vote_count
// wie viele überhaupt bewertet haben
// 676

// original_language
// originalsprache
// "en"

// genre_ids
// genres aber natürlich als irgendwelche zahlen weil WARUM EINFACH xD
// muss später noch rausfinden welche nummer was ist
// [10751, 14, 35, 12]

// id
// persönliche tmdb-personalausweisnummer vom movieblerp
// wahrscheinlich wichtig wenn ich später mehr infos zu GENAU dem film will
// 1108427
