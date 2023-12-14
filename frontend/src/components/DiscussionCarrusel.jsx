import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function DiscussionsCarousel() {
  const [discussions, setDiscussions] = useState([]);
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargamos todas las reseñas
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/discussions`)
      
      .then((response) => {
        setDiscussions(response.data);
        const movieIds = [
          ...new Set(response.data.map((discussions) => discussions.api_movie_id)),
        ];
        return Promise.all(
          movieIds.map((id) => axios.get(`/movies/${id}`))
        );
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

  // Configuración para react-slick
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <p>Cargando reseñas...</p>;
  if (error) return <p>Error al cargar las reseñas: {error.message}</p>;

  const handleDiscussionsClick = (movieId, discussionsId) => {
    navigate(`/discussions/${movieId}/${discussionsId}`);
  };

  return (
    <div className="mx-auto px-4 py-8">
      {discussions.length > 0 ? (
        <Slider {...settings}>
          {discussions.map((discussions) => (
            <div key={discussions.id} className="px-2">
              {movies && movies[discussions.api_movie_id] && (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      movies[discussions.api_movie_id].poster_path
                    }`}
                    alt={movies[discussions.api_movie_id].title}
                    className="w-full object-cover"
                    onClick={() => handleDiscussionsClick(discussions.api_movie_id, discussions.id)} 
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {movies[discussions.api_movie_id].title}
                    </h2>
                    <p className="text-gray-700 text-sm">
                      {discussions.text}
                      {/* TODO: Obtener el nombre del usuario mediante el user_id */}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center">
          <p>No hay reseñas. ¡Sé el primero en escribir una!</p>
        </div>
      )}
    </div>
  );
}

export default DiscussionsCarousel;
