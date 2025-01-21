import "../styles/home.css";
import { useState } from "react";

const staticBackgrounds = ["src/images/bg-1.jpg", "src/images/bg-2.jpg"];

const randomBackground = () => {
  const randomIndex = Math.floor(Math.random() * staticBackgrounds.length);
  return staticBackgrounds[randomIndex];
};

const Home = () => {
  const [backgroundImage] = useState(randomBackground());

  return (
    <div className="container">
      <img className="background-img" src={backgroundImage} alt="Background" />
      <div className="overlay"></div>
      <div className="content">
        <h2>FILMYARC</h2>
        <p>Where Every Frame Tells a Story</p>
        <button aria-label="Get started with FilmyArc">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
