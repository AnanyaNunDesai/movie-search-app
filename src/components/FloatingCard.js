// src/components/FloatingCard.js

import React, { useEffect } from 'react';

const FloatingCard = ({ movie, onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const card = document.getElementById('floating-card');
      if (card && !card.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div id="floating-card" className="fixed inset-0 flex justify-center items-center">
      <div className="bg-violet-300 text-violet-600 ml-72 mr-72 p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-700">Overview: {movie.overview}</p>
        <p className="text-gray-700">Release Date: {movie.release_date}</p>
        <p className="text-gray-700">Average Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default FloatingCard;
