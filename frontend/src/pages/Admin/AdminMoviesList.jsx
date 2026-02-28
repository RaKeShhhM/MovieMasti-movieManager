import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { Film, Edit2, Clapperboard } from "lucide-react";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 ml-72 flex justify-center items-start pt-24">
      <Sidebar/>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-teal-500 mb-2">
              <Clapperboard size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Inventory Management</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              All Movies <span className="text-teal-500/50 text-2xl ml-2">({movies?.length})</span>
            </h1>
          </div>
          
          <Link 
            to="/admin/movies/create" 
            className="bg-white/5 border border-white/10 hover:border-teal-500/50 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:bg-teal-500/10"
          >
            + Add New Content
          </Link>
        </header>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies?.map((movie) => (
            <div 
              key={movie._id} 
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]"
            >
              {/* Image Container */}
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                
                {/* Floating Edit Badge */}
                <Link
                  to={`/admin/movies/update/${movie._id}`}
                  className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0 hover:bg-teal-500 hover:text-black"
                >
                  <Edit2 size={16} />
                </Link>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-teal-400 transition-colors">
                  {movie.name}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                  {movie.detail}
                </p>

                <Link
                  to={`/admin/movies/update/${movie._id}`}
                  className="block w-full text-center bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-widest"
                >
                  Manage Content
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;