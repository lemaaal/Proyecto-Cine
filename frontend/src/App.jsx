import React, { useEffect } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { publicRoutes, protectedRoutes } from "./routes";
import Layout from "./components/Layout";

function ProtectedRoutes() {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return isAuthenticated ? (
    <Layout>
      <Routes>
        {protectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
}

function PublicRoutes() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <PublicRoutes />
        <ProtectedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
