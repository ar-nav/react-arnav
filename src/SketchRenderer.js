/* globals THREE, requestAnimationFrame */
import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';
import geolib from 'geolib'

import initializeRenderer from './utils/initializeRenderer';
import { initializeArToolkit, getMarker } from './utils/arToolkit';
import detectEdge from './utils/detectEdge';
import ColladaLoader from 'three-collada-loader'

const getAngle = (targetLoc, currentLoc) => {
  let parsedTargetLoc = {
    latitude: targetLoc.latitude,
    longitude: targetLoc.longitude
  }
  if ((parsedTargetLoc === undefined) || (currentLoc === undefined)){
    return 0
  } else {
    let result = geolib.getCompassDirection(currentLoc ,parsedTargetLoc ).bearing
    result = -result *Math.PI/180
    return result
  }
}

export const sketchRendererFactory = ({ THREE, initializeArToolkit, initializeRenderer, getMarker, requestAnimationFrame, detectEdge }) => {
  const { Camera, DoubleSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, Texture } = THREE;
  
  return class SketchRenderer extends Component {
    getDistance(startLoc, endLoc) {
      if( startLoc.latitude && startLoc.longitude && endLoc.latitude && endLoc.longitude) {
        let parsedStartLoc = {latitude: startLoc.latitude, longitude: startLoc.longitude}
        return geolib.getDistance(parsedStartLoc, endLoc)
      } 
      
    }

    componentDidMount() {
      const {
        opacity,
        coordX,
        coordZ,
        scaleX,
        scaleY,
        rotation,
        onMarkerFound,
      } = this.props;
      
      const renderer = this.renderer = initializeRenderer(this.canvas);
      
      const scene = this.scene = new Scene();
      const camera = this.camera = new Camera();
      scene.add(camera);
      
      const markerRoot = new Group();
      scene.add(markerRoot);
      const onRenderFcts = [];
      const arToolkitContext = initializeArToolkit(renderer, camera, onRenderFcts);
      const marker = getMarker(arToolkitContext, markerRoot);
      
      marker.addEventListener('markerFound', onMarkerFound);
      
      const geometry = new PlaneGeometry(1, 1, 1);
      
      this.image = this.props.image;
      this.blackImage = this.props.blackImage;
      
      const texture = new Texture(this.image);
      texture.needsUpdate = true;
      
      this.material = new MeshBasicMaterial({
        map: texture,
        opacity,
        side: DoubleSide,
        transparent: true,
      });
      
      this.mesh = new Mesh(geometry, this.material);
      this.mesh.rotation.x = - Math.PI / 2; // -90°
      this.mesh.rotation.z = rotation;
      this.mesh.position.x = coordX;
      this.mesh.position.z = coordZ;
      this.mesh.scale.x = scaleX;
      this.mesh.scale.y = scaleY;
      markerRoot.add(this.mesh);

      let arrow
      let currentLoc = {
        latitude: (this.props.coords===null) ? 0 : this.props.coords.latitude,
        longitude: (this.props.coords===null) ? 0 : this.props.coords.longitude
      }
      let targetLoc = this.props.targetLoc
        var loader = new ColladaLoader( );
        loader.options.localImageMode = true
				loader.load( 'https://raw.githubusercontent.com/ar-nav/react-arnav/3d-model/src/assets/directional-generic-marker.dae', function ( collada ) {
          arrow = collada.scene;
          arrow.name = 'PANAH'
          arrow.rotation.y = getAngle(targetLoc, currentLoc) + Math.PI/2
          arrow.rotation.z = 0 //Math.abs(rotation)*0.7 ||0.2
          arrow.rotation.x = 0 //Math.abs(rotation)*0.4 ||0.2
          arrow.position.set(0,0,0)
          arrow.scale.set(2,1,1)
          scene.add(arrow)
          markerRoot.add(arrow)
				});

          // render the scene
          onRenderFcts.push(() => {
            let newCurrentLoc = {
              latitude: (this.props.coords===null) ? 0 : this.props.coords.latitude,
              longitude: (this.props.coords===null) ? 0 : this.props.coords.longitude
            }
            if (scene.children[1].children[1]) {
              scene.children[1].children[1].rotation.y = getAngle(targetLoc, newCurrentLoc) + Math.PI/2
            }
              renderer.render(scene, camera);
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
            this.renderer.dispose();
        }

        storeRef = node => {
            this.canvas = node;
        }

        componentDidUpdate() {
            const { coordX, coordZ, scaleX, scaleY, rotation } = this.props;
            this.mesh.position.x = coordX;
            this.mesh.position.z = coordZ;
            this.mesh.scale.x = scaleX;
            this.mesh.scale.y = scaleY;
            this.mesh.rotation.z = rotation;
            this.mesh.needsUpdate = true;

            const { blackImage, image } = this.props;
            const { opacity, isDetectingEdge, blur, lowTreshold, highTreshold } = this.props;
            if (isDetectingEdge) {
                this.material.opacity = 1;
                const alphaImage = detectEdge(image, { blur, lowTreshold, highTreshold });
                const alphaTexture = new Texture(alphaImage);
                alphaTexture.needsUpdate = true;
                this.material.alphaMap = alphaTexture;
                this.material.map.image = blackImage;
                this.material.map.needsUpdate = true;
            } else {
                this.material.opacity = opacity;
                this.material.alphaMap = null;
                const texture = new Texture(image);
                texture.needsUpdate = true;
                this.material.map = texture;
            }
            this.material.needsUpdate = true;
        }

        render() {
            return (
              <div>
                <canvas id="arpage" ref={this.storeRef} />
                <div style={{backgroundColor:'#0000ff6f', marginTop:0, color:'yellow', zIndex:2002, position:'absolute'}}>
                  {this.props.coords
                  ? <table>
                    <tbody>
                    <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
                    <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
                    <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
                    <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
                    <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
                    <tr><td>Bearing (rad)</td><td>{getAngle(this.props.coords ,this.props.targetLoc)}</td></tr>
                    <tr><td>distance</td><td>{this.getDistance(this.props.coords, this.props.targetLoc)}</td></tr>
                    </tbody>
                  </table>
                  : <div>Getting the location data&hellip; </div>}
                </div>
              </div>
            );
        }
    }
};

// export default sketchRendererFactory({
//     THREE,
//     initializeArToolkit,
//     getMarker,
//     initializeRenderer,
//     requestAnimationFrame: requestAnimationFrame,
//     detectEdge,
// });

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
  watchPosition: true ,
})(sketchRendererFactory({
  THREE,
  initializeArToolkit,
  getMarker,
  initializeRenderer,
  requestAnimationFrame: requestAnimationFrame,
  detectEdge,
}));
