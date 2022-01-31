import React from 'react';
import MovieInfo from './MovieInfo.jsx'

class MovieEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    }
    this.showInfo = this.showInfo.bind(this);
  }

  showInfo() {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render(){
    if(this.state.clicked) {
      if (this.props.movie.nonefound) {
        return (
          <>
            <div>{this.props.movie.title}</div>
          </>
        )
      } else {
        return (
          <>
            <div>{this.props.movie.title}</div>
            <button onClick={() => this.props.toggleWatch(this.props.movie)}>{this.props.movie.watched ? 'Watched' : 'To Watch'}</button>
            <button onClick={() => this.showInfo()}>^</button>
            <div>chungus chungus chungus</div>
          </>
        )
      }
    }else {
      if (this.props.movie.nonefound) {
        return (
          <>
            <div>{this.props.movie.title}</div>
          </>
        )
      } else {
        return (
          <>
            <div>{this.props.movie.title}</div>
            <button onClick={() => this.props.toggleWatch(this.props.movie)}>{this.props.movie.watched ? 'Watched' : 'To Watch'}</button>
            <button onClick={() => this.showInfo()}>details</button>
          </>
        )
      }
    }



  }

}

export default MovieEntry;