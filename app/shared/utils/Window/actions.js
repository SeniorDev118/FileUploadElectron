export const UPDATE_VIEWPORT_SIZE = 'UPDATE_VIEWPORT_SIZE'

export function updateViewportSize(width, height) {
  return {
    type: UPDATE_VIEWPORT_SIZE,
    payload: {
      width,
      height
    }
  }
}
