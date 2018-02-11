import React, { Component } from 'react'
import PlaceAutoComplete from './PlaceAutoComplete'
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  root: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%'
  }
})

class ByLocationTabPage extends Component {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <PlaceAutoComplete />
      </div>
    )
  }
}

export default withStyles(styles)(ByLocationTabPage)
