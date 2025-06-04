import React from "react";
import { imageUrl } from "../../Constants/Constance";

function MovieImage({ PopupInfo }) {
    return (
        <>
            {PopupInfo.backdrop_path ? (
                <img src={`${imageUrl + PopupInfo.backdrop_path}`} alt="Movie backdrop" />
            ) : null}
        </>
    );
}

export default MovieImage;