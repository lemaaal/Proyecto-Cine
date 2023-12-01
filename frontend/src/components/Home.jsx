import React from "react";
import Navbar from "./Navbar";
import Reviews from "./ReviewsList";
import Disscusions from "./Disscusions";
import Movies from "./Movies";
import Carrusel from "./MovieCarrusel";

function Home() {
  return (
    <div className="container mx-auto bg-[#5C8374] text-gray-200 min-h-screen">
      <Navbar />
      <div className="container px-4 mx-auto bg-[#5C8374] text-gray-200 min-h-screen">
        <h1 className="md:col-span-3 text-2xl font-bold pt-10">Qué ver hoy?</h1>
        <div className="carousel bg-[#5C8374] h-auto mb-4">
          <Carrusel />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <h1 className="md:col-span-3 text-2xl font-bold">
            Reseñas más vistas hoy
          </h1>
          <section className="reviews bg-[#5C8374] h-64">
            {/* Contenido de las reseñas más vistas aquí */}
            <Reviews />
          </section>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <h1 className="md:col-span-3 text-2xl font-bold">
            Debates más vistos o los ultimos
          </h1>
          <section className="debates bg-[#5C8374] h-64">
            {/* Contenido de los debates más vistos aquí */}
            <Disscusions />
          </section>
        </div>
        <footer className="bg-[#5C8374] text-white p-4 mt-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h2 className="text-lg font-bold mb-2">Sobre Nosotros</h2>
              <p>
                Descubre más sobre nuestra aplicación y cómo te ayudamos a
                encontrar las mejores películas y series.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Enlaces Rápidos</h2>
              <ul>
                <li>
                  <a href="/cookies" className="hover:underline">
                    Política de Cookies
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:underline">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:underline">
                    Preguntas Frecuentes
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Ayuda</h2>
              <ul>
                <li>
                  <a href="/support" className="hover:underline">
                    Soporte Técnico
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Síguenos</h2>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    className="hover:underline"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>
              &copy; {new Date().getFullYear()} F&S Enterprise. Todos los derechos
              reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
