import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import { ChevronLeft, Calendar, Star, Users, Heart } from "lucide-react";
import { addToWatchlist, removeFromWatchlist, selectWatchlist } from "../../redux/features/watchlist/watchlistSlice";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist) || [];
  const isAlreadyInWatchlist = watchlist.some((m) => m._id === movie?._id);

  const toggleWatchlistHandler = () => {
    if (!movie) return;
    if (isAlreadyInWatchlist) {
      dispatch(removeFromWatchlist(movie._id));
      toast.success("Removed from Watchlist");
    } else {
      dispatch(addToWatchlist(movie));
      toast.success("Added to Watchlist");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      
      
      <div className="relative min-h-[60vh] md:h-[60vh] w-full overflow-hidden flex items-end">
        {/* Background */}
        <div className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-30" style={{ backgroundImage: `url(${movie?.image})` }} />

        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

        {/* Content */}
        <div className="relative max-w-[1400px] w-full mx-auto px-6 pt-24 pb-10 flex items-center md:items-end">
          <div className="w-full flex flex-col md:flex-row items-center md:items-end gap-8 lg:gap-10">

            <div className="shrink-0 block">
              <img
                src={movie?.image}
                alt={movie?.name}
                className="w-[200px] sm:w-[240px] lg:w-[280px] h-[280px] sm:h-[320px] lg:h-[340px] object-cover rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left">

              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-teal-400 mb-4 font-semibold tracking-wider">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{movie?.year}</span>
                </div>

                <span className="text-white/20">|</span>

                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-current" />
                  <span>Featured</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-5 tracking-tighter text-white">
                {movie?.name}
              </h1>

             
              <p className="text-base lg:text-lg text-gray-400 max-w-3xl leading-relaxed italic">
                "{movie?.detail}"
              </p>

              
              <button
                onClick={toggleWatchlistHandler}
                className={`mt-7 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                  isAlreadyInWatchlist
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-white hover:bg-gray-100 text-teal-900"
                }`}
              >
                <Heart className={isAlreadyInWatchlist ? "fill-current text-white" : "text-teal-900"} size={18} />
                {isAlreadyInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Details & Tabs Section */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        
        {/* Left Column: Tabs/Reviews */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-4 md:p-8 border border-white/10 shadow-xl">
             <MovieTabs
                loadingMovieReview={loadingMovieReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                movie={movie}
              />
          </div>
        </div>

        {/* Right Column: Cast & Meta */}
        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6 text-teal-400">
              <Users size={24} />
              <h3 className="text-xl font-bold">Main Cast</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {movie?.cast.map((c, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/5 hover:bg-white/20 transition-colors"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Stats or Promo Card
          <div className="bg-gradient-to-br from-teal-600 to-teal-900 rounded-3xl p-8 shadow-lg">
             <h4 className="text-xl font-bold mb-2">Want to save it?</h4>
             <p className="text-white/80 text-sm mb-4">Add this movie to your watchlist for later.</p>
             <button className="w-full bg-white text-teal-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Add to Watchlist
             </button>
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;