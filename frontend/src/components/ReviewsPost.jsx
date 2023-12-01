import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import Navbar from "./Navbar";

const ReviewPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Asegúrate de reemplazar 'localhost:3001' con la URL de tu backend si es diferente.
        const response = await axios.get(
          `http://localhost:3001/movies/${movieId}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error al obtener la película:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>No se ha encontrado la película</div>;
  }

  // Asegúrate de que los campos de 'poster_path' y 'overview' coincidan con cómo los envía tu API.
  return (
    <div>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center pt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
            <img
              className="w-full md:w-1/3 lg:w-1/4 shadow-lg rounded-lg mb-4 md:mb-0"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-gray-400">{movie.overview}</p>
              <div className="mt-6">
                <ReviewForm movieId={movieId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
