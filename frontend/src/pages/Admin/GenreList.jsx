import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";
import { Tag, Edit3, LayoutGrid } from "lucide-react";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: { name: updatingName },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      toast.error("Genre deletion failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 sm:p-8 pt-20 lg:pt-8 lg:ml-72 ml-0 flex justify-center items-start">
      <Sidebar />
      <div className="max-w-4xl mx-auto align-middle">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-teal-500 mb-2">
            <LayoutGrid size={18} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Content Taxonomy</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Manage Genres</h1>
          <p className="text-gray-500 mt-2 font-medium">Create and organize the categories for your movie library.</p>
        </header>

        {/* Creation Form Container */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl mb-12">
          <GenreForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateGenre}
          />
        </div>

        {/* Genres List Section */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Existing Genres</h2>
          
          <div className="flex flex-wrap gap-4">
            {genres?.map((genre) => (
              <button
                key={genre._id}
                onClick={() => {
                  setModalVisible(true);
                  setSelectedGenre(genre);
                  setUpdatingName(genre.name);
                }}
                className="group relative flex items-center gap-3 bg-white/5 border border-white/10 text-white py-3 px-6 rounded-2xl transition-all duration-300 hover:bg-teal-500 hover:text-black hover:border-teal-500 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:-translate-y-1"
              >
                <Tag size={16} className="text-teal-500 group-hover:text-black transition-colors" />
                <span className="font-bold tracking-tight">{genre.name}</span>
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Edit3 size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Update/Delete Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="bg-[#111] p-2 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Edit3 className="text-teal-500" size={20} /> Update Genre
            </h3>
            <GenreForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateGenre}
              buttonText="Save Changes"
              handleDelete={handleDeleteGenre}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;