import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Contex/AuthProvider";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";

const MyPlantsPage = () => {
  const { user } = useContext(AuthContext);

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://b11-a10-assignment-server.vercel.app/plants/email/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setPlants(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load plants:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleDeletePlant = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://b11-a10-assignment-server.vercel.app/plants/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = plants.filter((plant) => plant._id !== id);
              setPlants(remaining);
              Swal.fire({
                title: "Deleted Successfully!",
                icon: "success",
                draggable: true,
              });
            }
          });
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="px-4 py-20 container mx-auto min-h-[70vh]">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 poetsen-one">
        My <span className="text-green-600">Plants</span>
      </h1>

      <div className="overflow-x-auto w-full">
        <div className="min-w-[600px] max-w-6xl mx-auto shadow-lg rounded-lg border border-green-200">
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
                    <td className="py-4 px-6 text-center space-x-2">
                      <Link
                        to={`/plantupdate/${plant._id}`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-sm transition"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDeletePlant(plant._id)}
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow-sm transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPlantsPage;
