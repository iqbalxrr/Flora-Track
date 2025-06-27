import React, { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import { Link } from 'react-router';

const AllPlantsDashPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch plants from API
  const fetchPlants = async () => {
    setLoading(true);
    try {
      const url = "https://b11-a10-assignment-server.vercel.app/plants";
      const res = await fetch(url);
      const data = await res.json();
      setPlants(data);
    } catch (err) {
      console.error("Failed to load plants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="overflow-x-auto w-full p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center md:text-left poetsen-one">
        All <span className="text-green-600">Plants</span>
      </h1>

      <div className="max-w-full mx-auto shadow-lg rounded-lg border border-green-200">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left uppercase tracking-wider font-semibold">Plant Photo</th>
              <th className="py-3 px-6 text-left uppercase tracking-wider font-semibold">Plant Name</th>
              <th className="py-3 px-6 text-left uppercase tracking-wider font-semibold">Category</th>
              <th className="py-3 px-6 text-left uppercase tracking-wider font-semibold">Watering Frequency</th>
              <th className="py-3 px-6 text-center uppercase tracking-wider font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400 italic">
                  No plants found.
                </td>
              </tr>
            ) : (
              plants.map((plant, idx) => (
                <tr
                  key={plant._id}
                  className={`border-b border-gray-200 hover:bg-green-50 transition-colors ${
                    idx % 2 === 0 ? 'bg-green-50' : 'bg-white'
                  }`}
                >
                  <td className="py-4 px-6">
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      className="w-12 h-12 rounded-full object-cover mx-auto md:mx-0"
                    />
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-700">{plant.name}</td>
                  <td className="py-4 px-6 text-gray-600">{plant.category}</td>
                  <td className="py-4 px-6 text-gray-600">{plant.wateringFrequency}</td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      to={`/plants/${plant._id}`}
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow-sm transition"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPlantsDashPage;
