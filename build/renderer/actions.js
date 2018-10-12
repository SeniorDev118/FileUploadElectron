'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInitialLoadAction = setInitialLoadAction;
const INITIAL_LOAD = exports.INITIAL_LOAD = 'INITIAL_LOAD';

function setInitialLoadAction(initialLoad) {
  return {
    type: INITIAL_LOAD,
    initialLoad
  };
}
//# sourceMappingURL=actions.js.map