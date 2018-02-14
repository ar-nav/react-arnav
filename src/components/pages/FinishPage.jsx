import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {withRouter} from 'react-router-dom'
import FinishIcon from 'material-ui-icons/ThumbUp'

import MainAppBar from '../common/MainAppBar'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class FinishPage extends Component {

  onBackButtonEvent(e) {
    e.preventDefault()
    window.location.replace('/destination/location')
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent
  }
  
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <MainAppBar title='Finish'/>
        <div>
          <FinishIcon fontSize className={classes.good}/>
          <Typography variant="display1" gutterBottom>
            Congratulation!
          </Typography>
          <Typography variant="title" gutterBottom>
            You've reached your destination
          </Typography>
          <div style={{marginTop:30}}>
            <Button
              variant="raised"
              color="primary"
              size={'large'}
              onClick={() => this.props.history.push('/destination/location') }
            >
              More Destinations
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    // background: 'red',
    alignContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-around',
    minHeight: '500px',
    marginTop: 56
  },
  good:{
    fontSize: 150,
    color: '#848a8d',
    // backgroundColor: 'linear-gradient(45deg, #64e87b 30%, #49d896 90%)',
  }
})

export default withStyles(styles)(withRouter(FinishPage))
