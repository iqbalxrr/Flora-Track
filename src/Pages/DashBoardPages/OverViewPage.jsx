import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Contex/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

// Import Recharts components
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const OverViewPage = () => {
  const navigate = useNavigate();
  const { user, LogOut } = useContext(AuthContext);

  const [plants, setPlants] = useState([]);
  const [myplants, setMyplants] = useState([]);

  // Fetch all plants data once on mount
  useEffect(() => {
    fetch("https://b11-a10-assignment-server.vercel.app/plants")
      .then(res => res.json())
      .then(data => setPlants(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch my plants data when user or email changes
  useEffect(() => {
    if (user?.email) {
      fetch(`https://b11-a10-assignment-server.vercel.app/plants/email/${user.email}`)
        .then(res => res.json())
        .then(data => setMyplants(data))
        .catch(err => console.error("Failed to load plants:", err));
    }
  }, [user?.email]);

  const handleLogout = () => {
    LogOut()
      .then(() => {
        Swal.fire({
          title: "Logout Successfully",
          icon: "success",
        });
        navigate("/signin");
      })
      .catch((error) => {
        Swal.fire({
          title: error.message,
          icon: "error",
        });
      });
  };

  // Data for Pie Chart (My Plants vs Others)
  const pieData = [
    { name: 'My Plants', value: myplants.length },
    { name: 'Other Plants', value: plants.length - myplants.length },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  // Data for Bar Chart - example: show counts of Total and My Plants
  const barData = [
    {
      name: 'Plants',
      'Total Plants': plants.length,
      'My Plants': myplants.length,
    },
  ];

  return (
    <div className='space-y-6  md:px-2 bg-gray-200'>
      <h1 className='text-3xl font-bold text-gray-800'>Dashboard Overview</h1>

      {/* Logged-in User Info */}
      <div className="bg-white text-gray-700 rounded-lg shadow p-8 flex flex-col items-center text-center">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4"
        />
        <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
        <p className="text-sm">{user?.email}</p>
        <button onClick={handleLogout} className='btn mt-4 btn-outline btn-primary'>Log Out</button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <div className='bg-white rounded-lg shadow p-6 text-center'>
          <h2 className='text-lg font-semibold text-gray-700'>Total Plants</h2>
          <p className='text-3xl font-bold text-green-600'>{plants.length}</p>
        </div>
        <div className='bg-white rounded-lg shadow p-6 text-center'>
          <h2 className='text-lg font-semibold text-gray-700'>My Plants</h2>
          <p className='text-3xl font-bold text-blue-600'>{myplants.length}</p>
        </div>
        <div className='bg-white rounded-lg shadow p-6 text-center'>
          <h2 className='text-lg font-semibold text-gray-700'>New Users</h2>
          <p className='text-3xl font-bold text-purple-600'>8</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10 bg-white  p-6 rounded-lg shadow'>

        {/* Pie Chart */}
        <div>
          <h3 className='text-xl font-semibold mb-4 text-black text-center'>My Plants vs Others</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className='text-xl font-semibold mb-4 text-black text-center'>Plants Count Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total Plants" fill="#82ca9d" />
              <Bar dataKey="My Plants" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
