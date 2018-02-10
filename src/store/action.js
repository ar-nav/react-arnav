import axios from 'axios'

// const API_KEY = 'AIzaSyArtScYJhuzm0RKAxCEt6cTqG1QmrM8r9s'

export const toggleDrawer = toggle => ({
  type: 'TOGGLE_DRAWER',
  payload: {
    toggle,
  },
})

export const storeTargetLocation = targetLocation => ({
  type: 'STORE_TARGET_LOCATION',
  payload: {
    targetLocation,
  },
})

export const getSuggestions = query => ({
  type: 'GET_SUGGESTIONS',
  payload: {
    query,
  },
})

export const getEvents = (events) => ({
  type: 'GET_EVENTS',
  payload: {
    events
  }
})

export const getEvent = (event) =>({
  type: 'GET_EVENT',
  payload: {
    event
  }
})

export const fetchAllEvents = () => {
  return (dispatch, state) => {
    return [
      {}
    ]
    // axios
    //   .get(
    //     'http://www.omdbapi.com/?t=Game of Thrones&Season=1&&apikey=d049b04d'
    //   )
    //   .then(({data}) => {
    //     dispatch(get_all(data.Episodes))
    //   })
    //   .catch(err => console.error(err))
  }
}

export const fetchSuggestions = (query, {lat, long}) => {
  return (dispatch, state) => {
    const linkURL = `https://us-central1-ecommerce-790b1.cloudfunctions.net/request-location`
    axios.post(linkURL, {
      target: query
    }, {
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(resp => {
        dispatch(getSuggestions(resp.data))
      })
      .catch(err => console.error(err))
  }
}
