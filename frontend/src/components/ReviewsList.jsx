import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { movieId } = useParams();

  useEffect(() => {
    // Obtener las reseñas de la película
    axios.get(`http://localhost:3001/reviews/${movieId}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.error('Error al cargar las reseñas:', error));

    // Obtener la información de la película
    axios.get(`http://localhost:3001/movies/${movieId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => console.error('Error al obtener información de la película:', error));
  }, [movieId]);

  const handleCreateReview = () => {
    navigate(`/create-review/${movieId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      {movie && (
        <div className="my-4">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      )}
      <div className="reviews-list my-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            // Renderizar cada reseña aquí, por ejemplo:
            <div key={review.id} className="mb-4 p-4 border rounded shadow">
              <p>{review.text}</p>
              {/* Otros detalles de la reseña */}
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>No hay reseñas. ¡Sé el primero en escribir una!</p>
            <button 
              onClick={handleCreateReview}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Escribir reseña
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewsPage;
