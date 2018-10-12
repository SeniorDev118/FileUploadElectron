'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.deleteRequest = exports.batchCreate = exports.postRequest = exports.find = exports.getRequest = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getRequest = exports.getRequest = resource => new _promise2.default(resolve => resolve(JSON.parse(localStorage.getItem(resource)) || []));

const find = exports.find = (resource, id) => getRequest(resource).then(items => new _promise2.default(resolve => resolve(items.find(item => item.id === id))));

const postRequest = exports.postRequest = (resource, data) => getRequest(resource).then(items => {
  let createData = (0, _extends3.default)({}, data);

  if (!createData.id) {
    createData = (0, _extends3.default)({}, createData, { id: (0, _v2.default)() });
  }

  items.push(createData);
  return new _promise2.default(resolve => resolve(localStorage.setItem(resource, (0, _stringify2.default)(items))));
});

const batchCreate = exports.batchCreate = (resource, data) => {
  const items = [];
  data.forEach(item => items.push((0, _assign2.default)({}, item, { id: (0, _v2.default)() })));
  return new _promise2.default(resolve => resolve(localStorage.setItem(resource, (0, _stringify2.default)(items))));
};

const deleteRequest = exports.deleteRequest = (resource, id) => getRequest(resource).then(items => {
  const newData = items.filter(item => item.id !== id);
  return new _promise2.default(resolve => resolve(localStorage.setItem(resource, (0, _stringify2.default)(newData))));
});

const update = exports.update = (resource, id, data) => find(resource, id).then(item => {
  const newData = (0, _assign2.default)({}, item, data);
  return deleteRequest(resource, id).then(() => postRequest(resource, newData));
});
//# sourceMappingURL=LocalStorageRepository.js.map