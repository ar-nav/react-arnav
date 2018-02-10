import React, { Component } from 'react';
import {connect} from 'react-redux'
import EventList from '../placeManager/EventList'
import MainAppBar from '../common/MainAppBar'

class PlacesManagerPage extends Component {
  render() {
    return (
      <div>
        <MainAppBar title={'Place Manager'}>
          yolo
        </MainAppBar>
        <EventList/>
      </div>
    );
  }
}

export default PlacesManagerPage;
