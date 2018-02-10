import React, { Component } from 'react';
import EventList from '../placeManager/EventList'

class EventsPage extends Component {
  render() {
    return (
      <div>
        <h1>
          <EventList/>
        </h1>
      </div>
    );
  }
}

export default EventsPage;