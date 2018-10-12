import {
  INITIAL_LOAD
} from './actions'

const initialState = {
  initialLoad: true
}

function filter(state = initialState, action) {
  switch (action.type) {
  case INITIAL_LOAD:
    return {
      ...state,
      initialLoad: action.initialLoad
    }
  default:
    return state
  }
}

export default filter
