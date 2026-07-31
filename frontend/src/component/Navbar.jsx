import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

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
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#121212]/80 backdrop-blur-2xl border border-white/10 py-5 px-4 rounded-b-2xl shadow-2xl">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 mr-6 group"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-red-600 to-red-400 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300" />

          <span className="text-2xl font-black tracking-tighter text-white">
            MOVIE<span className="text-red-600">MASTI</span>
          </span>
        </Link>

        {/* Navigation Links */}
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
      <div className="flex items-center gap-4">

        <Link
          to="/login"
          className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          Sign In
        </Link>

        <Link
          to="/movies"
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95"
        >
          WATCH NOW
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;