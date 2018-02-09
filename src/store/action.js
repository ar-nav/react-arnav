import axios from 'axios'

// const API_KEY = 'AIzaSyArtScYJhuzm0RKAxCEt6cTqG1QmrM8r9s'


export const toggleDrawer = (toggle) => (
  {
    type: 'TOGGLE_DRAWER',
    payload: {
      toggle
    }
  }
)

export const storeTargetLocation = (targetLocation) => (
  {
    type: 'STORE_TARGET_LOCATION',
    payload: {
      targetLocation
    }
  }
)

export const getSuggestions = (query) => (
  {
    type: 'GET_SUGGESTIONS',
    payload: {
      query
    }
  }
)

export const fetchSuggestions = (query, {lat, long}) => {
  return (dispatch, state) => {
    if (query.length > 5) {
      const linkURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=chattime&types=establishment&location=-6.266,106.7828454&radius=500&key=AIzaSyArtScYJhuzm0RKAxCEt6cTqG1QmrM8r9s`
      axios.get(linkURL)
        .then(resp => {
          console.log(resp.data)
          // dispatch(getSuggestions(resp.data))
        })
        .catch(err => console.error(err))
    }
  }
}