import React from 'react'
import s from './button.module.scss'

const Button = (props) => {

  return (
    <button
      onClick={props.onclick ? props.onclick : undefined}
      className={`${s.primaryButton} 
      ${props.myFlag ? "" : "product-card__add-cart "}`}
    >
      {props.title ? props.title : "Клик"}
    </button>
  )
}

export default Button
