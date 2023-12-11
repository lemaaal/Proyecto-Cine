import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MoviesGrid = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  // Función para navegar a la página de detalles de la película con su ID
  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div>
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
      <div className="grid grid-cols-4 gap-4 mt-4 bg-[#5C8374] p-4 rounded">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col bg-[#8ac7af] rounded overflow-hidden shadow-lg transition duration-300 cursor-pointer"
              style={{ minHeight: '540px' }}
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                className="w-full h-96 object-cover" 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-4 flex flex-col justify-normal flex-grow">
                <div className="font-bold text-xl mb-2 text-white">
                  {movie.title}
                </div>
                <p className="text-gray-700 text-base overflow-hidden text-ellipsis">
                  {movie.overview.length > 100 ? movie.overview.substring(0, 100) + '...' : movie.overview}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviesGrid;
