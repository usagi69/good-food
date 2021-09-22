import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../common/ui/button'
import emptyImage from "./empty-cart.jpg"
import s from './empty-cart.module.scss'

function EmptyCart() {
  return (
    <div className={s.cart__empty}>
      <div className={s.cart__inner}>
        <div className={s.cart__emptyImg}>
          <img src={emptyImage} alt="Cart is empty" /> 
        </div>
        <h2 className={s.cart__emptyTitle}>Ваша корзина пуста</h2>

        <Link to="/" ><Button className={s.cart__emptyReturn} title="Вернуться на главную" /></Link>
      </div>

    </div>
  )
}

export default EmptyCart
