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
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayIntervalRef = useRef(null);

  // Fetch movies for the banner
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        const filteredMovies = data.results
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
    
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [url]);

  // Autoplay carousel
  useEffect(() => {
    if (movies.length <= 1) return;
    
    autoplayIntervalRef.current = setInterval(() => {
      goToNextMovie();
    }, 6000);
    
    return () => clearInterval(autoplayIntervalRef.current);
  }, [movies.length, currentMovieIndex]);

  const transitionToSlide = useCallback((targetIndex) => {
    if (targetIndex === currentMovieIndex) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex(targetIndex);
      setIsTransitioning(false);
    }, 300);
  }, [currentMovieIndex]);

  const goToNextMovie = useCallback(() => {
    const nextIndex = currentMovieIndex === movies.length - 1 ? 0 : currentMovieIndex + 1;
    transitionToSlide(nextIndex);
  }, [currentMovieIndex, movies.length, transitionToSlide]);

  const goToPrevMovie = useCallback(() => {
    const prevIndex = currentMovieIndex === 0 ? movies.length - 1 : currentMovieIndex - 1;
    transitionToSlide(prevIndex);
  }, [currentMovieIndex, movies.length, transitionToSlide]);

  const handleMoviePopup = async (movieInfo) => {
    setMoviePopupInfo(movieInfo);
    setShowModal(true);

    try {
      const { data } = await axios.get(
        `/movie/${movieInfo.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      
      if (data.results.length > 0) {
        setUrlId(data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  const bannerGradient = `linear-gradient(90deg, 
    rgba(0, 0, 0, 0.95) 0%, 
    rgba(0, 0, 0, 0.7) 25%, 
    rgba(0, 0, 0, 0.4) 50%, 
    rgba(0, 0, 0, 0.3) 75%, 
    rgba(0, 0, 0, 0.2) 100%)`;

  const currentMovie = movies[currentMovieIndex];

  if (isLoading) {
    return (
      <div className="relative h-screen max-h-[70vh] lg:max-h-[80vh] xl:max-h-[85vh] bg-black flex items-end">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
          <div className="max-w-3xl">
            <LoadingBannerContent />
          </div>
        </div>
      </div>
    );
  }

  if (!movies.length) return null;

  return (
    <>
      <div className="relative h-screen max-h-[70vh] lg:max-h-[80vh] xl:max-h-[85vh] bg-black flex items-end overflow-hidden">
        {/* Background image */}
        <div 
          style={{
            backgroundImage: `${bannerGradient}, url(${imageUrl + currentMovie.backdrop_path})`,
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        
        {/* Navigation Controls */}
        {movies.length > 1 && (
          <NavigationControls 
            onPrev={goToPrevMovie}
            onNext={goToNextMovie}
          />
        )}
        
        {/* Enhanced Indicator Dots */}
        {movies.length > 1 && (
          <IndicatorDots 
            movies={movies}
            currentIndex={currentMovieIndex}
            onSelect={transitionToSlide}
          />
        )}
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
          <div className="max-w-3xl">
            <MovieContent 
              movie={currentMovie}
              onPlay={() => playMovie(currentMovie)}
              onMoreInfo={() => handleMoviePopup(currentMovie)}
            />
          </div>
        </div>
      </div>

      {showModal && <MoviePopUp data1={moviePopupInfo} data2={urlId} />}
    </>
  );
}

// Enhanced Indicator Dots Component
const IndicatorDots = ({ movies, currentIndex, onSelect }) => (
  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
    <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2">
      {movies.map((movie, index) => (
        <button
          key={movie.id || index}
          onClick={() => onSelect(index)}
          className={`relative transition-all duration-300 ease-out group ${
            currentIndex === index 
              ? 'w-8 h-3' 
              : 'w-3 h-3 hover:w-4'
          }`}
          aria-label={`Go to ${movie.title || movie.name}`}
        >
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            currentIndex === index
              ? 'bg-red-600 shadow-lg shadow-red-600/40'
              : 'bg-white/40 group-hover:bg-white/60'
          }`} />
          
          {/* Active indicator enhancement */}
          {currentIndex === index && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-red-700 animate-pulse" />
          )}
          
          {/* Progress bar for active slide */}
          {currentIndex === index && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="h-full bg-white/30 rounded-full animate-[progress_8s_linear_infinite]" />
            </div>
          )}
        </button>
      ))}
    </div>
    
    {/* Movie title preview on hover */}
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
        {movies[currentIndex]?.title || movies[currentIndex]?.name}
      </div>
    </div>
  </div>
);

// Navigation Controls Component
const NavigationControls = ({ onPrev, onNext }) => (
  <>
    <button 
      onClick={onPrev}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
      aria-label="Previous movie"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button 
      onClick={onNext}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
      aria-label="Next movie"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </>
);

// Movie Content Component
const MovieContent = ({ movie, onPlay, onMoreInfo }) => (
  <div className="animate-fadeIn">
    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 border-l-4 pl-4 border-red-600">
      {movie.title || movie.name}
    </h1>
    
    <div className="flex items-center space-x-4 mb-4">
      {movie.vote_average && (
        <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
          <StarRatings
            rating={movie.vote_average / 2}
            starRatedColor="#e11d48"
            numberOfStars={5}
            name="rating"
            starDimension="18px"
            starSpacing="2px"
          />
          <span className="ml-2 text-white font-medium text-sm">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      )}
      
      {(movie.release_date || movie.first_air_date) && (
        <span className="text-gray-200 text-sm font-medium px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full">
          {new Date(movie.release_date || movie.first_air_date).getFullYear()}
        </span>
      )}
      
      <span className="text-white px-3 py-1 text-sm font-medium bg-red-600/90 rounded-full">
        Premium
      </span>
    </div>

    <p className="text-gray-200 text-base md:text-lg mb-8 line-clamp-3 max-w-2xl">
      {movie.overview}
    </p>

    <div className="flex flex-wrap gap-4">
      <button
        onClick={onPlay}
        className="bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        Play Now
      </button>
      <button
        onClick={onMoreInfo}
        className="bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/80 text-white font-medium flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        More Info
      </button>
    </div>
  </div>
);

// Loading Component
const LoadingBannerContent = () => (
  <div className="animate-pulse">
    <div className="bg-gray-800 h-12 w-3/4 mb-6 rounded-md" />
    <div className="flex space-x-4 mb-6">
      <div className="bg-gray-800 h-8 w-32 rounded-full" />
      <div className="bg-gray-800 h-8 w-24 rounded-full" />
    </div>
    <div className="space-y-3 mb-8">
      <div className="bg-gray-800 h-4 w-full rounded-md" />
      <div className="bg-gray-800 h-4 w-5/6 rounded-md" />
      <div className="bg-gray-800 h-4 w-4/6 rounded-md" />
    </div>
    <div className="flex space-x-4">
      <div className="bg-gray-800 h-12 w-32 rounded-lg" />
      <div className="bg-gray-800 h-12 w-32 rounded-lg" />
    </div>
  </div>
);

export default Banner;