import React, { Component } from 'react'

import MainContainer from './MainContainer'
import PlaceAutoComplete from './PlaceAutoComplete'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'

class Destination extends Component {
  render() {
    return (
      <MainContainer>
        <PlaceAutoComplete />
      </MainContainer>
    )
  }
}

export default Destination
