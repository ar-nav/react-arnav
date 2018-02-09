import React, { Component } from 'react'

import MainContainer from './MainContainer'
import AutoSuggestion from './AutoSuggestion'

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
