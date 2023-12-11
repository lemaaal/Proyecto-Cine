const db = require("../config/db");

// Obtener todas las reseñas solo
const getAllMovieReviews = (req, res) => {
  db.query('SELECT * FROM movie_reviews ORDER BY timestamp DESC', (err, results) => {
    if (err) {
      return res.status(500).send('Error al recuperar las discusiones');
    }
    res.json(results);
  });
};

// Obtener todas las reseñas o filtrar por ID de película o usuario
const getReview = (req, res) => {
  let query = `
    SELECT mr.id, mr.api_movie_id, mr.user_id, mr.text, mr.timestamp, u.name AS user_name
    FROM movie_reviews mr
    JOIN users u ON mr.user_id = u.id`;

  const movieId = req.query.movie_id;
  const userId = req.query.user_id;

  if (movieId) {
    query += ` WHERE mr.api_movie_id = ${db.escape(movieId)}`;
  } else if (userId) {
    query += ` WHERE mr.user_id = ${db.escape(userId)}`;
  }

  query += ' ORDER BY mr.timestamp DESC';

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener reseñas:", error);
      return res.status(500).send("Error al obtener reseñas");
    }
    res.json(results);
  });
};

// Obtener informacion de la reseña mediante id de pelicula e id de la reseña
const getReviewInfo = (req, res) => {
  const movieId = req.params.movieId;
  const reviewId = req.params.reviewId;

  // Verifica que ambos parámetros están presentes
  if (!movieId || !reviewId) {
    return res.status(400).send("Es necesario especificar tanto movieId como reviewId");
  }

  let query = `
    SELECT mr.id, mr.api_movie_id, mr.user_id, mr.text, mr.timestamp, u.name AS user_name
    FROM movie_reviews mr
    JOIN users u ON mr.user_id = u.id
    WHERE mr.api_movie_id = ${db.escape(movieId)} AND mr.id = ${db.escape(reviewId)}`;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener reseña:", error);
      return res.status(500).send("Error al obtener reseña");
    }
    // Verifica que se encontró la reseña
    if (results.length === 0) {
      return res.status(404).send("Reseña no encontrada");
    }
    res.json(results[0]);
  });
};

// Publicar una nueva reseña
// Aquí podrías añadir validaciones para movie_id, user_id y text
const postReview = (req, res) => {
  const { movie_id, user_id, text } = req.body;
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  const query =
    "INSERT INTO movie_reviews (api_movie_id, user_id, text, timestamp) VALUES (?, UUID_TO_BIN(?), ?, ?)";
  db.query(query, [movie_id, user_id, text, timestamp], (error, results) => {
    if (error) {
      console.error("Error al publicar reseña:", error);
      return res.status(500).send("Error al publicar reseña");
    }
    res
      .status(201)
      .json({ id: results.insertId, movie_id, user_id, text, timestamp });
  });
};

// Actualizar una reseña existente
const updateReview = (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  if (!text) {
    return res.status(400).send("Texto de la reseña es requerido");
  }

  const query = "UPDATE movie_reviews SET text = ? WHERE id = ?";

  db.query(query, [text, id], (error, results) => {
    if (error) {
      console.error("Error al actualizar la reseña:", error);
      return res.status(500).send("Error al actualizar la reseña");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Reseña no encontrada");
    }
    res.json({ message: "Reseña actualizada correctamente" });
  });
};

// Eliminar una reseña
const deleteReview = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM movie_reviews WHERE id = ?";

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error al eliminar la reseña:", error);
      return res.status(500).send("Error al eliminar la reseña");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Reseña no encontrada");
    }
    res.json({ message: "Reseña eliminada correctamente" });
  });
};


module.exports = {
  getReview,
  getReviewInfo,
  postReview,
  getAllMovieReviews,
  updateReview,
  deleteReview,
};
