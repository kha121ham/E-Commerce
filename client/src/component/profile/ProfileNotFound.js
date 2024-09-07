import React from 'react';
import { Link } from 'react-router-dom';
const ProfileNotFound = () => {
  return (
    <div>
      <div className='nt'>
  <div className="flex items-center justify-center min-h-screen px-2">
    <div class="text-center">
      <p className="text-2xl font-medium mt-4">Oops! Profile not found</p>
      <p className="mt-4 mb-8">You have not profile yet.</p>
      <Link to="/edit-profile"
        className="px-6 py-3 bg-white font-bold font-semibold rounded-full hover:bg-purple-100 transition duration-300 ease-in-out dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
        Create Profile
      </Link>
    </div>
  </div>
</div>
    </div>
  )
}

export default ProfileNotFound
