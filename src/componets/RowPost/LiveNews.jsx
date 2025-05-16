import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import logoo from "../../images/GoogleLogo.png"

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

function LiveNews() {
    // News channel data without color codes
    const newsSources = [
        { id: 1, name: "Zee News", link: "https://zeenews.india.com/", logo: logoo },
        { id: 2, name: "Aaj Tak", link: "https://www.aajtak.in/", logo: "/assets/news/aaj-tak.jpg" },
        { id: 3, name: "TV9 Bharatvarsh", link: "https://www.tv9hindi.com/", logo: "/assets/news/tv9-bharatvarsh.jpg" },
        { id: 4, name: "India Today", link: "https://www.indiatoday.in/", logo: "/assets/news/india-today.jpg" },
        { id: 5, name: "Zee Business", link: "https://www.zeebiz.com/", logo: "/assets/news/zee-business.jpg" },
        { id: 6, name: "Zee 24 Taas", link: "https://www.zee24taas.com/", logo: "/assets/news/zee-24-taas.jpg" },
        { id: 7, name: "TV9 Marathi", link: "https://www.tv9marathi.com/", logo: "/assets/news/tv9-marathi.jpg" },
        { id: 8, name: "Zee News Telugu", link: "https://zeenews.india.com/telugu", logo: "/assets/news/zee-news-telugu.jpg" },
        { id: 9, name: "TV9 Telugu", link: "https://tv9telugu.com/", logo: "/assets/news/tv9-telugu.jpg" },
        { id: 10, name: "Zee News Kannada", link: "https://zeenews.india.com/kannada", logo: "/assets/news/zee-news-kannada.jpg" },
        { id: 11, name: "TV9 Kannada", link: "https://tv9kannada.com/", logo: "/assets/news/tv9-kannada.jpg" },
        { id: 12, name: "Zee 24 Ghanta", link: "https://www.zee24ghanta.com/", logo: "/assets/news/zee-24-ghanta.jpg" },
        { id: 13, name: "Zee Bharat", link: "https://zeebharat.com/", logo: "/assets/news/zee-bharat.jpg" },
        { id: 14, name: "WION", link: "https://www.wionews.com/", logo: "/assets/news/wion.jpg" }
    ];

    const getChannelInitials = (name) => name.split(' ').map(word => word.charAt(0)).join('');

    return (
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-6 px-4 rounded-xl shadow-xl border border-gray-800">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/api/placeholder/1200/400')] opacity-5 rounded-xl"></div>

            {/* Header */}
            <div className="relative flex justify-between items-center mb-6 px-2">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="h-3 w-3 bg-red-600 rounded-full"></div>
                        <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Live Breaking News</h2>
                </div>

                <a href="#" className="group flex items-center text-red-500 hover:text-red-400 font-medium transition-all duration-300">
                    <span>More</span>
                    <span className="ml-1 text-lg transform group-hover:translate-x-1 transition-transform duration-300">›</span>
                </a>
            </div>

            {/* Swiper */}
            <div className="relative">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={12}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        320: { slidesPerView: 3, spaceBetween: 8 },
                        480: { slidesPerView: 4, spaceBetween: 10 },
                        640: { slidesPerView: 5, spaceBetween: 12 },
                        768: { slidesPerView: 6, spaceBetween: 12 },
                        1024: { slidesPerView: 8, spaceBetween: 14 },
                        1280: { slidesPerView: 10, spaceBetween: 16 }
                    }}
                    className="px-2 py-2"
                >
                    {newsSources.map((source) => (
                        <SwiperSlide key={source.id}>
                            <a
                                href={source.link}
                                className="block group"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 border border-gray-700 hover:border-red-500/30">
                                    <div className="aspect-square relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent z-10"></div>
                                        <img
                                            src={source.logo}
                                            alt={source.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                // If image fails to load, show initials with a background color
                                                e.target.style.display = 'none';
                                                const parent = e.target.parentNode;
                                                const fallback = document.createElement('div');
                                                fallback.className = 'w-full h-full flex items-center justify-center text-white text-2xl font-bold bg-gray-600';
                                                fallback.textContent = getChannelInitials(source.name);
                                                parent.appendChild(fallback);
                                            }}
                                        />
                                    </div>
                                    <div className="p-2 bg-gradient-to-b from-gray-800 to-gray-900">
                                        <p className="text-white text-xs font-medium text-center truncate group-hover:text-red-400 transition-colors duration-300">
                                            {source.name}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation buttons */}
                <button className="swiper-button-prev hidden md:flex items-center justify-center absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg before:content-[''] after:content-['']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button className="swiper-button-next hidden md:flex items-center justify-center absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg before:content-[''] after:content-['']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Subtle background decorations */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-0 left-20 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl"></div>
        </div>
    );
}

export default LiveNews;