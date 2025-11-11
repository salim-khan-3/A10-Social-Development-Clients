import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
// import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthContext";


const Login = () => {
  const { signIn, setUser, googleSignIn } = use(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSuccess = (user) => {
    setUser(user);
    toast.success(`Welcome back, ${user.displayName || "User"}!`);
    navigate(from, { replace: true });
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const formTarget = e.target;
    const email = formTarget.email.value.trim();
    const password = formTarget.password.value.trim();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    signIn(email, password)
      .then((result) => {
        handleSuccess(result.user);
      })
      .catch((error) => {
        let errorMessage = "Login failed. Please check your credentials.";
        const errorCode = error.code;

        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/invalid-credential"
        ) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (errorCode === "auth/invalid-email") {
          errorMessage = "The email address is not valid.";
        } else if (errorCode === "auth/user-disabled") {
          errorMessage = "This user account has been disabled.";
        } else {
          console.error("Firebase Auth Error:", error);
        }

        toast.error(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        handleSuccess(result.user);
      })
      .catch((error) => {
        console.error("Google Sign-in failed:", error);
        toast.error(
          error.code === "auth/popup-closed-by-user"
            ? "Google sign-in window was closed."
            : "Google sign-in failed."
        );
      });
  };

  return (
    <div className="container mx-auto">
      {/* <title>WinterPetCare - Login</title> */}
      <div className="hero-content mx-auto flex flex-col py-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLoginFormSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />

              <label className="label">Password</label>
              <div className="relative w-full">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pr-10"
                  placeholder="Password"
                  required
                />
                <div
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-gray-700 transition"
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              
              <a
                onClick={() => {
                  const emailInput = document
                    .querySelector('input[name="email"]')
                    .value.trim();

                  if (!emailInput) {
                    toast.error(
                      "Please enter your email first before resetting password."
                    );
                    return;
                  }

                  navigate("/forgetpassword", {
                    state: { email: emailInput },
                  });
                }}
                className="link link-hover text-sm text-[#2563eb] cursor-pointer mt-2"
              >
                Forgot password?
              </a>

              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full px-4 py-2 border rounded btn btn-outline btn-info"
                >
                <FcGoogle />  Continue with Google
                </button>
              </div>
            </fieldset>

            <p className="mt-4 text-sm text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 link link-hover"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
