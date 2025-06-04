import React from "react";
import StarRatings from "react-star-ratings";

function MovieInfo({ PopupInfo, convertGenere }) {
    return (
        <>
            <div className="p-5 py-4 -mb-6 mt-2 sm:mb-0 sm:mt-0 sm:py-0 sm:pt-6 rounded-t">
                <h3 className="text-3xl font-semibold text-white">
                    {PopupInfo.title || PopupInfo.name}
                </h3>
                <h1 className="text-green-700 font-bold mt-2">
                    {PopupInfo.release_date}
                </h1>
            </div>

            <div className="relative p-4 sm:p-6 flex-auto">
                <div className="bg-neutral-700 h-[0.125rem]"></div>
                <p className="my-4 sm:my-7 text-neutral-400 text-xs md:text-lg leading-relaxed line-clamp-4 sm:line-clamp-none">
                    {PopupInfo.overview}
                </p>
                <div className="bg-neutral-700 h-[0.125rem]"></div>
            </div>

            <div className="sm:flex items-center justify-end p-2 rounded-b">
                <div className="relative p-2 py-5 sm:p-6 flex-auto">
                    <h1 className="flex -mt-4 text-neutral-400 text-sm leading-relaxed">
                        Rating :
                        <div className="ml-2">
                            {PopupInfo.vote_average && (
                                <StarRatings
                                    rating={PopupInfo.vote_average / 2}
                                    starRatedColor="red"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="1rem"
                                    starSpacing="0.2rem"
                                />
                            )}
                        </div>
                    </h1>
                    <h1 className="flex text-neutral-400 text-sm leading-relaxed">
                        Released on :{"  "}
                        <p className="text-white ml-2 font-medium">
                            {PopupInfo.release_date || PopupInfo.first_air_date}
                        </p>
                    </h1>
                    <h1 className="flex text-neutral-400 text-sm leading-relaxed">
                        Language :
                        <p className="text-white ml-2 font-medium">
                            {PopupInfo.original_language}
                        </p>
                    </h1>
                    <h1 className="flex text-neutral-400 text-sm leading-relaxed">
                        Genere :
                        {PopupInfo.genre_ids &&
                            convertGenere(PopupInfo.genre_ids).map((genere) => {
                                return (
                                    <span className="text-white ml-2 font-medium" key={genere}>
                                        {genere}
                                    </span>
                                );
                            })}
                    </h1>
                </div>
            </div>
        </>
    );
}

export default MovieInfo;