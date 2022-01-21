import React from 'react';

var SearchBar = (props) => {

  return (
    <div className='searchBar'>
      <input className='searchInput' onChange={() => {
        props.setSearch(document.getElementsByClassName('searchInput')[0].value)}}>
      </input>
      <button onClick={() => {
        props.searchResults();
      }}>
        Search
      </button>
    </div>
  )

}

export default SearchBar;