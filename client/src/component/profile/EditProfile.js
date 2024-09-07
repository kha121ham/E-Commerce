import React, { useEffect, useState } from 'react';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import PropTypes from 'prop-types'
const EditProfile = ({ getCurrentProfile, createProfile, profile: { loading, profile } }) => {
    const [formData,setFormData] = useState({
        name:'',
        address:'',
        phone:''
    });
    useEffect(()=>{
        getCurrentProfile();
        profile &&
        setFormData({
            name:loading || !profile.name ? '' : profile.name,
            address:loading || !profile.address ? '' : profile.address,
            phone:loading || !profile.phone ? '' : profile.phone,
        });
    },[getCurrentProfile, loading]);
    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData)
    };
    const { name, address, phone } = formData;
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Edit Profile</h2>
        <div className="flex justify-center mb-6">
          <label htmlFor="profile-pic" className="cursor-pointer">
            <img
              className="w-24 h-24 rounded-full border-4 border-blue-500 hover:opacity-80"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <input
              type="file"
              id="profile-pic"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <form onSubmit={e=>onSubmit(e)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name='name'
              value={name}
              onChange={e=>onChange(e)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Address
            </label>
            <input
              id="address"
              name='address'
              value={address}
              onChange={e=>onChange(e)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Phone
            </label>
            <input
              id="phone"
              name='phone'
              value={phone}
              onChange={e=>onChange(e)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}
EditProfile.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    createProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile:state.profile
})
export default connect(mapStateToProps, { getCurrentProfile, createProfile })(EditProfile);
