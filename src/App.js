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
  // const renderMovieDetails = () => {
  //   if (selectedMovie) {
  //     return (
  //       <div className="mt-4">
  //         <h2 className="text-xl font-bold">{selectedMovie.title}</h2>
  //         <p className="text-gray-700">Overview: {selectedMovie.overview}</p>
  //         <p className="text-gray-700">Release Date: {selectedMovie.release_date}</p>
  //         <p className="text-gray-700">Average Rating: {selectedMovie.vote_average}</p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  const handleCloseCard = () => {
    setSelectedMovie(null);
  };


  return (
    <div className="App bg-gray-800">
      <div className="container mx-auto p-4">
        <div
          className="font-['Open_Sans'] text-violet-100 bg-violet-800 mb-20 
            p-5 container mx-auto flex flex-col gap-5 justify-center rounded-lg items-center
             md:justify-between lg:max-w-xl"
        >
          <h1 className="text-3xl">Movie Search</h1>
        </div>
        <div className="flex mb-20 justify-center items-center ">
          <input
            type="text"
            className="bg-violet-500 outline-none rounded-lg border-b-2 
                border-violet-500 py-2 px-2 text-indigo-900 text-center 
                md:text-left focus:border-indigo-900 focus:bg-violet-400 duration-300 placeholder-violet-300"
            placeholder="Search for a movie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="ml-2 p-2 rounded-lg bg-violet-700 text-violet-200 hover:text-white rounded"
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
              className="bg-violet-900 rounded-lg p-4 shadow cursor-pointer"
              onClick={() => handleMovieSelect(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="mx-auto flex justify-center items-center rounded-lg"
              />
              <h2 className="text-xl text-violet-200 font-bold mt-4">{movie.title}</h2>
              <p className="text-violet-300">{movie.overview}</p>
            </div>
          ))}
        </div>


      </div>
      {selectedMovie && <FloatingCard movie={selectedMovie} onClose={handleCloseCard} />} {/* Display FloatingCard */}
    </div>
  );
};

export default App;


//API key: c1c3405856a6ad79e9685f4ea76cd2b6
//API Read Access Token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ
//jMWMzNDA1ODU2YTZhZDc5ZTk2ODVmNGVhNzZjZDJiNiIsInN1YiI6IjY
//1MDg3ZjhjZmEyN2Y0MDBhZTlmNzZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZ
//CJdLCJ2ZXJzaW9uIjoxfQ.kzZKSqlwkfI7Dn1rmOKg7vu-lK7u_TAjTLTxFgMiu24