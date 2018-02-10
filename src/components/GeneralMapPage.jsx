import React, { Component } from 'react'
// import PropTypes from 'prop-types';

import AutoSuggestion from './AutoSuggestion'
import MapContain from './MapContain'

class GeneralMapPage extends Component {
  render() {
    const style = {
      width: '100%',
      height: 300,
    }
    return (
      <div>
        <AutoSuggestion />
        <div style={style}>
          <MapContain />
        </div>
      </div>
    )
  }
}

export default GeneralMapPage
