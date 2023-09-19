export const mockMovies = [
  {
    id: 1,
    title: "Movie 1",
    overview: "This is a movie overview.",
    poster_path: "./logo512.png",
  },
  {
    id: 2,
    title: "Movie 2",
    overview: "This is a movie overview.",
    poster_path: "./logo512.png",
  },
  {
    id: 3,
    title: "Movie 3",
    overview: "This is a movie overview.",
    poster_path: "./logo512.png",
  },
];

const movieItem = {
  id: 1,
  title: "Movie ",
  overview: "This is a movie overview.",
  poster_path: "./logo512.png",
};

function makeMoviesFrom(movie, numTimes) {
  const movieList = [];

  for (let i = 0; i < numTimes; i++) {
    movieList.push({
      id: movie.id + 1,
      title: `${movie.title} ${i}`,
      overview: movie.overview,
      poster_path: movie.poster_path,
    });
  }

  return movieList;
}

export const mockMoviesWithPages = {
  status: 200,
  data: {
    page: 1,
    total_pages: 3,
    total_results: makeMoviesFrom(movieItem, 30).length,
    results: makeMoviesFrom(movieItem, 30),
  },
};

export const mockResults = {
  status: 200,
  data: {
    page: 1,
    total_pages: 1,
    total_results: mockMovies.length,
    results: mockMovies,
  },
};

export const mockNoResults = {
  status: 200,
  data: {
    pages: 1,
    total_pages: 1,
    total_results: 0,
    results: [],
  },
};
