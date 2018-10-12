'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = withTracker;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withTracker(WrappedComponent, options = {}) {
  const trackPage = page => {
    _reactGa2.default.set((0, _extends3.default)({
      page
    }, options));
    _reactGa2.default.pageview(page);
  };

  const HOC = class extends _react.Component {
    componentDidMount() {
      /* global PRODUCTION */
      if (global.PRODUCTION) {
        const page = this.props.location.pathname;
        trackPage(page);
      }
    }

    componentWillReceiveProps(nextProps) {
      /* global PRODUCTION */
      if (global.PRODUCTION) {
        const currentPage = this.props.location.pathname;
        const nextPage = nextProps.location.pathname;

        if (currentPage !== nextPage) {
          trackPage(nextPage);
        }
      }
    }

    render() {
      return _react2.default.createElement(WrappedComponent, this.props);
    }
  };

  HOC.propTypes = {
    location: _propTypes2.default.shape({
      pathname: _propTypes2.default.string.isRequired
    }).isRequired
  };

  return HOC;
}
//# sourceMappingURL=withTracker.js.map