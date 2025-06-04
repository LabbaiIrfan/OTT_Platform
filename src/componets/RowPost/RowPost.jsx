import React from "react";
import { useEffect, useState } from "react";

import axios from "../../axios";
import { imageUrl, imageUrl2, API_KEY } from "../../Constants/Constance";
import useUpdateMylist from "../../CustomHooks/useUpdateMylist";
import usePlayMovie from "../../CustomHooks/usePlayMovie";
import useUpdateWatchedMovies from "../../CustomHooks/useUpdateWatchedMovies";
import useUpdateLikedMovies from "../../CustomHooks/useUpdateLikedMovies";
import useGenereConverter from "../../CustomHooks/useGenereConverter";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./RowPostStyles.scss";

import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import LoadingSkeleton from "./LoadingSkeleton";
import { swiperSettings, youtubeOpts } from "./movieConfig";

function RowPost(props) {
  const { addToMyList, PopupMessage } = useUpdateMylist();
  const { playMovie } = usePlayMovie();
  const { removeFromWatchedMovies, removePopupMessage } = useUpdateWatchedMovies();
  const { addToLikedMovies, LikedMoviePopupMessage } = useUpdateLikedMovies();
  const { convertGenere } = useGenereConverter();

  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [moviePopupInfo, setMoviePopupInfo] = useState({});
  const [shouldPop, setshouldPop] = useState(true);
  const [urlId, setUrlId] = useState("");

  useEffect(() => {
    if (props.movieData != null) {
      setMovies(props.movieData);
    } else {
      axios.get(props.url).then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      });
    }
  }, []);

  const handleMoviePopup = (movieInfo) => {
    if (shouldPop) {
      setMoviePopupInfo(movieInfo);
      setShowModal(true);
      axios
        .get(`/movie/${movieInfo.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((responce) => {
          console.log(responce.data);
          if (responce.data.results.length !== 0) {
            setUrlId(responce.data.results[0]);
          } else {
            console.log("Array Emptey");
          }
        });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="ml-2 lg:ml-11 mb-11 lg:mb-4 RowContainer"
      style={{ marginTop: `${props.first ? "-8rem" : ""}` }}
    >
      {PopupMessage}
      {removePopupMessage}

      {movies[0] ? (
        <>
          <h1 className="text-white pb-4 xl:pb-0 font-normal text-base sm:text-2xl md:text-4xl">
            {props.title}
          </h1>

          <Swiper
            {...swiperSettings}
            modules={[Navigation, Pagination]}
            spaceBetween={8}
            slidesPerView={6.1}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="SwiperStyle"
          >
            {movies.map((obj, index) => (
              <SwiperSlide
                key={index}
                className={props.islarge ? "large" : "bg-cover"}
                onClick={() => handleMoviePopup(obj)}
              >
                <MovieCard
                  movie={obj}
                  islarge={props.islarge}
                  movieData={props.movieData}
                  playMovie={playMovie}
                  addToMyList={addToMyList}
                  removeFromWatchedMovies={removeFromWatchedMovies}
                  addToLikedMovies={addToLikedMovies}
                  convertGenere={convertGenere}
                  handleMoviePopup={handleMoviePopup}
                  shouldPop={shouldPop}
                  setshouldPop={setshouldPop}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <LoadingSkeleton />
      )}

      {showModal && (
        <MovieModal
          moviePopupInfo={moviePopupInfo}
          urlId={urlId}
          showModal={showModal}
          onClose={handleCloseModal}
          playMovie={playMovie}
          addToMyList={addToMyList}
          addToLikedMovies={addToLikedMovies}
          convertGenere={convertGenere}
        />
      )}
    </div>
  );
}

export default RowPost;