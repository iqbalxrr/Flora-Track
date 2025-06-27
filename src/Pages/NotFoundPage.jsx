import React, { useState } from "react";
import Lottie from "lottie-react";
import Loader from "../Components/Loader";
import { Link } from "react-router";

const animationURL = "https://assets10.lottiefiles.com/packages/lf20_j1adxtyb.json";

const NotFoundPage = () => {
  const [animationData, setAnimationData] = useState(null);

  React.useEffect(() => {
    fetch(animationURL)
      .then(res => res.json())
      .then(setAnimationData);
  }, []);

  if (!animationData) return <Loader/>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 text-center">
      <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-6">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2 mb-6 text-sm sm:text-base max-w-md mx-auto">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="inline-block px-5 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition text-sm sm:text-base"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
