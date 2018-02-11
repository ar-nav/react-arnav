import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';

import PlaceListItem from './PlaceListItem'

class PlaceList extends Component {
  render() {
    const places = [{id: 1, name: 'Daihatsu'},{id: 2, name: 'Ferarri'}]

    return (
      <div>
        {places.map((place, i) => <PlaceListItem key={i} {...place}/>)}
      </div>
    );
  }
}

export default PlaceList;
