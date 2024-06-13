const mysql = require('mysql');
require('dotenv').config();
// Configuración de la conexión a la base de datos para local 
const dbConfig = {
  user: "admin",
  host: "cine.c10uqqqs0klw.eu-west-3.rds.amazonaws.com",
  port: 3306,
  password: "Abc123..",
  database: "CineAWS",
};

// Configuración de la conexión a la base de datos desde AWS RDS con el .env seria la forma segura y correcta de hacerlo para mantener nuestras credenciales privadas
// const dbConfig = {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// };

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
