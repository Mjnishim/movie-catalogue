import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GenreSelect from "./GenreSelect";
import SelectActors from "./SelectActors";
import { searchMovies } from "../Client";

class MovieSearch extends React.Component {
  state = {
    open: false,
    title: "",
    name: "",
    genre: "",
    searchActors: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, name: "" });
  };

  handleSearch = () => {
    const { title, name, genre } = this.state;
    searchMovies({ title, actor: name, genre },
      (movies) => {
        this.setState({ open: false, name: "" });
        this.props.setMovies(movies.movies);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { title, searchActors, genre, name } = this.state;
    const {allActors} = this.props;
    return (
      <div style={{margin: "15px 0px 15px 15px"}}>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >Search Movies</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Search Movies</DialogTitle>
            <div style={{marginLeft: "15px"}}>
              <label>
                <input
                  type="radio"
                  value="name"
                  checked={!searchActors}
                  onChange={() => this.setState({searchActors: false, name: ""})}
                />
                Search by name/genre
              </label>
            </div>
            <div style={{marginLeft: "15px"}}>
              <label>
                <input
                  type="radio"
                  value="actor"
                  checked={searchActors}
                  onChange={() => this.setState({searchActors: true, genre: "", title: ""})}
                />
                Search by actor
              </label>
            </div>
            {searchActors ?
              <DialogContent>
                <SelectActors actors={allActors} addActor={(actor)=>{this.setState({name: actor.name})}} />
              </DialogContent> :
              <DialogContent>
                <div style={{marginBottom: "10px"}}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Movie Title"
                    value={title}
                    onChange={this.handleChange}
                    name="title"
                  />
                </div>
                <div style={{marginBottom: "10px"}}>
                  <GenreSelect
                    handleChange={this.handleChange}
                    value={genre}
                    name="genre"
                  />
                </div>
              </DialogContent>
            }
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSearch} color="primary">
              Search Movies
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MovieSearch;
