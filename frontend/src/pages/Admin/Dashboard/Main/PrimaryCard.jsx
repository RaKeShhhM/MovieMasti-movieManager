import { useGetUsersQuery } from "../../../../redux/api/users";
import { PartyPopper, TrendingUp } from "lucide-react";

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="relative overflow-hidden w-full bg-gradient-to-br from-teal-600/20 to-teal-900/40 border border-teal-500/30 backdrop-blur-xl text-white rounded-[2rem] p-8 shadow-2xl group hover:border-teal-400/50 transition-all duration-500">
      
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/20 blur-[80px] group-hover:bg-teal-400/30 transition-colors" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-500/20 rounded-2xl text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
            <PartyPopper size={24} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-black tracking-tight leading-none">
              Congratulations!
            </h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-teal-400 font-bold mt-1">
              Platform Growth
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed max-w-[280px]">
            Your community is expanding. You have{" "}
            <span className="text-white font-bold underline decoration-teal-500/50 underline-offset-4">
              {visitors?.length || 0}
            </span>{" "}
            active users engaging with your content right now.
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-teal-400">
            <TrendingUp size={14} />
            <span>+12% spike in the last hour</span>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="absolute top-8 right-8 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
          <div className="w-2 h-2 rounded-full bg-teal-500 absolute" />
        </div>
      </div>
    </div>
  );
};

export default PrimaryCard;