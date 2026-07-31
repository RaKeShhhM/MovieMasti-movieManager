import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Tag, 
  Edit, 
  MessageSquare, 
  Menu,
  X,
  ArrowLeft
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
    { name: "Back to Site", path: "/", icon: <ArrowLeft size={20} /> },
  ];

  return (
    <>
      {/* Mobile Hamburger Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-[#0a0a0a]/90 border border-white/10 text-teal-400 rounded-xl lg:hidden hover:bg-white/5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`fixed left-0 top-0 h-screen lg:w-72 w-64 bg-[#0a0a0a] border-r border-white/5 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <aside className="flex flex-col h-full px-4 pt-20 lg:pt-10 pb-8">

          {/* Navigation Section */}
          <nav className="flex-1">
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
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
    </>
  );
};

export default Sidebar;