// Swiper configuration settings
export const swiperSettings = {
    breakpoints: {
        1800: { slidesPerView: 6.1, slidesPerGroup: 5 },
        1690: { slidesPerView: 5.5, slidesPerGroup: 5 },
        1536: { slidesPerView: 5, slidesPerGroup: 5 },
        1280: { slidesPerView: 4.3, slidesPerGroup: 4 },
        768: { slidesPerView: 3.3, slidesPerGroup: 3 },
        625: { slidesPerView: 3.1, slidesPerGroup: 3 },
        330: { slidesPerView: 2.1, slidesPerGroup: 2 },
        0: { slidesPerView: 2, slidesPerGroup: 2 },
    },
};

// YouTube player configuration
export const youtubeOpts = {
    width: "100%",
    height: "auto",
    playerVars: {
        autoplay: 1,
        controls: 0,
    },
    modestbranding: 1,
    rel: 0,
    autohide: 1,
    showinfo: 0,
};