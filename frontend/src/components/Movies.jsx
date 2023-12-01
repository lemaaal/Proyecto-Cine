import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const MoviesGrid = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (search = "") => {
    try {
      const endpoint = search
        ? `/movies/search?query=${encodeURIComponent(search)}`
        : "/movies";
      const response = await axios.get(endpoint);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Carga inicial de todas las películas
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
    fetchMovies();
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSearch} className="flex justify-center pt-6 gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar películas..."
          className="p-2 border rounded bg-gray-500 text-white"
        />
        <button
          type="submit"
          className="p-2 border rounded bg-blue-500 text-white w-10"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="p-2 border rounded bg-red-500 text-white w-10"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </form>
      <div className="grid grid-cols-4 gap-4 mt-4 bg-gray-900 p-4 rounded">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div
              key={movie.id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 hover:shadow-2xl transition duration-300"
          >
              <img
                className="w-full object-cover h-96"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">
                  {movie.title}
                </div>
                <p className="text-gray-300 text-base">{movie.overview}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviesGrid;
