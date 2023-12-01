import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/movies");
        setMovies(response.data.slice(0, 30));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Funciones para manejar los clics en los botones
  const handleReviewClick = (movieId) => {
    navigate(`/review/${movieId}`);
    console.log("Review for movie", movieId);
  };

  const handleDiscussionClick = (movieId) => {
    navigate(`/disscusions/${movieId}`);
    console.log("Discussion for movie", movieId);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-auto pt-2" style={{ maxWidth: "1024px" }}>
      <Slider {...settings}>
        {movies.map(
          (movie) =>
            movie.poster_path && (
              <div key={movie.id} className="px-2 group">
                <div className="bg-[#93B1A6] relative">
                  <div className="overflow-hidden group-hover:mb-16 transition-all duration-300">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="mx-auto transition-all duration-300 transform group-hover:scale-90"
                    />
                  </div>
                  <div className="hidden group-hover:flex flex-col items-center justify-center absolute inset-x-0 bottom-0 mb-4 transition-all duration-300">
                    <button
                      className="mb-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300"
                      onClick={() => handleReviewClick(movie.id)}
                    >
                      Crear reseña
                    </button>
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-all duration-300"
                      onClick={() => handleDiscussionClick(movie.id)}
                    >
                      Ir a Debate
                    </button>
                  </div>
                  <div className="text-center p-4 bg-opacity-0 group-hover:bg-opacity-100 transition-all duration-300">
                    <h3 className="text-white text-xl group-hover:hidden transition-all duration-300">{movie.title}</h3>
                  </div>
                </div>
              </div>
            )
        )}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
