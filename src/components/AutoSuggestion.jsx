import React, { Component } from 'react'
import { connect } from 'react-redux'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { CircularProgress } from 'material-ui/Progress'
import purple from 'material-ui/colors/purple'

const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="Demo__suggestion-item">
    <i className="fa fa-map-marker Demo__suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
)

const renderFooter = () => (
  <div className="Demo__dropdown-footer">
    <div>
    </div>
  </div>
)

const cssClasses = {
  root: 'form-group',
  input: 'Demo__search-input',
  autocompleteContainer: 'Demo__autocomplete-container',
}

const shouldFetchSuggestions = ({ value }) => value.length > 2

const onError = (status, clearSuggestions) => {
  console.log(
    'Error happened while fetching suggestions from Google Maps API',
    status
  )
  clearSuggestions()
}

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
    }
    
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleSelect(address) {
    this.setState({
      address,
      loading: true,
    })
    
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      console.log('ini address', address)
      console.log('Geocode Success', { lat, lng })
      this.setState({
        geocodeResults: this.renderGeocodeSuccess(lat, lng),
        loading: false,
      })
    })
    .catch(error => {
      console.log('Geocode Error', error)
      this.setState({
        geocodeResults: this.renderGeocodeFailure(error),
        loading: false,
      })
    })
  }
  
  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    })
  }
  
  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }
  
  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude:{' '}
        <strong>
          {lat}, {lng}
        </strong>
      </div>
    )
  }
  
  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {
        console.log('Blur event!')
      },
      onFocus: () => {
        console.log('Focused!')
      },
      autoFocus: true,
      placeholder: 'Search Places',
      name: 'Demo__input',
      id: 'my-input-id',
    }
    
    // const { classes } = this.props
    return (
      <div>
        <PlacesAutocomplete
          renderSuggestion={renderSuggestion}
          renderFooter={renderFooter}
          inputProps={inputProps}
          classNames={cssClasses}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          onError={onError}
          shouldFetchSuggestions={shouldFetchSuggestions}
        />
        {this.state.loading && (
          <CircularProgress  color="secondary" />
        )}
        {this.state.geocodeResults && (
          <div className="geocoding-results">{this.state.geocodeResults}</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

// const mapDispatchToProps = dispatch => ({
//   fetchSuggestions: (query) =>
//     dispatch(fetchSuggestions(query, { lat: -6.266, long: 106.7828454 })),
// })

export default connect(mapStateToProps, null)(SearchBar)
