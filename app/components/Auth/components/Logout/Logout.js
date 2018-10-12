import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { invalidateAuthenticatedUser } from '../../../../shared/entities/authActions'

const Logout = (props) => {
  localStorage.removeItem('token')
  props.invalidateAuthenticatedUser()
  const { ipcRenderer } = require('electron')
  window.ipc = window.ipc || {}
  ipcRenderer.send('open-login-window', 'an-argument');
  return <Redirect to="/login" />
}

Logout.propTypes = {
  
}

const mapDispatchToProps = dispatch => ({
  invalidateAuthenticatedUser: () => dispatch(invalidateAuthenticatedUser()),
})

export default connect(null, mapDispatchToProps)(Logout)

