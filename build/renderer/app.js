'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Container = require('./shared/components/Grid/Container');

var _Container2 = _interopRequireDefault(_Container);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterRedux = require('react-router-redux');

var _index = require('./components/Auth/index');

var _withPrompt = require('./shared/utils/withPrompt');

var _withPrompt2 = _interopRequireDefault(_withPrompt);

var _Welcome = require('./components/Home/components/Welcome');

var _Welcome2 = _interopRequireDefault(_Welcome);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var { Menu, Tray } = require('electron').remote;
let tray = null;
let App = class App extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.createTray = () => {
      clearInterval(this.timer);
      this.timer = null;
      this.trayHideWindow(false);
    }, this.trayHideWindow = isAuto => {
      console.log('trayHideWindow');
      const { ipcRenderer } = require('electron');
      ipcRenderer.send('hide-window', 'an-argument');
      const menu = Menu.buildFromTemplate([{
        label: "Show Window", click: (item, window, event) => {
          this.trayShowWindow();
        }
      }, {
        label: "Sign out", click: (item, window, event) => {
          this.props.logout();
        }
      }, { role: "quit" }] // "role": system prepared action menu
      );
      tray.setContextMenu(menu);
    }, this.trayShowWindow = () => {

      const { ipcRenderer } = require('electron');
      ipcRenderer.send('show-window', 'an-argument');
      const menu = Menu.buildFromTemplate([{
        label: "Hide Window", click: (item, window, event) => {
          this.trayHideWindow(false);
        }
      }, {
        label: "Sign out", click: (item, window, event) => {
          this.props.logout();
        }
      }, { role: "quit" }] // "role": system prepared action menu
      );
      tray.setContextMenu(menu);
    }, this.componentDidMount = () => {
      if (global.firstApp == true) {
        tray = new Tray(_path2.default.join(__dirname, './public/images/flask.png'));
        // this.timer = setInterval(this.createTray, 3000);
        global.firstApp = false;
      }
    }, this.componentWillUnmount = () => {
      if (this.timer != null) {
        clearInterval(this.timer);
      }
    }, _temp;
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props;
  }

  render() {
    const { pathname, assets } = this.props;

    return _react2.default.createElement(
      _index.Authenticated,
      null,
      _react2.default.createElement(
        _Container2.default,
        null,
        _react2.default.createElement(_Welcome2.default, { pathname: pathname, onMinimize: this.trayHideWindow })
      )
    );
  }
};


App.propTypes = {
  logout: _propTypes2.default.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    logout: url => {
      const { ipcRenderer } = require('electron');
      ipcRenderer.send('open-main-window', 'an-argument');
      dispatch((0, _reactRouterRedux.push)('/logout'));

      const menu = Menu.buildFromTemplate([{ role: "quit" }] // "role": system prepared action menu
      );
      tray.setContextMenu(menu);
    }
  };
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  userId: state.auth.user.url
});

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)((0, _withPrompt2.default)(App));
//# sourceMappingURL=app.js.map