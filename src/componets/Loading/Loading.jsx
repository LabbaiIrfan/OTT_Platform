import React from "react";
import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div className="w-full h-screen bg-black flex flex-col justify-center items-center gap-6">
      <ClipLoader color="#FF3E3E" size={120} speedMultiplier={1.5} />
      <h1 className="text-white text-2xl md:text-3xl font-semibold animate-pulse tracking-wide">
        Loading your experience...
      </h1>
    </div>
  );
}

export default Loading;
