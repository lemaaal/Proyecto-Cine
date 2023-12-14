const db = require("../config/db");

const getAllDiscussions = (req, res) => {
  db.query("SELECT * FROM discussion", (err, results) => {
    if (err) {
      return res.status(500).send("Error al recuperar las discusiones");
    }
    res.json(results);
  });
};

const getDiscussionsByPostId = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM discussion WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).send("Error al recuperar la discusión");
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send("Discusión no encontrada");
    }
  });
};

const getDiscussionsByMovieId = (req, res) => {
  let query = `SELECT d.id, d.api_movie_id, d.user_id, d.title, d.description, d.timestamp, u.name AS user_name
  FROM discussion d
  JOIN users u ON d.user_id = u.id`;

  const movieId = req.query.api_movie_id;
  const userId = req.query.user_id;
  if (movieId) {
    query += ` WHERE d.api_movie_id = ${db.escape(movieId)}`;
  } else if (userId) {
    query += ` WHERE d.user_id = ${db.escape(userId)}`;
  }

  query += " ORDER BY d.timestamp DESC";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener reseñas:", error);
      return res.status(500).send("Error al obtener reseñas");
    }
    res.json(results);
  });
};

const getAllDiscussionsPost = (req, res) => {};
const getDiscussionsById = (req, res) => {
  const movieId = req.params.movieId;
  const discussionId = req.params.discussionId;
  // Verifica que ambos parámetros están presentes
  if (!movieId || !discussionId) {
    return res
      .status(400)
      .send("Es necesario especificar tanto movieId como discussionId");
  }

  let query = `SELECT d.id, d.api_movie_id, d.user_id, d.title, d.description, d.timestamp, u.name AS user_name
  FROM discussion d
  JOIN users u ON d.user_id = u.id
  WHERE d.api_movie_id = ${db.escape(movieId)} AND d.id = ${db.escape(discussionId)}`;

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

const createDiscussions = (req, res) => {
  const { movie_id, title, description, user_id } = req.body;
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  if (!user_id) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }
  // Asegúrate de que la consulta incluya todos los campos necesarios
  const query =
    "INSERT INTO discussion (api_movie_id, user_id, title, description, timestamp) VALUES (?, UUID_TO_BIN(?), ?, ?, ?)";

  db.query(
    query,
    [movie_id, user_id, title, description, timestamp],

    (error, results) => {
      if (error) {
        console.error("Error al crear la discusión:", error);
        return res.status(500).send("Error al crear la discusión");
      }
      // Devuelve los detalles de la discusión creada
      res.status(201).json({
        id: results.insertId,
        movie_id,
        user_id,
        title,
        description,
        timestamp,
      });
    }
  );
};

const deleteDiscussions = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const query = 'DELETE FROM discussion WHERE id = ?';

    connection.query(query, [discussionId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error al eliminar la discusión.' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'No se encontró la discusión con el ID proporcionado.' });
      }

      res.status(200).json({ message: 'Discusión eliminada con éxito.' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

const updateDiscussions = (req, res) => {
  const { movie_id, title, description, user_id } = req.body;
  const { id } = req.params;

  if (!text) {
    return res.status(400).send("Texto de la reseña es requerido");
  }

  const query = "UPDATE discussion SET title = ?, description = ? WHERE id = ?";

  db.query(query, [title, description, id], (error, results) => {
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

const createDiscussionsPost = (req, res) => {
  const { movie_id, title, description, user_id } = req.body;
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  if (!user_id) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }
  // Asegúrate de que la consulta incluya todos los campos necesarios
  const query =
    "INSERT INTO post (id, id_discussion, id_user, text, timestamp) VALUES (?, UUID_TO_BIN(?), ?, ?, ?)";

  db.query(
    query,
    [movie_id, user_id, title, description, timestamp],

    (error, results) => {
      if (error) {
        console.error("Error al crear la discusión:", error);
        return res.status(500).send("Error al crear la discusión");
      }
      // Devuelve los detalles de la discusión creada
      res.status(201).json({
        id: results.insertId,
        movie_id,
        user_id,
        title,
        description,
        timestamp,
      });
    }
  );
};
const deleteDiscussionsPost = (req, res) => {};
const updateDiscussionsPost = (req, res) => {};

// id INT AUTO_INCREMENT PRIMARY KEY,
// id_discussion INT NOT NULL,
// id_user BINARY(16) NOT NULL,
// text VARCHAR(2000) NOT NULL,
// timestamp DATETIME NOT NULL,

module.exports = {
  getAllDiscussions,
  getDiscussionsById,
  getDiscussionsByMovieId,
  getAllDiscussionsPost,
  getDiscussionsByPostId,
  createDiscussions,
  deleteDiscussions,
  updateDiscussions,
  createDiscussionsPost,
  deleteDiscussionsPost,
  updateDiscussionsPost,
};
