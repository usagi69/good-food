import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "../service/productsService";

// Асинхронное получение списка продуктов
export const asyncGetProducts = createAsyncThunk(
  'products/asyncSetProducts',
  productsService.getProducts
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    pizzas: [],
    burgers: [],
    sushi: [],
    drinks: []
  },
  reducers: {
    setProducts: (state, action) => {
      state = action.payload
    }
  },
  extraReducers: {
    [asyncGetProducts.fulfilled]: (state, action) => {
      state.pizzas = action.payload.pizzas
      state.burgers = action.payload.burgers
      state.sushi = action.payload.sushi
      state.drinks = action.payload.drinks
    }
  }
})

export const { setProducts } = productsSlice.actions

export const selectProducts = (state) => state.products


export default productsSlice.reducer