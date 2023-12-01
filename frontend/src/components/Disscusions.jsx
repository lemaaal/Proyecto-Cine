import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function DebatesPage() {
  const [debates, setDebates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const response = await axios.get('/debates');
        setDebates(response.data);
      } catch (error) {
        console.error('Error al obtener los debates:', error);
      }
    };

    fetchDebates();
  }, []);

  const handleCreateDebate = () => {
    navigate('/create-debate'); // Asegúrate de que esta ruta lleve al formulario para crear debates
  };

  const DebateList = ({ debates }) => {
    if (debates.length === 0) {
      return (
        <div className="container mx-auto p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">No hay debates disponibles</h2>
          <button 
            onClick={handleCreateDebate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Crear un nuevo debate
          </button>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Debates</h2>
        <ul>
          {debates.map((debate) => (
            <li key={debate.id} className="p-2 hover:bg-gray-100">
              <a href={`/debates/${debate.id}`} className="text-blue-600 hover:underline">
                {debate.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <DebateList debates={debates} />
    </div>
  );
}

export default DebatesPage;
