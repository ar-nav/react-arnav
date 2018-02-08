const initialState = {
  drawerOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARRAY_STORE':
      return {...state, }
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: action.payload.toggle
      }
    default:
      return state;
  }
}

export default reducer