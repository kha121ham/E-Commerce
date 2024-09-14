// CategoryComponent.js
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../actions/category';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import Spinner from '../../spinner/Spinner';
import CategoryNotFound from './CategoryNotFound';
import { clearProducts } from '../../actions/product';
import { deleteCategoryById } from '../../actions/category';

const Category = ({ loadUser, auth, getCategories, category: { loading, categories }, clearProducts, deleteCategoryById }) => {
  useEffect(()=>{
    getCategories();
    loadUser()
    clearProducts();
  },[getCategories,loadUser,clearProducts])
  const deleteCategory = id => {
    deleteCategoryById(id);
  }
  return (
    <Fragment>
    {!categories ? (<CategoryNotFound />) : loading ? (<Spinner />) : ( <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Categories</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/category/${category._id}`}>
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600">{category.description}</p>
            </Link>
            {auth.user && auth.user.isAdmin && (<button type="button" onClick={()=>deleteCategory(category._id)} className="dlt">X</button>)}
          </div>
        ))}
      </div>
      {auth.user && auth.user.isAdmin && (<button><Link to='/add-category'>Add Category</Link></button>)}
    </div>) }
   
    </Fragment>
  );
};

Category.propTypes = {
  loadUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  category:PropTypes.object.isRequired,
  product:PropTypes.object.isRequired,
  clearProducts:PropTypes.func.isRequired,
  deleteCategoryById:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth:state.auth,
  category:state.category,
  product:state.product
});


export default connect(mapStateToProps, { loadUser, getCategories, clearProducts, deleteCategoryById })(Category);
