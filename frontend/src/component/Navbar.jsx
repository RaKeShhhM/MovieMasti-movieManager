import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  if (location.pathname.includes("/admin")) return null;

  const linkStyle = (path) => {
    const isActive = location.pathname === path;

    return `
      px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
      ${
        isActive
          ? "bg-white/10 text-white"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }
    `;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#0f0f10]/80 backdrop-blur-2xl border-b border-white/5 py-3.5 md:py-4 px-4 md:px-10 rounded-b-2xl shadow-2xl">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 mr-3 md:mr-6 group"
        >
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-tr from-red-600 to-red-400 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300" />

          <span className="text-lg md:text-2xl font-black tracking-tighter text-white">
            MOVIE<span className="text-red-600">MASTI</span>
          </span>
        </Link>

        {/* Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex gap-1">
          <Link to="/" className={linkStyle("/")}>
            Home
          </Link>

          <Link
            to="/movies"
            className={linkStyle("/movies")}
          >
            Browse Movies
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-4">
        {userInfo ? (
          /* Profile Link when logged in */
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold text-white/90"
          >
            <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-black uppercase text-[10px] shadow-md shadow-red-600/30">
              {userInfo.username[0]}
            </div>
            <span className="hidden sm:inline tracking-wide">{userInfo.username}</span>
          </Link>
        ) : (
          /* Sign In link when logged out */
          <Link
            to="/login"
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors px-1"
          >
            Sign In
          </Link>
        )}

        <Link
          to="/movies"
          className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-[10px] md:text-xs font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-xl transition-all shadow-lg shadow-red-600/20"
        >
          WATCH NOW
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;