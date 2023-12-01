const db = require("../config/db");

// Obtener todas las reseñas
const getReview = (req, res) => {
  const query = `
    SELECT mr.id, mr.api_movie_id, mr.user_id, mr.text, mr.timestamp, u.name AS user_name
    FROM movie_reviews mr
    JOIN users u ON mr.user_id = u.id
    ORDER BY mr.timestamp DESC`;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener reseñas:", error);
      return res.status(500).send("Error al obtener reseñas");
    }
    res.json(results);
  });
};


// Publicar una nueva reseña
const postReview = (req, res) => {
  const { movie_id, user_id, text } = req.body;
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " "); // Formato de fecha y hora para MySQL

  const query =
    "INSERT INTO movie_reviews (movie_id, user_id, text, timestamp) VALUES (?, UUID_TO_BIN(?), ?, ?)";
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

module.exports = {
  getReview,
  postReview,
};
