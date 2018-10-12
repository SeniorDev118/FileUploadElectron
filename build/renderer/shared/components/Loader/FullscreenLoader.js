'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _electronCss = require('electron-css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import styles from './FullscreenLoader.scss'

const styles_container = (0, _electronCss.CSS)({
  'align-items': 'center',
  'display': 'flex',
  'height': '100vh',
  'margin': '0 auto',
  'width': '100%',
  'background-color': 'var(--darkBgGrey)',
  'z-index': '20'
});

const styles_loader = (0, _electronCss.CSS)({
  'height': '100px',
  'width': '120px',
  'background-image': 'url(./public/images/loader.svg)',
  'background-repeat': 'no-repeat',
  'margin': '0 auto',
  'align-self': 'center'
});

const FullscreenLoader = () => _react2.default.createElement(
  'div',
  { className: styles_container },
  _react2.default.createElement('div', { className: styles_loader })
);

exports.default = FullscreenLoader;
//# sourceMappingURL=FullscreenLoader.js.map