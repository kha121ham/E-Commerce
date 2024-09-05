import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
       <section className="bg-white">
        <div className="container mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover Our Latest Collection</h1>
            <p className="text-gray-600 mb-8">Explore the best products crafted with love and care.</p>
            <Link to="/" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500">Shop Now</Link>
        </div>
    </section>

    <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="https://via.placeholder.com/400" alt="Product 1" className="w-full h-48 object-cover"/>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Product 1</h3>
                    <p className="text-gray-600">$49.99</p>
                    <Link to="/product/details" class="text-blue-600 hover:underline">View Details</Link>
                </div>
            </div>
        </div>
    </section>

    <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
        </div>
    </section>
    <footer className="bg-gray-900 text-gray-500 py-6 text-center">
        <p>&copy; 2024 Your E-commerce. All Rights Reserved.</p>
    </footer>
    </div>
  )
}

export default Landing
