/* eslint jsx-a11y/img-redundant-alt: off */
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import { connect } from 'react-redux'
import QrReader from 'react-qr-reader'
import Button from 'material-ui/Button';
import gql from 'graphql-tag'

import DirectionRenderer from '../direction/DirectionRenderer';
import MarkerSearch from '../direction/MarkerSearch';
import MainAppBar from '../common/MainAppBar'
import { withApollo } from 'react-apollo'
// import client from '../../client'

const styles = {
  finishButton: {
    backgroundColor: '#FFEA00',
    zIndex: 1000,
    position: 'absolute',
    left: '37%',
    bottom: '1.5rem',
    marginTop: 10
  }
}

class Direction extends Component {
  constructor(props){
    super(props)
    this.state = {
      targetLoc: this.props.targetLocation,
      qrLocation: {
        name: null,
        latitude:0,
        longitude: 0
      },
      qrDelay: 10,
      qrResult: 'No result',
    };
    this.handleQrScan = this.handleQrScan.bind(this)
  }

  renderer = null;
  

  shouldComponentUpdate(nextProps, state) {
      return !isEqual(state, this.state);
  }

  onBackButtonEvent(e) {
    // e.preventDefault()
    // window.location.replace('/destination/location')
  }

  componentDidMount() {
    // window.onpopstate = this.onBackButtonEvent
  }

  componentWillUnmount(){
    console.log('location,.,.', this.props.history.location)
    window.location.replace(this.props.history.location.pathname)
  }
  handleMarkerFound = () => this.setState({ markerFound: true });

  handleQrScan(data){ 
    if(data){
    this.props.client.query({
      query:gql`{
      getPlace(
        ID:"${data}"
      ){
        ID
        name
        latitude
        longitude
      }
    }`}).then(queryResult => {
      let newQrLocation = {
        name: queryResult.data.getPlace.name,
        latitude:Number(queryResult.data.getPlace.latitude),
        longitude: Number(queryResult.data.getPlace.longitude)
      }
      this.setState({
        qrLocation: newQrLocation,

      })

    }).catch (err => {
      console.log(err)
    })
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
        <DirectionRenderer
          isTargetEvent={this.props.isTargetEvent}
          qrLocation={this.state.qrLocation}
          onMarkerFound={this.handleMarkerFound}
          targetLoc={this.state.targetLoc}
        ></DirectionRenderer>
        {!markerFound && <MarkerSearch />}
        <Button 
          style={styles.finishButton}
          variant='raised'
          onClick = {() => window.location.replace('/finish')}
        >Finish</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(Direction))