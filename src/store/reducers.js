const initialState = {
  drawerOpen: false,
  suggestions: [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARRAY_STORE':
      return { ...state }
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: action.payload.toggle,
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
