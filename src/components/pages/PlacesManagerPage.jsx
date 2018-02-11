import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import MainAppBar from '../common/MainAppBar'
import EventPlaceRoute from '../eventPlace/EventPlaceRoute'



class PlacesManagerPage extends Component {
  render() {

    return (
      <div>
        <MainAppBar title={'Event Manager'}/>
        <EventPlaceRoute/>
      </div>
    );
  }
}


export default PlacesManagerPage