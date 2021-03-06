import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
  handleDelete = data => () => {
    const chipData = [...this.props.actors];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.props.setActors(chipData);
  };

  render() {
    const { classes, actors } = this.props;
    return (
      <Paper className={classes.root}>
        {actors.map(data => {
          return (
            <Chip
              key={data.name}
              label={data.name}
              onDelete={this.handleDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </Paper>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
