import React from "react";
import StarRatings from "react-star-ratings";
import { imageUrl, imageUrl2 } from "../../Constants/Constance";

const MovieCard = ({
    movie,
    islarge,
    movieData,
    playMovie,
    addToMyList,
    removeFromWatchedMovies,
    addToLikedMovies,
    convertGenere,
    handleMoviePopup,
    shouldPop,
    setshouldPop
}) => {
    const converted = convertGenere(movie.genre_ids);

    return (
        <>
            {islarge ? (
                <>
                    <img
                        className="rounded-sm"
                        src={`${imageUrl + movie.poster_path}`}
                    />
                </>
            ) : (
                <>
                    <img
                        loading="lazy"
                        className={
                            movieData != null
                                ? "border-b-4 border-red-700 rounded-sm"
                                : "rounded-sm"
                        }
                        src={
                            movie.backdrop_path
                                ? `${imageUrl2 + movie.backdrop_path}`
                                : "https://i.ytimg.com/vi/Mwf--eGs05U/maxresdefault.jpg"
                        }
                        onClick={() => handleMoviePopup(movie)}
                    />
                </>
            )}
            <div className="content pt-16">
                <div className="flex transition ml-3 ease-in-out delay-150">
                    <div
                        onClick={() => playMovie(movie)}
                        onMouseEnter={() => setshouldPop(false)}
                        onMouseLeave={() => setshouldPop(true)}
                        className="text-white w-9 h-9 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[2px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            />
                        </svg>
                    </div>

                    {movieData != null ? (
                        <>
                            <div
                                onClick={() => removeFromWatchedMovies(movie)}
                                onMouseEnter={() => setshouldPop(false)}
                                onMouseLeave={() => setshouldPop(true)}
                                className="text-white w-9 h-9 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 12h-15"
                                    />
                                </svg>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                onClick={() => addToMyList(movie)}
                                onMouseEnter={() => setshouldPop(false)}
                                onMouseLeave={() => setshouldPop(true)}
                                className="text-white w-9 h-9 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                            </div>
                        </>
                    )}

                    <div
                        onClick={() => addToLikedMovies(movie)}
                        onMouseEnter={() => setshouldPop(false)}
                        onMouseLeave={() => setshouldPop(true)}
                        className="text-white w-9 h-9 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                            />
                        </svg>
                    </div>

                    <div
                        onClick={() => handleMoviePopup(movie)}
                        className="text-white w-9 h-9 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="text-shadow-xl"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-white ml-4 font-medium w-4/5 xl:line-clamp-1">
                    {movie.name || movie.title}
                </h1>

                <h1 className="text-white text-xs font-semibold ml-4 w-11/12">
                    {movie.release_date ||
                        (movie.first_air_date && movie.release_date) ||
                        movie.first_air_date}
                </h1>

                <div className="ml-4">
                    <StarRatings
                        rating={movie.vote_average / 2}
                        starRatedColor="red"
                        numberOfStars={5}
                        name="rating"
                        starDimension="0.8rem"
                        starSpacing="0.2rem"
                    />
                </div>

                {converted &&
                    converted.map((genre) => {
                        return (
                            <span className="hidden text-white ml-4 font-thin text-xs lg:inline">
                                {genre}
                            </span>
                        );
                    })}
            </div>
        </>
    );
};

export default MovieCard;