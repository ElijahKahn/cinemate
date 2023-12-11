import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const URL = "http://localhost:4000/api/reviews";

  const findAllReviews = async () => {
    const response = await axios.get(URL);
    setReviews(response.data);
  };

  const addReview = async (event) => {
    event.preventDefault();
    if (!newReview.trim()) {
      return;
    }
    try {
      const response = await axios.post(URL, {
        content: newReview,
        movie_id: movieId,
      });
      setReviews([...reviews, response.data]); // Assuming the backend returns the created review
      setNewReview(""); // Reset input field after submission
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  useEffect(() => {
    findAllReviews();
  }, []);

  const filteredReviews = reviews.filter(
    (review) => review.movie_id === movieId
  );

  return (
    <div className="reviews-container container">
      <h4>Viewer Reviews</h4>
      
      <div className="row height d-flex justify-content-center align-items-center">
        
        <div className="search">
          <i className="fa fa-search"></i>
          
          <form onSubmit={addReview}>
            
            <input
              type="text"
              className="form-control"
              placeholder="Write a Review"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
                        
            <button className="btn btn-light" type="submit">
                            Send             
            </button>
                      
          </form>
                  
        </div>
              
      </div>
            
      <ul className="list-group">
                
        {filteredReviews.length === 0 ? (
          <li className="list-group-item">Be the first to review!</li>
        ) : (
          filteredReviews.map((item) => (
            <li key={item.id} className="list-group-item reviews">
              {" "}
              {/* Assuming 'id' is a unique identifier */}
                            <b>{item.author}</b>
                            {item.content}
                          
            </li>
          ))
        )}
              
      </ul>
          
    </div>
  );
}

export default ReviewList;
