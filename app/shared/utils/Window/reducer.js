import { UPDATE_VIEWPORT_SIZE } from './actions'

const initialState = {
  width: 0,
  height: 0
}

export default function filter(state = initialState, { type, payload }) {
  switch (type) {
  case UPDATE_VIEWPORT_SIZE: {
    return {
      ...state,
      width: payload.width,
      height: payload.height
    }
  }
  default: {
    return state
  }
  }
}
