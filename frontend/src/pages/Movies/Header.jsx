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