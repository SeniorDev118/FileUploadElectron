'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = withPrompt;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withPrompt(WrappedComponent) {
  const HOC = class HOC extends _react.Component {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), this.state = {
        isPromptOpen: false,
        promptText: null,
        promptId: null
      }, this.closePrompt = () => {
        this.setState({
          isPromptOpen: false,
          promptText: null,
          promptId: null
        });
      }, this.openPrompt = (isPromptOpen, data) => {
        this.setState({
          isPromptOpen,
          promptId: data.promptId || null,
          promptText: data.promptText || null
        });
      }, _temp;
    }

    render() {
      const { isPromptOpen, promptText, promptId } = this.state;

      return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.props, {
        openPrompt: this.openPrompt,
        closePrompt: this.closePrompt,
        isPromptOpen: isPromptOpen,
        promptText: promptText,
        promptId: promptId
      }));
    }
  };

  return HOC;
}
//# sourceMappingURL=withPrompt.js.map