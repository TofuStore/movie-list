import React from 'react';
import MovieEntry from './MovieEntry.jsx'

var MovieList = (props) => {
  return (
    <div className='movieList'>
      {props.movies.map((movie) => {
        if(movie.watched === props.tab) {
          return (
            <MovieEntry movie={movie} toggleWatch={props.toggleWatch}/>
          )
        }
      })}
    </div>
  )

}

export default MovieList;