import { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutApiCall] = useLogoutMutation();

  // Hide the dock on Admin pages to avoid UI clashing with the Sidebar
  if (location.pathname.includes("/admin")) return null;

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-fit ">
      {/* Container with Blur Effect */}
      <nav className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-6">
        
        {/* Navigation Section */}
        <div className="flex items-center gap-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 mr-6 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-red-600 to-red-400 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            <span className="text-2xl font-black tracking-tighter text-white">
              MOVIE<span className="text-red-600">MASTI</span>
            </span>
          </Link>
          <Link
            to="/"
            className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 ${
              location.pathname === "/" ? "text-teal-400" : "text-gray-400"
            }`}
            title="Home"
          >
            <AiOutlineHome size={24} />
          </Link>

          <Link
            to="/movies"
            className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 ${
              location.pathname === "/movies" ? "text-teal-400" : "text-gray-400"
            }`}
            title="Movies"
          >
            <MdOutlineLocalMovies size={24} />
          </Link>

          <Link
            to="/watchlist"
            className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 ${
              location.pathname === "/watchlist" ? "text-teal-400" : "text-gray-400"
            }`}
            title="Watchlist"
          >
            <AiOutlineHeart size={24} />
          </Link>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-white/10" />

        {/* User / Auth Section */}
        <div className="relative">
          {userInfo ? (
            <div className="flex items-center">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 group focus:outline-none"
              >
                <span className="text-white text-sm font-bold tracking-wide group-hover:text-teal-400 transition-colors">
                  {userInfo.username}
                </span>
                <svg
                  className={`h-4 w-4 transition-transform duration-300 text-gray-500 ${
                    dropdownOpen ? "rotate-180 text-teal-400" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Upward Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute bottom-full right-0 mb-4 w-48 bg-[#161616] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-1 animate-in fade-in slide-in-from-bottom-2">
                  <ul className="flex flex-col">
                    {userInfo.isAdmin && (
                      <li>
                        <Link
                          to="/admin/movies/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-3 text-sm text-gray-400 hover:bg-teal-500/10 hover:text-teal-400 font-medium transition-colors"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white font-medium transition-colors"
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="border-t border-white/5 mt-1">
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 font-bold transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Login"
              >
                <AiOutlineLogin size={24} />
              </Link>
              <Link
                to="/register"
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Register"
              >
                <AiOutlineUserAdd size={24} />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;