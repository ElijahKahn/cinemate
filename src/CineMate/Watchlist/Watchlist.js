import CineMateNavigation from "../CineMateNavigation";
import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import SingleContent from "../components/SingleContent/SingleContent";

function Watchlist() {

    const [watchlist, setWatchlist] = useState([]);
    const [content, setContent] = useState([]);

    const { userId } = useContext(GlobalContext); 


    const fetchWatchlist = () => {
        fetch(`/api/profile/watchlist/${userId}`)
            .then(response => response.json())
            .then(data => {
                setWatchlist(data);
                fetchContentDetails(data); // Fetch details after watchlist is set
            })
            .catch(error => console.error('Error:', error));
    };

    const fetchContentDetails = async (watchlistItems) => {
        const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmY1NzY2NDA0ZTU0YWMzNDgzZjYxZDBhMWM1ZDdhOSIsInN1YiI6IjY1NmZiZTViMDg1OWI0MDEzOTUzODAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2M0pjPB1EGZmw0B24LvOGHC6s-m5qOukOYon6xsg8A'
        const promises = watchlistItems.map(item => {
            const url = `https://api.themoviedb.org/3/${item.media_type}/${item.media_id}?api_key=${apiKey}&language=en-US`;
            return fetch(url).then(response => response.json());
        });

        try {
            const results = await Promise.all(promises);
            setContent(results);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);


    return (
        <div >
        <CineMateNavigation/>
        <div className="container">
        <span className="pageTitle">My Watchlist</span>
        <div className="trending">
          {content.map((item, index) => ( 
                <SingleContent
                  key={index}
                  id={item.id}
                  poster={item.poster_path}
                  title={item.title || item.name}
                  date={item.first_air_date || item.release_date}
                  media_type={item.media_type}
                  vote_average={item.vote_average}
                />
              ))}
        </div>
        </div>
        </div>
    );
};

export default Watchlist;