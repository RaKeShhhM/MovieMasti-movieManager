const SecondaryCard = ({ pill, content, info, icon, color }) => {
  // Map color names to specific glow styles
  const colorMap = {
    teal: "from-teal-500/20 border-teal-500/30 text-teal-400",
    amber: "from-amber-500/20 border-amber-500/30 text-amber-400",
    emerald: "from-emerald-500/20 border-emerald-500/30 text-emerald-400",
  };

  const selectedTheme = colorMap[color] || colorMap.teal;

  return (
    <div className={`relative overflow-hidden w-full min-w-[240px] bg-gradient-to-br ${selectedTheme} to-[#0d0d0d] border backdrop-blur-md p-6 rounded-[2rem] group hover:scale-[1.02] transition-all duration-300 shadow-xl ml-5 mt-10`}>
      
      {/* Top Floating Badge */}
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-black/40 rounded-2xl text-inherit border border-white/5 shadow-inner">
          {icon}
        </div>
        <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {pill}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-1">
        <h3 className="text-5xl font-black text-white tracking-tighter">
          {content?.toLocaleString() || 0}
        </h3>
        <p className="text-xs font-medium text-gray-500 pt-2 flex items-center gap-1">
          <span className={selectedTheme.split(' ')[2]}>
            {info?.split(' ')[0]} 
          </span>
          {info?.split(' ').slice(1).join(' ')}
        </p>
      </div>

      {/* Background Subtle Glow */}
      <div className="absolute -bottom-12 -right-12 w-24 h-24 blur-[40px] opacity-20 bg-current pointer-events-none" />
    </div>
  );
};

export default SecondaryCard;