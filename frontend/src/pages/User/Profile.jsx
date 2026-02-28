import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      
      {/* Ambient Red Glow for Cinematic Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Profile Card */}
      <div className="w-full max-w-lg bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
        
        {/* Header section */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-red-600 to-red-400 rounded-2xl rotate-3 mb-6 flex items-center justify-center shadow-lg shadow-red-600/20">
            <span className="text-3xl font-black text-white -rotate-3">
              {username?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
            YOUR <span className="text-red-600">PROFILE</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Manage your cinematic identity
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
              Display Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full bg-[#121212] border border-white/5 text-white rounded-xl px-5 py-4 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300 placeholder-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full bg-[#121212] border border-white/5 text-white rounded-xl px-5 py-4 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300 placeholder-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep current"
              className="w-full bg-[#121212] border border-white/5 text-white rounded-xl px-5 py-4 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300 placeholder-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full bg-[#121212] border border-white/5 text-white rounded-xl px-5 py-4 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300 placeholder-gray-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex flex-col items-center">
            <button
              type="submit"
              disabled={loadingUpdateProfile}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
            >
              {loadingUpdateProfile ? "Updating..." : "Update Profile"}
            </button>
            
            {/* Loader rendered below button to prevent layout shifts */}
            {loadingUpdateProfile && (
              <div className="mt-4">
                <Loader />
              </div>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};

export default Profile;