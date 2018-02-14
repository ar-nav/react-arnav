import React, { Component } from 'react';

import MainAppBar from '../common/MainAppBar'
import EventPlaceRoute from '../eventPlace/EventPlaceRoute'


class PlacesManagerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0
    }
  }

  componentDidMount(){
    this.setState({height: window.innerHeight });
  }
  render() {

    return (

      <div >
        {/*<div style={{ height: this.state.height -56, marginTop: -56}}>*/}
        <MainAppBar title={'Event Manager'}/>
        <div style={{ height: this.state.height -56, marginTop: 56}}>
          <EventPlaceRoute/>
        </div>
      </div>
    );
  }
}


export default PlacesManagerPage