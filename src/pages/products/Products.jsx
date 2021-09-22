import React, { useEffect, useState } from 'react'
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import ProductCard from '../../components/ProductCard/ProductCard'
import s from './Products.module.scss'
import getUrlPatch from '../../utils/urlParams';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../reducers/productsSlice';

const Catalog = () => {
  const [urlPatch, setUrlPatch] = useState('')

  useEffect(() => {
    setUrlPatch(() => getUrlPatch())
  }, [window.location.pathname])

  /* Опередеяю текст заголовка для страницы */
  const [sectionTitle, setSectionTitle] = useState('')
  useEffect(() => {
    if (urlPatch === 'pizzas')
      setSectionTitle("Пицца")
    if (urlPatch === 'burgers')
      setSectionTitle("Бургеры")
    if (urlPatch === 'sushi')
      setSectionTitle("Суши")
    if (urlPatch === 'drinks')
      setSectionTitle("Напитки")
  }, [urlPatch])

  document.title = sectionTitle;

  const [products, setProducts] = useState([])

  const allProducts = useSelector(selectProducts)

  // Определяю какие данные использовать для вывода
  useEffect(() => {
    setProducts(allProducts[urlPatch] || [])
  }, [allProducts[urlPatch]])

  /* Меню с выбором типа продукта. Вытаскиваю из переданных данных тип содержимого, для дальнейшего формирования списка меню */
  let varietyList = products.map((item) => {
    return item["variety"]
  })
  varietyList = Array.from(new Set(varietyList.flat()))

  /* хук отвечающий за выбранный тип (например, пиццы) на странице */
  let currentVariety = [...products]
  let [currentSort, setCurentSort] = useState([])

  function changeVariety(variety) {

    currentVariety.length = 0
    setCurentSort(currentSort.length = 0)

    if (variety === 'Все') {
      products.map((product) => {
        if (product.hasOwnProperty(["id"])) {
          currentVariety.push(product)
        }
      })

      setCurentSort(currentSort = [...currentVariety])
      return
    }

    products.map((product) => {
      if (product["variety"].includes(variety)) {
        currentVariety.push(product)
      }
    })

    setCurentSort(currentSort = [...currentVariety])
  }

  useEffect(() => {
    changeVariety()
  }, [allProducts[urlPatch]])
  
  return (
    <main>    
      <section className={s.products}>
        <div className={s.section__header}>
          <span className={s.section__title}>{sectionTitle}</span>
        </div>
        <div className={s.products__body}>
          <div className={s.products__content}>
            <div className={s.products__container}>
              <div className={s.products__filters}>
                <ProductFilter
                  items={varietyList}
                  onClickItem={(variety) => changeVariety(variety)}
                />
              </div>
            </div>

            <div className={s.products__container}>
              <ul className={s.products__cardWrapper}>
                {currentSort[0] === undefined ? products.map((item, index) => {
                  return (
                    <li className={s.products__cardItem} key={index}>
                      <ProductCard product={item} productType={urlPatch} />
                    </li>
                  )
                })
                  : currentSort.map((item, index) => {
                    return (
                      <li className={s.products__cardItem} key={index}>
                        <ProductCard product={item} productType={urlPatch} />
                      </li>
                    )
                  })
                }

              </ul>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Catalog
