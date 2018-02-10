import React from 'react'
import {connect} from 'react-redux' 

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import {toggleDrawer} from '../../store/action'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {  
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton onClick={() => props.openDrawer()} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {props.title}
          </Typography>
        </Toolbar>
        {props.children}
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  openDrawer: () => (dispatch(toggleDrawer(true)))
})


const AppBarwithStyles = withStyles(styles)(ButtonAppBar)

export default connect(null, mapDispatchToProps)(AppBarwithStyles)
