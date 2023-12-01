import React from "react";
import "./index.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Rutas
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Reviews from "./components/ReviewsList";
import Disscusions from "./components/Disscusions";
import Profile from "./components/Profile";
import ReviewsPost from "./components/ReviewsPost"

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/movies" element={isAuthenticated ? <Movies /> : <Navigate to="/login" />} />
      <Route path="/reviews" element={isAuthenticated ? <Reviews /> : <Navigate to="/login" />} />
      <Route path="/disscusions" element={isAuthenticated ? <Disscusions /> : <Navigate to="/login" />} />
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/review/:movieId" element={isAuthenticated ? <ReviewsPost /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="min-h-screen bg-neutral-900 text-white">
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ProtectedRoutes />
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
