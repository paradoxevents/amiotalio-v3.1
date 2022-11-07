import React from 'react'
import classnames from 'classnames'

const Button = ({
  children,
  icon,
  small,
  inline,
  active,
  customClass,
  ...rest
}) => {
  return (
    <button className={classnames(
      "btn",
      icon !== false ? "with-icon" : null,
      small ? "btn-small" : null,
      inline ? "btn-inline" : null,
      active ? "btn-inline-active" : null,
      customClass
    )} {...rest}>
      {icon !== false ? <span className="icon-box">{icon}</span> : null}
      {children}
    </button>
  )
}

export default Button

Button.defaultProps = {
  icon: false,
  small: false,
  inline: false,
  active: false
}
