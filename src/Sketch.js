/* eslint jsx-a11y/img-redundant-alt: off */
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import RaisedButton from 'material-ui/RaisedButton';

import Settings from './Settings';
import SketchRenderer from './SketchRenderer';
import MoveControl from './MoveControl';
import MarkerSearch from './MarkerSearch';
import Tips from './Tips';

const styles = {
    backButton: {
        zIndex: 1000,
        position: 'absolute',
        right: '1rem',
        top: '1rem',
    }
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
            z: 0,
        },
        rotation: 3,
        scale: {
            x: 2,
            y: 2,
        }
    };

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

    render() {
        const {
            markerFound,
            showTips,
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

        const { image, blackImage } = this.props;

        return (
            <div>
            <a-scene stats embedded arjs='sourceType: webcam; detectionMode: mono; maxDetectionRate: 30; canvasWidth: 240; canvasHeight: 180'>

          
            <a-box position='0 0.5 0' material='opacity: 0.5; side: double'>
                <a-torus-knot radius='0.26' radius-tubular='0.05'>
                    <a-animation attribute="rotation" to="360 0 0" dur="3000" easing='linear' repeat="indefinite"></a-animation>
                </a-torus-knot>
            </a-box>
    
            <a-marker-camera preset='hiro'></a-marker-camera>
        </a-scene>
    
            </div>
        );
    }
}

export default Sketch;
