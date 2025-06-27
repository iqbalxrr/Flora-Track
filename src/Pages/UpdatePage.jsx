import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Contex/AuthProvider";
import Swal from "sweetalert2";
import { useParams } from "react-router";

const UpdatePage = () => {
  const { _id } = useParams();
  const { user, theme } = useContext(AuthContext);
  const [plant, setPlant] = useState({});
  const [formData, setFormData] = useState({
    category: "",
    careLevel: "",
  });

  const {
    name,
    imageUrl,
    wateringFrequency,
    lastWatered,
    nextWatering,
    healthStatus,
    description,
  } = plant;

  useEffect(() => {
    fetch(`https://b11-a10-assignment-server.vercel.app/plants/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlant(data);
        setFormData({
          category: data.category || "",
          careLevel: data.careLevel || "",
        });
      });
  }, [_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedPlant = {
      imageUrl: form.imageUrl.value,
      name: form.name.value,
      category: form.category.value,
      description: form.description.value,
      careLevel: form.careLevel.value,
      wateringFrequency: form.wateringFrequency.value,
      lastWatered: form.lastWatered.value,
      nextWatering: form.nextWatering.value,
      healthStatus: form.healthStatus.value,
    };

    fetch(`https://b11-a10-assignment-server.vercel.app/updateplant/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlant),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Updated Plant Successfully!",
          icon: "success",
          draggable: true,
        });
        form.reset();
      })
      .catch(() => {
        Swal.fire({
          title: "Update failed. Please try again.",
          icon: "error",
          draggable: true,
        });
      });
  };

 
  const headerClass = theme === "dark" ? "text-white" : "text-black";
  const formClass =
    theme === "dark"
      ? "bg-gray-800 text-white  "
      : "bg-white text-black border border-gray-300 ";
  const inputClass =
    theme === "dark"
      ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
      : "bg-white text-black border-gray-300 placeholder-gray-500 focus:ring-green-600 focus:border-green-600";

  return (
    <div className="py-36 px-4 sm:px-6 lg:px-8 min-h-screen">
      <h1
        className={`text-3xl md:text-5xl font-bold text-center mb-10 poetsen-one tracking-wide ${headerClass}`}
      >
        Update Your <span className="text-green-600">Plant</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className={`max-w-2xl mx-auto p-10 rounded-3xl grid gap-8 sm:grid-cols-2 ${formClass}`}
        autoComplete="off"
      >
        {/* Plant Image URL */}
        <div className="sm:col-span-2">
          <label className="block mb-2 font-semibold tracking-wide">
            Plant Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            required
            defaultValue={imageUrl}
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Plant Name */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Plant Name</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={name}
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Category</label>
          <select
            name="category"
            required
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="" disabled>
              -- Select --
            </option>
            <option value="succulent">Succulent</option>
            <option value="fern">Fern</option>
            <option value="flowering">Flowering</option>
            <option value="cactus">Cactus</option>
            <option value="foliage">Foliage</option>
          </select>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block mb-2 font-semibold tracking-wide">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            defaultValue={description}
            className={`w-full rounded-xl border px-5 py-3 resize-none transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Care Level */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Care Level</label>
          <select
            name="careLevel"
            required
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
            value={formData.careLevel}
            onChange={(e) =>
              setFormData({ ...formData, careLevel: e.target.value })
            }
          >
            <option value="" disabled>
              -- Select --
            </option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>

        {/* Watering Frequency */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Watering Frequency</label>
          <input
            type="text"
            name="wateringFrequency"
            placeholder="e.g. every 3 days"
            required
            defaultValue={wateringFrequency}
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Last Watered Date */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Last Watered Date</label>
          <input
            type="date"
            name="lastWatered"
            required
            defaultValue={lastWatered}
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Next Watering Date */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Next Watering Date</label>
          <input
            type="date"
            name="nextWatering"
            required
            defaultValue={nextWatering}
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Health Status */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Health Status</label>
          <input
            type="text"
            name="healthStatus"
            placeholder="e.g. healthy"
            required
            defaultValue={healthStatus}
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={user?.email || ""}
            disabled
            className="w-full rounded-xl border bg-gray-200 text-gray-700 cursor-not-allowed px-5 py-3"
          />
        </div>

        {/* User Name */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">User Name</label>
          <input
            type="text"
            name="userName"
            value={user?.displayName || ""}
            disabled
            className="w-full rounded-xl border bg-gray-200 text-gray-700 cursor-not-allowed px-5 py-3"
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 rounded-3xl shadow-xl transition duration-300"
          >
            Update Plant
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
