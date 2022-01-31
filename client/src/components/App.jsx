import React from 'react';
import axios from 'axios';
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

  fetch() {
    fetch('http://localhost:3000/movies')
    .then(response => response.json())
    .then(data => {
      for (let i in data) {
        if (data[i].watched === 1) {
          data[i].watched = true;
        } else {
          data[i].watched = false;
        }
      }
      this.setState({
        movies: data
      })
    });
  }

  componentDidMount() {
    this.fetch();
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
    let filtered = this.state.movies.filter(movie => {
      return movie.title.includes(this.state.search);
    });

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

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: this.state.addMovie, watched: 0})
    };

    fetch('http://localhost:3000/movies', requestOptions)
    .then (response => this.fetch());
  }

  toggleWatch(movie) {
    let watched;
    if (movie.watched === true) {
      watched = 0;
    } else {
      watched = 1;
    }
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: movie.id, watched: watched})
    };

    fetch('http://localhost:3000/movies', requestOptions)
    .then (response => this.fetch());
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