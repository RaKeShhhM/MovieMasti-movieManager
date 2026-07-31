import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import { Mail, Lock, ArrowRight } from "lucide-react"; // Icons for a premium feel

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />

      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center w-[90%] max-w-5xl h-auto md:h-[600px] my-8 md:my-0 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
        
        {/* LEFT SIDE - THE FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
                <input
                  type="email"
                  id="email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all shadow-inner"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
                <input
                  type="password"
                  id="password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all shadow-inner"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full bg-teal-500 hover:bg-teal-400 text-[#050505] py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Authenticating..." : (
                  <>
                    Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>

            {isLoading && (
              <div className="flex justify-center pt-2">
                <Loader />
              </div>
            )}
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-teal-400 hover:text-teal-300 font-bold transition-colors ml-1"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - VISUAL PANEL */}
        <div className="hidden md:block md:w-1/2 h-full relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-60" />
          <div className="absolute inset-0 bg-teal-500/10 mix-blend-overlay z-10" />
          <img
            src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676"
            alt="Cinematic Experience"
            className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
          />
          <div className="absolute bottom-12 left-12 z-20 max-w-sm">
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
              Discover the world of cinema.
            </h2>
            <p className="text-gray-300 text-sm font-medium opacity-80 uppercase tracking-[0.2em]">
              Premium Access Only
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;