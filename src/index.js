import { fetchMovies, fetchBooks, asyncFetchBooks, asyncFetchMovies } from "./services";
// import { fetchWithTimeout } from "./services";
const movies = require("./data/movies.json");

// export function fetchMovies() {
//   const resolveFunction = () => movies;
//   return fetchWithTimeout(1000).then(resolveFunction);
// }
// var moviePromise = fetchMovies();
// moviePromise.then((results) => {
//   console.log(results);
// });

function getBooksAndMovies() {
  return Promise.all([fetchMovies(), fetchBooks()])
    .then(([books, movies]) => ({
      books,
      movies,
    }))
    .catch((error) => console.log("Error fetching books and movies", error));
}
const getBooksAndMoviesPromise = getBooksAndMovies();
getBooksAndMoviesPromise.then((results) => {
  console.log("getBooksAndMoviesPromise", results);
});

function getBooksOrMovies() {
  return Promise.race([fetchMovies(), fetchBooks()])
    .then((results) => results)
    .catch((error) => console.log("Error waiting for the promise race", error));
}
const getBooksOrMoviesPromise = getBooksOrMovies();
getBooksOrMoviesPromise.then((results) => {
  console.log("getBooksOrMoviesPromise", results);
});

async function getBooksAndMoviesAsync() {
  try {
    const [books, movies] = await Promise.all([asyncFetchBooks(), asyncFetchMovies()]);
    return { books, movies };
  } catch (error) {
    console.log("Error fetching books and movies", error);
    return error;
  }
}

// async function getBooksOrMoviesAsync() {
//   try {
//     const values = await Promise.race([asyncFetchBooks(), asyncFetchMovies()]);
//     return values;
//   } catch (error) {
//     console.error("Error waiting for the promise race", error);
//   }
// }

async function getBooksOrMoviesAsync() {
  const values = await Promise.race([asyncFetchBookss(), asyncFetchMovies()]);
  return values;
}

getBooksAndMoviesAsync()
  .then((results) => {
    console.log("movies and books", {
      movies: results.movies,
      books: results.books,
    });
  })
  .catch((error) => {
    console.error("Error in getBooksAndMoviesAsync execution", error);
  });

getBooksOrMoviesAsync()
  .then((results) => results)
  .then((results) => {
    console.log("movies OR books", {
      results,
    });
  })
  .catch((error) => {
    console.error("Error in getBooksOrMoviesAsync execution", error);
  });
