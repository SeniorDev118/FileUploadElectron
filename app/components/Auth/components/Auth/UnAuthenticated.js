import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { fetchAuthenticatedUserIfNeeded }  from '../../../../shared/entities/authActions'
import FullscreenLoader from '../../../../shared/components/Loader/FullscreenLoader'

class UnAuthenticated extends Component {
  componentDidMount() {
    this.props.loadAuthenticatedUser()
  }

  render() {
    const { user, children } = this.props
    if (user === null ) {
      return <FullscreenLoader />
    }
    if (user.id) {
      const { ipcRenderer } = require('electron')
      window.ipc = window.ipc || {}
      ipcRenderer.send('open-main-window', 'an-argument');
      return children
    }
    else {
      const { ipcRenderer } = require('electron')
      window.ipc = window.ipc || {}
      ipcRenderer.send('open-login-window', 'an-argument');
      return <Redirect to="/login" />
    }
  }
}

UnAuthenticated.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  loadAuthenticatedUser: PropTypes.func.isRequired,
  user: PropTypes.shape()
}

UnAuthenticated.defaultProps = {
  user: null
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch) => {
  return {
    loadAuthenticatedUser: (data) => {
      dispatch(fetchAuthenticatedUserIfNeeded());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnAuthenticated)
