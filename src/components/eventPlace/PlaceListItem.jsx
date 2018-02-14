import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import LocationIcon from 'material-ui-icons/MyLocation';
import {withRouter} from 'react-router-dom'
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

import generatePDF from '../../utils/pdfGenerator'
import { setPlacesLocation } from '../../store/action'
import Typography from 'material-ui/Typography';


class PlaceListItem extends Component {

  handleClick(qrLocation) {
    if (this.props.parentRoute === 'destination') {
      this.props.setPlacesLocation(qrLocation)
      this.props.history.push('/direction')
    }
  }

  downloadMarker(placeId, placeName) {
    generatePDF(placeId, placeName)
  }
  
  render() {
    const qrLocation = {
      latitude: this.props.latitude,
      longitude: this.props.longitude
    }
    return (
      <div>
        <ListItem 
          button={this.props.parentRoute === 'destination'} 
          onClick={() => this.handleClick(qrLocation)}
        >
          <ListItemIcon>
            <LocationIcon/>
          </ListItemIcon>
          <ListItemText primary={this.props.name} />
          {(this.props.parentRoute === 'manager') &&
            <div
              className={this.props.classes.markerButton}
            >
              <Button
                style={{ paddingRight: '6px', paddingLeft: '6px',}}
                variant="flat"
                onClick={() => this.downloadMarker(this.props.ID, this.props.name)}
              >< Icon>file_download</Icon> Marker</Button>
            </div>

          }
        </ListItem>
        <Divider/>
      </div>
    );
  }
}

const style = theme => ({
  markerButton: {
    // width: 20,
    // paddingLeft: - 10,
    // paddingRight: 3,
    display: 'flex'
  }
})

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  setPlacesLocation: (location) => dispatch(setPlacesLocation(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  (withRouter(withStyles(style)(PlaceListItem)))
);

