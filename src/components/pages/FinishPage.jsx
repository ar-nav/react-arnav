import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {withRouter} from 'react-router-dom'

import MainAppBar from '../common/MainAppBar'
import Button from 'material-ui/Button';

class FinishPage extends Component {
  render() {
    return (
      <div>
        <MainAppBar title='Finish'/>
        <div style={{flex:1, alignContent: 'center'}}>
          <h1>Congratulation!</h1>
          <h1>You've reach your destination</h1>
          <div style={{}}>
            <Button
              variant="raised"
              onClick={() => this.props.history.push('/destination') }
            >
              More Destinations
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {

};

export default withStyles(styles)(withRouter(FinishPage))
