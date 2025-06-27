
import React, { useEffect } from 'react';
import "aos/dist/aos.css";
import AOS from 'aos';

const BFPCard = ({ plant }) => {


  useEffect(() => {
    AOS.init({ duration: 1000,
            once: true,
            mirror: false, });
    
  }, []);


    return (
         <div className="max-w-sm rounded-2xl shadow-lg bg-white overflow-hidden border border-green-200 transition-all duration-300 transform hover:shadow-xl hover:scale-105" data-aos="fade-up" data-aos-delay="800">
      <img
        src={plant.image_url}
        alt={plant.name}
        className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-green-700">{plant.name}</h2>
        <p className="italic text-sm text-gray-500 mb-2">
          {plant.scientific_name}
        </p>
        <p className="text-gray-700 mb-4">{plant.description}</p>
        <div className="text-sm text-green-800 space-y-1">
          <p><span className="font-semibold">☀ Light:</span> {plant.care.light}</p>
          <p><span className="font-semibold">💧 Water:</span> {plant.care.water}</p>
        </div>
      </div>
    </div>
    );
};

export default BFPCard;