const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-0">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Input Field */}
        <div className="relative group">
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 shadow-inner"
            placeholder="Enter genre name (e.g. Sci-Fi, Thriller)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex-1 bg-teal-500 hover:bg-teal-400 text-black font-black py-3 px-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.2)] active:scale-95 uppercase tracking-widest text-xs"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 border border-red-500/50 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 uppercase tracking-widest text-xs active:scale-95"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;