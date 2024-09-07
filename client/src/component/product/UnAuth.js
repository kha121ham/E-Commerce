import React from 'react';
import { Link } from 'react-router-dom';

const UnAuth = () => {
  return (
    <div>
    <div>
      <div className='nt'>
  <div className="flex items-center justify-center min-h-screen px-2">
    <div class="text-center">
    <h2 className="text-2xl font-medium mt-4">401</h2>
      <p className="text-2xl font-medium mt-4">Oops! Page not found</p>
      <p className="mt-4 mb-8">Unauthorized Page</p>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

export default UnAuth
