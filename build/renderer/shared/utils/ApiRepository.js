'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putRequest = exports.deleteRequest = exports.postRequest = exports.getRequest = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global API_URL */

const getData = response => {
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return response.json();
};

const formatAPIError = data => {
  let str = '';

  if (data instanceof Object) {
    (0, _keys2.default)(data).forEach(key => {
      str += `\n${key}: ${data[key]}`;
    });
  } else {
    str = `\n${data}`;
  }

  return str;
};

const getRequestBody = data => {
  if (data instanceof FormData || typeof data === 'string') {
    return data;
  }
  return (0, _stringify2.default)(data);
};

const buildHeaders = data => {
  let headers = {
    Accept: 'application/json'
  };

  if (localStorage.getItem('token')) {
    headers = (0, _extends3.default)({}, headers, {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  if (data && data instanceof FormData) {
    return headers;
  }

  return (0, _extends3.default)({}, headers, {
    'Content-Type': 'application/json'
  });
};

const buildURL = (url, params) => {
  if (!params) {
    return url;
  }

  const parts = [];
  (0, _keys2.default)(params).forEach(key => {
    parts.push(`${key}=${params[key]}`);
  });

  const serializedParams = parts.join('&');

  if (serializedParams) {
    url += `?${serializedParams}`;
  }

  return url;
};

const checkInternalError = response => {
  if (response.status >= 500) {
    throw new Error('There was an internal Error');
  }

  return response;
};

const getRequest = exports.getRequest = (url, parameters = null) => fetch(buildURL(global.API_URL + `/${url}.json`, parameters), {
  method: 'GET',
  headers: buildHeaders()
}).then(checkInternalError).then(response => getData(response)).catch(error => {
  console.log(`Error fetching ${url}`, error.message);
  throw error;
});

const postRequest = exports.postRequest = (resource, data) => fetch(global.API_URL + `/${resource}`, {
  method: 'POST',
  headers: buildHeaders(data),
  body: getRequestBody(data)
}).then(checkInternalError).then(response => {
  if ([201, 400, 401].includes(response.status)) {
    return getData(response);
  }

  throw new Error(formatAPIError(response));
}).catch(error => {
  console.log(`Error creating ${resource}`, error.message);
  throw error;
});

const deleteRequest = exports.deleteRequest = (resource, id) => fetch(global.API_URL + `/${resource}/${id}`, {
  method: 'DELETE',
  headers: buildHeaders()
}).then(checkInternalError).then(response => {
  if (response.status === 204) {
    return { id };
  }

  throw new Error(formatAPIError(response));
}).catch(error => {
  console.log(`Error deleting ${resource}`, error.message);
  throw error;
});

const putRequest = exports.putRequest = (resource, id, data) => {
  let failed = false;
  return fetch(global.API_URL + `/${resource}/${id}`, {
    method: 'PUT',
    headers: buildHeaders(data),
    body: getRequestBody(data)
  }).then(checkInternalError).then(response => {
    if (response.status !== 200) {
      failed = true;
    }
    return getData(response);
  }).then(json => {
    if (failed) {
      throw new Error(formatAPIError(json));
    }
    return json;
  }).catch(error => {
    console.log(`Error editing ${resource} ${id}`, error.message);
    throw error;
  });
};
//# sourceMappingURL=ApiRepository.js.map