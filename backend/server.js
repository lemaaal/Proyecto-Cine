const express = require("express");

// Rutas
const authRoutes = require("./routes/authRoutes");
const moviesRoutes = require("./routes/movies");
const discussionRoutes = require("./routes/discussion");
const reviewsRoutes = require("./routes/reviews");
// const profileRoutes = require("./routes/profile");

// Arreglamos el problema de cors
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://13.39.41.175:3000", "http://13.39.41.175:3000"] //Añadimos nuestra ip publica del Bastion Host
  })
);

// Aquí conectas las rutas
app.use("/", authRoutes);
app.use("/movies", moviesRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/discussions", discussionRoutes);
// app.use("/profile", profileRoutes);
// app.use();

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
