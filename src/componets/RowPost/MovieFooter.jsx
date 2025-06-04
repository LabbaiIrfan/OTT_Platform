import React from "react";

function MovieFooter({ PopupInfo, from, actions }) {
    const renderActionButton = () => {
        if (from === "MyList") {
            return (
                <button
                    className="group flex items-center justify-center border-[0.7px] border-white text-white font-medium sm:font-bold text-xs px-4 mr-4 sm:px-6 md:text-sm  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:text-red-700 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => actions.removeFromMyList(PopupInfo)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 mr-1 text-white hover:text-red-700 group-hover:text-red-700 ease-linear transition-all duration-150"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Remove from MyList
                </button>
            );
        }

        if (from === "WatchedMovies") {
            return (
                <button
                    className="group flex items-center justify-center border-[0.7px] border-white text-white font-medium sm:font-bold text-xs px-4 mr-4 sm:px-6 md:text-sm  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:text-red-700 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => actions.removeFromWatchedMovies(PopupInfo)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 mr-1 text-white hover:text-red-700 group-hover:text-red-700 ease-linear transition-all duration-150"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Remove from Watched List
                </button>
            );
        }

        return (
            <button
                className="group flex items-center justify-center border-[0.7px] border-white text-white font-medium sm:font-bold text-xs px-4 mr-4 sm:px-6 md:text-sm  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:text-red-700 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => actions.addToMyList(PopupInfo)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1 text-white hover:text-red-700 group-hover:text-red-700 ease-linear transition-all duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                Add to MyList
            </button>
        );
    };

    return (
        <div className="flex justify-between p-2">
            {renderActionButton()}
            <button
                className="flex items-center text-red-500 background-transparent font-medium sm:font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => actions.setShowModal(false)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                Closing
            </button>
        </div>
    );
}

export default MovieFooter;