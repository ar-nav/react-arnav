/* globals THREE, requestAnimationFrame */
import React, {Component} from 'react'
import {geolocated} from 'react-geolocated'
import geolib from 'geolib'
import Switch from 'material-ui/Switch'
import InfoIcon from 'material-ui-icons/Info'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import ColladaLoader from 'three-collada-loader'

import yerrow from "../../assets/green-arrow.png"
import initializeRenderer from '../../utils/initializeRenderer'
import {initializeArToolkit, getMarker} from '../../utils/arToolkit'
// import detectEdge from '../../utils/detectEdge'


export const getAngle = (targetLoc, currentLoc) => {
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

export const compassHeading = (alpha, beta, gamma) => {
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

export const directionRendererFactory = ({
  THREE,
  initializeArToolkit,
  initializeRenderer,
  getMarker,
  requestAnimationFrame,
  // detectEdge
}) => {
  const {
    Camera,
    Group,
    Scene,
  } = THREE;

  return class DirectionRenderer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        compassHeading: 0,
        arrowRotation: 0,
        isShowInfo: false,
        isShowHud: true,
        anchorEl: null
      }
      this.getCompassHeading = this
        .getCompassHeading
        .bind(this)
    }

    getDistance(startLoc, endLoc) {
      if (startLoc && endLoc) {
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

      if (this.props.isTargetEvent) {
        if (this.props.qrLocation !== null) {
          currentLoc = this.props.qrLocation
        }
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

          if (this.props.isTargetEvent) {
            if (this.props.qrLocation !== null) {
              newCurrentLoc = this.props.qrLocation
            }
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

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    render() {
      console.log('==========>>>>>>>>>',this.props.qrLocation)
      return (
        <div>
          <canvas id="arpage" ref={this.storeRef}/>
          <div
            style={{
            marginTop: 0,
            padding: '10px',
            color: '#32792F',
            zIndex: 2002,
            position: 'absolute',
            display: this.state.isShowHud ? 'block': 'none',
            backgroundColor: '#FFFFFF8f',
            right:'0rem'
          }}>
            <img
              id="yerrow"
              src={yerrow}
              alt={"yellow arrow"}
              style={{
                MsTransform: `rotate(${-this.state.compassHeading + 90 - this.state.arrowRotation}deg)`, /* IE 9 */
                WebkitTransform: `rotate(${-this.state.compassHeading +90 - this.state.arrowRotation}deg)`, /* Safari */
                transform: `rotate(${-
                  this.state.compassHeading + 90 - this.state.arrowRotation}deg)`,
                  width: 50
                }}
            />
            <h3>{this.props.coords && this.getDistance(this.props.coords, this.props.targetLoc)} m</h3>

          </div>
          <div
            style={{
            backgroundColor: '#0000ff6f',
            marginTop: 0,
            color: 'yellow',
            zIndex: 2002,
            position: 'absolute',
            display: this.state.isShowInfo ? 'block': 'none'
          }}>
            {this.props.coords
              ? <table>
                  <tbody>
                    <tr>
                      <td>geo-latitude</td>
                      <td>{this.props.coords.latitude}</td>
                    </tr>
                    <tr>
                      <td>geo-longitude</td>
                      <td>{this.props.coords.longitude}</td>
                    </tr>
                    <tr>
                      <td>geo-altitude</td>
                      <td>{this.props.coords.altitude}</td>
                    </tr>
                    <tr>
                      <td>geo-heading</td>
                      <td>{this.props.coords.heading}</td>
                    </tr>
                    <tr>
                      <td>device-heading</td>
                      <td>{this.state.compassHeading}</td>
                    </tr>
                    <tr>
                      <td>geo-speed</td>
                      <td>{this.props.coords.speed}</td>
                    </tr>
                    <tr>
                      <td>Ang. diff</td>
                      <td>{this.state.arrowRotation} deg</td>
                    </tr>
                    <tr>
                      <td>Dist. to location</td>
                      <td>{this.getDistance(this.props.coords, this.props.targetLoc)} m</td>
                    </tr>
                    {/* <tr>
                      <td>QR location</td>
                      <td>{(this.props.qrLocation !== null ? this.props.qrLocation : 0)}</td>
                    </tr> */}
                  </tbody>
                </table>
              : <div>Getting the location data&hellip;
              </div>}
          </div>
          <div
            style={{
              position: 'absolute',
              left:'41%',
              bottom: '1rem'
            }}
          >
            <Button
              aria-owns={this.state.anchorEl ? 'fade-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              variant="fab"
              color="primary"
            >
              <InfoIcon/>
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <FormGroup>
                <MenuItem>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.isShowHud}
                        onChange={(event, checked) => this.setState({ isShowHud: checked })}
                      />}
                    label="Toggle HUD"
                  />
                </MenuItem>
                <MenuItem>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.isShowInfo}
                        onChange={(event, checked) => this.setState({ isShowInfo: checked })}
                      />
                    }
                    label="Toggle Info"
                  />
                </MenuItem>
              </FormGroup>
            </Menu>
          </div>
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
})(directionRendererFactory({
  THREE,
  initializeArToolkit,
  getMarker,
  initializeRenderer,
  requestAnimationFrame: requestAnimationFrame,
  // detectEdge
}));
