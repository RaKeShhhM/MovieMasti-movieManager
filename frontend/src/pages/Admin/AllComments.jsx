import { useState } from "react";
import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import { MessageSquare, Trash2, Search, Film, Calendar } from "lucide-react";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteComment = async (movieId, reviewId) => {
    if (window.confirm("Are you sure you want to remove this review?")) {
      try {
        await deleteComment({ movieId, reviewId }).unwrap();
        toast.success("Comment Deleted");
        refetch();
      } catch (error) {
        toast.error("Error deleting comment");
      }
    }
  };

  // Filter movies that have at least one review and match the search term
  const filteredMovies = movies?.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) && m.reviews.length > 0
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 ml-72 flex justify-center items-start pt-24">
      <Sidebar/>
      <div className="max-w-4xl mx-auto">
        
        {/* Header & Search Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-teal-500 mb-2">
              <MessageSquare size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Moderation Panel</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">User Comments</h1>
          </div>

          <div className="relative group w-full md:w-80 ">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by movie title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all shadow-inner"
            />
          </div>
        </header>

        {/* Comments Feed */}
        <div className="space-y-12">
          {filteredMovies?.length > 0 ? (
            filteredMovies.map((m) => (
              <section key={m._id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Movie Header Separator */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-sm">
                    <Film size={14} className="text-teal-500" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">{m.name}</span>
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="space-y-4">
                  {m.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="group bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-sm transition-all hover:bg-white/[0.07] hover:border-white/20 w-[18rem]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <strong className="text-white text-lg tracking-tight block font-bold">
                            {review.name}
                          </strong>
                          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-tighter">
                            <Calendar size={12} />
                            {review.createdAt.substring(0, 10)}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteComment(m._id, review._id)}
                          className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                          title="Delete Comment"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <p className="text-gray-300 leading-relaxed font-medium">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[3rem]">
              <MessageSquare size={40} className="mx-auto text-gray-700 mb-4" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No comments found matching that title.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllComments;