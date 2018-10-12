'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAssetTagAction = exports.setAssetTagsAction = exports.refreshAssetTagsAction = exports.loadAssetTagsAction = exports.loadAssetTagAction = exports.invalidateAssetTagsAction = exports.ASSET_TAGS_INVALIDATE = exports.ASSET_TAGS_LOAD = exports.ASSET_TAGS_LOADED = exports.ASSET_TAG_REMOVED = exports.ASSET_TAG_LOADED = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _EntityHelper = require('../utils/EntityHelper');

var _ApiRepository = require('../utils/ApiRepository');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ASSET_TAG_LOADED = exports.ASSET_TAG_LOADED = 'ASSET_TAG_LOADED';
const ASSET_TAG_REMOVED = exports.ASSET_TAG_REMOVED = 'ASSET_TAG_REMOVED';
const ASSET_TAGS_LOADED = exports.ASSET_TAGS_LOADED = 'ASSET_TAGS_LOADED';
const ASSET_TAGS_LOAD = exports.ASSET_TAGS_LOAD = 'ASSET_TAGS_LOAD';
const ASSET_TAGS_INVALIDATE = exports.ASSET_TAGS_INVALIDATE = 'ASSET_TAGS_INVALIDATE';

const request = () => ({ type: ASSET_TAGS_LOAD });
const receiveSingle = item => ({ type: ASSET_TAG_LOADED, item });
const removeSingle = item => ({ type: ASSET_TAG_REMOVED, item });
const receiveAll = items => ({ type: ASSET_TAGS_LOADED, items });

const invalidateAssetTagsAction = exports.invalidateAssetTagsAction = () => ({
  type: ASSET_TAGS_INVALIDATE
});

const loadAssetTagAction = exports.loadAssetTagAction = _id => dispatch => {
  const { url } = (0, _EntityHelper.getData)('asset_tags', _id);
  return (0, _ApiRepository.getRequest)(url).then(response => dispatch(receiveSingle(response)));
};

const loadAssetTagsAction = exports.loadAssetTagsAction = (paramaters = {}) => (dispatch, getState) => {
  const { items, isFetching } = getState().assetTags;
  dispatch(request());
  if (items === null && !isFetching) {
    return (0, _ApiRepository.getRequest)('asset_tags', paramaters).then(response => dispatch(receiveAll(response)));
  }

  return _promise2.default.resolve();
};

const refreshAssetTagsAction = exports.refreshAssetTagsAction = (paramaters = {}) => dispatch => (0, _ApiRepository.getRequest)('asset_tags', paramaters).then(response => dispatch(receiveAll(response)));

const setAssetTagsAction = exports.setAssetTagsAction = data => dispatch => dispatch(receiveAll(data));
const removeAssetTagAction = exports.removeAssetTagAction = id => dispatch => dispatch(removeSingle({ id }));
//# sourceMappingURL=assetTagActions.js.map