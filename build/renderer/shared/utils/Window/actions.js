'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateViewportSize = updateViewportSize;
const UPDATE_VIEWPORT_SIZE = exports.UPDATE_VIEWPORT_SIZE = 'UPDATE_VIEWPORT_SIZE';

function updateViewportSize(width, height) {
  return {
    type: UPDATE_VIEWPORT_SIZE,
    payload: {
      width,
      height
    }
  };
}
//# sourceMappingURL=actions.js.map