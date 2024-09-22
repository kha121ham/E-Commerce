import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchPage = props => {
    const [results,setResults] = useState([]);
  return (
    <div>
      <SearchBar setResults={setResults} />
      <SearchResults results={results} />
    </div>
  )
}

SearchPage.propTypes = {

}

export default SearchPage
