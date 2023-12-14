import CineMateNavigation from "../CineMateNavigation";
import React, { useEffect, useState, useContext } from "react";
import SingleContent from "../components/SingleContent/SingleContent";
import * as client from "../users/client.js";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [account, setAccount] = useState(null);
  const [video, setVideo] = useState();
  const [watchlistDetails, setWatchlistDetails] = useState([]);




  const fetchAccount = async () => {
    try {
      const account = await client.account();
      setAccount(account);
    } catch (error) {
      console.error("error fetching", error);
    }
  };

  const fetchWatchlist = async () => {
    if (account && account._id) {
      const list = await client.getWatchlist(account._id);
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
        Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmY1NzY2NDA0ZTU0YWMzNDgzZjYxZDBhMWM1ZDdhOSIsInN1YiI6IjY1NmZiZTViMDg1OWI0MDEzOTUzODAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2M0pjPB1EGZmw0B24LvOGHC6s-m5qOukOYon6xsg8A",

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

  const removeFromWatchlist = async (movieId, mediaType) => {
    await client.removeFromWatchlist(account._id, movieId);
    // Refresh the watchlist details or remove the item from the local state
    const updatedWatchlist = watchlistDetails.filter(item => !(item.id === movieId && item.media_type === mediaType));
    setWatchlistDetails(updatedWatchlist);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    if (account) {
      fetchWatchlist();
    }
  }, [account]);

  useEffect(() => {
    fetchVideoDetails();
    // eslint-disable-next-line
  },[video] );


  return (
    <div>
      <CineMateNavigation />
      <div className="container">
        <span className="pageTitle">My Watchlist</span>
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
              > </SingleContent>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
