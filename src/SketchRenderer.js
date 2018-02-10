/* globals THREE, requestAnimationFrame */
import React, {Component} from 'react';
import {geolocated} from 'react-geolocated';
import geolib from 'geolib'

import yerrow from "./assets/yellow.png"
import initializeRenderer from './utils/initializeRenderer';
import {initializeArToolkit, getMarker} from './utils/arToolkit';
import detectEdge from './utils/detectEdge';
import ColladaLoader from 'three-collada-loader'

const getAngle = (targetLoc, currentLoc) => {
  let parsedTargetLoc = {
    latitude: targetLoc.latitude,
    longitude: targetLoc.longitude
  }
  if ((parsedTargetLoc === undefined) || (currentLoc === undefined)) {
    return 0
  } else {
    let result = geolib
      .getCompassDirection(currentLoc, parsedTargetLoc)
      .bearing
    result = -result * Math.PI / 180
    return result
  }
}

const compassHeading = (alpha, beta, gamma) => {
  // Convert degrees to radians
  let alphaRad = alpha * (Math.PI / 180);
  let betaRad = beta * (Math.PI / 180);
  let gammaRad = gamma * (Math.PI / 180);
  // Calculate equation components
  let cA = Math.cos(alphaRad);
  let sA = Math.sin(alphaRad);
  // let cB = Math.cos(betaRad);
  let sB = Math.sin(betaRad);
  let cG = Math.cos(gammaRad);
  let sG = Math.sin(gammaRad);
  // Calculate A, B, C rotation components
  let rA = -cA * sG - sA * sB * cG;
  let rB = -sA * sG + cA * sB * cG;
  // let rC = -cB * cG;
  // Calculate compass heading
  let compassHeading = Math.atan(rA / rB);
  // Convert from half unit circle to whole unit circle
  if (rB < 0) {
    compassHeading += Math.PI;
  } else if (rA < 0) {
    compassHeading += 2 * Math.PI;
  }
  // Convert radians to degrees
  compassHeading *= 180 / Math.PI;
  return compassHeading;
}

