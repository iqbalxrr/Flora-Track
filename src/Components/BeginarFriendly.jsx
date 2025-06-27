import React, {  useEffect, useState } from "react";
import BFPCard from "./BFPCard";
import "aos/dist/aos.css";
import AOS from "aos";

const BeginarFriendly = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
   
  AOS.init({ duration: 1000,
            once: true,
            mirror: false, });
  
    fetch("/plants.json")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  return (
    <div className="">
      <div className="py-10 container mx-auto ">
        <h1 className="text-3xl w-8/10 mx-auto md:text-6xl poetsen-one text-center mt-30 " data-aos="fade-up" data-aos-delay="300">
          Simple Starter <span className="text-green-600">Plants</span>{" "}
        </h1>
        <p className="text-center mt-3 w-6/10 mx-auto mb-3 text-sm md:text-2xl text-gray-400 poppins" data-aos="fade-up" data-aos-delay="700">
          These low-maintenance plants are perfect for first-time plant
          parents.They’re easy to grow, resilient, and bring life to any space.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 lg:px-10 px-6   py-10 mt-5">
          {plants.map((plant) => (
            <BFPCard key={plant.id} plant={plant}>
              {" "}
            </BFPCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeginarFriendly;
