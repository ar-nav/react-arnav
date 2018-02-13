import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';

const styles = theme => ({
  root: {
    marginTop: '20px',
    width: '100%',
    height: '50vh',
    display: 'flex',
    justifyContent: 'center',

  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    marginTop: '20px'
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} thickness={5} />
    </div>
  );
}



export default withStyles(styles)(CircularIndeterminate);