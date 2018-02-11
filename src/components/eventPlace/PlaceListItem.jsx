import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import LocationIcon from 'material-ui-icons/Place';

class PlaceListItem extends Component {
  render() {
    return (
      <div>
        <ListItem button>
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

export default PlaceListItem;
