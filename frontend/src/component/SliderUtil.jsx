import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "../pages/Movies/MovieCard";

const NextArrow = ({ onClick }) => {
  return (
    <button
      type="button"
      aria-label="Next movies"
      onClick={onClick}
      className="
        absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2
        z-20
        w-11 h-11
        flex items-center justify-center
        rounded-full
        bg-black/70
        backdrop-blur-xl
        border border-white/10
        text-white
        shadow-xl
        transition-all duration-300
        hover:bg-teal-500
        hover:border-teal-400
        hover:scale-110
        active:scale-95
      "
    >
      <ChevronRight size={22} />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      type="button"
      aria-label="Previous movies"
      onClick={onClick}
      className="
        absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2
        z-20
        w-11 h-11
        flex items-center justify-center
        rounded-full
        bg-black/70
        backdrop-blur-xl
        border border-white/10
        text-white
        shadow-xl
        transition-all duration-300
        hover:bg-teal-500
        hover:border-teal-400
        hover:scale-110
        active:scale-95
      "
    >
      <ChevronLeft size={22} />
    </button>
  );
};

const SliderUtil = ({ data = [] }) => {
  const itemCount = data.length;

  if (itemCount === 0) {
    return null;
  }

  const settings = {
    dots: itemCount > 1,
    infinite: itemCount > 4,

    speed: 550,
    slidesToScroll: 1,

    slidesToShow: Math.min(itemCount, 4),

    autoplay: itemCount > 2,
    autoplaySpeed: 4500,

    pauseOnHover: true,
    cssEase: "ease-in-out",

    arrows: itemCount > 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(itemCount, 3),
          infinite: itemCount > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(itemCount, 2),
          infinite: itemCount > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: itemCount > 1,
          arrows: false,
          autoplay: itemCount > 1,
        },
      },
    ],

    appendDots: (dots) => (
      <div className="mt-5">
        <ul className="flex items-center justify-center gap-2">
          {dots}
        </ul>
      </div>
    ),

    customPaging: () => (
      <button
        type="button"
        className="
          block
          w-2 h-2
          rounded-full
          bg-white/20
          transition-all duration-300
          hover:bg-teal-400/70
        "
        aria-label="Go to slide"
      />
    ),
  };

  return (
   <div className="relative w-full py-3 px-6 overflow-visible">
      <Slider {...settings} className="movie-slider">
        {data.map((movie) => (
          <div key={movie._id} className="px-1 pb-6">
            <div
              className="
                group
                transition-all duration-300 ease-out
                hover:-translate-y-2
              "
            >
              <div
                className="
                  rounded-2xl
                  transition-all duration-300
                  group-hover:shadow-[0_20px_50px_rgba(20,184,166,0.12)]
                "
              >
                <MovieCard movie={movie} />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        .movie-slider .slick-list {
          margin: 0 -8px;
          padding: 12px 0 10px;
          overflow: visible;
        }

        .movie-slider .slick-track {
          display: flex;
        }

        .movie-slider .slick-slide {
          height: auto;
        }

        .movie-slider .slick-slide > div {
          height: 100%;
        }

        .movie-slider .slick-dots {
          position: static;
          margin: 0;
        }

        .movie-slider .slick-dots li {
          width: auto;
          height: auto;
          margin: 0;
        }

        .movie-slider .slick-dots li button {
          width: auto;
          height: auto;
          padding: 0;
        }

        .movie-slider .slick-dots li button::before {
          display: none;
        }

        .movie-slider .slick-dots li.slick-active button {
          width: 28px;
        }

        .movie-slider .slick-dots li.slick-active button {
          background: #14b8a6;
          border-radius: 9999px;
        }

        @media (max-width: 640px) {
          .movie-slider .slick-list {
            margin: 0 -4px;
          }
        }
      `}</style>
    </div>
  );
};

export default SliderUtil;