export const sketchRendererFactory = ({
  THREE,
  initializeArToolkit,
  initializeRenderer,
  getMarker,
  requestAnimationFrame,
  detectEdge
}) => {
  const {
    Camera,
    Group,
    Scene,
  } = THREE;

  return class SketchRenderer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        compassHeading: 0,
        arrowRotation: 0
      }
      this.getCompassHeading = this
        .getCompassHeading
        .bind(this)
    }

    getDistance(startLoc, endLoc) {
      if (startLoc.latitude && startLoc.longitude && endLoc.latitude && endLoc.longitude) {
        let parsedStartLoc = {
          latitude: startLoc.latitude,
          longitude: startLoc.longitude
        }
        return geolib.getDistance(parsedStartLoc, endLoc)
      }
    }

    getCompassHeading() {
      window.addEventListener('deviceorientationabsolute', (evt) => {
        var heading = null;
        heading = compassHeading(evt.alpha, evt.beta, evt.gamma);
        let result = heading
        this.setState({compassHeading: result})
      }, {absolute: true});
    }

    componentDidMount() {
      const {
        onMarkerFound
      } = this.props;

      this.getCompassHeading()

      const renderer = this.renderer = initializeRenderer(this.canvas);

      const scene = this.scene = new Scene();
      const camera = this.camera = new Camera();
      scene.add(camera);

      const markerRoot = new Group();
      scene.add(markerRoot);
      const onRenderFcts = [];
      const arToolkitContext = this.arToolkitContext = initializeArToolkit(renderer, camera, onRenderFcts);
      const marker = getMarker(arToolkitContext, markerRoot);

      marker.addEventListener('markerFound', onMarkerFound);

      let arrow
      let currentLoc = {
        latitude: (this.props.coords === null)
          ? 0
          : this.props.coords.latitude,
        longitude: (this.props.coords === null)
          ? 0
          : this.props.coords.longitude
      }
      let targetLoc = this.props.targetLoc
      this.setState({arrowRotation: getAngle(targetLoc, currentLoc)*180/Math.PI})
      var loader = new ColladaLoader();
      loader.options.localImageMode = true
      loader.load('https://raw.githubusercontent.com/ar-nav/react-arnav/qr-reader-dev/src/assets/di' +
          'rectional-generic-marker.dae',
      function (collada) {
        arrow = collada.scene;
        arrow.name = 'PANAH'
        arrow.rotation.y = getAngle(targetLoc, currentLoc) + Math.PI / 2
        arrow.rotation.z = 0 //Math.abs(rotation)*0.7 ||0.2
        arrow.rotation.x = 0 //Math.abs(rotation)*0.4 ||0.2
        arrow
          .position
          .set(0, 0, 0)
        arrow
          .scale
          .set(2, 1, 1)
        scene.add(arrow)
        markerRoot.add(arrow)
      });

      // render the scene
      onRenderFcts.push(() => {
        if (scene.children[1]) {
          let newCurrentLoc = {
            latitude: (this.props.coords === null)
              ? 0
              : this.props.coords.latitude,
            longitude: (this.props.coords === null)
              ? 0
              : this.props.coords.longitude
          }
          if (scene.children[1].children[1]) {
            scene.children[1].children[1].rotation.y = getAngle(targetLoc, newCurrentLoc) + Math.PI / 2
          }
          renderer.render(scene, camera);
        }
      });

      // run the rendering loop
      var lastTimeMsec = null;

      function animate(nowMsec) {
        // keep looping
        requestAnimationFrame(animate);
        // measure time
        lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
        const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
        lastTimeMsec = nowMsec;
        // call each update function
        onRenderFcts.forEach(onRenderFct => {
          onRenderFct(deltaMsec / 1000, nowMsec / 1000);
        });
      }
      requestAnimationFrame(animate);
    }

    componentWillUnmount() {
      this
        .renderer
        .dispose();
      let video = document.getElementsByTagName('video')[0]

      video.pause()
      video.src = ''
      video.load()
    }

    storeRef = node => {
      this.canvas = node;
    }

    render() {
      return (
        <div>
          <canvas id="arpage" ref={this.storeRef}/>
          <div
            style={{
            marginTop: 0,
            color: 'yellow',
            zIndex: 2002,
            position: 'absolute'
          }}>
            <img
              id="yerrow"
              src={yerrow}
              alt={"yellow arrow"}
              // className = {yerrowStyle}
              style={{
                MsTransform: `rotate(${-this.state.compassHeading + 90 - this.state.arrowRotation}deg)`, /* IE 9 */
                WebkitTransform: `rotate(${-this.state.compassHeading +90 - this.state.arrowRotation}deg)`, /* Safari */
                transform: `rotate(${-
                  this.state.compassHeading + 90 - this.state.arrowRotation}deg)`,
                width: 50,
                marginLeft: 300,
              }}
            />
          </div>
          <div
            style={{
            backgroundColor: '#0000ff6f',
            marginTop: 0,
            color: 'yellow',
            zIndex: 2002,
            position: 'absolute'
          }}>
            {this.props.coords
              ? <table>
                  <tbody>
                    <tr>
                      <td>latitude</td>
                      <td>{this.props.coords.latitude}</td>
                    </tr>
                    <tr>
                      <td>longitude</td>
                      <td>{this.props.coords.longitude}</td>
                    </tr>
                    <tr>
                      <td>altitude</td>
                      <td>{this.props.coords.altitude}</td>
                    </tr>
                    <tr>
                      <td>heading</td>
                      <td>{this.props.coords.heading}, {this.state.arrowRotation}</td>
                    </tr>
                    <tr>
                      <td>heading2</td>
                      <td>{this.state.compassHeading}</td>
                    </tr>
                    <tr>
                      <td>speed</td>
                      <td>{this.props.coords.speed}</td>
                    </tr>
                    <tr>
                      <td>Bearing (rad)</td>
                      <td>{getAngle(this.props.coords, this.props.targetLoc)}</td>
                    </tr>
                    <tr>
                      <td>distance</td>
                      <td>{this.getDistance(this.props.coords, this.props.targetLoc)}</td>
                    </tr>
                  </tbody>
                </table>
              : <div>Getting the location data&hellip;
              </div>}
          </div>
          <div></div>
        </div>
      );
    }
  }
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000,
  watchPosition: true
})(sketchRendererFactory({
  THREE,
  initializeArToolkit,
  getMarker,
  initializeRenderer,
  requestAnimationFrame: requestAnimationFrame,
  detectEdge
}));
