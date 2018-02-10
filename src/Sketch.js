/* eslint jsx-a11y/img-redundant-alt: off */
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import { connect } from 'react-redux'
import QrReader from 'react-qr-reader'

import SketchRenderer from './SketchRenderer';
import MarkerSearch from './MarkerSearch';

const styles = {
    backButton: {
        zIndex: 2001,
        position: 'absolute',
        right: '3rem',
        top: '3rem',
        marginTop: 10
    }
}

class Sketch extends Component {
  constructor(props){
    super(props)
    this.state = {
      showTips: true,
      markerFound: false,
      opacity: 1,
      isDetectingEdge: false,
      blur: 2,
      highTreshold: 20,
      lowTreshold: 50,
      coord: {
          x: 0,
          z: 5,
      },
      rotation: 0,
      scale: {
          x: 2,
          y: 2,
      },
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
    
    handleBack = () => {
        setTimeout(() => {
            // We can't reset the AR.js created elements (no dispose, reset or destroy methods available)
            window.location.reload();
        }, 500);
    }

    handleTranslateChange = ({ x, z }) => this.setState({ coord: { x, z } });

    handleZoomChange = ({ x, y }) => this.setState({ scale: { x, y } });

    handleRotationChange = (rotation) => this.setState({ rotation });

    handleOpacityChange = (event, opacity) => this.setState({ opacity });

    handleDetectEdgeChange = () => this.setState({ isDetectingEdge: !this.state.isDetectingEdge });

    handleBlurChange = (event, blur) => this.setState({ blur });

    handleLowTresholdChange = (event, lowTreshold) => this.setState({ lowTreshold });

    handleHighTresholdChange = (event, highTreshold) => this.setState({ highTreshold });

    handleHideTips = () => this.setState({ showTips: false });

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
            opacity,
            isDetectingEdge,
            blur,
            lowTreshold,
            highTreshold,
            coord: {
                x: coordX,
                z: coordZ,
            },
            scale: {
                x: scaleX,
                y: scaleY,
            },
            rotation,
        } = this.state;

        // const rotation = getAngle(this.state.targetLoc, this.state.currentLoc)
        const { image, blackImage } = this.props;
     
          return (
            <div>
              <QrReader
              delay={this.delay}
              onError={this.handleQrError}
              onScan={this.handleQrScan}
              style={{padding: 0, margin: 0, visibility:'hidden', width: '0%'}}
              showViewFinder={false}
            />
              <p style={{color:'orange', backgroundColor:'#0000ff6f', marginTop:300, marginLeft:0, zIndex:2002, position:'absolute'}}>{this.state.qrResult}</p>
              <SketchRenderer
                coordX={coordX}
                coordZ={coordZ}
                scaleX={scaleX}
                scaleY={scaleY}
                rotation={rotation}
                opacity={opacity}
                isDetectingEdge={isDetectingEdge}
                blur={blur}
                lowTreshold={lowTreshold}
                highTreshold={highTreshold}
                image={image}
                blackImage={blackImage}
                onMarkerFound={this.handleMarkerFound}
                targetLoc={this.state.targetLoc}
              ></SketchRenderer>
              {!markerFound && <MarkerSearch />}
              <button style={styles.backButton}
                onClick = {() => this.props.history.push('/finish')}
              >Finish</button>
          </div>
        );
    }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Sketch)