/* eslint jsx-a11y/img-redundant-alt: off */
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import { connect } from 'react-redux'
import QrReader from 'react-qr-reader'
import Button from 'material-ui/Button';

import DirectionRenderer from '../direction/DirectionRenderer';
import MarkerSearch from '../direction/MarkerSearch';
import MainAppBar from '../common/MainAppBar'

const styles = {
  backButton: {
    zIndex: 2001,
    position: 'absolute',
    right: '2rem',
    bottom: '1.5rem',
    marginTop: 10
  }
}

class Direction extends Component {
  constructor(props){
    super(props)
    this.state = {
      targetLoc: this.props.targetLocation,
      qrDelay: 10,
      qrResult: 'No result',
    };
    this.handleQrScan = this.handleQrScan.bind(this)
  }

  renderer = null;

  shouldComponentUpdate(nextProps, state) {
      return !isEqual(state, this.state);
  }

  handleMarkerFound = () => this.setState({ markerFound: true });

  handleQrScan(data){
    if(data){
      //1. query GET location by ID to GraphQL
      let qrLocation = {
        latitude: 5,
        longitude: -5
      }
      // 2. hasil query

      this.setState({
        targetLoc: qrLocation,
      })
    }
  }

  handleQrError(err){
    console.error(err)
  }

  render() {
    const {
        markerFound,
    } = this.state
  
    return (
      <div>
        <MainAppBar 
          title='Direction' 
          position='absolute'
          style={{zIndex:2000}}
        />
        <QrReader
        delay={this.delay}
        onError={this.handleQrError}
        onScan={this.handleQrScan}
        style={{padding: 0, margin: 0, visibility:'hidden', width: '0%'}}
        showViewFinder={false}
      />
        <p style={{color:'orange', backgroundColor:'#0000ff6f', marginTop:300, marginLeft:0, zIndex:2002, position:'absolute'}}>{this.state.qrResult}</p>
        <DirectionRenderer
          isTargetEvent={this.props.isTargetEvent}
          qrLocation={this.props.qrLocation}
          onMarkerFound={this.handleMarkerFound}
          targetLoc={this.state.targetLoc}
        ></DirectionRenderer>
        {!markerFound && <MarkerSearch />}
        <Button 
          style={styles.backButton}
          variant='raised'
          color='blue'
          onClick = {() => window.location.replace('/finish')}
        >Finish</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Direction)