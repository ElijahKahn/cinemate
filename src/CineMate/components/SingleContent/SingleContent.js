import React from "react";
import "./SingleContent.css";
import { img_300, unavailable } from "../../config/config";
import { AxiosBasicCredentials } from "axios";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

function SingleContent({ id, poster, title, date, media_type, vote_average, renderRemoveButton }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const detailsPath = `${currentPath}/Details/${media_type}/${id}`;


  const getRatingColor = () => {
    return vote_average > 6 ? "green" : "red";
  };


  return (
    <Link to={detailsPath} className="media-button">
    <div className="media">
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
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

      {/* <button
        onClick={addToWatchlist}
        className="btn btn-light button-container"
      >
        {isAddedToWatchlist ? <RemoveIcon /> : <AddIcon />}
      </button> */}
      {renderRemoveButton && renderRemoveButton()}
    </div>
    </Link>
  );
}

export default SingleContent;
