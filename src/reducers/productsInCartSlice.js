import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
  burgers: [],
  sushi: [],
  drinks: []
}

const productsInCartSlice = createSlice({
  name: 'productsInCart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const potentialProduct = state[action.payload.productType].find(product => product.localId === action.payload.localId)

      potentialProduct
        ? potentialProduct.totalCount += 1
        : state[action.payload.productType].push(action.payload)
    },
    increaseProductQuantity: (state, action) => {
      const potentialProduct = state[action.payload.productType].find(product => product.localId === action.payload.localId)
      potentialProduct.totalCount += 1

    },
    decreaseProductQuantity: (state, action) => {
      const potentialProduct = state[action.payload.productType].find(product => product.localId === action.payload.localId)
      if (potentialProduct.totalCount > 1)
        potentialProduct.totalCount -= 1
      else
        state[action.payload.productType] = state[action.payload.productType].filter(item => item.localId !== action.payload.localId)

    },
    removeProduct: (state, action) => {
      state[action.payload.productType] = state[action.payload.productType].filter(item => item.localId !== action.payload.localId)
    },
    clearCart: (state) => {
      state.pizzas.length = 0
      state.burgers.length = 0
      state.sushi.length = 0
      state.drinks.length = 0
    }
  },
})

export const { addProduct, increaseProductQuantity, decreaseProductQuantity, removeProduct, clearCart } = productsInCartSlice.actions

export const selectProductsInCart = (state) => state.productsInCart


export default productsInCartSlice.reducer