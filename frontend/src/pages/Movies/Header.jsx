import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();
  const { pathname } = useLocation();

  // Logic remains identical, styles upgraded for a premium feel
  const linkStyle = (path) => `
    relative px-6 py-2 text-sm font-semibold transition-all duration-500 rounded-full
    ${pathname === path 
      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
      : "text-gray-400 hover:text-white hover:bg-white/5"}
  `;

  return (
    <header className="w-full max-w-[1440px] mx-auto px-4 md:px-10 pt-6">
      {/* Premium Navigation Bar */}
      <nav className="flex items-center justify-between mb-10 bg-[#121212]/50 backdrop-blur-2xl border border-white/10 p-3 rounded-2xl shadow-2xl">
        <div className="flex items-center gap-3">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 mr-6 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-red-600 to-red-400 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            <span className="text-2xl font-black tracking-tighter text-white">
              MOVIE<span className="text-red-600">MASTI</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex gap-1">
            <Link to="/" className={linkStyle("/")}>
              Home
            </Link>
            <Link to="/movies" className={linkStyle("/movies")}>
              Browse Movies
            </Link>
          </div>
        </div>

        {/* Action Button (Optional UI Filler) */}
        <div className="flex items-center gap-4">
            <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                <Link to="/login">
                    Sign In
                </Link>
            </button>
            <Link 
                to="/movies" 
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95"
            >
                WATCH NOW
            </Link>
        </div>
      </nav>

      {/* Hero Slider Stage */}
      <section className="relative group">
        {/* Ambient Glow behind the slider */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
        
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
          {/* Top & Bottom Vignette Overlays for the Slider */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10 pointer-events-none" />
          
          {/* "Featured" Badge logic (Visual only) */}
          <div className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90">
                New Releases
            </span>
          </div>

          {/* Your Original Slider Component */}
          <SliderUtil data={data} />
        </div>
      </section>
    </header>
  );
};

export default Header;