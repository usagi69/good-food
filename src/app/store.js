import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../reducers/productsSlice";
import productsInCartSlice from '../reducers/productsInCartSlice'

const store = configureStore({
  reducer: {
    products: productsSlice,
    productsInCart: productsInCartSlice,
  }
})

export default store