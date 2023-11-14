import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { useSeries } from "./hooks/useSeries";
import { Movies } from "./components/Movies";
import { Series } from "./components/Series";
import { useState, useEffect, useRef, useCallback } from "react";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [tab, setTab] = useState("movies");
  const [sort, setSort] = useState(false);

  // Hooks para películas y series
  const { search, updateSearch, error } = useSearch();
  const {
    movies,
    loading: loadingMovies,
    getMovies,
  } = useMovies({ search, sort });
  const {
    series,
    loading: loadingSeries,
    getSeries,
  } = useSeries({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  // Cambia entre la búsqueda de películas y series
  const debouncedGetContent = useCallback(
    debounce((search) => {
      if (tab === "movies") {
		console.log("movies")
        getMovies(search);
      } else {
		console.log("series")
        getSeries(search);
      }
    }, 300),
    [getMovies, getSeries, tab]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    debouncedGetContent(search);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Avengers, Star Wars, The Matrix..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <nav>
        <button onClick={() => handleTabChange("movies")}>Películas</button>
        <button onClick={() => handleTabChange("series")}>Series</button>
      </nav>

      <main>
        {tab === "movies" ? (
          loadingMovies ? (
            <p>Cargando películas...</p>
          ) : (
            <Movies movies={movies} />
          )
        ) : loadingSeries ? (
          <p>Cargando series...</p>
        ) : (
          <Series series={series} />
        )}
      </main>
    </div>
  );
}

export default App;
