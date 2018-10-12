import React, { Component } from 'react'
import { ipcMain } from 'electron';
import Container from './shared/components/Grid/Container'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { push, replace } from 'react-router-redux';
import { Authenticated } from './components/Auth/index'
import withPrompt from './shared/utils/withPrompt'
import Welcome from './components/Home/components/Welcome'
import path from 'path';

// var { Menu, Tray } = require('electron').remote

class App extends Component {

  componentDidMount = () => {
    setTimeout(this.trayHideWindow, 3000);
  }

  componentWillUnmount = () => {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props
  }

  trayHideWindow() {
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('hide-window', 'an-argument');
  }

  render() {
    const { pathname, assets } = this.props
    const { ipcMain } = require('electron').remote
    ipcMain.on('signout-window', () => {
      this.props.logout();
    })
    
    return (
      <Authenticated>
        <Container>
          <Welcome pathname={pathname} onMinimize={this.trayHideWindow}></Welcome>
        </Container>
      </Authenticated >
    )
  }
}

App.propTypes = {
  logout: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (url) => {
      const { ipcRenderer } = require('electron')
      ipcRenderer.send('open-main-window', 'an-argument');
      dispatch(push('/logout'));

      const menu = Menu.buildFromTemplate([
        { role: "quit" }, // "role": system prepared action menu
      ]);
      tray.setContextMenu(menu);
    }
  };
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  userId: state.auth.user.url
})

export default connect(null, mapDispatchToProps)(withPrompt(App))
