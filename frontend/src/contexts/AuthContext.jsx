import React, { createContext, useContext, useState, useCallback} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  // Iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      const data = response.data;

      if (data.token) {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));

        // Configurar un temporizador para coincidir con la expiración del token
        const decodedToken = jwtDecode(data.token);
        const expirationTime = decodedToken.exp * 1000 - Date.now();
        setTimeout(() => {
          logout();
        }, expirationTime);
        return true;
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      alert("Error al iniciar sesión");
    }
  };

  // Esta autenticado
  const isAuthenticated = () => {
    if (!auth || !auth.token) {
      return false;
    }

    try {
      const decoded = jwtDecode(auth.token);
      const isTokenExpired = decoded.exp && Date.now() >= decoded.exp * 1000;
      return !isTokenExpired;
    } catch (error) {
      console.error("Error al decodificar el token", error);
      return false;
    }
  };

  // Cerrar sesión
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  // Revisar si hay una sesión guardada
  const checkAuth = useCallback(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth && parsedAuth.token) {
        try {
          const decoded = jwtDecode(parsedAuth.token);
          const isTokenExpired = decoded.exp && Date.now() >= decoded.exp * 1000;
          if (!isTokenExpired) {
            logout();
            setAuth(parsedAuth);
          } else {
            // Si el token ha expirado, eliminarlo de localStorage y actualizar el estado
            localStorage.removeItem("auth");
            setAuth(null);
          }
        } catch (error) {
          console.error("Error al decodificar el token", error);
          logout();
          localStorage.removeItem("auth");
          setAuth(null);
        }
      }
    }
  }, [setAuth]);

  const getUserId = () => {
    if (auth && auth.token) {
      try {
        const decodedToken = jwtDecode(auth.token);
        return decodedToken.id; 
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ auth, isAuthenticated, login, logout, checkAuth, getUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
