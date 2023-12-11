import CineMateNavigation from "./CineMateNavigation";
import { useEffect, useState } from "react";
import axios from "axios";

function CineMate() {
  const [reviews, setReviews] = useState([]);
  const URL = "http://localhost:4000/api/reviews";
  const findAllReviews = async () => {
    const response = await axios.get(URL);
    setReviews(response.data);
  };
  useEffect(() => {
    findAllReviews();
  }, []);
  
  return (
    <div d-flex>
      <CineMateNavigation />
    </div>
  );
}
export default CineMate;
