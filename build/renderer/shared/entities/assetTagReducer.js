'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _EntityHelper = require('../utils/EntityHelper');

var _assetTagActions = require('./assetTagActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  items: null,
  isFetching: false
};

function filter(state = initialState, action) {
  switch (action.type) {
    case _assetTagActions.ASSET_TAGS_LOAD:
      return (0, _extends3.default)({}, state, {
        isFetching: true
      });
    case _assetTagActions.ASSET_TAG_LOADED:
      return (0, _extends3.default)({}, state, {
        isFetching: false,
        items: (0, _EntityHelper.updateWithItem)(state.items, action.item)
      });
    case _assetTagActions.ASSET_TAG_REMOVED:
      return (0, _extends3.default)({}, state, {
        isFetching: false,
        items: (0, _EntityHelper.removeItem)(state.items, action.item.id)
      });
    case _assetTagActions.ASSET_TAGS_LOADED:
      return (0, _extends3.default)({}, state, {
        isFetching: false,
        items: action.items
      });
    case _assetTagActions.ASSET_TAGS_INVALIDATE:
      return (0, _extends3.default)({}, state, {
        isFetching: false,
        items: initialState.items
      });
    default:
      return state;
  }
}

exports.default = filter;
//# sourceMappingURL=assetTagReducer.js.map