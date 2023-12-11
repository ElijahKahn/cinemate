import CineMateNavigation from "../CineMateNavigation";
import { useEffect, useState } from "react";
import SingleContent from "../components/SingleContent/SingleContent";
import Paging from "../components/Paging/Paging";
import Genres from "../components/Genres";
import useGenre from "../hooks/useGenre";

function Movies() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

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
          `https://api.themoviedb.org/3/discover/movie?&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`,
          options
        );
        const responseData = await response.json();
        setContent(responseData);
        const maxPagesLimit = 500;
        setNumOfPages(Math.min(responseData.total_pages, maxPagesLimit));
      } catch (error) {}
    };

    fetchData();
  }, [genreforURL, page]);

  return (
    <div>
      <CineMateNavigation />
      <div className="container">
        <span className="pageTitle">Movies</span>
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
        <div className="trending">
          {content &&
            content.results &&
            content.results
              .slice(0, 18)
              .map((c) => (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type="movie"
                  vote_average={c.vote_average}
                />
              ))}
        </div>
        {numOfPages > 1 && <Paging setPage={setPage} numOfPages={numOfPages} />}
      </div>
    </div>
  );
}
export default Movies;
