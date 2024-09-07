import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../img/dcae66764a7bd4d470bd2446f062b1ff.png';

const Landing = () => {
  return (
    <div>
       <section className="bg-white">
        <div className="container mx-auto px-6 py-16 text-center">
            <div className="txt">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover Our Latest Collection</h1>
            <p className="text-gray-600 mb-8">Explore the best products crafted with love and care.</p>
            <Link to="/shop" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500">Shop Now</Link>
            </div>
            <img src={img1} alt="Landing img" className='img1' />
        </div>
    </section>

    <section className="container mx-auto px-6 py-16 page2">
       
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
