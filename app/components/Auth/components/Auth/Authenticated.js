import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { fetchAuthenticatedUserIfNeeded } from '../../../../shared/entities/authActions'
import FullscreenLoader from '../../../../shared/components/Loader/FullscreenLoader'

class Authenticated extends Component {
  componentDidMount() {
    this.props.loadAuthenticatedUser()
  }

  render() {
    const { user, children } = this.props

    if (user === null) {
      return <FullscreenLoader />
    }
    if (user.authenticated === false) {
      //return <Redirect to="/logout" />
    }
    return children
  }
}

Authenticated.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  loadAuthenticatedUser: PropTypes.func.isRequired,
  user: PropTypes.shape()
}

Authenticated.defaultProps = {
  user: null
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  loadAuthenticatedUser: () => dispatch(fetchAuthenticatedUserIfNeeded())
})

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated)
