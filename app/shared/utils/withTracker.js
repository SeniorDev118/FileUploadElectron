import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options
    })
    ReactGA.pageview(page)
  }

  const HOC = class extends Component {
    componentDidMount() {
      /* global PRODUCTION */
      if (global.PRODUCTION) {
        const page = this.props.location.pathname
        trackPage(page)
      }
    }

    componentWillReceiveProps(nextProps) {
      /* global PRODUCTION */
      if (global.PRODUCTION) {
        const currentPage = this.props.location.pathname
        const nextPage = nextProps.location.pathname

        if (currentPage !== nextPage) {
          trackPage(nextPage)
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  HOC.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  return HOC
}
