import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import { Edit3, Trash2, Upload, Film, Calendar, Users, AlignLeft } from "lucide-react";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast.length) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const uploadImageResponse = await uploadImage(formData).unwrap();
        uploadedImagePath = uploadImageResponse.image;
      }

      await updateMovie({
        id,
        updatedMovie: { ...movieData, image: uploadedImagePath },
      }).unwrap();

      toast.success("Movie updated successfully");
      navigate("/admin/movies-list");
    } catch (error) {
      toast.error("Failed to update movie");
    }
  };

  const handleDeleteMovie = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    try {
      await deleteMovie(id).unwrap();
      toast.success("Movie deleted successfully");
      navigate("/admin/movies-list");
    } catch (error) {
      toast.error("Failed to delete movie");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 ml-72 flex justify-center items-start pt-24">
      <Sidebar/>
      <div className="w-full max-w-5xl bg-white/5 border border-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl">
        
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
              <div className="p-3 bg-teal-500/20 rounded-2xl text-teal-400">
                <Edit3 size={30} />
              </div>
              Update Content
            </h1>
            <p className="text-gray-500 mt-2 font-medium italic">Refining: {initialMovieData?.name}</p>
          </div>

          <button
            onClick={handleDeleteMovie}
            className="flex items-center gap-2 text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-all font-bold text-sm uppercase tracking-widest border border-red-500/20"
          >
            <Trash2 size={16} /> Delete Movie
          </button>
        </header>

        <form className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Side: Preview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative group rounded-[2rem] overflow-hidden border border-white/10 aspect-[2/3] bg-black">
              <img
                src={selectedImage ? URL.createObjectURL(selectedImage) : movieData.image}
                alt="Preview"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="text-teal-400 mb-2" size={32} />
                <span className="text-white font-bold text-sm">Replace Poster</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-center text-xs text-gray-500 font-bold uppercase tracking-widest">Poster Preview</p>
          </div>

          {/* Right Side: Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  <Film size={14} className="text-teal-500" /> Title
                </label>
                <input
                  type="text"
                  name="name"
                  value={movieData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-500/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  <Calendar size={14} className="text-teal-500" /> Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={movieData.year}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                <Users size={14} className="text-teal-500" /> Cast
              </label>
              <input
                type="text"
                name="cast"
                value={movieData.cast.join(", ")}
                onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-500/50 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                <AlignLeft size={14} className="text-teal-500" /> Description
              </label>
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                rows="6"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-teal-500/50 outline-none transition-all resize-none"
              />
            </div>

            <button
              type="button"
              onClick={handleUpdateMovie}
              disabled={isUpdatingMovie || isUploadingImage}
              className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-teal-900 text-black font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.2)] uppercase tracking-[0.2em] text-sm mt-4"
            >
              {isUpdatingMovie || isUploadingImage ? "Processing Changes..." : "Push Updates to System"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;