import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DiscussionDetails = () => {
    const { movieId, discussionId } = useParams();
    const [discussionData, setDiscussionData] = useState(null);
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
      const fetchMovieAndDiscussionData = async () => {
        try {
          // Obtener los detalles de la película
          const movieResponse = await axios.get(`/movies/${movieId}`);
          setMovieData(movieResponse.data);
  
          // Obtener los detalles de la discusión
          const discussionResponse = await axios.get(`/discussions/${movieId}/${discussionId}`);
          setDiscussionData(discussionResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchMovieAndDiscussionData();
    }, [movieId, discussionId]);

  if (!discussionData) {
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
          <strong>Discusión:</strong> {discussionData.content}
        </p>
        {/* TODO: Añadir más detalles de la discusión si es necesario */}
        <p className="text-lg">
          <strong>Popularidad de la película:</strong> {movieData.popularity}
        </p>
      </div>
    </div>
  );
};

export default DiscussionDetails;
