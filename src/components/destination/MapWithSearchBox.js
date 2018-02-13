import React, { Component } from 'react'
import {fetchDetailTarget, fetchSuggestions} from "../../store/action";
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';

import gmapstyle from './gmapstyle'
import {storeTargetLocation, storeFormLocation} from "../../store/action";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const GMAP_API_KEY = 'AIzaSyDNqypxVJeYCe0cTHMurpIu9Yf0wNuuAzI'

const MapWithSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GMAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: '100%', minHeight: '100%' }} />,
    mapElement: <div style={{ height: `100%`, minHeight: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      //hacktiv 8 latitude: -6.2607187, longitude: 106.78161620000003
      this.setState({
        bounds: null,
        center: {
          lat: -6.2607187, lng: 106.78161620000003
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          console.log(places[0])
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
          console.log('onPlacesChanged', nextCenter.lat(), nextCenter.lng())
          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          }, () => {
            console.log('isManager', this.props.isManager)
            const namex = places[0] ? places[0].name : ''
            if(this.props.isManager){
              this.props.storeFormLocation({
                name:namex ,
                latitude : nextCenter.lat(),
                longitude: nextCenter.lng()
              })
            }else{
              this.props.storeLocation({
                name: namex,
                latitude : nextCenter.lat(),
                longitude: nextCenter.lng()
              })
            }

          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    defaultOptions={{ styles: gmapstyle, disableDefaultUI: true }}

  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}

    >
      <input
        type="text"
        placeholder="Search location"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: '90% ',
          height: `42px`,
          marginTop: `20px`,
          marginLeft: '5%',
          marginRight:'5%',
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
  </GoogleMap>
);
const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  storeLocation: (loc) => dispatch(storeTargetLocation(loc)),
  storeFormLocation: (loc) => dispatch(storeFormLocation(loc)),
})



export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MapWithSearchBox))