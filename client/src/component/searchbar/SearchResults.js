import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const SearchResults = ({ results }) => {
  return (
    results.length > 0 ?
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ss">
          {results.map((result) => (
            <div key={result._id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{result.name}</h2>
              <p className="text-gray-600 mb-4">{result.price}$</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              <Link to='/login' productId={result._id}>Add to Cart</Link>
              </button>
              <button type="button" className='viw'>
              <Link to={`/product/${result._id}`}>View details</Link>
              </button>
            </div>
          ))}
        </div> : <div></div>
    
  )
}

SearchResults.propTypes = {

}

export default SearchResults
