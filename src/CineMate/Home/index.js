import CineMateNavigation from "../CineMateNavigation";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../components/SingleContent/SingleContent";
import "./index.css";

function Home() {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmY1NzY2NDA0ZTU0YWMzNDgzZjYxZDBhMWM1ZDdhOSIsInN1YiI6IjY1NmZiZTViMDg1OWI0MDEzOTUzODAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2M0pjPB1EGZmw0B24LvOGHC6s-m5qOukOYon6xsg8A",
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          options
        );
        const responseData = await response.json();
        console.log(responseData)
        setContent(responseData);
        console.log(responseData)
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CineMateNavigation />
      <div>
        <span className="pageTitle">Trending Today</span>
        <div className="trending">
        {content && content.results && content.results.map((c) => (
            <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average} 
            />
          ))} 
      </div>
      </div>
    </div>
  );
};
export default Home;
