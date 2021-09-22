import React, { useEffect, useState } from 'react'

import ListItem from "./../../components/cart-elements/list-item/list-item"
import CartSheque from '../../components/cart-elements/cart-sheque/cart-sheque'
import EmptyCart from '../../components/cart-elements/empty-cart/empty-cart'
import { selectProductsInCart } from '../../reducers/productsInCartSlice'
import Button from '../../components/common/ui/button'
import s from './cart.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../reducers/productsInCartSlice'


function Cart(props) {
  const dispatch = useDispatch()
  const products = useSelector(selectProductsInCart)
  const [productShowList, setProductShowList] = useState([])

  const getProductShowList = () => {
    const result = []

    for (const productCategory in products) {
      for (let i = 0; i < products[productCategory].length; i++) {
        result.push(products[productCategory][i])
      }
    }
    return result
  }

  useEffect(() => {
    setProductShowList(getProductShowList)
  }, [products])

  return (
    <main>
      <section className={s.cart}>
        <div className={s.section__header}>
          <span className={s.section__title}>Корзина</span>
        </div>

        <div className="container">
          <div className={s.cart__body}>
            {productShowList.length
              ? <>
                <div className={s.cart__table}>
                  <div className={`${s.table__header} ${s.tableHeader}`}>
                    <span className={s.tableHeader__productName}>Продукт</span>
                    <span className={s.tableHeader__productPrice}>Цена</span>
                    <span className={s.tableHeader__productQuantity}>Количество</span>
                    <span className={s.tableHeader__productSubtotal}>Сумма</span>
                    <span className={s.tableHeader__productDelete}>Удалить</span>
                  </div>

                  <div className={s.table__body}>
                    <ul className={s.table__productList}>
                      {productShowList && productShowList.map((item, index) => {
                        return (
                          <li key={item.localId} >
                            <ListItem product={item} removeDispatch={(localId) => dispatch((loacalId) => removeProduct(loacalId))} />
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                </div>

                <div className={s.cart__cheque}>
                  <CartSheque totalCount={productShowList} totalPrice={productShowList + 1} />
                </div></>
              : <EmptyCart />}

          </div>

        </div>

      </section>
    </main>
  )
}

export default Cart
