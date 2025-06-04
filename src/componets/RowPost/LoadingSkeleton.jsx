import React from "react";

const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="w-72 ml-1 mt-2 sm:ml-0 sm:w-96 py-5 mb-5 xl:py-4 2xl:py-6 xl:w-45rem bg-neutral-900 rounded-md"></div>
            <div className="w-91% md:w-98% ml-1 mb-14 sm:ml-0 py-16 md:py-24  bg-neutral-900 rounded-md"></div>
        </div>
    );
};

export default LoadingSkeleton;