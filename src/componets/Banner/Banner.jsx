import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import { API_KEY, imageUrl } from "../../Constants/Constance";
import axios from "../../axios";
import { PopUpContext } from "../../Context/moviePopUpContext";
import StarRatings from "react-star-ratings";
import MoviePopUp from "../RowPost/MoviePopUp";
import usePlayMovie from "../../CustomHooks/usePlayMovie";

function Banner({ url }) {
  const { showModal, setShowModal } = useContext(PopUpContext);
  const { playMovie } = usePlayMovie();

  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [moviePopupInfo, setMoviePopupInfo] = useState({});
  const [urlId, setUrlId] = useState("");
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayIntervalRef = useRef(null);

  function getWindowSize() {
    const { innerWidth } = window;
    return { width: innerWidth };
  }

  // Fetch movies for the banner
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        // Get top 5 movies with backdrop images
        const filteredMovies = response.data.results
          .filter(movie => movie.backdrop_path)
          .slice(0, 5);
        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching banner movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    const handleWindowResize = () => setWindowSize(getWindowSize());
    window.addEventListener('resize', handleWindowResize);
    
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [url]);

  // Set up autoplay for banner carousel
  useEffect(() => {
    if (movies.length > 1) {
      autoplayIntervalRef.current = setInterval(() => {
        goToNextMovie();
      }, 8000); // Change movie every 8 seconds
    }
    
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [movies, currentMovieIndex]);

  const goToNextMovie = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex((prevIndex) => 
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 500); // Match this with CSS transition duration
  }, [movies.length]);

  const goToPrevMovie = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex((prevIndex) => 
        prevIndex === 0 ? movies.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500); // Match this with CSS transition duration
  }, [movies.length]);

  const handleMoviePopup = async (movieInfo) => {
    setMoviePopupInfo(movieInfo);
    setShowModal(true);

    try {
      const response = await axios.get(
        `/movie/${movieInfo.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      
      if (response.data.results.length > 0) {
        setUrlId(response.data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  // Premium gradient overlay for banner
  const bannerGradient = `linear-gradient(90deg, 
    rgba(0, 0, 0, 0.95) 0%, 
    rgba(0, 0, 0, 0.7) 25%, 
    rgba(0, 0, 0, 0.4) 50%, 
    rgba(0, 0, 0, 0.3) 75%, 
    rgba(0, 0, 0, 0.2) 100%)`;

  const currentMovie = movies[currentMovieIndex];

  return (
    <>
      <div className="relative h-screen max-h-[70vh] lg:max-h-[80vh] xl:max-h-[85vh] bg-black flex items-end overflow-hidden">
        {/* Background image with transition effect */}
        {!isLoading && movies.length > 0 && (
          <div 
            style={{
              backgroundImage: `${bannerGradient}, url(${imageUrl + currentMovie.backdrop_path})`,
              backgroundPosition: "center top",
              backgroundSize: "cover",
            }}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          ></div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
        
        {/* Navigation buttons */}
        {movies.length > 1 && (
          <>
            <button 
              onClick={goToPrevMovie}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Previous movie"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={goToNextMovie}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Next movie"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Indicator dots */}
        {movies.length > 1 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentMovieIndex(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentMovieIndex === index 
                    ? 'bg-red-600 w-6' 
                    : 'bg-gray-400/70 hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
          <div key={currentMovieIndex} className="max-w-3xl">
            {!isLoading && currentMovie ? (
              <>
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 border-l-4 pl-4 border-red-600">
                  {currentMovie.title || currentMovie.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  {currentMovie.vote_average && (
                    <div className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <StarRatings
                        rating={currentMovie.vote_average / 2}
                        starRatedColor="#e11d48"
                        numberOfStars={5}
                        name="rating"
                        starDimension="18px"
                        starSpacing="2px"
                      />
                      <span className="ml-2 text-white font-medium text-sm">
                        {currentMovie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}
                  
                  {(currentMovie.release_date || currentMovie.first_air_date) && (
                    <span className="text-gray-200 text-sm font-medium px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                      {new Date(currentMovie.release_date || currentMovie.first_air_date).getFullYear()}
                    </span>
                  )}
                  
                  <span className="text-white px-3 py-1 text-sm font-medium bg-red-600/90 rounded-full">
                    Premium
                  </span>
                </div>

                <p className="text-gray-200 text-base md:text-lg mb-8 line-clamp-3 max-w-2xl">
                  {currentMovie.overview}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => playMovie(currentMovie)}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Play Now
                  </button>
                  <button
                    onClick={() => handleMoviePopup(currentMovie)}
                    className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white font-medium flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    More Info
                  </button>
                </div>
              </>
            ) : (
              <LoadingBannerContent />
            )}
          </div>
        </div>
      </div>

      {showModal && <MoviePopUp data1={moviePopupInfo} data2={urlId} />}
    </>
  );
}

// Separated loading state component for cleaner code
const LoadingBannerContent = () => (
  <>
    <div className="animate-pulse bg-gray-800 h-12 w-3/4 mb-6 rounded-md"></div>
    <div className="flex space-x-4 mb-6">
      <div className="animate-pulse bg-gray-800 h-8 w-32 rounded-full"></div>
      <div className="animate-pulse bg-gray-800 h-8 w-24 rounded-full"></div>
    </div>
    <div className="space-y-3 mb-8">
      <div className="animate-pulse bg-gray-800 h-4 w-full rounded-md"></div>
      <div className="animate-pulse bg-gray-800 h-4 w-5/6 rounded-md"></div>
      <div className="animate-pulse bg-gray-800 h-4 w-4/6 rounded-md"></div>
    </div>
    <div className="flex space-x-4">
      <div className="animate-pulse bg-gray-800 h-12 w-32 rounded-lg"></div>
      <div className="animate-pulse bg-gray-800 h-12 w-32 rounded-lg"></div>
    </div>
  </>
);

export default Banner;