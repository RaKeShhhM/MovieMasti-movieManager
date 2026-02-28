import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group mx-auto w-full max-w-[240px] overflow-hidden rounded-2xl bg-[#121212] border border-white/5 transition-all duration-500 hover:border-red-600/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(220,38,38,0.2)]">
      <Link to={`/movies/${movie._id}`}>
        {/* Image Container */}
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
          />
          
          {/* Layered Gradient: Bottom for text readability, Top for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/20 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Subtle Red Vignette on Hover */}
          <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Info Overlay: Sliding Glass Effect */}
        <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
          
          {/* Glass-morphism Background Plate */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md -z-10 rounded-t-3xl border-t border-white/10" />

          {/* Metadata */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black tracking-widest px-2 py-1 bg-red-600 text-white rounded-md uppercase">
              {movie.year}
            </span>
            <div className="h-[1px] flex-1 bg-white/20" />
          </div>

          <h3 className="text-base font-bold text-white leading-tight line-clamp-2 group-hover:text-red-500 transition-colors duration-300">
            {movie.name}
          </h3>

          {/* "View Details" CTA that appears on hover */}
          <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-white/60">
            <span className="w-4 h-[1px] bg-red-600" />
            View Details
          </div>
        </div>

        {/* Play Icon Placeholder (Visual only) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-100">
             <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
             </svg>
           </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;