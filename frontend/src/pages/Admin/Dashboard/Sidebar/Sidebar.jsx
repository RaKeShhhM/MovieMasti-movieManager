import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Tag, 
  Edit, 
  MessageSquare, 
  ChevronLeft 
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admin/movies-list") {
      return location.pathname === path || location.pathname.includes("/admin/movies/update");
    }
    return location.pathname === path;
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/movies/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Create Movie", path: "/admin/movies/create", icon: <PlusCircle size={20} /> },
    { name: "Create Genre", path: "/admin/movies/genre", icon: <Tag size={20} /> },
    { name: "Update Movie List", path: "/admin/movies-list", icon: <Edit size={20} /> },
    { name: "Comments", path: "/admin/movies/comments", icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-[#0a0a0a] border-r border-white/5 z-40">
      <aside className="flex flex-col h-full px-4 pt-10 pb-8">
        
        {/* Back to Site Button */}
        <div className="mb-10 px-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 hover:text-teal-400 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-teal-500/10 border border-white/5 group-hover:border-teal-500/20 transition-all">
              <ChevronLeft size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Back to Site</span>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1">
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                      active
                        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.1)]"
                        : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className={`${active ? "text-teal-400" : "group-hover:text-white"} transition-colors`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold tracking-wide">
                      {item.name}
                    </span>
                    
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_#14b8a6]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* System Footer Info */}
        <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
              System Secure
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;