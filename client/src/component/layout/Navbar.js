/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
   <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">
                <Link to='/'>E-Commerce</Link>
            </div>

            <div class="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link>
                <Link to="/shop" className="text-gray-800 hover:text-blue-600">Shop</Link>
                <Link to="/about" className="text-gray-800 hover:text-blue-600">About</Link>
                <Link to="/contact" className="text-gray-800 hover:text-blue-600">Contact</Link>
            </div>

            
            <div className="flex items-center space-x-4">
               
                <div className="hidden md:block relative">
                    <input type="text" className="bg-gray-100 rounded-full px-4 py-2 pl-8 w-64 focus:outline-none focus:bg-white" placeholder="Search..."/>
                    <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                
                <Link to="/cart" className="text-gray-800 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l1.4-7H6.6M7 13L6 6M7 13l1.4 7m0 0a2 2 0 002 2h4a2 2 0 002-2m-6 0h6M16 6h6m-6 0V4a2 2 0 10-4 0v2m-6 0H3"></path>
                    </svg>
                </Link>
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
    </nav>
    </div>
  )
}

export default Navbar
