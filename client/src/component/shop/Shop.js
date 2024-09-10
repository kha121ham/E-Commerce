/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, Fragment } from 'react';
import { getProducts } from '../../actions/product';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import Spinner from '../../spinner/Spinner';
import { deleteProductById } from '../../actions/product';
const Shop = ({ getProducts, product:{ loading, products }, loadUser, auth:{ user }, deleteProductById }) => {
  useEffect(()=>{
    loadUser();
    getProducts();
  },[getProducts,loadUser]);
  return (
    <Fragment>
    {user ? user.isAdmin ? loading ? (<Spinner/>) : (<div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Shop Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.price}</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                <Link to={`/order/${product._id}/${user._id}`}  productId={product._id}>Add to Cart</Link>
              </button>
              <button type="button" onClick={()=>deleteProductById(product._id)} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 dlt">Delete</button>
            </div>
          ))}
        </div>
      </div>
      <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 prod"
              >
                <Link to='/add-product'>Add Product</Link>
              </button>
    </div> 
              ) : loading ? (<Spinner/>) : ( <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Shop Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.price}</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              <Link to={`/order/${product._id}/${user._id}`}>Add to Cart</Link>
              </button>
              <button type="button" className='viw'>
              <Link to={`/product/${product._id}`}  productId={product._id}>View details</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>) : loading ? (<Spinner/>) : ( <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Shop Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.price}</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              <Link to='/login' productId={product._id}>Add to Cart</Link>
              </button>
              <button type="button" className='viw'>
              <Link to={`/product/${product._id}`}>View details</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>) }
    </Fragment>
  );
}

Shop.propTypes = {
  getProducts:PropTypes.func.isRequired,
  product:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  deleteProductById:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  product:state.product,
  auth:state.auth
})
export default connect(mapStateToProps, { getProducts, loadUser, deleteProductById })(Shop);
