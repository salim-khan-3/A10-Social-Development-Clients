import React, { use, useState } from "react";
import { useLocation, useNavigate } from "react-router";
// import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

const ForgetPassword = () => {
  const { resetPassword } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromLogin = location.state?.email || "";
  const [email, setEmail] = useState(emailFromLogin);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      await resetPassword(email);
      toast.success("Password reset email sent successfully!");

      window.location.href = "https://mail.google.com";
    } catch (error) {
      console.error("Password Reset Error:", error);
      toast.error("Failed to send password reset email. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 md:mt-20">
      <div className="bg-white dark:text-black shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Reset Your Password
        </h2>
        <form onSubmit={handleResetPassword}>
          <label className="block mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            className="input input-bordered bg-black dark:text-white w-full mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-neutral w-full mt-2"
          >
            Reset Password
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="btn btn-outline w-full mt-4"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
