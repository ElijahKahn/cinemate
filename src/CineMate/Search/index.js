import CineMateNavigation from "../CineMateNavigation";
import { useEffect, useState } from "react";
import "./index.css";
import Paging from "../components/Paging/Paging";
import SingleContent from "../components/SingleContent/SingleContent";
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';


function Search() {
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [query, setQuery] = useState("");
  const [content, setContent] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();


  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchData = async () => {
    if (query) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmY1NzY2NDA0ZTU0YWMzNDgzZjYxZDBhMWM1ZDdhOSIsInN1YiI6IjY1NmZiZTViMDg1OWI0MDEzOTUzODAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2M0pjPB1EGZmw0B24LvOGHC6s-m5qOukOYon6xsg8A'
}
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`, 
          options
        );
        const responseData = await response.json();
        setContent(responseData.results);
        setNumOfPages(responseData.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true); 
    setPage(1); 
    fetchData();
    setSearchParams({ criteria: query });
  };

  useEffect(() => {
    if (searched) {
      fetchData();
    }
  }, [page]);

  return (
    <>
      <CineMateNavigation />
      <div className="container">
        <h1 className="pageTitle">SEARCH CINEMATE</h1>
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="search">
              <i className="fa fa-search"></i>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search for a Movie or TV Show"
                />
                <button className="btn btn-light" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="trending">
        {content.slice(0, 18).map((c) => (
            <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            />
          ))} 
      </div>
      {searched && <Paging setPage={setPage} numOfPages={numOfPages} />}
      </div>
    </>
  );
}

export default Search;