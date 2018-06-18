import React, { Component } from "react";
import logo from "./logo.svg";
import AddMovie from "./components/AddMovie";
import AddActor from "./components/AddActor";
import DisplayMovies from "./components/DisplayMovies";
import MovieSearch from "./components/MovieSearch";
import { searchMovies, searchActors } from "./Client";
import "./App.css";

class App extends Component {
  state = {
    movies: [],
    actors: []
  };
  componentWillMount() {
    searchMovies({ title: "" }, allMovies => {
      this.setState({ movies: allMovies.movies });
    });
    searchActors("", allActors => {
      this.setState({ actors: allActors.actors });
    });
  }
  render() {
    const { movies, actors } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie Catalogue</h1>
        </header>
        <MovieSearch
          setMovies={movies => this.setState({ movies })}
          allActors={actors}
        />
        <AddActor
          addActor={actor => this.setState({ actors: [...actors, actor] })}
        />
        <AddMovie
          addMovie={movie => {
            this.setState({ movies: [...movies, movie] });
          }}
          allActors={actors}
        />
        <DisplayMovies movies={movies} />
      </div>
    );
  }
}

export default App;
