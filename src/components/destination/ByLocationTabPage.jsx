import React, { Component } from 'react'
import PlaceAutoComplete from './PlaceAutoComplete'
import Button from 'material-ui/Button';
import NavIcon from 'material-ui-icons/Navigation';
import {withStyles} from 'material-ui/styles';
import {withRouter} from 'react-router-dom'
import MapWithSeachBox from './MapWithSearchBox'
const styles = theme => ({
  root: {
    backgroundColor: 'red',
    width: '100%',
    height: '400',
    display:'block'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    left: theme.spacing.unit * 2,
  },
})

class ByLocationTabPage extends Component {
  render() {
    const {classes} = this.props
    return (
      <div>
        <MapWithSeachBox/>
        <Button onClick={() => {
          this.props.history.push('/direction')
        }} variant="fab" color="primary" aria-label="Add Event"
                className={classes.fab}>
          <NavIcon/>
        </Button>
      </div>


    )
  }
}

export default withStyles(styles)(withRouter(ByLocationTabPage))