import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
import * as client from "../../users/client";

function ReviewList({ mediaType, mediaId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [account, setAccount] = useState(null);
  const URL = "http://localhost:4000/api/reviews";

  const fetchAccount = async () => {
    try {
      const account = await client.account();
      setAccount(account);
    } catch (error) {
      console.error("error fetching", error);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    const findAllReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/reviews/${mediaType}/${mediaId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (mediaType && mediaId) {
      findAllReviews();
    }
  }, [mediaType, mediaId]);

  const addReview = async (event) => {
    event.preventDefault();
    if (!newReview.trim()) {
      return;
    }
    try {
      const authorName = `${account.firstName} ${account.lastName}`;
      const accountId = `${account._id}`;
      const response = await axios.post(URL, {
        content: newReview,
        media_type: mediaType,
        media_id: mediaId,
        author: authorName,
        user_id: accountId,
      });

      // Include the author's name in the new review object
      const newReviewData = { ...response.data, author: authorName };

      setReviews([...reviews, newReviewData]);
      setNewReview("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const filteredReviews = reviews.filter(review => 
    review.media_id === mediaId && review.media_type === mediaType
);
  return (
    <div className="reviews-container container">
      <h4>Viewer Reviews</h4>
      {account ? (
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col">
            <div className="submit">
              <i className="fa fa-search"></i>
              <form onSubmit={addReview}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write a Review"
                  value={newReview} // Bind the input value to the newReview state
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <button className="btn btn-light" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="must-sign-in">
          <Link to="/CineMate/SignIn">
            You must have an account to leave a review.
          </Link>
        </div>
      )}

      <ul className="reviews list-group">
        {filteredReviews.length === 0 ? (
          <li className="list-group-item">Be the first to review!</li>
        ) : (
          filteredReviews.map((item) => (
            <li key={item.id} className="list-group-item reviews">
              {account ? (
                // If logged in, show clickable link to profile
                <b className="authorName">
                  <Link to={`/CineMate/Profile/${item.user_id}`}>
                    {item.author}
                  </Link>
                </b>
              ) : (
                // If not logged in, show plain text
                <b className="authorName">{item.author}</b>
              )}
              {item.content}
            </li>
          ))
        )}
      </ul>
      <br />
      <br />
    </div>
  );
}

export default ReviewList;
