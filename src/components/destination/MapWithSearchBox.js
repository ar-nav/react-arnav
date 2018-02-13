import React, { Component } from 'react'
import {fetchDetailTarget, fetchSuggestions} from "../../store/action";
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';

import {storeTargetLocation} from "../../store/action";

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
    containerElement: <div style={{ height: `550px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
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
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
          console.log('onPlacesChanged', nextCenter.lat(), nextCenter.lng())
          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          }, () => {
            this.props.storeLocation({
              latitude : nextCenter.lat(),
              longitude: nextCenter.lng()
            })
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
          width: `260px`,
          height: `42px`,
          marginTop: `47px`,
          marginLeft: `10px`,

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
  fetchSuggestions: (query) =>
    dispatch(fetchSuggestions(query, { lat: -6.266, long: 106.7828454 })),
  fetchDetailTarget: (id) => dispatch(fetchDetailTarget(id))
})



export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MapWithSearchBox))