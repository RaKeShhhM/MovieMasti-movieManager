import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import { User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        toast.error(err?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-teal-500/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-600/10 blur-[130px] rounded-full" />

      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center w-[95%] max-w-6xl h-auto md:h-[750px] my-8 md:my-0 bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
        
        {/* LEFT SIDE - THE FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center max-h-full overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-gray-500 font-medium">Join our community of cinema lovers.</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full bg-teal-500 hover:bg-teal-400 text-[#050505] py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] mt-4"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Creating Account..." : (
                  <>
                    Get Started <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </span>
            </button>

            {isLoading && <div className="flex justify-center"><Loader /></div>}
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              Already a member?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-teal-400 hover:text-teal-300 font-bold transition-colors ml-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE SECTION */}
        <div className="hidden md:block md:w-1/2 h-full relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
            alt="Theater"
            className="w-full h-full object-cover transition-transform duration-[15s] group-hover:scale-105"
          />
          <div className="absolute bottom-16 left-16 z-20">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              The best seat <br /> in the house.
            </h2>
            <div className="flex gap-2">
                <span className="w-12 h-1 bg-teal-500 rounded-full"></span>
                <span className="w-4 h-1 bg-white/20 rounded-full"></span>
                <span className="w-4 h-1 bg-white/20 rounded-full"></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;