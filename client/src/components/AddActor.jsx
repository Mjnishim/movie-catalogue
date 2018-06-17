import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addActor } from "../Client";

export default class FormDialog extends React.Component {
  state = {
    open: false,
    name: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    const { name } = this.state;
    addActor({ name }, () => this.setState({ open: false }));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name } = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Add Actor</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Actor</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add an actor to your list of actors, we need their name
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Actor"
              value={name}
              onChange={this.handleChange}
              name="name"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save Actor
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
