import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../utils/movie";

// In Development
const Home = () => {
  const images = [];
  const [image, setImages] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      const moviePosters = sessionStorage.getItem('moviePosters');
      if (moviePosters) {
        const moviePosterArray = moviePosters.split(',').map(poster => ({ posterPath: poster }));
        setImages(moviePosterArray);
      } else {
        const response = await fetchPopularMovies();

        response.map((item) => {
          images.push(item.poster_path);
        })

        sessionStorage.setItem('moviePosters', images);
        setImages(images);
      }
    };

    getMovies();
  }, []);

  return <div></div>;
};

export default Home;
