import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../img/logo.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para alternar la visibilidad de la contraseña
  const toggleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      // Manejo de errores de inicio de sesión
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-700">
      <img src={logo} alt="Logo" className="h-24 mb-6" />
      <div className="bg-white rounded-lg shadow-xl px-10 pt-8 pb-10 mb-4 w-96">
        <h2 className="text-gray-800 text-2xl font-semibold mb-6 text-center">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-5">
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              required
            />
          </div>
          <div className="mb-5">
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                className="mr-2"
                type="checkbox"
                checked={formData.showPassword}
                onChange={toggleShowPassword}
              />
              <span className="text-sm text-gray-700">Mostrar contraseña</span>
            </label>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            Iniciar sesión
          </button>
          <div className="flex justify-between mt-6 text-sm">
            <a href="/forgot-password" className="text-blue-600 hover:underline">¿Has olvidado la contraseña?</a>
            <a href="/register" className="text-blue-600 hover:underline">Registrarse</a>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default Login;
