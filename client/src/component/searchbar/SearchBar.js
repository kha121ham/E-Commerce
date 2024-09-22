import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/product';

const search = ({ product: { products }, getProducts, setResults }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
      getProducts();
    },[getProducts]);
    let items = products ? products : [];
    const getResult = value => {
      const result = items.filter(item=>{
        return value && item && item.name.toLowerCase().includes(value);
      })
      setResults(result)
    }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [input,setInput] = useState('');
  const handleChange = e => {
    setInput(e);
    getResult(e)
  }

  return (
    <div className="hidden md:block relative srch">
    <input type="text"
     className="bg-gray-100 rounded-full px-4 py-2 pl-8 w-64 focus:outline-none focus:bg-white"
      placeholder="Search..."
      value={input}
      name='input'
      onChange={e=>handleChange(e.target.value)}
      />
    <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
</div>

  )
}

search.propTypes = {
  product:PropTypes.object.isRequired,
  getProducts:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  product:state.product
})

export default connect(mapStateToProps, { getProducts })(search);
