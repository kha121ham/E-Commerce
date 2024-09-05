import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
const PropTypes = require('prop-types');
const Login = ({ login, auth:{ isAuthenticated } }) => {
  const [formData,setFormData] = useState({
    email:'',
    password:''
  });
  const {  email, password } = formData;
  const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value});
  const onSubmit = async e =>{
    e.preventDefault();
    login(email,password);
};
if(isAuthenticated) {
  return <Navigate replace to='/' />
}
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Sign into Your Account</h2>

            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div class="mb-4">
                    <label for="email" className="block text-gray-700 font-semibold">Email Address</label>
                    <input type="email" id="email" name="email" value={email} className="w-full px-4 py-2 mt-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Your Email" required onChange={e=>onChange(e)}/>
                </div>
                <div class="mb-4">
                    <label for="password" className="block text-gray-700 font-semibold">Password</label>
                    <input type="password" id="password" name="password" value={password} className="w-full px-4 py-2 mt-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="••••••••" required onChange={e=>onChange(e)}/>
                </div>
                <div>
                    <input type="submit" value='Sign In' className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
                         
                    
                </div>
            </form>
            <p class="text-gray-600 text-center mt-6">
                Do not have an account? 
                <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
            </p>
        </div>
    </div>

  )
}

Login.propTypes = {
  login:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
  auth:state.auth
})
export default connect(mapStateToProps, { login })(Login);
