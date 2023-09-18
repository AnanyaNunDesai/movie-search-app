import React, { useState } from 'react';
import axios from 'axios';
import FloatingCard from './components/FloatingCard'; // Import FloatingCard
import './App.css';

const apiKey = 'c1c3405856a6ad79e9685f4ea76cd2b6';
const apiUrl = 'https://api.themoviedb.org/3/search/movie';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);



  const handleSearch = async () => {
    try {
      setError(null); // Reset the error state

      if (query.trim() === '') {
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
        setError('No results found.'); // Set an error message for no results
      } else {
        setMovies(results);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('An error occurred while fetching movies.'); // Set a generic error message
    }
  };

  const renderErrorMessage = () => {
    if (error) {
      return (
        <div className="text-red-500 font-bold mb-4">
          Error: {error}
        </div>
      );
    }
    return null;
  };


  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  // Function to display additional movie details
  const renderMovieDetails = () => {
    if (selectedMovie) {
      return (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{selectedMovie.title}</h2>
          <p className="text-gray-700">Overview: {selectedMovie.overview}</p>
          <p className="text-gray-700">Release Date: {selectedMovie.release_date}</p>
          <p className="text-gray-700">Average Rating: {selectedMovie.vote_average}</p>
        </div>
      );
    }
    return null;
  };

   const handleCloseCard = () => {
    setSelectedMovie(null);
  };


  return (
    <div className="App">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Movie Search</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="w-full p-2 rounded"
            placeholder="Search for a movie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {renderErrorMessage()}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white p-4 rounded shadow cursor-pointer"
              onClick={() => handleMovieSelect(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="mb-2"
              />
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p className="text-gray-700">{movie.overview}</p>
            </div>
          ))}
        </div>


      </div>
      {selectedMovie && <FloatingCard movie={selectedMovie} onClose={handleCloseCard}/>} {/* Display FloatingCard */}
    </div>
  );
};

export default App;


//API key: c1c3405856a6ad79e9685f4ea76cd2b6
//API Read Access Token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ
//jMWMzNDA1ODU2YTZhZDc5ZTk2ODVmNGVhNzZjZDJiNiIsInN1YiI6IjY
//1MDg3ZjhjZmEyN2Y0MDBhZTlmNzZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZ
//CJdLCJ2ZXJzaW9uIjoxfQ.kzZKSqlwkfI7Dn1rmOKg7vu-lK7u_TAjTLTxFgMiu24