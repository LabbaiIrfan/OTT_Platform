import React from "react";

function MovieHeader({ setShowModal }) {
    return (
        <button
            className="group p-1 ml-2 mt-2 backdrop-blur-[20px] bg-transparent border-2 border-white hover:bg-white hover:text-black fixed right-4 rounded-full cursor-pointer float-right font-semibold outline-none focus:outline-none ease-linear transition-all duration-150"
            onClick={() => setShowModal(false)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-white w-6 h-6 group-hover:text-black ease-linear transition-all duration-150"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    );
}

export default MovieHeader;