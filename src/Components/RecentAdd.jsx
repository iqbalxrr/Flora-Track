import React, { useEffect, useState } from "react";
import RecentAddCard from "./RecentAddCard";
import Loader from "./Loader";
import "aos/dist/aos.css";
import AOS from "aos";

const RecentAdd = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    AOS.init({ duration: 1000,
                once: true,
                mirror: false, });

    fetch("https://b11-a10-assignment-server.vercel.app/plants")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      });
  }), [];


  if (loading) return <Loader />;

  return (
    <div className=" container mx-auto">
      <h1 className="text-3xl w-8/10 mx-auto md:text-6xl poetsen-one text-center mt-30 "  data-aos="fade-up" data-aos-delay="300"  >
        Recently Added <span className="text-green-600">Plants</span>{" "}
      </h1>
      <p className="text-center mt-3 w-6/10 mx-auto mb-3 text-sm md:text-2xl text-gray-400 poppins" data-aos="fade-up" data-aos-delay="700" >
        Check out the latest additions to our plant collection—fresh picks to
        inspire your indoor jungle!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 lg:px-10 px-6  pt-10 mt-5">
        {[...plants]
          .reverse()
          .slice(0, 8)
          .map((plant ) => (
            <RecentAddCard key={plant._id}  plant={plant}></RecentAddCard>
          ))}
      </div>
    </div>
  );
};

export default RecentAdd;
