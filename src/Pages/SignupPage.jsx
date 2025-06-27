import React, { useContext, useState } from "react";
import { Link, Form, useNavigate } from "react-router";
import {
  FaGoogle,
  FaGithub,
  FaTwitter,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../Contex/AuthProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Swal from "sweetalert2";

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    CreateUser,
    SigninWithGoogle,
    setUser,
    UpdateUserProfile,
    theme,
    
  } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const provider = new GoogleAuthProvider();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    setErrorMessage("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be 6–16 characters, include uppercase, lowercase, and a number."
      );
      return;
    }

    CreateUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        return UpdateUserProfile({
          displayName: name,
          photoURL: photo,
        });
      })
      .then(() => {
        
        Swal.fire({
          title: "Signup Sucessfully!",
          icon: "success",
          draggable: true,
        });

        navigate("/");

      })
      .catch((error) => {
        Swal.fire({
          title: `${error.message}`,
          icon: "error",
          draggable: true,
        });
      });
  };

  const handleGoogleLogin = () => {
    SigninWithGoogle(provider)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          title: "Signup Sucessfully!",
          icon: "success",
          draggable: true,
        });     

        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

   const headerClass = theme === "dark" ? "text-white" : "text-black";
  const formClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black border";

  return (
    <HelmetProvider>
      <Helmet>
        <title>Sign Up || FloraTrack</title>
      </Helmet>
      <div className="py-36 px-4 text-black">
        <h1 className={`text-3xl md:text-5xl font-bold text-center mb-10 poetsen-one ${headerClass}`}>
          Create Your <span className="text-green-600">Account</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto ${formClass} p-6 rounded-lg shadow-md`}
        >
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                className="w-full border px-3 py-2 rounded"
              />
              <div
                className="absolute top-2.5 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>

          {/* Photo URL */}
          <div className="sm:col-span-2">
            <label className="block mb-1 font-semibold">Photo URL</label>
            <input
              type="text"
              name="photo"
              
              placeholder="Profile Photo URL (optional)"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition w-full"
            >
              Sign Up
            </button>
          </div>

          {/* Social Sign-in and Link */}
          <div className="sm:col-span-2 text-center mt-4">
            <p className="text-gray-600 mb-3">Or sign up with</p>
            <div className="flex justify-center gap-6 text-2xl text-green-700 mb-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="hover:text-green-900 transition"
              >
                <FaGoogle />
              </button>
              <button type="button" disabled className=" cursor-not-allowed">
                <FaGithub />
              </button>
              <button type="button" disabled className=" cursor-not-allowed">
                <FaTwitter />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-green-700 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </HelmetProvider>
  );
};

export default SignupPage;
