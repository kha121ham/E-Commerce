// src/Profile.js
import React, { useEffect, Fragment } from 'react';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../../spinner/Spinner';
import ProfileNotFound from './ProfileNotFound';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
function Profile({ getCurrentProfile, profile:{ profile, loading } }) {
  useEffect(()=>{
    getCurrentProfile()
  },[getCurrentProfile])
  return (
    <Fragment>
    {loading ? <Spinner /> : profile ? <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full dv">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full border-4 border-blue-500"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
        </div>
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600">{profile.address}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-center">
            phone : {profile.phone}
          </p>
        </div>
        <button className="btn bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <Link to='/edit-profile'>Edit Profile</Link>
        </button>
      </div>
    </div> : <ProfileNotFound />}
        
    </Fragment>
  );
}

Profile.propTypes = {
  getCurrentProfile:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile:state.profile
})
export default connect(mapStateToProps, { getCurrentProfile })(Profile);
