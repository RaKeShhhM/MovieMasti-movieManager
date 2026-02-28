import { useMemo } from "react";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";
import { 
  useGetTopMoviesQuery, 
  useGetAllMoviesQuery 
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import { Film, MessageSquare, Users, Activity } from "lucide-react";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  // Optimized calculation for total comments
  const sumOfCommentsLength = useMemo(() => {
    return allMovies?.reduce((acc, movie) => acc + (movie.numReviews || 0), 0) || 0;
  }, [allMovies]);

  return (
    <div className="p-8 ml-72 min-h-screen bg-[#0a0a0a]">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-teal-500 mb-2">
          <Activity size={18} />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Enterprise Analytics</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight">System Dashboard</h1>
      </header>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* --- LEFT CONTENT: Stats & Lists (8 Columns) --- */}
        <div className="xl:col-span-8 space-y-10">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SecondaryCard
              pill="Users"
              content={visitors?.length || 0}
              info="20.2k more than usual"
              icon={<Users size={20} />}
              color="green" 
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742.8 more than usual"
              icon={<MessageSquare size={20} />}
              color="amber"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length || 0}
              info="372+ more than usual"
              icon={<Film size={20} />}
              color="emerald"
            />
          </div>

          {/* Content List Section */}
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                Top Performing Content
                <span className="text-[10px] bg-teal-500/20 text-teal-400 px-2 py-1 rounded-full uppercase">Live</span>
              </h2>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Engagement</span>
            </div>

            <div className="space-y-2">
              {topMovies?.map((movie) => (
                <VideoCard
                  key={movie._id}
                  image={movie.image}
                  title={movie.name}
                  date={movie.year}
                  comments={movie.numReviews}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT CONTENT: Real-time Panel (4 Columns) --- */}
        <div className="xl:col-span-4">
          <div className="sticky top-24">
            <RealTimeCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;