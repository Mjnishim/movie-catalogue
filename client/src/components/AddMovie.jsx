import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GenreSelect from "./GenreSelect";
import { addMovie } from "../Client";

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
    addMovie({ title, actors, genre }, () => this.setState({ open: false }));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { title, actors, genre } = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Add Movie</Button>
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
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Movie Title"
              value={title}
              onChange={this.handleChange}
              name="title"
            />
            <GenreSelect
              handleChange={this.handleChange}
              value={genre}
            />
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
