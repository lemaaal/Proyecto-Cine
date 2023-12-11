const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    db.query(
      "SELECT BIN_TO_UUID(id) AS stringId, name, email, password FROM users WHERE email = ?",
      [email],
      async (error, results, fields) => {
        if (error) {
          throw error;
        }

        if (results.length === 0) {
          return res.status(401).send("Autenticación fallida");
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).send("Autenticación fallida");
        }
        // const token = jwt.sign({ userId: user.stringId }, "tuSecreto", {
        const token = jwt.sign({ id: user.stringId }, "tuSecreto", {
          expiresIn: "1h",
        });
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};

const logout = (req, res) => {
  res.send("Sesión cerrada");
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (error, results, fields) => {
        if (results.length > 0) {
          return res.status(409).send("El usuario ya existe");
        } else {
          // Hashear la contraseña
          const hashedPassword = await bcrypt.hash(password, 10);

          // Insertar el nuevo usuario en la base de datos con UUID
          db.query(
            "INSERT INTO users (id, name, email, password) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?)",
            [name, email, hashedPassword],
            (error, results) => {
              if (error) {
                throw error;
              }

              res.status(201).send("Usuario registrado con éxito");
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  login,
  logout,
  register,
};
