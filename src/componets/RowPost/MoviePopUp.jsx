import React, { useState, useEffect, useContext } from "react";
import { PopUpContext } from "../../Context/moviePopUpContext";
import useUpdateMylist from "../../CustomHooks/useUpdateMylist";
import usePlayMovie from "../../CustomHooks/usePlayMovie";
import useGenereConverter from "../../CustomHooks/useGenereConverter";
import useUpdateLikedMovies from "../../CustomHooks/useUpdateLikedMovies";
import useUpdateWatchedMovies from "../../CustomHooks/useUpdateWatchedMovies";

import MovieHeader from "./MovieHeader";
import MovieImage from "./MovieImage";
import MovieActions from "./MovieActions";
import MovieInfo from "./MovieInfo";
import MovieFooter from "./MovieFooter";

function MoviePopUp(props) {
  const { showModal, setShowModal } = useContext(PopUpContext);
  const { addToMyList, removeFromMyList, PopupMessage } = useUpdateMylist();
  const { addToLikedMovies, removeFromLikedMovies, LikedMoviePopupMessage } = useUpdateLikedMovies();
  const { removeFromWatchedMovies, removePopupMessage } = useUpdateWatchedMovies();
  const { playMovie } = usePlayMovie();
  const { convertGenere } = useGenereConverter();

  const [PopupInfo, setPopupInfo] = useState({});

  useEffect(() => {
    setPopupInfo(props.data1);
  }, []);

  const movieActions = {
    addToMyList,
    removeFromMyList,
    addToLikedMovies,
    removeFromLikedMovies,
    removeFromWatchedMovies,
    playMovie,
    convertGenere,
    setShowModal
  };

  return (
    <>
      {PopupMessage}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mt-24 sm:my-6 mx-4 max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-800 outline-none focus:outline-none">
                <MovieHeader setShowModal={setShowModal} />
                <MovieImage PopupInfo={PopupInfo} />
                <MovieActions 
                  PopupInfo={PopupInfo} 
                  from={props.from}
                  actions={movieActions}
                />
                <MovieInfo PopupInfo={PopupInfo} convertGenere={convertGenere} />
                <MovieFooter 
                  PopupInfo={PopupInfo}
                  from={props.from}
                  actions={movieActions}
                />
              </div>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default MoviePopUp;