import React from "react";
import { Link } from "react-router-dom";
import icon from "../img/icon.png";
import logo from "../img/logo3.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faFilm,
  faNewspaper,
  faComments,
  faBell,
  faSearch,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#183D3D] p-4 w-full">
      <div className="mx-auto flex items-center justify-between">
        <div className="text-white">
          <Link
            to="/"
            className="text-lg font-semibold hover:text-gray-300 transition duration-300"
          >
            <img src={logo} alt="F&S" className="h-10 mr-2" />
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faHome} className="mr-1" /> Inicio
          </Link>
          <Link
            to="/movies"
            className="text-white hover:text-blue-400 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faFilm} className="mr-1" /> Películas
          </Link>
          <Link
            to="/reviews"
            className="text-white hover:text-blue-400 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faNewspaper} className="mr-1" /> Reseñas
          </Link>
          <Link
            to="/discussions"
            className="text-white hover:text-blue-400 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faComments} className="mr-1" /> Debates
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </Link>
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faBell} className="text-lg" />
          </Link>
          <Link
            to="/profile"
            className="text-white hover:text-blue-400 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faUser} className="mr-1 text-lg" />
          </Link>
          <Link
            to="/login"
            onClick={handleLogout}
            className="text-white hover:text-blue-400 transition duration-300"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
