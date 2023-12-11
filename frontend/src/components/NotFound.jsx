import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-[64px]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Página no encontrada
        </h1>
        <p className="text-lg text-white mb-6">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-white text-[#5C8374] rounded-md shadow hover:bg-gray-200 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
