import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/setAlert';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
const PropTypes = require('prop-types');
const Register = ({ setAlert, register, auth: { isAuthenticated } }) => {
  const [formData,setFormData] = useState({
    username:'',
    email:'',
    password:''
  });
  const { username, email, password, password2 } = formData;
  const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value});
  const onSubmit = async e =>{
    e.preventDefault();
    if(password !== password2) {
      setAlert('Password do not match','error');
    }
    else {
      register(username,email,password);
    }
};
if(isAuthenticated) {
  return <Navigate replace to='/' />
}
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Create Your Account</h2>

            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div class="mb-4">
                    <label for="name" className="block text-gray-700 font-semibold">username</label>
                    <input type="text" id="username" name="username" value={username} className="w-full px-4 py-2 mt-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="username" required onChange={e=>onChange(e)}/>
                </div>
                <div class="mb-4">
                    <label for="email" className="block text-gray-700 font-semibold">Email Address</label>
                    <input type="email" id="email" name="email" value={email} className="w-full px-4 py-2 mt-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Your Email" required onChange={e=>onChange(e)}/>
                </div>
                <div class="mb-4">
                    <label for="password" className="block text-gray-700 font-semibold">Password</label>
                    <input type="password" id="password" name="password" value={password} className="w-full px-4 py-2 mt-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="••••••••" required onChange={e=>onChange(e)}/>
                </div>
                <div class="mb-4">
                    <label for="password" className="block text-gray-700 font-semibold">Confirm Password</label>
                    <input type="password" id="password2" name="password2" value={password2} className="w-full px-4 py-2 mt-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="••••••••" required onChange={e=>onChange(e)}/>
                </div>
                <div>
                    <input type="submit" value='Sign Up' className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
                         
                    
                </div>
            </form>
            <p class="text-gray-600 text-center mt-6">
                Already have an account? 
                <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
            </p>
        </div>
    </div>

  )
}

Register.propTypes = {
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
  }
  const mapStateToProps = state =>({
    auth:state.auth
  })
export default connect(mapStateToProps,{ setAlert, register })(Register);
