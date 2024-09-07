// src/Profile.js
import React from 'react';

function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full border-4 border-blue-500"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
        </div>

        {/* User Name */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-600">Sharqia</p>
        </div>

        {/* User Bio */}
        <div className="mb-4">
          <p className="text-gray-700 text-center">
            phone : 01062042449
          </p>
        </div>
        <button className="btn bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Edit profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
