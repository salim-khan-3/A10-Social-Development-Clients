import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
// import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthContext";


const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn, logOut } =
    use(AuthContext);
  const [passwordError, setPasswordError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter (A-Z).";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter (a-z).";
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return "Password must contain at least one special character (e.g., !@#$%...).";
    }

    return "";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formTarget = e.target;
    const name = formTarget.name.value;
    const photo = formTarget.photo.value;
    const email = formTarget.email.value;
    const password = formTarget.password.value;

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      toast.error(validationError);
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registration Successful! Please login now.");
            logOut().finally(() => {
              navigate("/");
            });
          })
          .catch((error) => {
            toast.error(error.message || "Failed to update profile.");
            logOut().finally(() => navigate("/"));
          });
      })
      .catch((error) => {
        console.error(error);

        let errorMessage =
          error.message || "Registration failed. Please try again.";

        if (error.code === "auth/email-already-in-use") {
          errorMessage =
            "This email is already registered. Please login or use a different email.";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Password is too weak. Check all required conditions.";
        }

        toast.error(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
         toast.success(`Welcome, ${result.user.displayName || "User"}!`);
      navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google Sign-in failed:", error);
        let errorMessage = "Google sign-in failed.";
        if (error.code === "auth/popup-closed-by-user") {
          errorMessage = "Google sign-in window was closed.";
        }
        toast.error(errorMessage);
      });
  };

  return (
    <div className="container mx-auto">
      {/* <title>WinterPetCare - Sign Up page</title> */}
      <div className="hero-content mx-auto flex flex-col py-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleFormSubmit} className="card-body">
            <fieldset className="fieldset">
             
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Name"
                required
              />
              
              <label className="label">Photo Url</label>
              <input
                type="text"
                name="photo"
                className="input input-bordered w-full"
                placeholder="Photo Url"
                required
              />
          
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
              {passwordError && (
                <p className="text-red-600 text-sm mt-2">{passwordError}</p>
              )}

              <button type="submit" className="btn btn-primary mt-4">
                Register
              </button>
            </fieldset>

            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 link link-hover"
              >
                Login
              </Link>
            </p>

            <div className="divider">OR</div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-info"
            >
            <FcGoogle />  Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
