import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "../Components/Loader";
import { AuthContext } from "../Contex/AuthProvider";
import { TbLayoutCards } from "react-icons/tb";
import { LuTableProperties } from "react-icons/lu";

const AllPlantsPage = () => {
  const { theme } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortValue, setSortValue] = useState("");
  const [viewType, setViewType] = useState("card"); // default to card view

  const handleSort = (e) => {
    const selectedValue = e.target.value;
    setSortValue(selectedValue);
    fetchPlants(selectedValue);
  };

  const handleCardView = () => setViewType("card");
  const handleTableView = () => setViewType("table");

  const fetchPlants = async (sort = "") => {
    setLoading(true);
    try {
      const url = sort
        ? `https://b11-a10-assignment-server.vercel.app/plants/short/${sort}`
        : "https://b11-a10-assignment-server.vercel.app/plants";
      const res = await fetch(url);
      const data = await res.json();

      // ✅ Reverse the data so newest comes first
      setPlants(data.reverse());
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

  const shortOptionClass =
    theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white";

  return (
    <div className="px-4 py-20 container mx-auto min-h-[70vh]">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-5 flex-wrap gap-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-0 poetsen-one">
            All <span className="text-green-600">Plants</span>
          </h1>

          <div className="flex gap-2 items-center">
            <button
              onClick={handleCardView}
              className={`p-2 rounded ${
                viewType === "card" ? "bg-green-600 text-white" : "text-green-600 hover:bg-green-100"
              }`}
              title="Card View"
              aria-label="Card View"
            >
              <TbLayoutCards size={28} />
            </button>
            <button
              onClick={handleTableView}
              className={`p-2 rounded ${
                viewType === "table" ? "bg-green-600 text-white" : "text-green-600 hover:bg-green-100"
              }`}
              title="Table View"
              aria-label="Table View"
            >
              <LuTableProperties size={28} />
            </button>
          </div>
        </div>

        <hr className="mb-6" />

        <div className="flex justify-end">
          <select
            value={sortValue}
            onChange={handleSort}
            className={`mb-4 p-3 border border-green-600 rounded w-full max-w-xs ${shortOptionClass}`}
          >
            <option value="">Sort by Care Level (All)</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>
      </div>

      {/* Table View */}
      {viewType === "table" ? (
        <div className="overflow-x-auto w-full">
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
                        idx % 2 === 0 ? "bg-green-50" : "bg-white"
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
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-sm transition"
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
      ) : (
        // Card View
        <div
          className={`grid gap-6 mt-6 ${
            plants.length === 0
              ? ""
              : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {plants.length === 0 ? (
            <p className="text-center text-gray-400 italic col-span-full">No plants found.</p>
          ) : (
            plants.map((plant) => (
              <div
                key={plant._id}
                className={`rounded-lg shadow-md p-4 transition-colors ${
                  theme === "light"
                    ? "bg-white hover:shadow-xl"
                    : "bg-gray-800 text-white hover:shadow-xl"
                }`}
              >
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-1">{plant.name}</h2>
                <p className="text-sm mb-1">
                  <span className="font-medium">Category:</span> {plant.category}
                </p>
                <p className="text-sm mb-3">
                  <span className="font-medium">Watering:</span> {plant.wateringFrequency}
                </p>
                <Link
                  to={`/plants/${plant._id}`}
                  className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  Details
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllPlantsPage;
