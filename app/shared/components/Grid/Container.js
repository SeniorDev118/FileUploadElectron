import React from 'react'
import PropTypes from 'prop-types'
import { CSS, units, color, constants } from 'electron-css';

// import styles from './Container.scss'
const containerFluid = CSS({
  'width': '100%',
  'padding-right': '15px',
  'padding-left': '15px',
  'margin-right': 'auto',
  'margin-left': 'auto'
});

const fullHeight = CSS({
  'height': '100%'
});

const Container = (props) => {
  const { className, fullHeight, children } = props

  // const classNames = cx(containerFluid, {
  //   [styles.fullHeight]: fullHeight
  // }, className)
  
  const classNames = [
    containerFluid,
    fullHeight,
    className
  ];

  return <div className={classNames}>{children}</div>
  //return <div className={classNames}>{children}</div>
}

Container.propTypes = {
  //className: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  fullHeight: PropTypes.bool
}

Container.defaultProps = {
  className: null,
  fullHeight: false
}

export default Container
