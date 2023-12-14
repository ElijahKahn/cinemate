// @mui material components
import CineMateNavigation from "../../CineMateNavigation";
import * as client from "../client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./Profile.css";

function Profile() {
  const [account, setAccount] = useState(null);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const fetchAccount = async () => {
    try {
      const account = await client.account();
      setAccount(account);
      if (account && account._id) {
        fetchUserReviews(account._id);
      }
    } catch (error) {
      console.error("error fetching", error);
    }
  };

  const fetchUserReviews = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/reviews/user/${userId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };


  useEffect(() => {
    fetchAccount();
  }, []);

  const save = async () => {
    await client.updateUser(account);
  };

  const signout = async () => {
    await client.signout();
    navigate("/CineMate/SignIn");
  };

  return (
    <div>
      <CineMateNavigation />
      <span className="pageTitle">PROFILE</span>
      <div className="profile-contianer container">
        <div className="row">
          <div className="col">
            <div className="card">
              {account ? (
                <div>
                  <Avatar
                    className="profile-avatar"
                    sx={{ width: 200, height: 200 }}
                    alt={account.firstName || "Avatar"}
                  >
                    <span className="avatar-text">
                      {account.firstName ? account.firstName[0] : ""}
                    </span>
                  </Avatar>
                  <p>
                    {account.firstName} {account.lastName}
                  </p>
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

              <h6>My Reviews</h6>
              {reviews.length > 0 ? (
                <ul className="list-group">
                  {reviews.map(review => (
                    <li key={review._id} className="list-group-item">
                      <Link to={`/CineMate/Profile/Details/${review.media_type}/${review.media_id}`} className="review-link">{review.content}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
          <div className="col container">
            {account && (
              <div>
                <input
                  className="form-control"
                  value={account.password}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      password: e.target.value,
                    })
                  }
                />
                <input
                  className="form-control"
                  value={account.firstName}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      firstName: e.target.value,
                    })
                  }
                />
                <input
                  className="form-control"
                  value={account.lastName}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      lastName: e.target.value,
                    })
                  }
                />

                <input
                  className="form-control"
                  value={account.email}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      email: e.target.value,
                    })
                  }
                />
                <ul class="list-group profile-role">
                  <li class="list-group-item">{account.role}</li>
                </ul>
                <div className="row first-row-buttons">
                  <div className="col">
                    <button className="btn btn-secondary w-100" onClick={save}>
                      Save
                    </button>{" "}
                  </div>
                  <div className="col">
                    <button className="btn btn-secondary w-100" onClick={signout}>
                      Signout
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {account && account.role === "ADMIN" && (
                      <Link
                        to="/CineMate/Profile/Admin/Users"
                        className="btn btn-primary w-100"
                      >
                        Users
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
