import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  const heroMovies = data ? data.slice(0, 5) : [];

  const settings = {
    dots: true,
    infinite: heroMovies.length > 1,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <ul className="flex items-center justify-center gap-2 m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <button
        type="button"
        className="w-2 h-2 rounded-full transition-all duration-300"
        aria-label="Go to slide"
      />
    ),
  };

  return (
    <header className="w-full max-w-[1440px] mx-auto px-4 md:px-10 pt-20 md:pt-28">
      {/* Hero Slider Stage */}
      <section className="relative group">
        {/* Ambient Glow behind the slider */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
        
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0c0c0d] shadow-2xl">
          {/* Top & Bottom Vignette Overlays for the Slider */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10 pointer-events-none" />
          
          {/* "Featured" Badge */}
          <div className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90">
              Featured Release
            </span>
          </div>

          {heroMovies.length > 0 ? (
            <Slider {...settings} className="hero-slider">
              {heroMovies.map((movie) => (
                <div key={movie._id} className="relative w-full focus:outline-none">
                  {/* Ambient Blurred Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center scale-110 blur-[80px] opacity-25 pointer-events-none"
                    style={{ backgroundImage: `url(${movie.image})` }}
                  />
                  
                  {/* Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0d] via-[#0c0c0d]/80 to-transparent z-10 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0d]/50 via-[#0c0c0d]/90 to-[#0c0c0d] z-10 md:hidden" />
                  
                  {/* Slide Content */}
                  <div className="relative z-20 w-full min-h-[480px] md:h-[550px] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-16 px-6 md:px-16 py-14 md:py-16">
                    
                    {/* Left Side: Metadata & Action (Order 2 on mobile, 1 on desktop) */}
                    <div className="order-2 md:order-1 flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6 max-w-2xl">
                      
                      {/* Year & Genre */}
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black tracking-[0.2em] px-2.5 py-1 bg-red-600 text-white rounded-md uppercase shadow-lg shadow-red-600/30">
                          {movie.year}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                        <span className="text-xs font-bold text-white/60 tracking-wider">
                          {movie.genre?.name || "Featured Cinema"}
                        </span>
                      </div>

                      {/* Movie Title */}
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                        {movie.name}
                      </h1>

                      {/* Description */}
                      <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed max-w-xl line-clamp-3 md:line-clamp-4">
                        {movie.detail}
                      </p>

                      {/* CTAs */}
                      <div className="flex items-center gap-4 pt-2 w-full justify-center md:justify-start">
                        <Link
                          to={`/movies/${movie._id}`}
                          className="
                            flex items-center gap-2
                            px-6 md:px-8 py-3
                            bg-red-600 text-white
                            font-bold text-[10px] md:text-xs uppercase tracking-widest
                            rounded-full
                            transition-all duration-300
                            hover:bg-red-700
                            hover:scale-105
                            active:scale-95
                            shadow-[0_10px_20px_rgba(220,38,38,0.3)]
                          "
                        >
                          <Play size={14} fill="currentColor" />
                          Watch Now
                        </Link>

                        <Link
                          to={`/movies/${movie._id}`}
                          className="
                            flex items-center gap-2
                            px-6 py-3
                            bg-white/10 text-white border border-white/10
                            font-bold text-[10px] md:text-xs uppercase tracking-widest
                            rounded-full
                            transition-all duration-300
                            hover:bg-white/20
                            hover:scale-105
                            active:scale-95
                            backdrop-blur-md
                          "
                        >
                          <Info size={14} />
                          Details
                        </Link>
                      </div>
                    </div>

                    {/* Right Side: Floating Poster (Order 1 on mobile, 2 on desktop) */}
                    <div className="order-1 md:order-2 relative w-[130px] sm:w-[170px] md:w-[240px] aspect-[2/3] flex-shrink-0 md:mr-4 select-none mt-8 md:mt-0">
                      {/* Ambient glow behind the poster */}
                      <div 
                        className="absolute -inset-2 bg-cover bg-center rounded-2xl blur-xl opacity-40 scale-105"
                        style={{ backgroundImage: `url(${movie.image})` }}
                      />
                      <img
                        src={movie.image}
                        alt={movie.name}
                        className="
                          relative z-10 w-full h-full object-cover
                          rounded-2xl border border-white/10
                          shadow-[0_20px_50px_rgba(0,0,0,0.8)]
                          transition-transform duration-500
                          hover:scale-[1.02]
                        "
                      />
                    </div>

                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="h-[350px] md:h-[450px] flex items-center justify-center text-gray-500">
              Loading featured masterpieces...
            </div>
          )}
        </div>
      </section>

      {/* Custom styles for Hero Slider indicator dots */}
      <style>{`
        .hero-slider .slick-dots {
          position: absolute;
          bottom: 20px;
          margin: 0;
        }

        .hero-slider .slick-dots li {
          width: auto;
          height: auto;
          margin: 0 4px;
        }

        .hero-slider .slick-dots li button {
          width: 8px;
          height: 8px;
          padding: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          transition: all 0.3s ease;
        }

        .hero-slider .slick-dots li button::before {
          display: none;
        }

        .hero-slider .slick-dots li.slick-active button {
          width: 24px;
          background: #dc2626;
        }
      `}</style>
    </header>
  );
};

export default Header;