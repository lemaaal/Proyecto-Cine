import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateDebate = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); // Limpiar mensajes anteriores
    try {
      const response = await axios.post('/debates', { title }, {
        headers: {
          // Asegúrate de incluir el token de autenticación si es necesario
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Redireccionar al usuario al debate creado o mostrar mensaje de éxito
      console.log(response.data);
      setMessage('Debate creado con éxito.');
      // Redirigir al usuario a la página del debate, usar response.data.id si está disponible
      navigate(`/debates/${response.data.id}`);
    } catch (error) {
      console.error('Error al crear el debate:', error);
      setMessage('Error al crear el debate.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crear un nuevo debate</h2>
      {message && <div className="mb-4 text-center">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del debate"
          className="border p-2 rounded w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Debate
        </button>
      </form>
    </div>
  );
};

export default CreateDebate;
