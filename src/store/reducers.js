const initialState = {
  drawerOpen: false,
  isTargetEvent: false,
  qrLocation: null,
  targetLocation: {latitude: -6.2615663, longitude: 106.78280080000002},
  suggestions: [
    {description: 'Afghanistan'},
    {description: 'Aland Islands'},
    {description: 'Albania'},
  ],
  events: []
}

const reducer = (state = initialState, action) => {
  console.log('------>',action.payload)
  switch (action.type) {
    case 'ADD_ARRAY_STORE':
      return {...state}
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: action.payload.toggle,
      }
    case 'STORE_TARGET_LOCATION':
      return {
        ...state,
        isTargetEvent: false,
        targetLocation: action.payload.targetLocation
      }
    case 'GET_SUGGESTIONS':
      return {
        ...state, suggestions: action.payload.query
      }
    case 'SET_PLACES_LOCATION':
    
      return {
        ...state, 
        targetLocation: action.payload.targetLocation,
        isTargetEvent: true
      }
    default:
      return state
  }
}

export default reducer
