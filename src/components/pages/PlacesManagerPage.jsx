import React, { Component } from 'react';

import MainAppBar from '../common/MainAppBar'
import EventPlaceRoute from '../eventPlace/EventPlaceRoute'


class PlacesManagerPage extends Component {
  render() {

    return (
      <div>
        <MainAppBar title={'Event Manager'}/>
        <div style={{marginTop: '56px'}}>
          <EventPlaceRoute/>
        </div>

      </div>
    );
  }
}


export default PlacesManagerPage