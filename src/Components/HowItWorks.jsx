import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../Contex/AuthProvider";

const HowItWorks = () => {
  const { theme } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // Conditional classes for light/dark theme
  const sectionClass =
    theme === "light"
      ? "bg-gray-100 text-gray-800"
      : "bg-gray-900 text-gray-300";

  const iconBgClass =
    theme === "light"
      ? "bg-green-100 text-green-700"
      : "bg-green-800 text-green-400";

  const textClass =
    theme === "light"
      ? "text-gray-600"
      : "text-gray-400";

  return (
    <section className={`${sectionClass} py-16 md:py-20 px-4 md:px-10 my-20`}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl w-8/10 mx-auto md:text-6xl poetsen-one mb-16">
          How It <span className="text-green-600"> Works</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="0">
            <div className={`${iconBgClass} p-6 rounded-full text-4xl`}>🌱</div>
            <h3 className="text-xl font-semibold mt-4">Add Your Plant</h3>
            <p className={`${textClass} mt-2 text-sm max-w-xs`}>
              Choose a name, type, and upload a photo to start tracking.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
            <div className={`${iconBgClass} p-6 rounded-full text-4xl`}>⏰</div>
            <h3 className="text-xl font-semibold mt-4">Set Schedule</h3>
            <p className={`${textClass} mt-2 text-sm max-w-xs`}>
              Set reminders for watering and growth tracking.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="600">
            <div className={`${iconBgClass} p-6 rounded-full text-4xl`}>🔔</div>
            <h3 className="text-xl font-semibold mt-4">Get Reminders</h3>
            <p className={`${textClass} mt-2 text-sm max-w-xs`}>
              Receive notifications and monitor your plant’s journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
