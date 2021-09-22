import React, { useState, useEffect } from 'react'
import Button from '../../common/ui/button'
import s from './cart-sheque.module.scss'
import { selectProductsInCart } from '../../../reducers/productsInCartSlice'
import QRCode from "react-qr-code";
import translit from './../../../utils/transliteration'
import { useDispatch, useSelector } from 'react-redux';
import productsService from './../../../service/productsService';

function CartSheque() {

  const REF_PAY_ID = "d02353c8-e12f-11ev-ba81-0242ac13507e"
  const [obtainingMethod, setObtainingMethod] = useState("")
  const [payMethod, setPayMethod] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("")

  const products = useSelector(selectProductsInCart)
  const [payloadData, setPayloadData] = useState(0)
  const dispatch = useDispatch()

  const [clientPhone, setClientPhone] = useState('')
  const [paidOrder, setPaidOrder] = useState(false)

  useEffect(() => {
    setPayloadData(`REF_PAY_ID:${REF_PAY_ID}`)
  })

  const showOrderForm = () => {
    if (obtainingMethod === "delivery" && payMethod && deliveryAddress && deliveryTime && clientPhone && !isNaN(clientPhone))
      return true

    if (obtainingMethod === "pickup" && payMethod && deliveryTime && clientPhone && !isNaN(clientPhone))
      return true
  }


  const getTotalProductCount = () => {
    const result = []

    for (const productCategory in products) {
      for (let i = 0; i < products[productCategory].length; i++) {
        result.push(products[productCategory][i])
      }
    }

    return result.reduce((previousValue, currentItem) => {
      return previousValue + currentItem.totalCount;
    }, 0)
  }


  const getTotalPrice = () => {
    const result = []

    for (const productCategory in products) {
      for (let i = 0; i < products[productCategory].length; i++) {
        result.push(products[productCategory][i])
      }
    }

    const flatList = result.map(product => {
      return product.price * product.totalCount
    })

    return flatList.reduce((previousValue, currentItem) => {
      return previousValue + currentItem;
    }, 0)
  }

  const orderHandler = () => {
    productsService.setOrder({
      PRODUCTS_IN_ORDER: products,
      OBTAINING_METHOD: obtainingMethod,
      DELIVERY_ADDRESS: translit(deliveryAddress),
      TOTAL_PRICE: getTotalPrice(),
      DELIVERY_TIME: deliveryTime,
      CLIENT_PHONE: clientPhone
    })
    setTimeout(() => {
      setPaidOrder(true)
    }, 700);
    setTimeout(() => {
      setPaidOrder(false)
      dispatch({ type: "productsInCart/clearCart" })
    }, 2700);
  }

  return (
    <div className={s.cartCheque}>
      <div className={s.cartCheque__coupon}>Ваш заказ:</div>
      <div className={s.cartCheque__piecesCount}>Количество
        <span>{getTotalProductCount()}</span>
      </div>
      <div className={s.cartCheque__total}>Сумма
        <span>{getTotalPrice()}</span>
      </div>

      <div className={s.cartCheque__form}>
        <div className={s.cartCheque__radiobuttons}>
          <form >
            <div>
              <label>
                <input
                  checked={obtainingMethod === "pickup"}
                  type="radio"
                  value="pickup"
                  name="delivery"
                  onChange={() => setObtainingMethod("pickup")} />Самовывоз</label>
            </div>
            <div>
              <label>
                <input
                  checked={obtainingMethod === "delivery"}
                  type="radio"
                  value="delivery"
                  name="delivery"
                  onChange={() => setObtainingMethod("delivery")}
                />Доставка</label>
            </div>
          </form>
        </div>

        <div className={s.cartCheque__radiobuttons}>
          <form >
            <label>
              <input
                checked={payMethod === "scan"}
                type="radio"
                id="scan"
                value="scan"
                name="scan"
                onChange={() => setPayMethod("scan")}
              />Сканировать QR</label>
            <label>
              <input
                checked={payMethod === "pay"}
                type="radio"
                id="pay"
                value="pay"
                name="scan"
                onChange={() => setPayMethod("pay")}
              />Оплата при получении</label>
          </form>
        </div>

        {<div className={s.cartCheque__phone}>
          <label htmlFor="telphone">Введите ваш номер телефона:</label>
          <input
            value={clientPhone}
            pattern="[0-9]{10}"
            placeholder="83517997115"
            maxlength="12"
            required
            type="tel"
            onChange={e => setClientPhone(e.target.value)}
            name="telphone"
            id="telphone" />
        </div>
        }

        {obtainingMethod === "pickup" &&
          <div className={s.cartCheque__deliveryForm}>
            <span>Самовывоз</span>
            <hr />

            <p>Адрес:
              <span>北京市朝阳区日坛北路17号</span>
              <br />
              <br />
              <span>17, Ri Tan North Road, Chaoyang District, Beijing </span>
              <br />
              <br />
            </p>
            <label htmlFor="pickupTime">Выберите время: </label>
            <input
              value={deliveryTime}
              type="time"
              onChange={e => setDeliveryTime(e.target.value)}
              name="pickupTime"
              id="pickupTime" />
          </div>
        }

        {obtainingMethod === "delivery" &&
          <div className={s.cartCheque__pickupForm}>
            <span>Доставка </span>
            <hr />

            <label>
              Адрес:
              <input
                className={s.cartCheque__pickupForm_address}
                type="text" value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)} />
            </label>

            <div>
              <label htmlFor="pickupTime">Выберите время: </label>
              <input
                value={deliveryTime}
                type="time"
                onChange={e => setDeliveryTime(e.target.value)}
                name="pickupTime"
                id="pickupTime" />
            </div>
          </div>
        }

        {payMethod &&
          <div className={s.cartCheque__deliveryForm}>
            <span>Оплата:</span>
            <hr />

            {payMethod === "scan"
              ? showOrderForm() ? <div className={s.cartCheque__qrContainer}> <QRCode value={payloadData} level="L" /> </div> : ""
              : <p>Оплата при получении</p>
            }
          </div>
        }
      </div>


      {showOrderForm() &&
        <div className={s.cartCheque__pay}>
          <Button title="Заказать" onclick={orderHandler} />
        </div>
      }
      {paidOrder &&
        <p className={s.cartCheque__paid}>Ваш заказ успешно создан!</p>
      }

    </div>
  )
}

export default CartSheque
