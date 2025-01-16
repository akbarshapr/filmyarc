import "../styles/popular.css";
import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../utils/movie";
import { IMAGE_BASE_URL } from "../utils/config";

const Popular = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered");
    const getMovies = async () => {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    };

    getMovies();
  }, []);

  return (
    <section className="popular-movies">
      <h2 className="section-title">Popular Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              className="movie-poster"
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h4 className="movie-title">{movie.title}</h4>
              <p className="movie-release-date">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;
