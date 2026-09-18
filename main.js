// ========================================
// API BLERPS
// ========================================

// damit tmdb mich überhaupt reinlässt und mir filme gibt
const options = {
  method: "GET",
  headers: {
    accept: "application/json",

    // API key/token blerps hier rein
    Authorization: "Bearer KEY HERE",
  },
};

// ========================================
// DOM BLERPS
// ========================================

// DAS ist das große ding wo alle movie cards reingestopft werden
const movieCards = document.querySelector(".movieCards");

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
  movieThumbnail.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  movieThumbnail.alt = data.title;
  movieThumbnail.className = "movieThumbnail";

  // titel + poster kommen IN die card
  movieCard.appendChild(movieName);
  movieCard.appendChild(movieThumbnail);

  // und die fertige card kommt ins große movieCards-ding
  movieCards.appendChild(movieCard);
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
