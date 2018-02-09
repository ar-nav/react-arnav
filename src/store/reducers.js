const initialState = {
  drawerOpen: false,
  targetLocation: {latitude: null, longitude: null},
  suggestions: [
    {label: 'Afghanistan'},
    {label: 'Aland Islands'},
    {label: 'Albania'},
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARRAY_STORE':
      return {...state}
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: action.payload.toggle,
      }
    case 'STORE_TARGET_LOCATION':
      console.log(action.payload.targetLocation, 'boom')
      return {
        ...state,
        targetLocation: action.payload.targetLocation
      }
    case 'GET_SUGGESTIONS':
      return {
        ...state,
      }
    default:
      return state
  }
}

export default reducer
