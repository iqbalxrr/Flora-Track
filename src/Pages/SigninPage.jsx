import React, { useContext, useState } from "react";
import { Link, Form, useNavigate, useLocation } from "react-router";
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

const SigninPage = () => {
  const navigate = useNavigate();
   const location = useLocation();
  const {
    SigninWithGoogle,
    setUser,
    LoginUser,
    theme

  } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const provider = new GoogleAuthProvider();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setErrorMessage("");

    LoginUser(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          title: "Login Sucessfully!",
          icon: "success",
          draggable: true,
        });
        navigate(location.state? location.state : "/" );
      })
      .catch((error) => {
        setErrorMessage(error.message);
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
          title: "Login Sucessfully!",
          icon: "success",
          draggable: true,
        });
        navigate(location.state? location.state : "/" );
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Swal.fire({
          title: `${error.message}`,
          icon: "error",
          draggable: true,
        });
      });
  };


  const headerClass = theme === "dark" ? "text-white" : "text-black";
  const formClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black border";

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login || FloraTrack</title>
      </Helmet>
      <div className="py-36 px-4 text-black">
        <h1 className={`text-3xl md:text-5xl font-bold text-center mb-10 poetsen-one ${headerClass}`}>
          Welcome <span className="text-green-600">Back</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto p-10 rounded-lg shadow-lg ${formClass}`}
        >
          <div className="sm:col-span-2">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="sm:col-span-2">
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
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="sm:col-span-2 text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition w-full"
            >
              Login
            </button>
          </div>

          <div className="sm:col-span-2 text-center mt-4">
            <p className="text-gray-600 mb-3">Or login with</p>
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
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-700 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </HelmetProvider>
  );
};

export default SigninPage;
