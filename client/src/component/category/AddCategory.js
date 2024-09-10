// AddCategoryComponent.js
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import Spinner from '../../spinner/Spinner';
import UnAuth from '../product/UnAuth';
import { addCategory } from '../../actions/category';

const AddCategory = ({ loadUser, auth: { loading, user }, addCategory }) => {
    useEffect(()=> {
        loadUser();
    },[loadUser]);
  const [categoryForm, setCategoryForm] = useState({
    name:'',
    description:''
  });
const onChange = e => setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName || description) {
        addCategory(categoryForm);
    }
    // Clear the form
    setCategoryForm({
        name:'',
        description:''
    })
  };
const { categoryName, description } = categoryForm;
  return (
    <Fragment>
    {loading ? (<Spinner />) : user.isAdmin ? ( <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Category</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Category Name */}
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-gray-700 font-medium mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name='name'
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter category name"
            value={categoryName}
            onChange={e=>onChange(e)}
          />
        </div>

        {/* Category Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name='description'
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter description"
            value={description}
            onChange={e=>onChange(e)}
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>) : (<UnAuth />)  }
   
    </Fragment>
  );
};

AddCategory.propTypes = {
    loadUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    addCategory:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps, { loadUser, addCategory })(AddCategory);
