import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductById } from '../../actions/product';
import { useParams } from 'react-router-dom';
import  ProductNotFound  from './ProductNotFound';
import Spinner from '../../spinner/Spinner';
const Prouduct = ({ getProductById, product:{ product,loading } }) => {
  const params = useParams();
  useEffect(()=>{
    getProductById(params.id);
  },[getProductById,params.id]);
  return (
    <Fragment>
    {!product ? (<ProductNotFound />) : loading ? (<Spinner />) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 product">
    <div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden item">
                <img src="https://via.placeholder.com/400" alt="Product 1" className="w-full h-48 object-cover"/>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                    <p className="text-gray-600">{product.description}</p>
                </div>
            </div>
            </div>
    </div>) }
    
    </Fragment>
  )
}
Prouduct.propTypes = {
  getProductById:PropTypes.func.isRequired,
  product:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  product:state.product
})
export default connect(mapStateToProps, { getProductById })(Prouduct);
