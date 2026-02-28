import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import { ChevronLeft, Calendar, Star, Users } from "lucide-react";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

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
      
      {/* Hero Header Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-30"
          style={{ backgroundImage: `url(${movie?.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        
        {/* Content Container */}
        <div className="relative max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-end pb-10">
         

          <div className="flex flex-col md:flex-row gap-10 items-end">
            {/* Poster Card */}
            <div className="shrink-0 hidden md:block">
              <img
                src={movie?.image}
                alt={movie?.name}
                className="w-[280px] h-[300px] rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Title Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 text-teal-400 mb-4 font-semibold tracking-wider">
                <Calendar size={18} />
                <span>{movie?.year}</span>
                <span className="mx-2 text-white/20">|</span>
                <Star size={18} className="fill-current" />
                <span>Featured</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                {movie?.name}
              </h1>
              <p className="text-lg text-gray-400 max-w-3xl leading-relaxed italic">
                "{movie?.detail}"
              </p>
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

          {/* Quick Stats or Promo Card */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-900 rounded-3xl p-8 shadow-lg">
             <h4 className="text-xl font-bold mb-2">Want to save it?</h4>
             <p className="text-white/80 text-sm mb-4">Add this movie to your watchlist for later.</p>
             <button className="w-full bg-white text-teal-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Add to Watchlist
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;