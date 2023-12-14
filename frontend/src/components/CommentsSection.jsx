import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Asumiendo que tienes un contexto de autenticación

const CommentsSection = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { isAuthenticated } = useAuth(); // Asumiendo una función para verificar la autenticación
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/discussions/${movieId}/comments`);
        setComments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [movieId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`/discussions/${movieId}/comments`, { text: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      // Manejo del error
    }
  };

  if (isLoading) return <div>Cargando comentarios...</div>;
  if (error) return <div>Error al cargar comentarios: {error.message}</div>;

  return (
    <div className="comments-section">
      <h3 className="text-xl font-bold">Comentarios</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="my-2 p-2 border-b">
              <p>{comment.text}</p>
              {/* Aquí puedes añadir más detalles como el autor, fecha, etc. */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
      )}

      {isAuthenticated() && (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Publicar Comentario
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentsSection;
