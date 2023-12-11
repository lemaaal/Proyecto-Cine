const db = require("../config/db");

const getAllDiscussions = (req, res) => {
  db.query('SELECT * FROM discussion', (err, results) => {
    if (err) {
      return res.status(500).send('Error al recuperar las discusiones');
    }
    res.json(results);
  });
};

const getDiscussionsById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM discussion WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error al recuperar la discusión');
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Discusión no encontrada');
    }
  });
};

const createDiscussions  = (req, res) => {
  const { title, description, userId } = req.body;
  const createDate = new Date();
  db.query('INSERT INTO discussion (title, description, user_id, create_date) VALUES (?, ?, ?, ?)', [title, description, userId, createDate], (err, results) => {
    if (err) {
      return res.status(500).send('Error al crear la discusión');
    }
    res.status(201).send({ id: results.insertId, title, description, createDate });
  });
};

const addPostToDiscussions  = (req, res) => {
  const { id } = req.params;
  const { userId, text } = req.body;
  const timestamp = new Date();
  db.query('INSERT INTO post (id_discussion, id_user, text, timestamp) VALUES (?, ?, ?, ?)', [id, userId, text, timestamp], (err, results) => {
    if (err) {
      return res.status(500).send('Error al añadir el post a la discusión');
    }
    res.status(201).send({ id: results.insertId, text, timestamp });
  });
};

module.exports = {
  getAllDiscussions,
  getDiscussionsById,
  createDiscussions ,
  addPostToDiscussions 
};
