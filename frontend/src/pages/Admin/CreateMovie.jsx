import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { Upload, Film, Calendar, AlignLeft, Users, Clapperboard } from "lucide-react";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast.length ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          toast.error("Failed to upload image");
          return;
        }

        await createMovie({
          ...movieData,
          image: uploadedImagePath,
        }).unwrap();
        
        navigate("/admin/movies-list");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          rating: 0,
          image: null,
          genre: "",
        });

        toast.success("Movie Added To Database");
      }
    } catch (error) {
      toast.error(`Failed to create movie: ${error?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 sm:p-8 pt-20 lg:pt-8 lg:ml-72 ml-0 flex justify-center items-start">
      <Sidebar />
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
            <div className="p-3 bg-teal-500/20 rounded-2xl text-teal-400">
              <Clapperboard size={32} />
            </div>
            Create New Movie
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Add a new cinematic masterpiece to your collection.</p>
        </header>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                <Film size={14} className="text-teal-500" /> Movie Name
              </label>
              <input
                type="text"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                placeholder="Inception"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  <Calendar size={14} className="text-teal-500" /> Release Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={movieData.year}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Genre</label>
                <select
                  name="genre"
                  value={movieData.genre}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors appearance-none"
                >
                  {isLoadingGenres ? (
                    <option>Loading...</option>
                  ) : (
                    genres.map((genre) => (
                      <option key={genre._id} value={genre._id} className="bg-[#1a1a1a]">
                        {genre.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                <Users size={14} className="text-teal-500" /> Cast
              </label>
              <input
                type="text"
                placeholder="Leonardo DiCaprio, Cillian Murphy"
                value={movieData.cast.join(", ")}
                onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                <AlignLeft size={14} className="text-teal-500" /> Plot Details
              </label>
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                rows="5"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Upload Area */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Cover Poster</label>
              <label className={`relative group flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed transition-all cursor-pointer ${selectedImage ? 'border-teal-500/50 bg-teal-500/5' : 'border-white/10 bg-white/5 hover:border-teal-500/30'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className={`mb-2 transition-colors ${selectedImage ? 'text-teal-400' : 'text-gray-500 group-hover:text-teal-400'}`} />
                  <p className="text-sm text-gray-400 font-medium">
                    {selectedImage ? selectedImage.name : "Click to upload poster"}
                  </p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <button
              type="button"
              onClick={handleCreateMovie}
              disabled={isCreatingMovie || isUploadingImage}
              className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-teal-800 text-black font-black py-4 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.2)] flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              {isCreatingMovie || isUploadingImage ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Publish Movie to Database"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;