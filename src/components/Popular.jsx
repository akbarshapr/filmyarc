import "../styles/popular.css";
import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../utils/movie";
import { IMAGE_BASE_URL } from "../utils/config";
import { getUniqueItems } from "../utils/util";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);

        const moviesArray = await fetchPopularMovies();
        const uniqueMoviesArray = getUniqueItems(moviesArray, "id");

        // Formats the release date once and update state
        const formattedMovies = uniqueMoviesArray.map((movie) => ({
          ...movie,
          release_year: new Date(movie.release_date).getFullYear(),
        }));

        setMovies(formattedMovies);
      } catch (error) {
        console.log("Error while displaying the movies", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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
              <p className="movie-release-date">{movie.release_year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;
