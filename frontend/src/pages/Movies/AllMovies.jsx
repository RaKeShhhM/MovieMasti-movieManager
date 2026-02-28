import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import MovieCard from "./MovieCard";
import { useGetAllMoviesQuery, useGetNewMoviesQuery, useGetTopMoviesQuery, useGetRandomMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  
  // Logic & Data Fetching (Keep exactly same)
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  // Handlers (Keep exactly same)
  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));
    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new": dispatch(setFilteredMovies(newMovies)); break;
      case "top": dispatch(setFilteredMovies(topMovies)); break;
      case "random": dispatch(setFilteredMovies(randomMovies)); break;
      default: dispatch(setFilteredMovies([])); break;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] w-full flex items-center justify-center bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), #0f0f0f), url(${banner})` }}
      >
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
             MOVIES from A to Z
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto italic font-light">
            Cinematic Odyssey: Unveiling the Magic of Movies
          </p>
        </div>
      </section>

      {/* Filter & Search Bar (Floating Container) */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <input
                type="text"
                className="w-90% bg-[#2a2a2a] border border-transparent focus:border-red-600 focus:ring-0 text-white h-12 px-6 rounded-xl outline-none transition-all"
                placeholder="Search for movies..."
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Select Menus */}
            <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
              <div className="relative group">
                {/* Custom Arrow Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <select
                  className="appearance-none bg-[#dc5c5c] hover:bg-[#c85050] text-white text-xs font-bold uppercase tracking-wider rounded-xl h-12 pl-5 pr-10 border-none focus:ring-2 focus:ring-white/30 outline-none cursor-pointer transition-all duration-300 shadow-lg shadow-red-900/20"
                  value={moviesFilter.selectedGenre}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value="All Genres" className="bg-[#dc5c5c] text-white">All Genres</option>
                  {genres?.map((genre) => (
                    <option 
                      key={genre._id} 
                      value={genre._id} 
                      className="bg-[#dc5c5c] text-white"
                    >
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

             {/* Year Selector */}
              <div className="relative group">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <select
                  className="appearance-none bg-[#dc5c5c] hover:bg-[#c85050] text-white text-xs font-bold uppercase tracking-wider rounded-xl h-12 pl-5 pr-10 border-none focus:ring-2 focus:ring-white/30 outline-none cursor-pointer transition-all duration-300 shadow-lg shadow-red-900/20"
                  value={moviesFilter.selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="" className="bg-[#dc5c5c] color">All Years</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year} className="bg-[#dc5c5c]  text-white">
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Selector */}
              <div className="relative group">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <select
                  className="appearance-none bg-[#dc5c5c] hover:bg-[#c85050] text-white text-xs font-bold uppercase tracking-wider rounded-xl h-12 pl-5 pr-10 border-none focus:ring-2 focus:ring-white/30 outline-none cursor-pointer transition-all duration-300 shadow-lg shadow-red-900/20"
                  value={moviesFilter.selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="" className="bg-[#dc5c5c]  text-white">Sort By</option>
                  <option value="new" className="bg-[#dc5c5c]  text-white">Newest</option>
                  <option value="top" className="bg-[#dc5c5c] text-white"  >Top Rated</option>
                  <option value="random" className="bg-[#dc5c5c] text-white">Featured</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <main className="container mx-auto px-4 py-12">
        {filteredMovies?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredMovies.map((movie) => (
              <div key={movie._id} className="transform hover:scale-105 transition-transform duration-300">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No movies found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllMovies;