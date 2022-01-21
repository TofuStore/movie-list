import React from 'react';
import MovieList from './MovieList.jsx'
import AddMovie from './AddMovie.jsx'
import SearchBar from './SearchBar.jsx'
import WatchTab from './WatchTab.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [
        // {title: 'Mean Girls'},
        // {title: 'Hackers'},
        // {title: 'The Grey'},
        // {title: 'Sunshine'},
        // {title: 'Ex Machina'},
      ],
      search: '',
      searchResults: [],
      addMovie: '',
      watchTab: true
    }

    this.setSearch = this.setSearch.bind(this);
    this.searchResults = this.searchResults.bind(this);
    this.setAddMovie = this.setAddMovie.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.toggleWatch = this.toggleWatch.bind(this);
    this.switchTabWatched = this.switchTabWatched.bind(this);
    this.switchTabToWatch = this.switchTabToWatch.bind(this);
  }

  switchTabWatched() {
    this.setState({
      watchTab: true
    })
  }

  switchTabToWatch() {
    this.setState({
      watchTab: false
    })
  }

  setSearch(search) {
    this.setState({
      search: search
    })
  }

  searchResults() {
    let filtered = this.state.movies.filter(movie => movie.title.includes(this.state.search));

    if(filtered.length < 1) {
      filtered = [{title: 'none found', watched: 'true', nonefound: true}, {title: 'none found', watched: 'false', nonefound: true}]
    }

    this.setState({
      searchResults: filtered
    })
  }

  setAddMovie(movie) {
    this.setState({
      addMovie: movie
    })
  }

  addMovie() {
    if(this.state.addMovie === '') {
      return
    }
    this.setState({
      movies: this.state.movies.concat([{title: this.state.addMovie, watched: false}]),
      searchResults: []
    })
  }

  toggleWatch(movie) {
    let updatedMovies = this.state.movies;
    for(let i = 0; i < updatedMovies.length; i++) {
      if (updatedMovies[i].title === movie.title) {
        updatedMovies[i].watched = !updatedMovies[i].watched;
        console.log(updatedMovies);
        this.setState({movies: updatedMovies});
      }
    }
  }

  render(){
    if(this.state.searchResults.length < 1) {
      return (
        <>
          <AddMovie addMovie={this.addMovie} setAddMovie={this.setAddMovie}/>

          <SearchBar setSearch={this.setSearch} searchResults={this.searchResults}/>

          <WatchTab switchTab1={this.switchTabWatched} switchTab2={this.switchTabToWatch}/>

          <MovieList movies={this.state.movies} toggleWatch={this.toggleWatch} tab={this.state.watchTab}/>
        </>
      )
    } else {
      return (
        <>
          <AddMovie addMovie={this.addMovie} setAddMovie={this.setAddMovie}/>

          <SearchBar setSearch={this.setSearch} searchResults={this.searchResults}/>

          <WatchTab switchTab1={this.switchTabWatched} switchTab2={this.switchTabToWatch}/>

          <MovieList movies={this.state.searchResults} toggleWatch={this.toggleWatch} tab={this.state.watchTab}/>
        </>
      )
    }
  }
}

export default App;