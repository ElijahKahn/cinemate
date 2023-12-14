import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "./ModalContainer.css";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 40,
  p: 30,
};

export default function ModalContainer({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

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
        `https://api.themoviedb.org/3/${media_type}/${id}&language=en-US`,
        options
      );
      const responseData = await response.json();
      setContent(responseData);
    } catch (error) {}
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
        `https://api.themoviedb.org/3/${media_type}/${id}/videos&language=en-US`,
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
  }, []);

  return (
    <div>
      <button type="button" className="media" onClick={handleOpen}>
        {children}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
<Box sx={style}>
        {content && (
          <div className="ModalContainer">
            <img
              src={
                content.poster_path
                  ? `${img_500}/${content.poster_path}`
                  : unavailable
              }
              alt={content.name || content.title}
              className="ModalContainer__portrait"
            />
            <Typography variant="h5" component="h2">
              {content.title || content.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content.overview}
            </Typography>
            {video && (
              <div className="ModalContainer__video">
                <YouTubeIcon />
                <a href={`https://www.youtube.com/watch?v=${video}`}>Watch Trailer</a>
              </div>
            )}
          </div>
        )}
      </Box>
      </Modal>
    </div>
  );
}

// const useStyles = styled((theme) => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     width: "90%",
//     height: "80%",
//     backgroundColor: "#39445a",
//     border: "1px solid #282c34",
//     borderRadius: 10,
//     color: "white",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(1, 1, 3),
//   },
// }));

// function ModalContainer ({ children, media_type, id }) {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const [content, setContent] = useState();
//   const [video, setVideo] = useState();

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const fetchData = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmY1NzY2NDA0ZTU0YWMzNDgzZjYxZDBhMWM1ZDdhOSIsInN1YiI6IjY1NmZiZTViMDg1OWI0MDEzOTUzODAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2M0pjPB1EGZmw0B24LvOGHC6s-m5qOukOYon6xsg8A",
//       },
//     };

//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/${media_type}/${id}&language=en-US`,
//         options
//       );
//       const responseData = await response.json();
//       setContent(responseData);
//     } catch (error) {}
//   };

//   const fetchVideo = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmY1NzY2NDA0ZTU0YWMzNDgzZjYxZDBhMWM1ZDdhOSIsInN1YiI6IjY1NmZiZTViMDg1OWI0MDEzOTUzODAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2M0pjPB1EGZmw0B24LvOGHC6s-m5qOukOYon6xsg8A",
//       },
//     };

//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/${media_type}/${id}/videos&language=en-US`,
//         options
//       );
//       const responseData = await response.json();
//       setVideo(responseData.results[0]?.key);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     fetchData();
//     fetchVideo();
//     // eslint-disable-next-line
//   }, []);

//   return (
//     <>
//       <div
//         className="media"
//         style={{ cursor: "pointer" }}
//         color="inherit"
//         onClick={handleOpen}
//       >
//         {children}
//       </div>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         className={classes.modal}
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           {content && (
//             <div className={classes.paper}>
//               <div className="ModalContainer">
//                 <img
//                   src={
//                     content.poster_path
//                       ? `${img_500}/${content.poster_path}`
//                       : unavailable
//                   }
//                   alt={content.name || content.title}
//                   className="ModalContainer__portrait"
//                 />
//                 <img
//                   src={
//                     content.backdrop_path
//                       ? `${img_500}/${content.backdrop_path}`
//                       : unavailableLandscape
//                   }
//                   alt={content.name || content.title}
//                   className="ModalContainer__landscape"
//                 />
//                 <div className="ModalContainer__about">
//                   <span className="ModalContainer__title">
//                     {content.name || content.title} (
//                     {(
//                       content.first_air_date ||
//                       content.release_date ||
//                       "-----"
//                     ).substring(0, 4)}
//                     )
//                   </span>
//                   {content.tagline && (
//                     <i className="tagline">{content.tagline}</i>
//                   )}

//                   <span className="ModalContainer__description">
//                     {content.overview}
//                   </span>
// {/*
//                   <div>
//                     <Carousel id={id} media_type={media_type} />
//                   </div> */}

//                   <Button
//                     variant="contained"
//                     startIcon={<YouTubeIcon />}
//                     color="secondary"
//                     target="__blank"
//                     href={`https://www.youtube.com/watch?v=${video}`}
//                   >
//                     Watch the Trailer
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Fade>
//       </Modal>
//     </>
//   );
// }

// export default ModalContainer;
