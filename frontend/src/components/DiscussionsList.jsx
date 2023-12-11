import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DiscussionsPage() {
  const [discussions, setDiscussions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscussions= async () => {
      try {
        const response = await axios.get('/discussions');
        setDiscussions(response.data);
      } catch (error) {
        console.error('Error al obtener los debates:', error);
      }
    };

    fetchDiscussions();
  }, []);

  const handleCreateDiscussion = () => {
    navigate('/'); // Asegúrate de que esta ruta lleve al formulario para crear debates
  };

  const DiscussionsList = ({ discussions }) => {
    if (discussions.length === 0) {
      return (
        <div className="container mx-auto p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">No hay debates disponibles</h2>
          <button 
            onClick={handleCreateDiscussion}
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
          {discussions.map((discussions) => (
            <li key={discussions.id} className="p-2 hover:bg-gray-100">
              <a href={`/discussions/${discussions.id}`} className="text-blue-600 hover:underline">
                {discussions.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <DiscussionsList discussions={discussions} />
    </div>
  );
}

export default DiscussionsPage;
