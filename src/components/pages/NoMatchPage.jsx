import React, { Component } from 'react';
import MainAppBar from '../common/MainAppBar'

class NoMatch extends Component {
  render() {
    return (
      <div>
        <MainAppBar title={'Not Found'}/>
        <div style={{width: '100%', height: '100%', background:'yellow', display: 'flex'}}>
          NOT FOUND
        </div>
      </div>

    );
  }
}

NoMatch.propTypes = {

};

export default NoMatch;