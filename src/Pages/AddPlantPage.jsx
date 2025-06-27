import React, { useContext } from 'react';
import { AuthContext } from '../Contex/AuthProvider';
import Swal from 'sweetalert2';

const AddPlantPage = () => {
  const { user, theme } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newAddPlant = {
      imageUrl: form.imageUrl.value,
      name: form.name.value,
      category: form.category.value,
      description: form.description.value,
      careLevel: form.careLevel.value,
      wateringFrequency: form.wateringFrequency.value,
      lastWatered: form.lastWatered.value,
      nextWatering: form.nextWatering.value,
      healthStatus: form.healthStatus.value,
      userEmail: form.userEmail.value,
      userName: form.userName.value,
    };

    fetch('https://b11-a10-assignment-server.vercel.app/addplants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAddPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: 'Add Plant Successfully!',
          icon: 'success',
          draggable: true,
          
        });
        console.log(data)
        form.reset();
      })
      .catch(() => {
        Swal.fire({
          title: 'Oops! Something went wrong.',
          icon: 'error',
          draggable: true,
        });
      });
  };

  const headerClass = theme === 'dark' ? 'text-white' : 'text-black';
  const formClass = theme === 'dark'
    ? 'bg-gray-900 text-white '
    : 'bg-white text-black border ';
  const inputClass = theme === 'dark'
    ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400 focus:ring-green-400 focus:border-green-400'
    : 'bg-white text-black border-gray-300 placeholder-gray-500 focus:ring-green-600 focus:border-green-600';

  return (
    <div className="py-36 px-4 sm:px-6 lg:px-8">
      <h1 className={`text-3xl md:text-5xl font-bold text-center poetsen-one  mb-12 tracking-tight ${headerClass}`}>
        Add Your <span className="text-green-600">Plant</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className={`max-w-2xl mx-auto p-12 rounded-3xl grid gap-8 sm:grid-cols-2 ${formClass}`}
      >
        {/* Image URL */}
        <div className="sm:col-span-2">
          <label className="block mb-2 font-semibold tracking-wide">Plant Image URL</label>
          <input
            type="text"
            name="imageUrl"
            required
            placeholder="https://example.com/image.jpg"
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
            placeholder="Your plant's name"
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Category</label>
          <select
            name="category"
            required
            defaultValue=""
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            <option value="succulent">Succulent</option>
            <option value="vegetable">Vegetable</option>
            <option value="fern">Fern</option>
            <option value="flowering">Flowering</option>
            <option value="cactus">Cactus</option>
            <option value="foliage">Foliage</option>
            <option value="herbal">Herbal</option>
          </select>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block mb-2 font-semibold tracking-wide">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            placeholder="Write something about your plant..."
            className={`w-full rounded-xl border px-5 py-3 resize-none transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          ></textarea>
        </div>

        {/* Care Level */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Care Level</label>
          <select
            name="careLevel"
            required
            defaultValue=""
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          >
            <option value="" disabled>
              -- Select Care Level --
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
            placeholder="e.g. Every 3 days"
            required
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Last Watered */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Last Watered Date</label>
          <input
            type="date"
            name="lastWatered"
            required
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Next Watering */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Next Watering Date</label>
          <input
            type="date"
            name="nextWatering"
            required
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* Health Status */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">Health Status</label>
          <input
            type="text"
            name="healthStatus"
            placeholder="e.g. Healthy"
            required
            className={`w-full rounded-xl border px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${inputClass}`}
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block mb-2 font-semibold tracking-wide">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={user?.email || ''}
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
            value={user?.displayName || ''}
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
            Add Plant
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlantPage;
