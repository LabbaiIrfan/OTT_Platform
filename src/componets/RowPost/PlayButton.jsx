import React from "react";

function PlayButton({ PopupInfo, actions }) {
    return (
        <button
            className="flex items-center justify-center bg-red-800 text-white active:bg-red-800 font-medium sm:font-bold uppercase text-xs px-4 sm:px-6 md:text-sm  py-2 rounded shadow hover:shadow-lg cursor-pointer outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
                actions.setShowModal(false);
                actions.playMovie(PopupInfo);
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1 text-white hover:text-gray-300 ease-linear transition-all duration-150"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                />
            </svg>
            Play
        </button>
    );
}

export default PlayButton;