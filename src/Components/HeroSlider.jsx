
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import AOS from "aos";

const HeroSliders = [
  {
    title: "Start Small, Grow Big plant.",
    description:
      "From low-light plants to air-purifying favorites, explore care guides for all your indoor companions. Create a calming green corner in your home with confidence"

,
    image: "/hero-4.jpg?text=Slide+1",
    button: "TOUR NOW",
  },
  {
    title: "Green Up Your Space.",
    description: " Diagnose and treat common plant issues with our troubleshooting guides. Learn the signs of pests, root rot, nutrient deficiency, and how to bring your plant back to life.",
    image: "/hero-2.jpg?text=Slide+2",
    button: "JOIN US ",
  },
  {
    title: "New to Plants?",
    description: "Easy-to-follow guides for first-time plant lovers. Discover beginner-friendly plants, basic tools, and step-by-step care tips to help you grow with confidence.",
    image: "/hero-3.jpg?text=Slide+3",
    button: "START NOW",
  },
];

 

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };


 useEffect(() => {
    AOS.init({ duration: 1000,
            once: true,
            mirror: false, });
    
  }, []);

  return (
    <Slider {...settings}>
      {HeroSliders.map((slide, index) => (
         <div key={index} className="relative h-[70vh] text-white p-4 ">
         <div
           className="absolute inset-0 bg-cover bg-center"
           style={{ backgroundImage: `url(${slide.image})` }}
         >
           <div className="absolute inset-0 bg-black/60 " />
         </div>
         <div className="relative z-10 container mx-auto h-full flex flex-col justify-center text-center lg:text-start lg:items-start px-6 md:px-20 space-y-3">
           <h1 className="text-4xl md:text-4xl lg:text-6xl xl:text-7xl  poetsen-one" data-aos="fade-up" data-aos-delay="300"> 
             {slide.title}
           </h1>
           <p className="  text-sm md:text-lg lg:text-xl lg:w-3/4  poppins" data-aos="fade-up" data-aos-delay="600"
           >{slide.description}</p>
           <button className="mt-6 bg-green-500 hover:bg-green-600 w-[150px] mx-auto lg:mx-0 lg:w-auto transition px-6 py-3 md:px-7 md:py-5 font-semibold rounded-md" data-aos="fade-up" data-aos-delay="900">
             {slide.button}
           </button>
         </div>
       </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
