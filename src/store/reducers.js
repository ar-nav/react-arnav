const initialState = {
  drawerOpen: false,
  targetLocation: {latitude: -6.2615663, longitude: 106.78280080000002},
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
