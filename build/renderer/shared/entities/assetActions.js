'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAssetAction = exports.setAssetsAction = exports.refreshAssetsAction = exports.loadAssetsAction = exports.loadAssetAction = exports.invalidateAssetsAction = exports.ASSETS_INVALIDATE = exports.ASSETS_LOAD = exports.ASSETS_LOADED = exports.ASSET_REMOVED = exports.ASSET_LOADED = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _EntityHelper = require('../utils/EntityHelper');

var _ApiRepository = require('../utils/ApiRepository');

var _LocationHelper = require('../utils/LocationHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ASSET_LOADED = exports.ASSET_LOADED = 'ASSET_LOADED';
const ASSET_REMOVED = exports.ASSET_REMOVED = 'ASSET_REMOVED';
const ASSETS_LOADED = exports.ASSETS_LOADED = 'ASSETS_LOADED';
const ASSETS_LOAD = exports.ASSETS_LOAD = 'ASSETS_LOAD';
const ASSETS_INVALIDATE = exports.ASSETS_INVALIDATE = 'ASSETS_INVALIDATE';

const request = () => ({ type: ASSETS_LOAD });
const receiveSingle = item => ({ type: ASSET_LOADED, item });
const removeSingle = item => ({ type: ASSET_REMOVED, item });
const receiveAll = items => ({ type: ASSETS_LOADED, items });

const getTagData = assetTags => {
  const data = {};
  assetTags.forEach((assetTag, index) => {
    data[`assetTags[${index}]`] = assetTag.id;
  });

  return data;
};

const getFolderData = pathname => {
  const folderId = (0, _LocationHelper.getFolderId)(pathname);
  return folderId !== 'bucket' ? { folder: folderId } : { 'folder[exists]': false };
};

const invalidateAssetsAction = exports.invalidateAssetsAction = () => ({
  type: ASSETS_INVALIDATE
});

const loadAssetAction = exports.loadAssetAction = _id => dispatch => {
  const { url } = (0, _EntityHelper.getData)('assets', _id);
  return (0, _ApiRepository.getRequest)(url).then(response => dispatch(receiveSingle(response)));
};

const loadAssetsAction = exports.loadAssetsAction = () => (dispatch, getState) => {
  const { assets, router } = getState();
  const pathname = router.location.pathname;

  if (assets.items === null && !assets.isFetching) {
    dispatch(request());

    if ((0, _LocationHelper.isTagRoute)(pathname) && (0, _LocationHelper.getTagId)(pathname) !== 'tags') {
      (0, _ApiRepository.getRequest)('asset_tags', { tag: (0, _LocationHelper.getTagId)(pathname) }).then(assetTags => {
        const data = getTagData(assetTags);
        if ((0, _keys2.default)(data).length) {
          return (0, _ApiRepository.getRequest)('assets', data).then(response => {
            dispatch(receiveAll(response));
          });
        }
        dispatch(receiveAll([]));
      });
    } else if ((0, _LocationHelper.isFolderRoute)(pathname)) {
      return (0, _ApiRepository.getRequest)('assets', getFolderData(pathname)).then(response => {
        dispatch(receiveAll(response));
      });
    } else {
      dispatch(receiveAll([]));
    }
  }

  return _promise2.default.resolve();
};

const refreshAssetsAction = exports.refreshAssetsAction = () => (dispatch, getState) => {
  const { router } = getState();
  const pathname = router.location.pathname;

  if ((0, _LocationHelper.isTagRoute)(pathname) && (0, _LocationHelper.getTagId)(pathname) !== 'tags') {
    (0, _ApiRepository.getRequest)('asset_tags', { tag: (0, _LocationHelper.getTagId)(pathname) }).then(assetTags => {
      const data = getTagData(assetTags);
      if ((0, _keys2.default)(data).length) {
        return (0, _ApiRepository.getRequest)('assets', data).then(response => {
          dispatch(receiveAll(response));
        });
      }
      dispatch(receiveAll([]));
    });
  } else if ((0, _LocationHelper.isFolderRoute)(pathname)) {
    return (0, _ApiRepository.getRequest)('assets', getFolderData(pathname)).then(response => {
      dispatch(receiveAll(response));
    });
  } else {
    dispatch(receiveAll([]));
    return _promise2.default.resolve();
  }
};

const setAssetsAction = exports.setAssetsAction = data => dispatch => dispatch(receiveAll(data));
const removeAssetAction = exports.removeAssetAction = id => dispatch => dispatch(removeSingle({ id }));
//# sourceMappingURL=assetActions.js.map