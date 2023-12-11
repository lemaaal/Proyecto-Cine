import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ movieId }) => {
  const [reviewText, setReviewText] = useState("");
  const { getUserId } = useAuth();
  const userId = getUserId();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/reviews/${movieId}`, {
        movie_id: movieId,
        user_id: userId, 
        text: reviewText, 
      });
      // TODO: Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
      navigate('/reviews')
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
      // Aquí podrías manejar el error, tal vez mostrar un mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded border-0 bg-gray-200 mb-4"
        rows="5"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Escribe tu reseña aquí..."
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Crear reseña
      </button>
    </form>
  );
};

export default ReviewForm;
