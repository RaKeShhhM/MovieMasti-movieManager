import { MessageSquare, Calendar } from "lucide-react";

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group hover:bg-white/5 border border-transparent hover:border-white/5">
      <div className="flex items-center gap-5">
        {/* Cinematic Thumbnail */}
        <div className="relative shrink-0">
          <img 
            src={image} 
            alt={title} 
            className="w-14 h-20 object-cover rounded-xl shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500" 
          />
          {/* Subtle Glow Overlay on Hover */}
          <div className="absolute inset-0 rounded-xl bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content Info */}
        <div className="flex flex-col">
          <h2 className="text-white font-bold tracking-tight group-hover:text-teal-400 transition-colors duration-300">
            {title}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-gray-500">
            <Calendar size={12} className="text-gray-600" />
            <span className="text-xs font-medium uppercase tracking-wider">{date}</span>
          </div>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2 text-teal-400">
          <MessageSquare size={16} />
          <span className="text-xl font-black tracking-tighter">
            {comments?.toLocaleString() || 0}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
          Reviews
        </span>
      </div>
    </div>
  );
};

export default VideoCard;