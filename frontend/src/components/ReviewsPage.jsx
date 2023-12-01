import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState(null); // Estado para guardar los datos de la película
  const navigate = useNavigate();
  const { movieId } = useParams(); // Obtiene el ID de la película de la URL

  useEffect(() => {
    // Obtener las reseñas
    axios.get("http://localhost:3001/reviews")
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.error('Error al cargar las reseñas:', error));

    // Obtener la información de la película si movieId está disponible
    if (movieId) {
      axios.get(`http://localhost:3001/movies/${movieId}`) // Asegúrate de que esta ruta coincida con tu backend
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => console.error('Error al obtener información de la película:', error));
    }
  }, [movieId]);

  // ... los otros estados y funciones

  // Función para navegar a la página de reseña detallada
  const navigateToReview = (reviewId) => {
    navigate(`/review/${reviewId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      {/* Si hay una película seleccionada, muestra su información */}
      {movie && (
        <div>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      )}
      <div className="reviews-list my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Lista de reseñas */}
        {/* ... */}
      </div>
    </div>
  );
}

export default ReviewsPage;
