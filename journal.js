// ========================================
// JOURNAL MOVIEBLERPS AUS DEM KELLER HOLEN
// ========================================

// gespeicherte movieblerps wieder aus dem localStorage rausfischen
// wenn da nix ist kriegen wir halt ein leeres array
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

console.log(favourites);

// ========================================
// JOURNAL DOM BLERPS
// ========================================

// hier werden alle gespeicherten movieblerps reingestopft
const journalMovies = document.querySelector(".journalMovies");

// ========================================
// GESPEICHERTE MOVIEBLERPS ANZEIGEN
// ========================================

// jeder gespeicherte movieblerp bekommt seine eigene journal card
favourites.forEach(function (movie) {
  createJournalCard(movie);
});

// ========================================
// JOURNAL CARDS HIER. JETZT. DANKE.
// ========================================

function createJournalCard(data) {
  // leere journal card bauen
  const journalCard = document.createElement("div");
  journalCard.className = "journalCard";

  // titel vom movieblerp
  const movieName = document.createElement("h2");
  movieName.textContent = data.title;
  movieName.className = "movieName";

  // poster vom movieblerp
  const movieThumbnail = document.createElement("img");

  // manche movieblerps haben natürlich kein poster
  // weil WARUM EINFACH xD
  if (data.poster_path) {
    movieThumbnail.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    movieThumbnail.alt = data.title;
  } else {
    movieThumbnail.alt = `No poster available for ${data.title}`;
  }

  movieThumbnail.className = "movieThumbnail";

  // ========================================
  // DELETE BLERPS
  // ========================================

  // raus mit dem movieblerp
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove from Journal";
  deleteButton.className = "deleteButton";

  deleteButton.addEventListener("click", function () {
    // alle movieblerps behalten AUSSER genau diesen hier
    favourites = favourites.filter(function (movie) {
      return movie.id !== data.id;
    });

    // neue version wieder im localStorage speichern
    localStorage.setItem("favourites", JSON.stringify(favourites));

    // und die card auch direkt aus dem sichtbaren journal werfen
    journalCard.remove();
  });

  // ========================================
  // NOTE BLERPS
  // ========================================

  // hier kann ich meinen senf zum movieblerp abgeben
  const movieNote = document.createElement("textarea");
  movieNote.className = "movieNote";
  movieNote.placeholder = "Write your notes here...";

  // falls ich schon was geschrieben hatte:
  // bitte nicht einfach wieder vergessen, danke xD
  movieNote.value = data.note || "";

  movieNote.addEventListener("input", function () {
    // GENAU den movieblerp im favourites-array wiederfinden
    const savedMovie = favourites.find(function (movie) {
      return movie.id === data.id;
    });

    // note direkt am gespeicherten movie-objekt aktualisieren
    savedMovie.note = movieNote.value;

    // und wieder ab in den localStorage damit refresh nicht alles frisst
    localStorage.setItem("favourites", JSON.stringify(favourites));
  });

  // ========================================
  // ALLES IN DIE CARD STOPFEN
  // ========================================

  journalCard.appendChild(movieName);
  journalCard.appendChild(movieThumbnail);
  journalCard.appendChild(movieNote);
  journalCard.appendChild(deleteButton);

  // und die fertige card ins journal
  journalMovies.appendChild(journalCard);
}
