import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import Navbar from "./component/Navbar";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
