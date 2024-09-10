import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProductByCategoryId } from '../../actions/product';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import ProductNotFound from '../product/ProductNotFound';
import Spinner from '../../spinner/Spinner';
const CategoryProduct = ({ getProductByCategoryId, product: { products, loading }, loadUser, auth:{ user } }) => {
    const params = useParams();
    useEffect(()=>{
        getProductByCategoryId(params.id);
        loadUser();
    },[getProductByCategoryId,params.id,loadUser])
  return (
    <Fragment>
    {products ? loading ? (<Spinner />) : ( <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Products in Category</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                className="w-full h-40 object-cover mb-4 rounded"
/>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.price}</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              {user ? (<Link to={`/order/${product._id}/${user._id}`}>Add to Cart</Link>) : (<Link to='/login'>Add to Cart</Link>) }
              </button>
              <button type="button" className='viw'>
              <Link to={`/product/${product._id}`}  productId={product._id}>View details</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>) : (<ProductNotFound />)}
    
    </Fragment>
  );
    
}

CategoryProduct.propTypes = {
    getProductByCategoryId:PropTypes.func.isRequired,
    product:PropTypes.object.isRequired,
    loadUser:PropTypes.func.isRequired,
    auth:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product:state.product,
    auth:state.auth
  })

export default connect(mapStateToProps, { getProductByCategoryId, loadUser })(CategoryProduct);
