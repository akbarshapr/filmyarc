import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../utils/movie";

const Home = () => {
  const [images, setImages] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      const moviePosters = sessionStorage.getItem("moviePosters");
      if (moviePosters) {
        const moviePosterArray = moviePosters.split(",").map((poster) => ({ posterPath: poster }));
        setImages(moviePosterArray);
      } else {
        const response = await fetchPopularMovies();
        const newImages = response.map((item) => ({ posterPath: item.poster_path }));
        sessionStorage.setItem("moviePosters", newImages.map(img => img.posterPath));
        setImages(newImages);
      }
    };
    getMovies();
  }, []);

  return <div></div>;
};

export default Home;
