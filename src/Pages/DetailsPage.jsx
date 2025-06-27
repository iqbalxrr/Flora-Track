import React, { useEffect, useState } from "react";
import { differenceInSeconds, parseISO, format } from "date-fns";
import { useParams } from "react-router";
import Loader from "../Components/Loader";
import "aos/dist/aos.css";
import AOS from "aos";

const DetailsPage = () => {
  const { _id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });

    fetch(`https://b11-a10-assignment-server.vercel.app/plants/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlant(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [_id]);

  useEffect(() => {
    if (!plant?.nextWatering) return;

    const updateCountdown = () => {
      const now = new Date();
      const nextWaterDate = parseISO(plant.nextWatering);
      const diffInSeconds = differenceInSeconds(nextWaterDate, now);

      if (diffInSeconds <= 0) {
        setTimeLeft("💧 Time to water now!");
      } else {
        const days = Math.floor(diffInSeconds / (3600 * 24));
        const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s left`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [plant]);

  if (loading) return <Loader />;
  if (!plant)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold text-lg">
        Plant not found!
      </p>
    );

  const formattedLastWatered = plant.lastWatered
    ? format(new Date(plant.lastWatered), "PPP p")
    : "N/A";
  const formattedNextWatering = plant.nextWatering
    ? format(new Date(plant.nextWatering), "PPP p")
    : "N/A";

  return (
    <section
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden gap-6 lg:gap-0">
        {/* Image section */}
        <div className="w-full lg:w-1/3 bg-green-50 flex items-center justify-center p-6">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="rounded-2xl object-cover shadow-md w-full h-auto max-h-[400px] lg:max-h-[500px]"
            loading="lazy"
          />
        </div>

        {/* Info section */}
        <div className="w-full lg:w-2/3 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-4">
              {plant.name}
            </h1>

            <p className="text-green-800 text-base sm:text-lg italic mb-5">{plant.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-green-900 text-base sm:text-lg font-semibold">
              <div>
                <span className="block mb-1 text-green-700">Category</span>
                <span className="font-normal">{plant.category}</span>
              </div>

              <div>
                <span className="block mb-1 text-green-700">Care Level</span>
                <span className="font-normal">{plant.careLevel}</span>
              </div>

              <div>
                <span className="block mb-1 text-green-700">Watering Frequency</span>
                <span className="font-normal">{plant.wateringFrequency}</span>
              </div>

              <div>
                <span className="block mb-1 text-green-700">Health Status</span>
                <span className="font-normal">{plant.healthStatus}</span>
              </div>

              <div>
                <span className="block mb-1 text-green-700">Last Watered</span>
                <span className="font-normal">{formattedLastWatered}</span>
              </div>

              <div>
                <span className="block mb-1 text-green-700">Next Watering</span>
                <span className="font-normal">{formattedNextWatering}</span>
              </div>
            </div>
          </div>

          {/* Time left */}
          <div className="mt-8">
            <p className="inline-flex items-center gap-2 bg-green-100 text-green-900 font-bold px-4 py-3 rounded-full shadow-md text-base sm:text-lg">
              <span>⏳ Time Left:</span>
              <span>{timeLeft}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
