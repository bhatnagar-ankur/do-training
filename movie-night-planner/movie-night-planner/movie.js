// Base class
class MediaItem {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
 
    getCardHTML() {
        return `
            <div class="movie-card">
                <h3>${this.title}</h3>
            </div>
        `;
    }
}
 
// Movie subclass
class Movie extends MediaItem {
    constructor(id, title, director, rating) {
        super(id, title);
        this.director = director;
        this.rating = rating;
    }
 
    getCardHTML() {
        return `
            <div class="movie-card">
                <h3>${this.title}</h3>
                <p><strong>Director:</strong> ${this.director}</p>
                <p><strong>Rating:</strong> ${this.rating}/10</p>
            </div>
        `;
    }
}

// Data handling
let watchList = [];
let movieId = 1;
 
function addMovie(movieData) {
    debugger
    const movie = new Movie(movieId++, movieData.title, movieData.director, parseFloat(movieData.rating));
    watchList.push(movie);
    saveToLocalStorage(); 
}
function saveToLocalStorage() {
    localStorage.setItem("watchList", JSON.stringify(watchList));
    localStorage.setItem("movieId", movieId); 
}
function loadFromLocalStorage() {
    const storedList = localStorage.getItem("watchList");
    const storedId = localStorage.getItem("movieId");

    if (storedList) {
        const parsedList = JSON.parse(storedList);

        watchList = parsedList.map(item => new Movie(item.id, item.title, item.director, item.rating));
    }

    if (storedId) {
        movieId = parseInt(storedId);
    }

    renderwatchList(watchList); 
}

 
function filterByRating(minRating) {
    return watchList.filter(movie => movie.rating >= minRating);
}
 
function renderwatchList(list) {
    const planner = document.getElementById("planner");
    planner.innerHTML = "";
    if (list.length === 0) {
        planner.innerHTML = "<p>No movies to display.</p>";
    } else {
        list.forEach(movie => {
            planner.innerHTML += movie.getCardHTML();
        });
    }
}

// Event listeners
document.getElementById("movieForm").addEventListener("submit", function(e) {
    e.preventDefault();
 
    const title = document.getElementById("title").value.trim();
    const director = document.getElementById("director").value.trim();
    const rating = document.getElementById("rating").value;
 
    if(title && director && rating !== "") {
        addMovie({ title, director, rating });
        renderwatchList(watchList);
 
        this.reset();
    }
});
 
const minRatingInput = document.getElementById("minRating");
const ratingValue = document.getElementById("ratingValue");
 
minRatingInput.addEventListener("input", function() {
    const minRating = parseFloat(this.value);
    ratingValue.textContent = minRating;
    const filtered = filterByRating(minRating);
    renderwatchList(filtered);
});
 
// Initial render
loadFromLocalStorage(); 
renderwatchList(watchList);