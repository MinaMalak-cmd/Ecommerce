import { createSlice, configureStore} from "@reduxjs/toolkit";
import {IProduct} from "../Interface/IProduct";
import data from "../data/db.json";

const tempProducts = data.products;
const productInitialState = tempProducts;
const productSlice = createSlice({
    name: "product",
    initialState: productInitialState,
    reducers: {
      getProductByFilter: (state:any, action) => {
        const { category, priceRange } = action.payload;
        let currentProducts = tempProducts.filter((product) => {
          if (category === product.category && (priceRange.min <= product.price &&
            product.price <= priceRange.max)) {
                 return product;
          }
        });
        state.product = currentProducts;
      },
      sortProducts: (state:any, { payload: { sortName } }) => {
        const productsCopy = {...state};
        if (sortName === "price") {
          state.product = productsCopy.sort((a:any, b:any) => a.price - b.price);
        } else {
          state.product = productsCopy.sort((a:any, b:any) => a.name-b.name);
        }
      },
    },
  });

const cartInitialState = {cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []};
const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
      addToCart: (state:any, action) => {
        state.cart.push(action.payload);
        let currentCart = JSON.parse(localStorage.getItem("cart"));
        currentCart.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(currentCart));
      },
      removeFromCart: (state:any, action) => {
        state.cart = [];
        localStorage.setItem('cart', JSON.stringify([state.cart]));
      }
    },
  });
const store = configureStore({
  reducer: { product: productSlice.reducer, cart: cartSlice.reducer },
});
export const productActions = productSlice.actions;
export const cartActions = cartSlice.actions;
export default store;