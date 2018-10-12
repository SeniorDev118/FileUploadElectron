import React from 'react'
import PropTypes from 'prop-types'
// import cx from 'classnames'
import { CSS, units, color, constants } from 'electron-css';


const button = CSS({
  'color': 'var(--white)',
  'background': 'var(--purple)',
  'display': 'inline-block',
  'font-weight': 'normal',
  'text-align': 'center',
  'white-space': 'nowrap',
  'vertical-align': 'middle',
  'user-select': 'none',
  'padding': '5px 15px',
  'line-height': '1.5',
  'border-radius': '2px',
  'border': '1px solid var(--purple)',
  'cursor': 'pointer'
});


const Button = ({ children, onClick, fullSize, className, disabled, type, dataTestId }) => {
  const buttonClasses = CSS({
  });
  
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func,
  fullSize: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'link']),
  dataTestId: PropTypes.string
}

Button.defaultProps = {
  onClick: null,
  fullSize: false,
  disabled: false,
  type: 'button',
  className: null,
  dataTestId: null
}

export default Button
