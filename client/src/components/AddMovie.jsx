import React from 'react';

var AddMovie = (props) => {

  return (
    <div className='addMovie'>
      <input className='movieInput' onChange={() => {
        props.setAddMovie(document.getElementsByClassName('movieInput')[0].value)}}>
      </input>
      <button onClick={() => {
        props.addMovie();
      }}>
        Add Movie
      </button>
    </div>
  )

}

export default AddMovie;