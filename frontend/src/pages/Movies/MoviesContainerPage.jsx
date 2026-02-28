import { useState, useMemo } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: genres } = useFetchGenresQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  // --- LOGIC FIX ---
  // Only filter the "New Releases" / "Results Found" row
  const filteredResults = useMemo(() => 
    newMovies?.filter((m) => !selectedGenre || m.genre === selectedGenre), 
  [newMovies, selectedGenre]);

  // We keep topMovies as they are so "Critic's Choice" stays unchanged
  // -----------------

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 mt-12 pb-32">
      
      {/* --- Genres Bar --- */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-6 bg-red-600 rounded-full" />
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
            Browse Category
          </h3>
        </div>

        <nav className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`whitespace-nowrap px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-500 border-2 ${
              !selectedGenre 
              ? "bg-white border-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)]" 
              : "border-white/5 text-gray-500 hover:text-white hover:border-white/20 bg-[#121212]"
            }`}
          >
            All Cinema
          </button>
          
          {genres?.map((g) => (
            <button
              key={g._id}
              onClick={() => handleGenreClick(g._id)}
              className={`whitespace-nowrap px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-500 border-2 ${
                selectedGenre === g._id 
                ? "bg-red-600 border-red-600 text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] scale-105" 
                : "border-white/5 text-gray-500 hover:text-white hover:border-white/20 bg-[#121212]"
              }`}
            >
              {g.name}
            </button>
          ))}
        </nav>
      </section>

      {/* --- Main Rows --- */}
      <main className="space-y-20">
        
        {/* Row 1: The Dynamic Row (Changes by Genre) */}
        {filteredResults?.length > 0 && (
          <Section 
            title={selectedGenre ? "Genre Results" : "New Releases"} 
            subtitle={selectedGenre ? `Top picks in ${genres?.find(g => g._id === selectedGenre)?.name}` : "Recently added masterpieces"}
            data={filteredResults} 
            isMain
          />
        )}

        {/* Row 2: Critic's Choice (Always stays the same) */}
        {topMovies?.length > 0 && (
          <Section 
            title="Critic's Choice" 
            subtitle="The highest rated films of all time"
            data={topMovies} 
          />
        )}

        {/* Row 3: Hidden Gems (Only show when not filtering to keep UI clean) */}
        {!selectedGenre && randomMovies?.length > 0 && (
          <Section 
            title="Hidden Gems" 
            subtitle="Something different for tonight"
            data={randomMovies} 
          />
        )}

        {/* Empty State */}
        {selectedGenre && filteredResults?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">No matches found</h3>
            <p className="text-gray-500">We couldn't find any movies in this category yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

const Section = ({ title, subtitle, data, isMain = false }) => (
  <section className="group">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h2 className={`text-3xl md:text-4xl font-black tracking-tighter ${isMain ? 'text-white' : 'text-white/80'}`}>
          {title.toUpperCase()}
        </h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          {subtitle}
        </p>
      </div>
      <div className="hidden md:block h-[1px] flex-1 mx-10 bg-gradient-to-r from-red-600/40 to-transparent mb-3 opacity-30" />
    </div>
    <SliderUtil data={data} />
  </section>
);

export default MoviesContainerPage;