import React from 'react'
import s from './list-item.module.scss'
import { useDispatch } from 'react-redux'
import { decreaseProductQuantity, increaseProductQuantity, removeProduct } from '../../../reducers/productsInCartSlice'

function ListItem({ product, removeDispatch }) {
  const dispatch = useDispatch()


  return (
    <div className={s.productItem}>
      <div className={s.productItem__product}>
        <div className={s.productItem__img}>
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className={s.productItem__info}>
          <span className={s.productItem__name}>{product.name}</span>
          <div className={s.productItem__params}>
            {product.size && <span>{product.size}</span>}
            {product.type && <span>{product.type}</span>}
          </div>
        </div>
      </div>
      <div className={s.productItem__price}>{product.price}</div>
      <div className={s.productItem__counter}>
        <button
          type="button"
          className={s.productItem__counterButton}
          onClick={() => dispatch(decreaseProductQuantity(product))}>{'-'}</button>
        {product.totalCount}
        <button
          type="button"
          className={s.productItem__counterButton}
          onClick={() => dispatch(increaseProductQuantity(product))}>{'+'}</button>
      </div>
      <div className={s.productItem__subtotal}>{product.totalCount * product.price}</div>
      <div className={s.productItem__deleteWrapper}>
        <button
          type="button"
          className={s.productItem__delete}
          onClick={() => dispatch(removeProduct(product))}>X</button>
      </div>
    </div>

  )
}

export default ListItem
