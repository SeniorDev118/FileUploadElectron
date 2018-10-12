'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _electronCss = require('electron-css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import styles from './Container.scss'
const containerFluid = (0, _electronCss.CSS)({
  'width': '100%',
  'padding-right': '15px',
  'padding-left': '15px',
  'margin-right': 'auto',
  'margin-left': 'auto'
});

const fullHeight = (0, _electronCss.CSS)({
  'height': '100%'
});

const Container = props => {
  const { className, fullHeight, children } = props;

  // const classNames = cx(containerFluid, {
  //   [styles.fullHeight]: fullHeight
  // }, className)

  const classNames = [containerFluid, fullHeight, className];

  return _react2.default.createElement(
    'div',
    { className: classNames },
    children
  );
  //return <div className={classNames}>{children}</div>
};

Container.propTypes = {
  //className: PropTypes.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired,
  fullHeight: _propTypes2.default.bool
};

Container.defaultProps = {
  className: null,
  fullHeight: false
};

exports.default = Container;
//# sourceMappingURL=Container.js.map