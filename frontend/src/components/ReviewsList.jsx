import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/reviews`)
      .then((response) => {
        setReviews(response.data);
        const movieIds = [
          ...new Set(response.data.map((review) => review.api_movie_id)),
        ];
        return Promise.all(movieIds.map((id) => axios.get(`/movies/${id}`)));
      })
      .then((responses) => {
        const moviesData = responses.reduce((acc, response) => {
          acc[response.data.id] = response.data;
          return acc;
        }, {});

        setMovies(moviesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar datos:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando reseñas...</p>;
  if (error) return <p>Error al cargar las reseñas: {error.message}</p>;

  // Función para navegar a la página de detalles de la review con su ID
  const handleReviewClick = (movieId, reviewId) => {
    navigate(`/reviews/${movieId}/${reviewId}`);
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">Últimas reseñas</h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
            >
              {movies && movies[review.api_movie_id] && (
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      movies[review.api_movie_id].poster_path
                    }`}
                    alt={movies[review.api_movie_id].title}
                    className="w-full h-64 object-cover"
                    onClick={() =>
                      handleReviewClick(review.api_movie_id, review.id)
                    }
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {movies[review.api_movie_id].title}
                    </h2>
                    <p className="text-gray-700 text-base">
                      {review.text}
                      {/* TODO: Obtener el nombre del usuario mediante el user_id */}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No hay reseñas. ¡Sé el primero en escribir una!</p>
        </div>
      )}
    </div>
  );
}

export default ReviewsPage;
