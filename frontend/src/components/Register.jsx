import React, { useState } from "react";
import axios from "axios";
import logo from "../img/logo.png"
import { useNavigate } from "react-router-dom"; 

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  // Manejador de cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle para mostrar/ocultar contraseña
  const toggleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  // Función para enviar los datos al backend
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "/register",
        userData
      );
      console.log(response.data);
      alert("Registro exitoso");
      navigate('/login');
    } catch (error) {
      console.error(
        "Error en el registro:",
        error.response ? error.response.data : error
      );
      alert("Error en el registro");
    }
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  console.log("Formulario enviado", formData);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-700">
      <img src={logo} alt="Logo" className="h-24 mb-6" />
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl px-10 pt-8 pb-10 mb-4 w-96">
      <h2 className="text-gray-800 text-2xl font-semibold mb-6">
        Registro
      </h2>
        <div className="mb-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
            className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo Electrónico"
            required
            className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <input
            type={formData.showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
            className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <input
            type={formData.showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar Contraseña"
            required
            className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.showPassword}
              onChange={toggleShowPassword}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Mostrar contraseña</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
        >
          Registrar
        </button>
        <div className="flex justify-start mt-6 text-sm">
            <p className="text-gray-700 pr-2">Ya estas registrado? </p>
            <a href="/register" className="text-blue-600 hover:underline"> Iniciar Sesion</a>
          </div>
      </form>
    </div>
  );
  
}

export default Register;
