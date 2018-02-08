import React, { Component } from 'react'

import MainContainer from './MainContainer'
import PlaceAutoComplete from './PlaceAutoComplete'
import AutoSuggestion from './AutoSuggestion'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'

class Destination extends Component {
  render() {
    return (
      <MainContainer>
        <AutoSuggestion />
      </MainContainer>
    )
  }
}

export default Destination
