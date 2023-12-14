import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DiscussionsList() {
  const [discussions, setDiscussions] = useState([]);
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get('/discussions')
      .then((response) => {
        setDiscussions(response.data);
        const movieIds = [
          ...new Set(response.data.map((discussion) => discussion.api_movie_id))
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

  if (loading) return <p>Cargando debates...</p>;
  if (error) return <p>Error al cargar los debates: {error.message}</p>;

  const handleDiscussionClick = (movieId, discussionId) => {
    navigate(`/discussions/${movieId}/${discussionId}`);
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">
        Últimos debates
      </h2>
      {discussions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
              onClick={() => handleDiscussionClick(discussion.api_movie_id, discussion.id)}
            >
              {movies && movies[discussion.api_movie_id] && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movies[discussion.api_movie_id].poster_path}`}
                  alt={movies[discussion.api_movie_id].title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {discussion.title}
                </h2>
                <p className="text-gray-700 text-base">
                  {discussion.description}
                  {/* TODO: Agregar más detalles como el autor, fecha, etc. */}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No hay debates disponibles</p>
        </div>
      )}
    </div>
  );
}

export default DiscussionsList;
