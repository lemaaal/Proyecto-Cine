import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DiscussionForm = ({ movieId }) => {
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [discussionDescription, setDiscussionDescription] = useState("");
  const { getUserId, logout } = useAuth();
  const userId = getUserId();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/discussions/${movieId}`, {
        movie_id: movieId,
        title: discussionTitle,
        description: discussionDescription,
        user_id: userId,
      });
      navigate("/discussions");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
        navigate("/login");
      }
      console.error("Error al enviar la reseña:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        className="w-full p-2 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded border border-gray-300"
        value={discussionTitle}
        onChange={(e) => setDiscussionTitle(e.target.value)}
        placeholder="Título del debate"
        required
      />
      <textarea
        className="w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded border border-gray-300 bg-gray-200 mb-4"
        rows="5"
        value={discussionDescription}
        onChange={(e) => setDiscussionDescription(e.target.value)}
        placeholder="Escribe tu reseña aquí..."
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Crear debate
      </button>
    </form>
  );
};

export default DiscussionForm;
