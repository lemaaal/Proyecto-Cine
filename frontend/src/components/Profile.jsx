import React from "react";
import Navbar from "./Navbar";

function Profile() {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <header className="profile-header my-4">
        {/* Cabecera del Perfil aquí */}
      </header>
      <div className="profile-content my-4">
        <section className="personal-lists bg-gray-200 h-64">
          {/* Listas Personalizadas aquí */}
        </section>
        <section className="user-reviews bg-gray-300 h-64 my-4">
          {/* Reseñas Publicadas aquí */}
        </section>
        <section className="profile-settings bg-gray-200 h-64 my-4">
          {/* Configuración del Perfil aquí */}
        </section>
      </div>
      <footer className="footer bg-gray-800 text-white p-4 mt-4">
        {/* Footer igual que en la página principal */}
      </footer>
    </div>
  );
}

export default Profile;
