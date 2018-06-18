import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GenreSelect from "./GenreSelect";
import SelectActors from "./SelectActors";
import ActorChips from "./ActorChips";
import { addMovie, searchActors } from "../Client";

class AddMovieDialog extends React.Component {
  state = {
    open: false,
    title: "",
    actors: [],
    genre: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    const { title, actors, genre } = this.state;
    addMovie({ title, Actors: actors, genre },
      (movie) => {
        this.setState({ open: false, title: "", actors: [], genre: "" });
        this.props.addMovie(movie.movie);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  setActors = (actors) => {
    this.setState({ actors });
  }

  render() {
    const { title, actors, genre } = this.state;
    const {allActors} = this.props;
    return (
      <div style={{marginBottom: "15px", marginLeft: "15px"}}>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
        >Add Movie</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Movie</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a movie to your collection, we need some information about
              it
            </DialogContentText>
            <div>
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
            <div>
              <GenreSelect
                handleChange={this.handleChange}
                value={genre}
              />
            </div>
            <SelectActors actors={allActors} addActor={(actor)=>{this.setActors([...actors, actor])}} />
            <ActorChips actors={actors} setActors={this.setActors} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save Movie
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddMovieDialog;
