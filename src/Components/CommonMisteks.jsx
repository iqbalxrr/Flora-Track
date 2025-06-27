import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../Contex/AuthProvider";
import "aos/dist/aos.css";
import AOS from "aos";

const CommonMistakes = () => {
    const {theme } = useContext(AuthContext)
  const mistakes = [
    "Overwatering: Always check soil before watering.",
    "Insufficient Light: Know your plant's light needs.",
    "Wrong Pot or No Drainage: Always use pots with holes.",
    "Ignoring Pests: Check regularly for bugs.",
    "Not Cleaning Leaves: Dust blocks sunlight.",
    "Using Cold Tap Water: Use room-temperature water.",
    "Frequent Relocation: Let plants adjust to one place.",
    "Wrong Fertilizer Use: Use correct type and amount."
  ];

  useEffect(() => {
    AOS.init({ duration: 1000,
            once: true,
            mirror: false, });
    
  }, []);

  
   const navbarClasses =
    theme == "light"
      ? "bg-white text-black "
      : "	bg-base-100 text-white ";
  
    const cardClass = 
    theme == "light"
      ? "bg-white text-black "
      : "bg-gray-800 text-white ";


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
 <div  className={` ${navbarClasses} container mx-auto `} >
       <div className="py-12 ">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 poetsen-one" data-aos="fade-up" data-aos-delay="300">
        Common  <span className="text-green-600">Plant</span> Care Pitfalls
      </h1>
        <p className="text-center mt-3 w-6/10 mx-auto mb-3 text-sm md:text-2xl text-gray-400 poppins" data-aos="fade-up" data-aos-delay="700" >
        New to plant care? Avoid these common mistakes like overwatering, poor lighting, and neglecting seasonal needs to help your plants thrive.
      </p>
      <Slider {...settings}>
        {mistakes.map((mistake, index) => (
          <div key={index} className="px-5 py-5" data-aos="fade-up" data-aos-delay="300">
            <div className={` ${cardClass}   border border-green-200 rounded-xl p-4 h-65 shadow-md  transition duration-300 poppins `}>
                <img src="/plant1.png" className=" w-30 md:w-35 mx-auto " alt="" />
              <p className="font-bold  text-xl text-center">{mistake}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
 </div>
  );
};

export default CommonMistakes;
