import CineMateNavigation from "../CineMateNavigation";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { IoTicketSharp } from "react-icons/io5";
import ReviewList from "../components/ReviewList";
import { GlobalContext } from "../context/GlobalState";


import "./Details.css";

import { img_500, unavailable } from "../config/config";


function Details() {
  const { media_type, id } = useParams();
  const [content, setContent] = useState();
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [video, setVideo] = useState();
  const [reviews, setReviews] = useState([]);
  const { watchlist, addMovieToWatchlist, removeMovieFromWatchlist } = useContext(GlobalContext);

  useEffect(() => {
    const itemInWatchlist = watchlist.some(item => item.id === id && item.media_type === media_type);
    setIsAddedToWatchlist(itemInWatchlist);
}, [watchlist, id, media_type]);

const checkWatchlist = () => {
  const itemInWatchlist = watchlist.some(item => item.media_id === id && item.media_type === media_type);
  setIsAddedToWatchlist(itemInWatchlist);
};

const handleWatchlistToggle = () => {
    const item = { id, media_type, ...content };

    if (isAddedToWatchlist) {
        removeMovieFromWatchlist(id, media_type);
        sendWatchlistUpdateRequest(item, 'remove');
    } else {
        addMovieToWatchlist(item);
        sendWatchlistUpdateRequest(item, 'add');
    }

    setIsAddedToWatchlist(!isAddedToWatchlist);
};

const sendWatchlistUpdateRequest = (item, action) => {
    fetch('/api/watchlist-update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, item }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};


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
        `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`,
        options
      );
      const responseData = await response.json();
      setContent(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchVideo = async () => {
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
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?language=en-US`,
        options
      );
      const responseData = await response.json();
      setVideo(responseData.results[0]?.key);
    } catch (error) {}
  };


  useEffect(() => {
    fetchData();
    fetchVideo();
    checkWatchlist();
    // eslint-disable-next-line
  }, [id, media_type]);

  // Fetch movie details using the id
  // ...

  return (
    <div>
      <CineMateNavigation />
      {content && (
        <div>
          <div className="detail-header container">
            <div>
              <h3>{content.title || content.name}</h3>
            </div>
            <div>
              <h5>
                {" "}
                <IoTicketSharp /> {content.vote_average.toFixed(1)} / 10{" "}
              </h5>
            </div>
          </div>
          <div className="detail-subheader container">
            <div>
              <p>
                {content.first_air_date
                  ? content.first_air_date.split("-")[0]
                  : content.release_date.split("-")[0]}
              </p>{" "}
              {media_type === "tv" && (
                <p>
                  <p>·</p>
                  {content.number_of_seasons} seasons
                </p>
              )}
            </div>
            <div>
              <button
                onClick={handleWatchlistToggle}
                className="btn btn-light button-container"
              >
                {isAddedToWatchlist
                  ? "Remove from Watchlist"
                  : "Add to Watchlist"}{" "}
              </button>
            </div>
          </div>
          <div className="details-container container">
            <div className="row">
              <div className="col-4">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="details-image"
                />
              </div>
              <div className="col-8">
                {video && (
                  <iframe
                    className="details-trailer"
                    src={`https://www.youtube.com/embed/${video}`}
                  />
                )}
              </div>
            </div>

            <div className="overview-container container">
              <p>
                {content.genres &&
                  content.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>{content.overview}</p>
            </div>
          </div>
          <ReviewList reviews={reviews} movieId={content.id} />
        </div>
      )}
    </div>
  );
}

export default Details;
