import React, { Component } from 'react'

import MainContainer from './MainContainer'
import AutoSuggestion from './AutoSuggestion'
import TabNavigator from './TabNavigator'

class Destination extends Component {
  render() {
    return (
      <TabNavigator/>
      // <MainContainer>
        // <AutoSuggestion />
      // </MainContainer>
    )
  }
}

export default Destination
