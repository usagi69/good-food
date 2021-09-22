import React from 'react'
import s from './footer.module.scss'

function PageFooter() {
  return (
    <footer className={s.footer}>
      <div className="container">

        <div className={s.footer__top}>

          <div className={`${s.footer__informationList} ${s.listInfo}`}>
            <div className={s.listInfo__section}>
              <h6 className={s.listInfo__title}>Интернет-магазин</h6>
              <ul className={s.listInfo__list}>
                <li className={s.listInfo__listItem}>Доставка и самовывоз</li>
                <li className={s.listInfo__listItem}>Оплата</li>
                <li className={s.listInfo__listItem}>Новости</li>
                <li className={s.listInfo__listItem}>Акции</li>
                <li className={s.listInfo__listItem}>Контакты</li>
              </ul>
            </div>
          </div>

          <div className={s.footer__subscribeForm}>
            <h4 className={s.footer__formTitle}>Подпишитесь и узнавайте об акциях быстрее</h4>
            <form action="" className={s.footer__form}>
              <input type="email" placeholder="Введите ваш e-mail" className={s.footer__formInput} />
              <button className={s.footer__formButton} type="submit">Отправить</button>
            </form>
          </div>

        </div>

        <div className={s.serviceMessage}>Сервис находится в разработке</div>
      </div>
    </footer>
  )
}

export default PageFooter
