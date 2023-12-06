import React from 'react';
import "./SingleContent.css";
import { img_300, unavailable } from '../../config/config';
import { AxiosBasicCredentials } from 'axios';


function SingleContent({ id, poster, title, date, media_type, vote_average }) {
  const getRatingColor = () => {
    return vote_average > 6 ? "green" : "red";
  };

  return (
    // <ModalContainer media_type={media_type} id={id}>
    
    <div className='media'>
        <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
      </div>

    // </ModalContainer>
  );
}

export default SingleContent;

