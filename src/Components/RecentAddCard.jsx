import React, { useEffect } from "react";
import { Link } from "react-router";
import "aos/dist/aos.css";
import AOS from "aos";

const RecentAddCard = ({ plant }) => {
  const { name, imageUrl, category } = plant;

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg border border-[#d2e3c8] bg-[#f1f8f4] dark:bg-[#1e2b26] transition-transform duration-300 hover:shadow-2xl hover:scale-[1.03]"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <img
        src={imageUrl}
        alt={name}
        className="object-cover w-full h-56"
      />
      <div className="p-5 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-[#2d4c2f] dark:text-white capitalize">{name}</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">{category}</p>
        <Link
          to={`/plants/${plant._id}`}
          className="mt-4 inline-block text-center bg-[#4caf50] hover:bg-[#388e3c] text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RecentAddCard;
