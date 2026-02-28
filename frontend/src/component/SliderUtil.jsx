import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-teal-500 backdrop-blur-md p-2 rounded-full transition-all duration-300 border border-white/10 group"
  >
    <ChevronRight className="text-white group-hover:scale-110" size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-teal-500 backdrop-blur-md p-2 rounded-full transition-all duration-300 border border-white/10 group"
  >
    <ChevronLeft className="text-white group-hover:scale-110" size={24} />
  </button>
);

const SliderUtil = ({ data }) => {
  // 1. Determine the number of items
  const itemCount = data?.length || 0;

  // 2. Dynamic Settings: Adjust slidesToShow and infinite based on itemCount
  const settings = {
    dots: itemCount > 1, // Only show dots if there is more than 1 item
    infinite: itemCount > 4, // Only go infinite if we have more than the slidesToShow count
    speed: 600,
    slidesToShow: Math.min(itemCount, 4), // Never show more slides than we have items
    slidesToScroll: 1,
    nextArrow: itemCount > 1 ? <NextArrow /> : null, // Hide arrows if single item
    prevArrow: itemCount > 1 ? <PrevArrow /> : null,
    autoplay: itemCount > 1,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1280,
        settings: { 
            slidesToShow: Math.min(itemCount, 3),
            infinite: itemCount > 3 
        },
      },
      {
        breakpoint: 1024,
        settings: { 
            slidesToShow: Math.min(itemCount, 2),
            infinite: itemCount > 2 
        },
      },
      {
        breakpoint: 640,
        settings: { 
            slidesToShow: 1, 
            infinite: itemCount > 1, 
            arrows: false 
        },
      },
    ],
    appendDots: (dots) => (
      <div className="mt-8">
        <ul className="flex justify-center gap-1"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-2 h-2 rounded-full bg-white/20 transition-all duration-300 hover:bg-teal-400 active-dot:w-6" />
    ),
  };

  if (itemCount === 0) return null;

  return (
    <div className="relative px-2 py-4">
      <Slider {...settings} className="movie-slider">
        {data.map((movie) => (
          <div key={movie._id} className="px-1 pb-6 outline-none">
            <div className="transition-transform duration-300 hover:-translate-y-2">
              <MovieCard movie={movie} />
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .movie-slider .slick-list {
          overflow: visible;
        }
        .movie-slider .slick-dots li.slick-active div {
          width: 40px;
          background-color: #14b8a6;
        }
        .movie-slider .slick-dots li {
          margin: 0;
          width: auto;
        }
        /* Fix for single items taking up full width instead of repeating */
        .movie-slider .slick-track {
            margin-left: 0;
        }
      `}</style>
    </div>
  );
};

export default SliderUtil;