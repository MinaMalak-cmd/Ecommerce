import { createSlice, current} from "@reduxjs/toolkit";
import {IProduct} from "../Interface/IProduct";
const initalState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
const cartSlice = createSlice({
    name: "cart",
    initialState: initalState,
    reducers: {
      addToCart: (state:any, action) => {
        let currentProducts = {...initalState};
        currentProducts.push(state);
        state.cart = currentProducts;
        localStorage.setItem('cart', JSON.stringify([state.cart]));
      },
      removeFromCart: (state:any, action) => {
        state.cart = [];
        localStorage.setItem('cart', JSON.stringify([state.cart]));
      }
    },
  });
  
export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCart = (state:{cart:IProduct[]|null}) => state.cart;
export default cartSlice.reducer;
  