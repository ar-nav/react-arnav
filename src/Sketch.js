/* eslint jsx-a11y/img-redundant-alt: off */
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import Button from 'material-ui/Button'


// import Settings from './Settings';
import SketchRenderer from './SketchRenderer';
// import MoveControl from './MoveControl';
import MarkerSearch from './MarkerSearch';
// import Tips from './Tips';

const styles = {
    backButton: {
        zIndex: 2001,
        position: 'absolute',
        right: '3rem',
        top: '3rem',
        marginTop: 10
    }
}

const getAngle = (targetLoc, currentLoc) => {
  let deltaLat = targetLoc.lat - currentLoc.lat
  let deltaLng = targetLoc.lng - currentLoc.lng
  return Math.atan2(deltaLng, deltaLat)
}
class Sketch extends Component {
    state = {
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
        // currentLoc: {
        //   lat: 10,
        //   lng: 0
        // },
        targetLoc: {
          latitude: -6.26097,
          longitude: 106.78145,
        },
        removeSketchRenderer: true
    };

    renderer = null;

    shouldComponentUpdate(nextProps, state) {
        return !isEqual(state, this.state);
    }

    componentWillUnmount() {
      console.log('will unmount')
      this.setState({removeSketchRenderer: true})
    }

    componentDidMount() {
      this.setState({removeSketchRenderer: false})
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
              {console.log('isremovesketch-----------',this.state.removeSketchRenderer)}
              {!this.state.removeSketchRenderer && 
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
                />
              }
              {!markerFound && <MarkerSearch />}
              <button style={styles.backButton}
                // onClick={() => this.props.history.push('/finish')}
                onCLick = {() => window.location.replace('/finish')}
              >Finish</button>
          </div>
        );
    }
}

export default Sketch;
