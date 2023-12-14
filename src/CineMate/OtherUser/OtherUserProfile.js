// @mui material components
import CineMateNavigation from "../CineMateNavigation";
import * as client from "../users/client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigatem, useParams } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SingleContent from "../components/SingleContent/SingleContent";
import "./OtherUserProfile.css";

function OtherUserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [video, setVideo] = useState();
  const [watchlistDetails, setWatchlistDetails] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAndSetUserProfile = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:4000/api/users"
        );
        const specificUser = usersResponse.data.find(
          (user) => user._id === userId
        );
        setUserProfile(specificUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAndSetUserProfile();
  }, [userId]);

  const fetchWatchlist = async () => {
    if (userProfile && userProfile._id) {
      const list = await client.getWatchlist(userProfile._id);
      setWatchlist(list);
      fetchWatchlistDetails(list);
    }
  };

  const fetchWatchlistDetails = async (list) => {
    const details = await Promise.all(
      list.map(async (item) => {
        const data = await fetchVideoDetails(item.media_type, item.media_id);
        return { ...data, media_type: item.media_type };
      })
    );
    setWatchlistDetails(details);
  };
  const fetchVideoDetails = async (media_type, media_id) => {
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
        `https://api.themoviedb.org/3/${media_type}/${media_id}?language=en-US&append_to_response=videos`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserReviews = async (userId) => {
    try {
      if (userProfile && userProfile._id) {
        const response = await axios.get(
          `http://localhost:4000/api/reviews/user/${userProfile._id}`
        );
        setReviews(response.data);
      }
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      fetchWatchlist();
      fetchUserReviews();
    }
  }, [userProfile]);

  useEffect(() => {
    fetchVideoDetails();
    // eslint-disable-next-line
  }, [video]);

  return (
    <div>
      <CineMateNavigation />
      <div className="profile-contianer container">
        {userProfile && (
          <span className="pageTitle">{userProfile.username}'s Profile</span>
        )}

        <div className="row">
          <div className="col">
            <div className="card">
              {userProfile ? (
                <div>
                  <Avatar
                    className="profile-avatar"
                    sx={{ width: 200, height: 200 }}
                    alt={userProfile.firstName || "Avatar"}
                  >
                    <span className="avatar-text">
                      {userProfile.firstName ? userProfile.firstName[0] : ""}
                    </span>
                  </Avatar>
                </div>
              ) : (
                <Avatar
                  sx={{ width: 50, height: 50 }}
                  alt="Avatar"
                  src="/static/images/avatar/2.jpg"
                >
                  {"P"}
                </Avatar>
              )}

              <span className="page-Sub">
                {userProfile && userProfile.username}'s Reviews
              </span>
              {reviews.length > 0 ? (
                <ul className="list-group">
                  {reviews.map((review) => (
                    <li key={review._id} className="list-group-item">
                      <Link
                        to={`/CineMate/Profile/Details/${review.media_type}/${review.media_id}`}
                        className="review-link"
                      >
                        {review.content}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}

              <div className="container">
                <span className="page-Sub">
                  {userProfile && userProfile.username}'s Watchlist
                </span>
                <div className="trending">
                  {watchlistDetails.map((v) => (
                    <SingleContent
                      key={v.id}
                      id={v.id}
                      poster={v.poster_path}
                      title={v.title || v.name}
                      date={v.first_air_date || v.release_date}
                      media_type={v.media_type}
                      vote_average={v.vote_average}
                    >
                      {" "}
                    </SingleContent>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherUserProfile;
