import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import LocationIcon from 'material-ui-icons/Place';
import {withRouter} from 'react-router-dom'

import { setPlacesLocation } from '../../store/action'

class PlaceListItem extends Component {

  handleClick(latitude, longitude) {
    let location = {
      latitude,
      longitude
    }

    this.props.setPlacesLocation(location)
    this.props.history.push('/direction')
    console.log('ini location diklik', location)
  }
  
  render() {
    return (
      <div>
        <ListItem button onClick={() => this.handleClick(this.props.latitude, this.props.longitude)}>
          <ListItemIcon>
            <LocationIcon/>
          </ListItemIcon>
          <ListItemText primary={this.props.name} />
        </ListItem>
        <Divider/>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  setPlacesLocation: (location) => dispatch(setPlacesLocation(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  (withRouter(PlaceListItem))
);

