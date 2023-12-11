import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "./ReviewForm";

const ReviewPost = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `/movies/${movieId}`
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

  return (
    <div>
      <div className="text-white min-h-screen flex flex-col items-center pt-8">
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

export default ReviewPost;
