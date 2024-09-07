// src/AddProduct.js
import React, { useEffect, useState, Fragment } from 'react';
import { addProduct } from '../../actions/product';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import Spinner from '../../spinner/Spinner';
import UnAuth from './UnAuth';
const AddProduct = ({ addProduct, auth: { loading, user }, loadUser }) => {
    useEffect(()=>{
        loadUser();
    },[loadUser]);
    const [productForm,setProductForm] = useState({
        name:'',
        price:'',
        description:''
    });
    const onChange = e =>setProductForm({ ...productForm,[e.target.name]:e.target.value });
    const onSubmit = e =>{
        e.preventDefault();
        addProduct(productForm);
    }
    const { name, price, description } = productForm;
  return (
    <Fragment>
    {loading ? (<Spinner/>) : user.isAdmin ? (<div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add a New Product</h2>
  
          <form onSubmit={e=>onSubmit(e)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Product Name</label>
              <input
                id="name"
                name='name'
                type="text"
                value={name}
                onChange={(e) => onChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
              <input
                id="price"
                type="number"
                name='price'
                value={price}
                onChange={(e) => onChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product price"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                name='description'
                onChange={(e) => onChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product description"
                rows="4"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>) : <UnAuth /> }
      </Fragment>
  );
}
AddProduct.propTypes = {
    addProduct:PropTypes.func.isRequired,
    loadUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth:state.auth
})
export default connect(mapStateToProps, { addProduct, loadUser })(AddProduct);
