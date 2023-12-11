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
    origin: ["http://localhost:3000", "https://e2f4-2a02-9130-90a5-8d3e-80a6-61d1-ca9c-e716.ngrok-free.app"]
  })
);

// Aquí conectas las rutas
app.use("/", authRoutes);
app.use("/movies", moviesRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/discussions", discussionRoutes);
// app.use("/profile", profileRoutes);
// app.use();

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
