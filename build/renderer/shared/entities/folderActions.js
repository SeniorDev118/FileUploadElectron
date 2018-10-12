'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFolderAction = exports.setFoldersAction = exports.refreshFoldersAction = exports.loadFoldersAction = exports.loadFolderAction = exports.invalidateFoldersAction = exports.FOLDERS_INVALIDATE = exports.FOLDERS_LOAD = exports.FOLDERS_LOADED = exports.FOLDER_REMOVED = exports.FOLDER_LOADED = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _EntityHelper = require('../utils/EntityHelper');

var _ApiRepository = require('../utils/ApiRepository');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FOLDER_LOADED = exports.FOLDER_LOADED = 'FOLDER_LOADED';
const FOLDER_REMOVED = exports.FOLDER_REMOVED = 'FOLDER_REMOVED';
const FOLDERS_LOADED = exports.FOLDERS_LOADED = 'FOLDERS_LOADED';
const FOLDERS_LOAD = exports.FOLDERS_LOAD = 'FOLDERS_LOAD';
const FOLDERS_INVALIDATE = exports.FOLDERS_INVALIDATE = 'FOLDERS_INVALIDATE';

const request = () => ({ type: FOLDERS_LOAD });
const receiveSingle = item => ({ type: FOLDER_LOADED, item });
const removeSingle = item => ({ type: FOLDER_REMOVED, item });
const receiveAll = items => ({ type: FOLDERS_LOADED, items });

const invalidateFoldersAction = exports.invalidateFoldersAction = () => ({
  type: FOLDERS_INVALIDATE
});

const loadFolderAction = exports.loadFolderAction = _id => dispatch => {
  const { url } = (0, _EntityHelper.getData)('folders', _id);
  return (0, _ApiRepository.getRequest)(url).then(response => dispatch(receiveSingle(response)));
};

const loadFoldersAction = exports.loadFoldersAction = (paramaters = {}) => (dispatch, getState) => {
  const { items, isFetching } = getState().folders;
  if (items === null && !isFetching) {
    dispatch(request());
    return (0, _ApiRepository.getRequest)('folders', paramaters).then(response => dispatch(receiveAll(response)));
  }

  return _promise2.default.resolve();
};

const refreshFoldersAction = exports.refreshFoldersAction = (paramaters = {}) => dispatch => (0, _ApiRepository.getRequest)('folders', paramaters).then(response => dispatch(receiveAll(response)));

const setFoldersAction = exports.setFoldersAction = data => dispatch => dispatch(receiveAll(data));
const removeFolderAction = exports.removeFolderAction = id => dispatch => dispatch(removeSingle({ id }));
//# sourceMappingURL=folderActions.js.map