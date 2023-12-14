import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "./index.css";

// import CineMateNavigation from "../../CineMateNavigation/index.js"
const CarouselComponent = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.themoviedb.org/3/trending/all/day?language=en-US";
      const apiKey = `${process.env.REACT_APP_API_KEY}`; // Replace with your actual API key

      try {
        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmY1NzY2NDA0ZTU0YWMzNDgzZjYxZDBhMWM1ZDdhOSIsInN1YiI6IjY1NmZiZTViMDg1OWI0MDEzOTUzODAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2M0pjPB1EGZmw0B24LvOGHC6s-m5qOukOYon6xsg8A",
          },
        });
        setContent(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="trending-carousel-container">
      <Carousel controls={false} interval={3000}>
        {content &&
          content.results &&
          content.results.slice(12, 18).map((c) => (
            <Carousel.Item key={c.id} className="carousel-item-container">
              <img
                className="carousel-image d-block w-100"
                src={`https://image.tmdb.org/t/p/w500/${c.poster_path}`}
                alt={c.title || c.name}
              />
              <Carousel.Caption>
                <h1>{c.title || c.name}</h1>
                <p className="container">{c.overview}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
