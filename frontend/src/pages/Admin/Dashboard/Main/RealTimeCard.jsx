import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";
import { Activity, Radio } from "lucide-react";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-full max-w-[400px] bg-white/5 border border-white/10 backdrop-blur-2xl text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden mt-10">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 text-teal-400 mb-1">
            <Radio size={16} className="animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Live Stream</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter">Realtime</h2>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mt-1">Update Live</p>
        </div>
      </div>

      {/* Main Metric Section */}
      <div className="space-y-6 mb-10">
        <div className="relative">
          <div className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            {visitors?.length || 0}
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.1em] mt-1 flex items-center gap-2">
            Subscribe
            <Activity size={14} className="text-teal-500" />
          </p>
        </div>

        {/* Custom Glowing Separator */}
        <div className="relative h-[1px] w-full bg-white/10 overflow-hidden my-7">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Embedded Component Section */}
      <div className="mt-8 transition-transform duration-500 hover:scale-[1.02]">
        <PrimaryCard />
      </div>

      {/* Decorative Background Glow */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/10 blur-[50px] pointer-events-none" />

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default RealTimeCard;