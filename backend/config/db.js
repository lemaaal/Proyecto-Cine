const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const dbConfig = {
  user: "root",
  host: "localhost",
  port: 3306,
  password: "", // Recuerda usar variables de entorno para la contraseña en producción
  database: "app_cine",
};

// Crear una conexión a la base de datos
const db = mysql.createConnection(dbConfig);

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

module.exports = db;
