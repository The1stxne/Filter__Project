/* Search Sink */

const searchBar = document.getElementById('search__bar')
const searchText = document.getElementById('red')
const movies = document.querySelector('.movie__wrapper')
const filter = document.getElementById(`filter`)

let films = [];

function handleSearch(event) {
    searchText.textContent = (event.target.value)
    getMovies(event.target.value || `fast`);
}
searchBar.addEventListener('input', handleSearch)
filter.addEventListener('change', filterMovies)


/* Movie API */

async function getMovies(searchTerm = "fast") {
     showSkeleton();
const movie = await fetch(`https://www.omdbapi.com/?apikey=fe8b682f&s=${searchTerm}`);

const movieData = await movie.json();
films = movieData.Search || [];

   setTimeout(() => {
   filterMovies();
   window.scrollTo({
    top: 0,
    behavior: "smooth"
   })
   }, 500);

}
getMovies();



/* Filter Movies */

function filterMovies() {
    showSkeleton();
setTimeout(() => {
 const sortedFilms = [...films];
 if(filter.value === "new-to-old") {
    sortedFilms.sort((a, b) => 
    parseInt(b.Year, 10) - parseInt(a.Year, 10)
    );
 }
 else if (filter.value === "old-to-new") {
    sortedFilms.sort((a, b) => parseInt(a.Year, 10) - parseInt(b.Year, 10)
);
 }
 movies.innerHTML = sortedFilms.map((movie) => filmHTML(movie)).join("");

 window.scrollTo({
    top: 0,
    behavior: "smooth"
 });
 }, 500);
}

/* Movie HTML */

function filmHTML(movie) {
return `<div class="movie__set">
<img class="img__poster" src="${movie.Poster}">
                <h2 class="movie__title"> ${movie.Title} </h2>
                <p class="movie__year"> ${movie.Year}</p>
        </div>`
}

/*loading*/

function showSkeleton() {
    movies.innerHTML = `<i class="fa-solid fa-spinner"></i>`;

    movies.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}