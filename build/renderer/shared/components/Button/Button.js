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

const button = (0, _electronCss.CSS)({
  'color': 'var(--white)',
  'background': 'var(--purple)',
  'display': 'inline-block',
  'font-weight': 'normal',
  'text-align': 'center',
  'white-space': 'nowrap',
  'vertical-align': 'middle',
  'user-select': 'none',
  'padding': '5px 15px',
  'line-height': '1.5',
  'border-radius': '2px',
  'border': '1px solid var(--purple)',
  'cursor': 'pointer'
});
// import cx from 'classnames'


const Button = ({ children, onClick, fullSize, className, disabled, type, dataTestId }) => {
  const buttonClasses = (0, _electronCss.CSS)({});

  return _react2.default.createElement(
    'button',
    {
      className: className,
      onClick: onClick,
      disabled: disabled,
      'data-testid': dataTestId
    },
    children
  );
};

Button.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired,
  onClick: _propTypes2.default.func,
  fullSize: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  type: _propTypes2.default.oneOf(['button', 'link']),
  dataTestId: _propTypes2.default.string
};

Button.defaultProps = {
  onClick: null,
  fullSize: false,
  disabled: false,
  type: 'button',
  className: null,
  dataTestId: null
};

exports.default = Button;
//# sourceMappingURL=Button.js.map