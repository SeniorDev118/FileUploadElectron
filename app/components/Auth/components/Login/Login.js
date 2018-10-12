import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
// import { CSS, units, color, constants } from 'electron-css';
import { replace } from 'react-router-redux';
import Button from '../../../../shared/components/Button/Button'
import { invalidateAuthenticatedUser } from '../../../../shared/entities/authActions'
import { fetchAuthenticatedUserIfNeeded } from '../../../../shared/entities/authActions'
import { postRequest, getRequest } from '../../../../shared/utils/ApiRepository'

import Lottie from 'react-lottie';
import * as animationData_Login from './animation.json'
// import * as animationData_Welcome from './animationWelcome.json'

import styles from './Login.css'

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  PAGE_LOGIN = 0;
  PAGE_WELCOME = 1;

  state = {
    userId: '',
    email: '',
    password: '',
    password_symbol: '',
    user_bottom_line_width: 0,
    pwd_bottom_line_width: 0,
    closeme_bottom_line_width: 0,
    isAnimationPage1 : false,
    isAnimationPage2 : false,
    login_form_style: { borderBottom: '1px solid #3e3e3e' },
    pwd_form_style: { borderBottom: '1px solid #3e3e3e' },
    logo_visible: { visibility: 'visible' },
    logo_anim_visible: { display: 'none' },
    page_state: this.PAGE_LOGIN,
    logo_anim_stop: true,
    hasError: false
  };
  
  refresh = () => {
    this.setState(
      {
        userId: '',
        email: '',
        password: '',
        password_symbol: '',
        user_bottom_line_width: 0,
        pwd_bottom_line_width: 0,
        closeme_bottom_line_width: 0,
        isAnimationPage1 : false,
        isAnimationPage2 : false,
        login_form_style: { borderBottom: '1px solid #3e3e3e' },
        pwd_form_style: { borderBottom: '1px solid #3e3e3e' },
        logo_visible: { visibility: 'visible' },
        logo_anim_visible: { display: 'none' },
        page_state: this.PAGE_LOGIN,
        logo_anim_stop: true,
        hasError: false
      }
    );
  }

  elem_user_bottom_line = React.createRef();
  elem_pwd_bottom_line = React.createRef();
  elem_closeme_btn = React.createRef();
  elem_div_container = React.createRef();
  
  animationLoginOption = {
    loop: false,
    autoplay: true,
    animationData: animationData_Login,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  };

  onEmailChange = (event) => {
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
    })
    setTimeout(this.setUserBottomWidth, 0.01);
  };

  setUserBottomWidth = () => {
    this.setState({
      user_bottom_line_width: this.elem_user_bottom_line.current.clientWidth
    })
  }

  onPasswordChange = (event) => {
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
    })

    setTimeout(this.setPwdBottomWidth, 0.01);
  };

  setPwdBottomWidth = () => {
    this.setState({
      pwd_bottom_line_width: this.elem_pwd_bottom_line.current.clientWidth
    })
  }

  onSubmit = () => {
    const { email, password } = this.state
    var url = global.API_URL;
    event.preventDefault()

    const request = new Request(url + "/login_check", {
      /* global API_URL */
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })

    return fetch(request)
      .then((response) => {
        if (response.status === 401) {
          this.setState({ hasError: true })
        }
        if (response.status < 200 || response.status >= 300) {
          this.setState({ hasError: true })
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(({ token }) => {

        localStorage.setItem('token', token) // The JWT token is stored in the browser's local storage
        this.setState({
          logo_visible: { visibility: 'hidden' },
          logo_anim_visible: { display: 'block' },
          user_bottom_line_width: 0,
          pwd_bottom_line_width: 0,
          logo_anim_stop: false,
        });
        this.animation1_1();//after 0s
        setTimeout(this.animation1_2, 500);  //after 0s
        setTimeout(this.animation1_3, 1000);  //after 1s
        setTimeout(this.redirectMainPage, 1500);//after 3s
      })
      .catch(error => {
        console.log(error)
        this.setState({ hasError: true })
      }
      )
  };

  redirectMainPage = () => {    
    getRequest('auths/status').then((response) => {
      if (response.authenticated === true) {
        getRequest('users/me').then((response) => {
          this.setState({ 
            page_state: this.PAGE_WELCOME, 
            userId: response.url
          });
          this.startWatcher(global.IMAGE_PATH, this);
          this.timer = setTimeout(this.trayHideWindow, 5000);

          this.setState({ isAnimationPage2: true });
          this.timerCloseMe = setTimeout(this.animation2_3, 1000);
        })
      }
    }).catch(() => {
    })
  }

  animation1_1 = () => {
    this.setState({
      user_bottom_line_width: 0,
      pwd_bottom_line_width: 0,
    })
  }

  animation1_2 = () => {
    this.setState({
      logo_visible: { visibility: 'hidden' },
      logo_anim_visible: { display: 'block' },
      user_bottom_line_width: 0,
      pwd_bottom_line_width: 0,
      logo_anim_stop: false,
    });
  }

  animation1_3 = () => {
    this.setState({
      isAnimationPage1: true
    });
  }

  animation2_3 = () => {
    var width = this.elem_closeme_btn.current.clientWidth;
    this.setState({closeme_bottom_line_width: width});
  }

  trayHideWindow() {
    console.log('trayShowWindow');
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('hide-window', 'an-argument');
  }

  minimizeWindow = (e) => {
    const { BrowserWindow } = require('electron').remote
    var window = BrowserWindow.getFocusedWindow();
    window.minimize();
  }

  closeWindow = () => {
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('quit-app', 'an-argument');
  }

  onGotoLogin = () => {
    const { shell } = require('electron')
    shell.openExternal('https://alchemy.is/login')
  }

  startWatcher = (path, parent) => {
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
      var extension = (path.split('.').pop()).toLowerCase();
      if (extension == 'jpg' || extension == 'png' || extension == 'git') {
        if (path.indexOf('screenshot') != -1 || path.indexOf('screen shot') != -1) {
          return true;
        }
      }
      return false;
    }

    function getFileExtension(path) {
      return (path.split('.').pop()).toLowerCase();
    }

    function getFileName(path) {
      var filename = "";
      if (path) {
        var startIndex = (path.indexOf('\\') >= 0 ? path.lastIndexOf('\\') : path.lastIndexOf('/'));
        filename = path.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1);
        }
      }
      return filename;
    }

    watcher
      .on('ready', function () {
        if (!this.isScanStart) {
          //onWatcherReady('Ready');
          this.isScanStart = true;
        }
      })
      .on('add', function (path) {
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

            postRequest('assets/bulk', filesData).then((responses) => {
              onWatcherReady('File ' + path + ' is uploaded')
            }).catch(() => {
              onWatcherReady('Upload fail')
            })
          }
        }
      })
      .on('addDir', function (path) {
        if (this.isScanStart) {
          onWatcherReady('Directory' + path + ' has been added')
        }
      })
      .on('change', function (path) {
        if (this.isScanStart) {
          onWatcherReady('File' + path + ' has been changed')
        }
      })
      .on('unlink', function (path) {
        if (this.isScanStart) {
          onWatcherReady('File' + path + ' has been removed')
        }
      })
      .on('unlinkDir', function (path) {
        if (this.isScanStart) {
          onWatcherReady('Directory' + path + ' has been removed')
        }
      })
      .on('error', function (error) {
        if (this.isScanStart) {
          onWatcherReady('Error happened')
        }
      })
      .on('raw', function (event, path, details) {
        // This event should be triggered everytime something happens.
        if (this.isScanStart) {
          console.log('Raw event info:', event, path, details);
        }
      });
  }

  render() {

    const { ipcMain } = require('electron').remote
    ipcMain.on('signout-window', () => {
      this.props.logout(this);
    })
    const { email, password, hasError } = this.state
    const isDisabled = email.length === 0 || password.length === 0
    return (
      <div className={styles.login_screen}>
        <div className={styles.style_titlebar}>
        </div>

        <p className={[styles.length_user_name, this.state.isAnimationPage1 && styles.fadeOut].join(' ')} ref={this.elem_user_bottom_line}>{this.state.email}</p>
        <p className={[styles.length_pwd, this.state.isAnimationPage1 && styles.fadeOut].join(' ')} ref={this.elem_pwd_bottom_line}>{this.state.password_symbol}</p>

        <div className={[styles.container_login].join(' ')} ref={this.elem_div_container}>
          {this.state.page_state == this.PAGE_LOGIN &&
            <div className={styles.logo} style={this.state.logo_visible}></div>
          }

          <div className={styles.logo_anim} style={this.state.logo_anim_visible}>
            <Lottie options={this.animationLoginOption} width={230} height={108} isStopped={this.state.logo_anim_stop} />
          </div>

          {this.state.page_state == this.PAGE_LOGIN &&
            <div className={[styles.login_form_div, this.state.isAnimationPage1 && styles.fadeOut].join(' ')}>
              {hasError && (<p className={styles.login_error} >We don't recognize this user.</p>)}
              <p className={styles.login_label}>
                E-MAIL
              </p>
              <div className={[styles.login_form_content, this.state.isAnimationPage1 && styles.fadeOut].join(' ')}>
                <input
                  className={styles.login_form_input}
                  type="email"
                  onChange={this.onEmailChange}
                  value={this.state.email}
                  style={this.state.login_form_style} />
                <p className={styles.purple_bottom_line} style={{ width: this.state.user_bottom_line_width }}></p>
              </div>
            </div>
          }

          {this.state.page_state == this.PAGE_LOGIN &&
            <div className={[styles.password_form_div, this.state.isAnimationPage1 && styles.fadeOut].join(' ')}>
              <p className={styles.login_label}>
                PASSWORD
              </p>
              <div className={[styles.login_form_content, this.state.isAnimationPage1 && styles.fadeOut].join(' ')}>
                <input
                  className={styles.login_form_password}
                  type="password"
                  onChange={this.onPasswordChange}
                  value={this.state.password}
                  style={this.state.pwd_form_style}
                />
                <p className={styles.purple_bottom_line_2} style={{ width: this.state.pwd_bottom_line_width }}></p>
              </div>
            </div>
          }

          {this.state.page_state == this.PAGE_LOGIN &&
            <div className={[styles.login_btn_div, this.state.isAnimationPage1 && styles.fadeOut].join(' ')}>
              <Button
                disabled={isDisabled}
                className={styles.login_btn}
                onClick={this.onSubmit}
                dataTestId="loginButton">
                Login
              </Button>
            </div>
          }
        </div>

        {this.state.page_state == this.PAGE_LOGIN &&
          <div className={[styles.container_signup, this.state.isAnimationPage1 && styles.fadeOut].join(' ')}>
            <div className={styles.logo_icon}></div>
            <p className={styles.signup_text}>No account yet? &nbsp; <a className={styles.signup_link} onClick={this.onGotoLogin} >Sign up here</a></p>
          </div>
        }

        {this.state.page_state == this.PAGE_WELCOME &&
          <div className={styles.welcome_page}>
            <div className={styles.div_welcome_sleep}>
              <h1 className={[styles.welcome_sleep_text, this.state.isAnimationPage2 && styles.slideUp].join(' ')}>I'll sleep up<br />here now.</h1>
            </div>
            <div>
              <p className={[styles.welcome_description, this.state.isAnimationPage2 && styles.fadeIn].join(' ')}>
                Little Alchemist will now go to work <br />
                whenever you apture anything <br />
                on the screen.
              </p>
            </div>
            <div className={styles.div_parent_closeme}>
              <div className={[styles.div_closeme, this.state.isAnimationPage2 && styles.slideDown].join(' ')}>
                <button className={styles.btn_closeme} ref={this.elem_closeme_btn} onClick={this.closeWindow}>CLOSE ME</button>
              </div>
              <div className={styles.div_closeme_bottomline}>
                <p className={styles.purple_bottom_line_2} style={{ width: this.state.closeme_bottom_line_width }}></p>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
Login.propTypes = {
  invalidateAuthenticatedUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tags: state.tags.items,
  folders: state.folders.items,
})

const mapDispatchToProps = (dispatch) => {
  return {
    invalidateAuthenticatedUser: (data) => {
      dispatch(invalidateAuthenticatedUser());
      dispatch(fetchAuthenticatedUserIfNeeded());
    },
    logout: (loginWindow) => {
      loginWindow.refresh();
    }, 
    loadTags: () => { 
      dispatch(loadTagsAction())
    }, 
    loadFolders: () => {
      dispatch(loadFoldersAction())
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)

