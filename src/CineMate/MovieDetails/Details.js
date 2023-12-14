import CineMateNavigation from "../CineMateNavigation";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { IoTicketSharp } from "react-icons/io5";
import ReviewList from "../components/ReviewList";
import * as client from "../users/client.js";
import VideoNotAvailable from "./VideoNotAvailable.jpg"

import "./Details.css";

import { img_500, unavailable } from "../config/config";

function Details() {
  const { media_type, id } = useParams();
  const [content, setContent] = useState();
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [video, setVideo] = useState();
  const [reviews, setReviews] = useState([]);
  const [account, setAccount] = useState(null);


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
    // eslint-disable-next-line
  }, [id, media_type]);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const fetchedAccount = await client.account();
        setAccount(fetchedAccount);
      } catch (error) {
        console.error("error fetching", error);
      }
    };
  
    fetchAccount();
  }, []);

  useEffect(() => {
  const checkIfMovieInWatchlist = async () => {
    if (account && account._id) {
      try {
        const userWatchlist = await client.getWatchlist(account._id);
        const isMovieInWatchlist = userWatchlist.some(item => item.media_id === parseInt(id));
        setIsAddedToWatchlist(isMovieInWatchlist);
      } catch (error) {
        console.error("Error checking watchlist", error);
      }
    }
  };

  checkIfMovieInWatchlist();
}, [id, account]);



  const handleWatchlistClick = async () => {
    if (isAddedToWatchlist) {
      await client.removeFromWatchlist(account._id, content.id);
    } else {
      await client.addToWatchlist(account._id, { media_id: content.id, media_type: media_type });
    }
    setIsAddedToWatchlist(!isAddedToWatchlist);
  };


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
      : (content.release_date
        ? content.release_date.split("-")[0]
        : "Release Date Not Available")}
  </p>{" "}
              {media_type === "tv" && (
              <p>
              <span>· </span>
              {content.number_of_seasons
                ? `${content.number_of_seasons} ${content.number_of_seasons === 1 ? 'season' : 'seasons'}`
                : "Season Info Not Available"}
            </p>
              )}
            </div>
            <div>
            {account ? (
  <button
    className="btn btn-light button-container"
    onClick={handleWatchlistClick}
  >
    {isAddedToWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
  </button>
) : (
  <button
    className="btn btn-light button-container"
    onClick={() => alert("Must be logged in to add to Watchlist")}
  >
    Add to Watchlist
  </button>
)}
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
                {video ? (
                  <iframe
                    className="details-trailer"
                    src={`https://www.youtube.com/embed/${video}`}
                  /> 
                ) : <img className="details-trailer" src = {VideoNotAvailable}
                alt="VideoNotAvailable"/>}
              </div>
            </div>

            <div className="overview-container container">
              <h4 className="section-title">Description</h4>
              <p>
    {content.genres && content.genres.length > 0
      ? content.genres.map((genre) => genre.name).join(", ")
      : "Genres not available"}
  </p>
  <p>
    {content.overview
      ? content.overview
      : "Overview not available"}
  </p>
            </div>
            <ReviewList reviews={reviews} mediaType={media_type} mediaId={content.id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
