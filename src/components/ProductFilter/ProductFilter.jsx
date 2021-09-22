import React, { useEffect, useState } from 'react'
import s from './ProductFilter.module.scss'
import getUrlPatch from '../../utils/urlParams'

const ProductFilter = ({ items, onClickItem }) => {
  const [pageUrl, setPrevUrl] = useState('')
  const [activeItem, setItem] = useState(0)

  const onSelectItem = (index) => {
    setItem(index)
  }

  useEffect(() => {
    pageUrl !== getUrlPatch() && setItem(0)
    setPrevUrl(() => getUrlPatch())
  })

  return (
    <ul className={s.filters__list}>

      <li key={0}>
        <button
          type="button"
          className={`
            ${s.filters__type} 
            ${activeItem === 0 && s.filters__type_active}`
          }
          onClick={() => {
            onSelectItem(0)
            onClickItem("Все")
          }}
        >{"Все"}</button>
      </li>

      {items && items.map((item, index) =>
        <li key={1 + index}>
          <button
            type="button"
            className={`
              ${s.filters__type} 
              ${activeItem === index + 1 && s.filters__type_active}`
            }
            onClick={() => {
              onSelectItem(1 + index)
              onClickItem(item)
            }}
          >{item}</button>
        </li>
      )}
    </ul>
  )
}

export default ProductFilter
