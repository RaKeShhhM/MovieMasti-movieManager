import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen w-full bg-[#0f0f0f] text-white overflow-hidden selection:bg-red-600/30">
      
      <Sidebar />

      {/* Main Content Section: Takes up remaining space, scrolls independently */}
      <main className="flex-1 relative z-10 overflow-y-auto scrollbar-hide bg-gradient-to-br from-[#121212] to-[#0a0a0a]">
        
        {/* Ambient Red Glow for the Admin Area */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-red-900/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 w-full h-full">
          <Main />
        </div>
      </main>
      
    </div>
  );
};

export default AdminDashboard;