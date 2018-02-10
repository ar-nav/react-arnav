import React, { Component } from 'react';
import {connect} from 'react-redux'
import EventList from '../placeManager/EventList'

class PlacesManagerPage extends Component {
  render() {
    return (
      <div>
        <h1>Place Manager</h1>
        <EventList/>
      </div>
    );
  }
}

export default PlacesManagerPage;
