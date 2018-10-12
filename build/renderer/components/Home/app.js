'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Button = require('../../shared/components/Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _authActions = require('../../shared/entities/authActions');

var _ApiRepository = require('../../shared/utils/ApiRepository');

var _reactLottie = require('react-lottie');

var _reactLottie2 = _interopRequireDefault(_reactLottie);

var _animation = require('./animation.json');

var animationData_Login = _interopRequireWildcard(_animation);

var _app = require('./app.css');

var _app2 = _interopRequireDefault(_app);

var _electronCss = require('electron-css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let App = (_temp2 = _class = class App extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.PAGE_LOGIN = 0, this.PAGE_WELCOME = 1, this.state = {
      userId: '',
      email: '',
      password: '',
      password_symbol: '',
      user_bottom_line_width: 0,
      pwd_bottom_line_width: 0,
      closeme_bottom_line_width: 0,
      isAnimationPage1: false,
      isAnimationPage2: false,
      login_form_style: { borderBottom: '1px solid #3e3e3e' },
      pwd_form_style: { borderBottom: '1px solid #3e3e3e' },
      logo_visible: { visibility: 'visible' },
      logo_anim_visible: { display: 'none' },
      page_state: this.PAGE_LOGIN,
      logo_anim_stop: true,
      hasError: false
    }, this.refresh = () => {
      this.setState({
        userId: '',
        email: '',
        password: '',
        password_symbol: '',
        user_bottom_line_width: 0,
        pwd_bottom_line_width: 0,
        closeme_bottom_line_width: 0,
        isAnimationPage1: false,
        isAnimationPage2: false,
        login_form_style: { borderBottom: '1px solid #3e3e3e' },
        pwd_form_style: { borderBottom: '1px solid #3e3e3e' },
        logo_visible: { visibility: 'visible' },
        logo_anim_visible: { display: 'none' },
        page_state: this.PAGE_LOGIN,
        logo_anim_stop: true,
        hasError: false
      });
    }, this.elem_user_bottom_line = _react2.default.createRef(), this.elem_pwd_bottom_line = _react2.default.createRef(), this.elem_closeme_btn = _react2.default.createRef(), this.elem_div_container = _react2.default.createRef(), this.animationLoginOption = {
      loop: false,
      autoplay: true,
      animationData: animationData_Login,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }, this.onEmailChange = event => {
      let borderStyle;
      if (event.target.value.length == 0) {
        borderStyle = { borderBottom: '1px solid #3e3e3e' };
      } else {
        borderStyle = { borderBottom: 'none' };
      }

      this.setState({
        email: event.target.value,
        login_form_style: borderStyle,
        hasError: false
      });
      setTimeout(this.setUserBottomWidth, 0.01);
    }, this.setUserBottomWidth = () => {
      this.setState({
        user_bottom_line_width: this.elem_user_bottom_line.current.clientWidth
      });
    }, this.onPasswordChange = event => {
      let pwd_form_style = {};
      if (event.target.value.length == 0) {
        pwd_form_style = { borderBottom: '1px solid #3e3e3e' };
      } else {
        pwd_form_style = { borderBottom: 'none' };
      }

      let password_symbol = new Array(event.target.value.length + 1).join('*');
      this.setState({
        password: event.target.value,
        pwd_form_style: pwd_form_style,
        password_symbol: password_symbol,
        hasError: false
      });

      setTimeout(this.setPwdBottomWidth, 0.01);
    }, this.setPwdBottomWidth = () => {
      this.setState({
        pwd_bottom_line_width: this.elem_pwd_bottom_line.current.clientWidth
      });
    }, this.onSubmit = () => {
      const { email, password } = this.state;
      var url = global.API_URL;
      event.preventDefault();

      const request = new Request(url + "/login_check", {
        /* global API_URL */
        method: 'POST',
        body: (0, _stringify2.default)({ email, password }),
        headers: new Headers({ 'Content-Type': 'application/json' })
      });

      return fetch(request).then(response => {
        if (response.status === 401) {
          this.setState({ hasError: true });
        }
        if (response.status < 200 || response.status >= 300) {
          this.setState({ hasError: true });
          throw new Error(response.statusText);
        }
        return response.json();
      }).then(({ token }) => {

        localStorage.setItem('token', token); // The JWT token is stored in the browser's local storage
        this.setState({
          logo_visible: { visibility: 'hidden' },
          logo_anim_visible: { display: 'block' },
          user_bottom_line_width: 0,
          pwd_bottom_line_width: 0,
          logo_anim_stop: false
        });
        this.animation1_1(); //after 0s
        setTimeout(this.animation1_2, 500); //after 0s
        setTimeout(this.animation1_3, 1000); //after 1s
        setTimeout(this.redirectMainPage, 1500); //after 3s
      }).catch(error => {
        console.log(error);
        this.setState({ hasError: true });
      });
    }, this.redirectMainPage = () => {
      (0, _ApiRepository.getRequest)('auths/status').then(response => {
        if (response.authenticated === true) {
          (0, _ApiRepository.getRequest)('users/me').then(response => {
            this.setState({
              page_state: this.PAGE_WELCOME,
              userId: response.url
            });
            this.startWatcher(global.IMAGE_PATH, this);
            this.timer = setTimeout(this.trayHideWindow, 5000);

            this.setState({ isAnimationPage2: true });
            this.timerCloseMe = setTimeout(this.animation2_3, 1000);
          });
        }
      }).catch(() => {});
    }, this.animation1_1 = () => {
      this.setState({
        user_bottom_line_width: 0,
        pwd_bottom_line_width: 0
      });
    }, this.animation1_2 = () => {
      this.setState({
        logo_visible: { visibility: 'hidden' },
        logo_anim_visible: { display: 'block' },
        user_bottom_line_width: 0,
        pwd_bottom_line_width: 0,
        logo_anim_stop: false
      });
    }, this.animation1_3 = () => {
      this.setState({
        isAnimationPage1: true
      });
    }, this.animation2_3 = () => {
      var width = this.elem_closeme_btn.current.clientWidth;
      this.setState({ closeme_bottom_line_width: width });
    }, this.minimizeWindow = e => {
      const { BrowserWindow } = require('electron').remote;
      var window = BrowserWindow.getFocusedWindow();
      window.minimize();
    }, this.closeWindow = () => {
      const { ipcRenderer } = require('electron');
      ipcRenderer.send('quit-app', 'an-argument');
    }, this.onGotoLogin = () => {
      const { shell } = require('electron');
      shell.openExternal('https://alchemy.is/login');
    }, this.startWatcher = (path, parent) => {
      var parent = parent;
      var chokidar = require("chokidar");

      const userId = parent.state.userId;

      var watcher = chokidar.watch(path, {
        ignored: /[\/\\]\./,
        persistent: true
      });

      function onWatcherReady(logo) {
        console.log(logo);
      }

      function isImageFile(path) {
        var extension = path.split('.').pop().toLowerCase();
        if (extension == 'jpg' || extension == 'png' || extension == 'git') {
          if (path.indexOf('screenshot') != -1 || path.indexOf('screen shot') != -1) {
            return true;
          }
        }
        return false;
      }

      function getFileExtension(path) {
        return path.split('.').pop().toLowerCase();
      }

      function getFileName(path) {
        var filename = "";
        if (path) {
          var startIndex = path.indexOf('\\') >= 0 ? path.lastIndexOf('\\') : path.lastIndexOf('/');
          filename = path.substring(startIndex);
          if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
          }
        }
        return filename;
      }

      watcher.on('ready', function () {
        if (!this.isScanStart) {
          //onWatcherReady('Ready');
          this.isScanStart = true;
        }
      }).on('add', function (path) {
        if (this.isScanStart) {
          console.log('File', path, 'has been added');
          if (isImageFile(path)) {
            var fs = require('fs');
            var fileImage = fs.readFileSync(path);
            // convert binary data to base64 encoded string
            var bitmap = new Buffer(fileImage);
            var base64 = bitmap.toString('base64');
            var size = fileImage.length;

            var sizeOf = require('image-size');
            var dimensions = sizeOf(path);
            console.log(dimensions.width, dimensions.height);

            var width = dimensions.width;
            var height = dimensions.height;
            var filename = getFileName(path);
            console.log(filename);
            var fileExtension = getFileExtension(path);
            console.log(fileExtension);
            var base64str = "data:image/" + fileExtension + ";base64," + base64;
            //var base64str = "data:image/jpeg;base64," + base64;
            const filesData = [{
              file: base64str,
              name: filename,
              width: width,
              height: height,
              size: size,
              user: userId,
              folder: null
            }];

            (0, _ApiRepository.postRequest)('assets/bulk', filesData).then(responses => {
              onWatcherReady('File ' + path + ' is uploaded');
            }).catch(() => {
              onWatcherReady('Upload fail');
            });
          }
        }
      }).on('addDir', function (path) {
        if (this.isScanStart) {
          onWatcherReady('Directory' + path + ' has been added');
        }
      }).on('change', function (path) {
        if (this.isScanStart) {
          onWatcherReady('File' + path + ' has been changed');
        }
      }).on('unlink', function (path) {
        if (this.isScanStart) {
          onWatcherReady('File' + path + ' has been removed');
        }
      }).on('unlinkDir', function (path) {
        if (this.isScanStart) {
          onWatcherReady('Directory' + path + ' has been removed');
        }
      }).on('error', function (error) {
        if (this.isScanStart) {
          onWatcherReady('Error happened');
        }
      }).on('raw', function (event, path, details) {
        // This event should be triggered everytime something happens.
        if (this.isScanStart) {
          console.log('Raw event info:', event, path, details);
        }
      });
    }, _temp;
  }

  trayHideWindow() {
    console.log('trayShowWindow');
    const { ipcRenderer } = require('electron');
    ipcRenderer.send('hide-window', 'an-argument');
  }

  render() {

    const { ipcMain } = require('electron').remote;
    ipcMain.on('signout-window', () => {
      this.props.logout(this);
    });
    const { email, password, hasError } = this.state;
    const isDisabled = email.length === 0 || password.length === 0;
    return _react2.default.createElement(
      'div',
      { className: _app2.default.login_screen },
      _react2.default.createElement('div', { className: _app2.default.style_titlebar }),
      _react2.default.createElement(
        'p',
        { className: [_app2.default.length_user_name, this.state.isAnimationPage1 && _app2.default.fadeOut].join(' '), ref: this.elem_user_bottom_line },
        this.state.email
      ),
      _react2.default.createElement(
        'p',
        { className: [_app2.default.length_pwd, this.state.isAnimationPage1 && _app2.default.fadeOut].join(' '), ref: this.elem_pwd_bottom_line },
        this.state.password_symbol
      ),
      _react2.default.createElement(
        'div',
        { className: [_app2.default.container_login].join(' '), ref: this.elem_div_container },
        this.state.page_state == this.PAGE_LOGIN && _react2.default.createElement('div', { className: _app2.default.logo, style: this.state.logo_visible }),
        _react2.default.createElement(
          'div',
          { className: _app2.default.logo_anim, style: this.state.logo_anim_visible },
          _react2.default.createElement(_reactLottie2.default, { options: this.animationLoginOption, width: 230, height: 108, isStopped: this.state.logo_anim_stop })
        ),
        this.state.page_state == this.PAGE_LOGIN && _react2.default.createElement(
          'div',
          { className: [_app2.default.login_form_div, this.state.isAnimationPage1 && _app2.default.fadeOut].join(' ') },
          hasError && _react2.default.createElement(
            'p',
            { className: _app2.default.login_error },
            'We don\'t recognize this user.'
          ),
          _react2.default.createElement(
            'p',
            { className: _app2.default.login_label },
            'E-MAIL'
          ),
          _react2.default.createElement(
            'div',
            { className: [_app2.default.login_form_content, this.state.isAnimationPage1 && _app2.default.fadeOut].join(' ') },
            _react2.default.createElement('input', {
              className: _app2.default.login_form_input,
              type: 'email',
              onChange: this.onEmailChange,
              value: this.state.email,
              style: this.state.login_form_style }),
            _react2.default.createElement('p', { className: _app2.default.purple_bottom_line, style: { width: this.state.user_bottom_line_width } })
          )
        ),
        this.state.page_state == this.PAGE_LOGIN && _react2.default.createElement(
          'div',
          { className: [_app2.default.password_form_div, this.state.isAnimationPage1 && _app2.default.fadeOut].join(' ') },
          _react2.default.createElement(
            'p',
            { className: _app2.default.login_label },
            'PASSWORD'
          ),
          _react2.default.createElement(
            'div',
            { className: [_app2.default.login_form_content, this.state.isAnimationPage1 && _app2.default.fadeOut].join(' ') },
            _react2.default.createElement('input', {
              className: _app2.default.login_form_password,
              type: 'password',
              onChange: this.onPasswordChange,
              value: this.state.password,
              style: this.state.pwd_form_style
            }),
            _react2.default.createElement('p', { className: _app2.default.purple_bottom_line_2, style: { width: this.state.pwd_bottom_line_width } })
          )
        ),
        this.state.page_state == this.PAGE_LOGIN && _react2.default.createElement(
          'div',
          { className: [_app2.default.login_btn_div, this.state.isAnimationPage1 && _app2.default.fadeOut].join(' ') },
          _react2.default.createElement(
            _Button2.default,
            {
              disabled: isDisabled,
              className: _app2.default.login_btn,
              onClick: this.onSubmit,
              dataTestId: 'loginButton' },
            'Login'
          )
        )
      ),
      this.state.page_state == this.PAGE_LOGIN && _react2.default.createElement(
        'div',
        { className: [_app2.default.container_signup, this.state.isAnimationPage1 && _app2.default.fadeOut].join(' ') },
        _react2.default.createElement('div', { className: _app2.default.logo_icon }),
        _react2.default.createElement(
          'p',
          { className: _app2.default.signup_text },
          'No account yet? \xA0 ',
          _react2.default.createElement(
            'a',
            { className: _app2.default.signup_link, onClick: this.onGotoLogin },
            'Sign up here'
          )
        )
      ),
      this.state.page_state == this.PAGE_WELCOME && _react2.default.createElement(
        'div',
        { className: _app2.default.welcome_page },
        _react2.default.createElement(
          'div',
          { className: _app2.default.div_welcome_sleep },
          _react2.default.createElement(
            'h1',
            { className: [_app2.default.welcome_sleep_text, this.state.isAnimationPage2 && _app2.default.slideUp].join(' ') },
            'I\'ll sleep up',
            _react2.default.createElement('br', null),
            'here now.'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            { className: [_app2.default.welcome_description, this.state.isAnimationPage2 && _app2.default.fadeIn].join(' ') },
            'Little Alchemist will now go to work ',
            _react2.default.createElement('br', null),
            'whenever you apture anything ',
            _react2.default.createElement('br', null),
            'on the screen.'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _app2.default.div_parent_closeme },
          _react2.default.createElement(
            'div',
            { className: [_app2.default.div_closeme, this.state.isAnimationPage2 && _app2.default.slideDown].join(' ') },
            _react2.default.createElement(
              'button',
              { className: _app2.default.btn_closeme, ref: this.elem_closeme_btn, onClick: this.closeWindow },
              'CLOSE ME'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _app2.default.div_closeme_bottomline },
            _react2.default.createElement('p', { className: _app2.default.purple_bottom_line_2, style: { width: this.state.closeme_bottom_line_width } })
          )
        )
      )
    );
  }
}, _class.propTypes = {
  onLogin: _propTypes2.default.func.isRequired
}, _temp2);

App.propTypes = {
  invalidateAuthenticatedUser: _propTypes2.default.func.isRequired,
  logout: _propTypes2.default.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    invalidateAuthenticatedUser: data => {
      dispatch((0, _authActions.invalidateAuthenticatedUser)());
      dispatch((0, _authActions.fetchAuthenticatedUserIfNeeded)());
    },
    logout: loginWindow => {
      loginWindow.refresh();
    },
    loadTags: () => {
      dispatch(loadTagsAction());
    },
    loadFolders: () => {
      dispatch(loadFoldersAction());
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map