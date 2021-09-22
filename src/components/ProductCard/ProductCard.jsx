import React, { useState, useEffect } from 'react'
import Button from "../common/ui/button"
import s from './ProductCard.module.scss'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../reducers/productsInCartSlice'

function ProductCard({ product, productType }) {
  const { id, imageUrl, name, types, sizes, price, category, rating, composition } = product

  const dispatch = useDispatch()
  /* Хук для первого параметра (например, размер пиццы) */
  let [param1, setParam1] = useState(0)

  let items1
  if (sizes) {
    items1 = [...sizes]
  }

  /* Хук для второго параметра (например, толщина теста) */
  let [param2, setParam2] = useState(0)

  let items2
  if (types) {
    items2 = [...types]
  }

  useEffect(() => {
    setParam1(0)
    setParam2(0)
  }, [window.location.pathname])


  const addToCardHandler = () => {
    const product = {
      id,
      imageUrl,
      name,
      type: types ? types[param2] : "",
      size: sizes ? sizes[param1] : "",
      price,
      category,
      rating,
      composition,
      /** Для стора */
      productType,
      /** Для корзины*/
      localId: id + (types ? types[param2] : "") + (sizes ? sizes[param1] : ""),
      /** Для корзины*/
      totalCount: 1
    }

    dispatch(addProduct(product))
  }

  return (
    <React.Fragment>

      <div className={s.productCard}>
        <div className={s.productCard__img}>
          <img alt="pizza" src={imageUrl} />
        </div>

        <p className={s.productCard__title}>{name}</p>

        <div className={s.productCard__composition}>

          {composition && composition.map((item, index) =>
            <span key={index} className={s.productCard__compositionItem}>{item}</span>
          )}
        </div>

        <div className={s.productCard__innerContainer}>
          <ul className={s.productCard__selectForm}>
            {items1 && items1.map((item, index) => {
              return (
                <li key={index}>
                  <button
                    type="button"
                    className={`
                      ${s.productCard__selectSize} 
                      ${param1 === index && s.productCard__selectSize_active}`}
                    onClick={() => setParam1(index)}
                  >{item}</button>
                </li>)
            }
            )}
          </ul>

          <ul className={s.productCard__selectForm}>
            {items2 && items2.map((item, index) =>
              <li key={index}>
                <button
                  type="button"
                  className={`
                    ${s.productCard__selectSize}
                    ${param2 === index && s.productCard__selectSize_active}`}
                  onClick={() => setParam2(index)}
                >{item}</button>
              </li>
            )}
          </ul>

          <div className={s.productCard__price}>{price}</div>

          <Button
            title="Добавить в корзину"
            onclick={addToCardHandler} />
        </div>

      </div>

    </React.Fragment>
  )
}

export default ProductCard
