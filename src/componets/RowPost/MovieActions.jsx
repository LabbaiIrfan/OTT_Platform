import React from "react";
import PlayButton from "./PlayButton";
import LikeButton from "./LikeButton";

function MovieActions({ PopupInfo, from, actions }) {
    return (
        <div className="flex ml-4 items-center -mt-14">
            <PlayButton PopupInfo={PopupInfo} actions={actions} />
            <LikeButton PopupInfo={PopupInfo} from={from} actions={actions} />
        </div>
    );
}

export default MovieActions;