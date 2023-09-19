import React, { useEffect, useState } from "react";
import axios from "axios";

import FloatingCard from "./components/FloatingCard";

import "./App.css";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = "https://api.themoviedb.org/3/search/movie";

const App = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  const TYPE_TIME = 300; // 300 milliseconds

  // Trigger an API search shortly after typing
  useEffect(() => {
    const handleSearch = async () => {
      try {
        setError(null); // Reset the error state

        if (query.trim() === "") {
          setMovies([]);
          return;
        }

        const response = await axios.get(apiUrl, {
          params: {
            api_key: apiKey,
            query: query,
          },
        });

        const results = response.data.results.slice(0, 10); // Display 10 search results at a time

        if (results.length === 0) {
          setError("No results found.");
          setMovies([]);
        } else {
          setMovies(results);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("An error occurred while fetching movies.");
      }
    };

    const timer = setTimeout(async () => {
      await handleSearch();
    }, TYPE_TIME);
    return () => clearTimeout(timer);
  }, [query]);

  const handleLoadMore = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
          query: query,
          page: page + 1, // Fetch the next page of results
        },
      });

      const newMovies = response.data.results.slice(0, 10);
      if (newMovies.length === 0) {
        setError("No more results.");
        return;
      }

      setMovies([...movies, ...newMovies]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("An error occurred while fetching movies.");
    }
  };

  const renderErrorMessage = () => {
    if (error) {
      return <div className="text-red-500 font-bold mb-4">Error: {error}</div>;
    }
    return null;
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseCard = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App bg-gray-800">
      <div className="container mx-auto p-4">
        <div
          className="font-bold text-violet-100 bg-violet-800 mb-20 
            p-5 container mx-auto flex flex-col gap-5 justify-center rounded-lg items-center
             md:justify-between lg:max-w-xl"
        >
          <h1 className="text-3xl">Movie Search</h1>
        </div>
        <div className="flex mb-20 justify-center items-center">
          <input
            aria-label="search-field"
            type="text"
            className="bg-violet-500 outline-none rounded-lg border-b-2 
                border-violet-500 py-2 px-2 text-indigo-900 text-center 
                md:text-left focus:border-indigo-900 focus:bg-violet-400 duration-300 placeholder-violet-300"
            placeholder="Search for a movie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {renderErrorMessage()}
        <div
          aria-label="movies-results"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {movies.map((movie) => (
            <div
              id={movie.id}
              key={movie.id}
              className="bg-violet-900 rounded-lg p-4 shadow cursor-pointer"
              onClick={() => handleMovieSelect(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="mx-auto flex justify-center items-center rounded-lg"
              />
              <h2 className="text-xl text-violet-200 font-bold mt-4">
                {movie.title}
              </h2>
              <p className="text-violet-300">{movie.overview}</p>
            </div>
          ))}
        </div>
        {error && <div className="text-red-500 font-bold mb-4">{error}</div>}
        {movies.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              className="bg-violet-600 hover:bg-blue-700 text-violet-200 font-bold py-2 px-4 mt-10 rounded-lg"
            >
              Load More
            </button>
          </div>
        )}
        {selectedMovie && (
          <FloatingCard movie={selectedMovie} onClose={handleCloseCard} />
        )}
      </div>
    </div>
  );
};

export default App;
