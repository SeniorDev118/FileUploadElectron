'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeTagAction = exports.setTagsAction = exports.refreshTagsAction = exports.loadTagsAction = exports.loadTagAction = exports.invalidateTagsAction = exports.TAGS_INVALIDATE = exports.TAGS_LOAD = exports.TAGS_LOADED = exports.TAG_REMOVED = exports.TAG_LOADED = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _EntityHelper = require('../utils/EntityHelper');

var _ApiRepository = require('../utils/ApiRepository');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TAG_LOADED = exports.TAG_LOADED = 'TAG_LOADED';
const TAG_REMOVED = exports.TAG_REMOVED = 'TAG_REMOVED';
const TAGS_LOADED = exports.TAGS_LOADED = 'TAGS_LOADED';
const TAGS_LOAD = exports.TAGS_LOAD = 'TAGS_LOAD';
const TAGS_INVALIDATE = exports.TAGS_INVALIDATE = 'TAGS_INVALIDATE';

const request = () => ({ type: TAGS_LOAD });
const receiveSingle = item => ({ type: TAG_LOADED, item });
const removeSingle = item => ({ type: TAG_REMOVED, item });
const receiveAll = items => ({ type: TAGS_LOADED, items });

const invalidateTagsAction = exports.invalidateTagsAction = () => ({
  type: TAGS_INVALIDATE
});

const loadTagAction = exports.loadTagAction = _id => dispatch => {
  const { url } = (0, _EntityHelper.getData)('tags', _id);
  return (0, _ApiRepository.getRequest)(url).then(response => dispatch(receiveSingle(response)));
};

const loadTagsAction = exports.loadTagsAction = (paramaters = {}) => (dispatch, getState) => {
  const { items, isFetching } = getState().tags;
  dispatch(request());
  if (items === null && !isFetching) {
    return (0, _ApiRepository.getRequest)('tags', paramaters).then(response => dispatch(receiveAll(response)));
  }

  return _promise2.default.resolve();
};

const refreshTagsAction = exports.refreshTagsAction = (paramaters = {}) => dispatch => (0, _ApiRepository.getRequest)('tags', paramaters).then(response => dispatch(receiveAll(response)));

const setTagsAction = exports.setTagsAction = data => dispatch => dispatch(receiveAll(data));
const removeTagAction = exports.removeTagAction = id => dispatch => dispatch(removeSingle({ id }));
//# sourceMappingURL=tagActions.js.map