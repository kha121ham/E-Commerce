/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import logo from '../../img/png-clipart-web-development-responsive-web-design-e-commerce-business-ecommerce-blue-angle-thumbnail.png';
const PropTypes = require('prop-types');

const Navbar = ({ auth:{ isAuthenticated, loading, user }, logout, order }) => {
    const authLinks = (<nav className="bg-white shadow-lg fade-in">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">
            <div className="logo-cont">
            <Link to='/'>E-Commerce</Link>
            <img src={logo} alt="logo" className='logo' />
            </div>
            </div>

            <div class="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link>
                <Link to="/shop" className="text-gray-800 hover:text-blue-600">Shop</Link>
                <Link to="/about" className="text-gray-800 hover:text-blue-600">About</Link>
                <Link to="/profile" className="text-gray-800 hover:text-blue-600">Profile</Link>
            </div>

            
            <div className="flex items-center space-x-4">
            {!loading && user ? (<Link to={`/cart/${user._id}`} className="text-gray-800 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l1.4-7H6.6M7 13L6 6M7 13l1.4 7m0 0a2 2 0 002 2h4a2 2 0 002-2m-6 0h6M16 6h6m-6 0V4a2 2 0 10-4 0v2m-6 0H3"></path>
                    </svg>
                </Link>) : (<Link to='/cart' className="text-gray-800 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l1.4-7H6.6M7 13L6 6M7 13l1.4 7m0 0a2 2 0 002 2h4a2 2 0 002-2m-6 0h6M16 6h6m-6 0V4a2 2 0 10-4 0v2m-6 0H3"></path>
                    </svg>
                </Link>)}
                <div className="hidden md:block relative">
                    <input type="text" className="bg-gray-100 rounded-full px-4 py-2 pl-8 w-64 focus:outline-none focus:bg-white" placeholder="Search..."/>
                    <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                
                <button onClick={()=>logout()}><i class="fa-solid fa-right-from-bracket lg"></i></button>
            </div>

            
            <div className="md:hidden flex items-center">
                <button className="text-gray-800 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <div className="md:hidden">
            <Link to="/" class="text-gray-800 hover:text-blue-600">Home</Link>
            <Link to="/shop" class="text-gray-800 hover:text-blue-600">Shop</Link>
            <Link to="/about" class="text-gray-800 hover:text-blue-600">About</Link>
            <Link to="/contact" class="text-gray-800 hover:text-blue-600">Contact</Link>
        </div>
    </nav>)
    const guestLinks = (<nav className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">
            <div className="logo-cont">
            <Link to='/'>E-Commerce</Link>
            <img src={logo} alt="logo" className='logo' />
            </div>

            </div>

            <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link>
                <Link to="/shop" className="text-gray-800 hover:text-blue-600">Shop</Link>
                <Link to="/about" className="text-gray-800 hover:text-blue-600">About</Link>
                <Link to="/profile" className="text-gray-800 hover:text-blue-600">Profile</Link>
            </div>

            
            <div className="flex items-center space-x-4">
                <div className="hidden md:block relative">
                <Link to="/register" className="text-gray-800 hover:text-white-500 logs">Sign Up</Link>
                <Link to="/login" className="text-gray-800 hover:text-white-500 logs">Login</Link>
                </div>
            </div>

            
            <div className="md:hidden flex items-center">
                <button className="text-gray-800 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <div className="md:hidden">
            <Link to="/" class="text-gray-800 hover:text-blue-600">Home</Link>
            <Link to="/shop" class="text-gray-800 hover:text-blue-600">Shop</Link>
            <Link to="/about" class="text-gray-800 hover:text-blue-600">About</Link>
            <Link to="/contact" class="text-gray-800 hover:text-blue-600">Contact</Link>
        </div>
    </nav>)
    
  return (
    <div>
        {!loading && (<Fragment>{isAuthenticated ? (authLinks) : (guestLinks) }</Fragment>)}
    </div>
  )
}
Navbar.propTypes = {
    auth:PropTypes.object.isRequired,
    logout:PropTypes.func.isRequired,
    order:PropTypes.object.isRequired
  }
const mapStateToProps = state =>({
    auth:state.auth,
    order:state.order
})
export default connect(mapStateToProps, { logout })(Navbar);
