import React from "react";
import ReviewCarrusel from "./ReviewCarrusel";
import Discussions from "./DiscussionCarrusel";
import MovieCarrusel from "./MovieCarrusel";

function Home() {
  return (
    <div className="mx-auto bg-[#5C8374] text-gray-200 min-h-screen">
      <div className="px-4 mx-auto text-gray-200 min-h-screen">
        <h1 className="text-2xl font-bold pt-5">Qué ver hoy?</h1>
        <div className="carousel h-auto mb-4">
          <MovieCarrusel />
        </div>
        <div className="my-4">
          <h1 className="text-2xl font-bold mt-8">
            Reseñas más vistas hoy
          </h1>
          <section className="reviews">
            <ReviewCarrusel />
          </section>
        </div>
        <div className="my-4">
          <h1 className="text-2xl font-bold">
            Debates más vistos o los últimos
          </h1>
          <section className="discussions">
            <Discussions />
          </section>
        </div>
        {/* Aquí iría el resto de tu componente Home, como el footer */}
      </div>
    </div>
  );
}

export default Home;
