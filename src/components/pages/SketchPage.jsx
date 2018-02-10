/* eslint jsx-a11y/img-redundant-alt: off */
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import { connect } from 'react-redux'
import QrReader from 'react-qr-reader'
import Button from 'material-ui/Button';

import SketchRenderer from '../direction/SketchRenderer';
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

class Sketch extends Component {
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
      this.setState({
        qrResult: data,
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
        <SketchRenderer
          onMarkerFound={this.handleMarkerFound}
          targetLoc={this.state.targetLoc}
        ></SketchRenderer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sketch)