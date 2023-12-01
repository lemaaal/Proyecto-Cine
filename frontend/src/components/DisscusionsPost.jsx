import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateDebatePost = ({ debateId }) => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); // Limpiar mensajes anteriores
    try {
      const response = await axios.post(`/debates/${debateId}/posts`, { content }, {
        headers: {
          // Incluir el token de autenticación si es necesario
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Manejo de la respuesta
      console.log(response.data);
      setMessage('Post publicado con éxito.');
      // Opcionalmente, redirigir o actualizar la vista
      // navigate(`/debates/${debateId}`);
    } catch (error) {
      console.error('Error al crear el post en el debate:', error);
      setMessage('Error al publicar el post.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Escribe tu opinión</h2>
      {message && <div className="mb-4 text-center">{message}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tu mensaje"
          className="border p-2 rounded w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default CreateDebatePost;
