import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectWatchlist } from "../../redux/features/watchlist/watchlistSlice";
import MovieCard from "./MovieCard";
import { Heart, Film, ArrowLeft } from "lucide-react";

const Watchlist = () => {
  const watchlist = useSelector(selectWatchlist) || [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <header className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-red-500 mb-2">
              <Heart size={18} className="fill-current text-red-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Personal Collection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">My Watchlist</h1>
            <p className="text-gray-500 mt-2 font-medium">Your saved movies, kept ready for your next screening.</p>
          </div>

          <Link
            to="/movies"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white font-semibold transition-colors w-fit border border-white/10 hover:border-white/20 bg-white/5 rounded-full px-5 py-2.5 backdrop-blur-md"
          >
            <ArrowLeft size={16} />
            <span>Browse More Movies</span>
          </Link>
        </header>

        {/* Watchlist Grid */}
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {watchlist.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/5 border border-dashed border-white/10 rounded-[3rem] max-w-2xl mx-auto flex flex-col items-center">
            <div className="p-5 bg-white/5 rounded-3xl border border-white/5 text-gray-600 mb-6">
              <Film size={44} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">
              Start adding your favorite movies by exploring the library and clicking "Add to Watchlist" on the detail pages.
            </p>
            <Link
              to="/movies"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-red-600/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
