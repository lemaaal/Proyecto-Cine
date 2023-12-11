import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faPen,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  // Estados para manejar si está en favoritos o para ver
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchList, setIsWatchList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`/movies/${movieId}`);
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  // Funciones para manejar los botones
  const handleAddToFavorites = () => {
    // Lógica para añadir a favoritos
    setIsFavorite(!isFavorite);
  };

  const handleAddToWatchList = () => {
    // Lógica para añadir a lista para ver
    setIsWatchList(!isWatchList);
  };

  // Funciones para manejar los clics en los botones
  const handleReviewClick = (movieId) => {
    navigate(`/reviews/${movieId}`);
  };

  const handleDiscussionClick = (movieId) => {
    navigate(`/discussions/${movieId}`);
    console.log("Discussion for movie", movieId);
  };

  const renderStars = (voteAverage) => {
    const starCount = Math.round(voteAverage / 2);
    return [...Array(starCount)].map((_, i) => <span key={i}>⭐</span>);
  };

  if (!movieData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-4 bg-[#8ac7af] rounded-lg shadow-lg flex flex-wrap md:flex-nowrap">
      <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
        <img
          src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
          alt={movieData.title}
          className="w-full h-auto rounded-lg shadow-md mb-4"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-2/3 md:pl-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          {movieData.title}
        </h1>
        <p className="text-lg">
          <strong>Fecha de lanzamiento:</strong> {movieData.release_date}
        </p>
        <p className="text-lg">
          <strong>Resumen:</strong> {movieData.overview}
        </p>
        <p className="text-lg flex items-center">
          <strong>Promedio de votos:</strong>
          <span className="ml-2">{renderStars(movieData.vote_average)}</span>
        </p>
        <p className="text-lg">
          <strong>Popularidad:</strong> {movieData.popularity}
        </p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddToFavorites}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${
              isFavorite
                ? "bg-green-700 text-white"
                : "bg-green-200 text-green-900"
            } hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 transition ease-in duration-200`}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={`${isFavorite ? "text-white" : "text-green-900"} mr-2`}
            />
            {isFavorite ? "En Favoritos" : "Añadir a Favoritos"}
          </button>
          <button
            onClick={handleAddToWatchList}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${
              isWatchList
                ? "bg-green-700 text-white"
                : "bg-green-200 text-green-900"
            } hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 transition ease-in duration-200`}
          >
            <FontAwesomeIcon
              icon={faEye}
              className={`${
                isWatchList ? "text-white" : "text-green-900"
              } mr-2`}
            />
            {isWatchList ? "En Lista para Ver" : "Añadir a Lista para Ver"}
          </button>
          <button
            onClick={() => handleReviewClick(movieData.id)}
            className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold text-sm hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500 transition ease-in duration-200"
          >
            <FontAwesomeIcon icon={faPen} className="text-white mr-2" />
            Crear Reseña
          </button>
          <button
            onClick={handleDiscussionClick}
            className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold text-sm hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500 transition ease-in duration-200"
          >
            <FontAwesomeIcon icon={faComments} className="text-white mr-2" />
            Crear Debate
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
