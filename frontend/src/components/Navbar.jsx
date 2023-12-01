import React from "react";
import { Link } from "react-router-dom"; 
import icon from '../img/icon.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-[#183D3D] p-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <Link to="/" className="text-lg font-semibold hover:text-gray-300">
            <img src={icon} alt="F&S" className="h-8 mr-2"/>
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/movies" className="hover:text-white">
            Películas
          </Link>
          <Link to="/reviews" className="hover:text-white">
            Reseñas
          </Link>
          <Link to="/disscusions" className="hover:text-white">
            Debates
          </Link>
          <Link to="/profile" className="hover:text-white">
            Perfil
          </Link>
          <Link to="/login" onClick={handleLogout} className="hover:text-white">
            Cerrar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
