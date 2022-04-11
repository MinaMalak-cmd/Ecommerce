import { createSlice, configureStore} from "@reduxjs/toolkit";
import data from "../data/db.json";

const tempProducts = data.products;
const productInitialState = {product:tempProducts};
const productSlice = createSlice({
    name: "product",
    initialState: productInitialState,
    reducers: {
      getProductByFilter: (state:any, action) => {
        const { categories, priceRange } = action.payload;
        let currentProducts =[];
        for(let i=0;i<tempProducts.length;i++){
          let product = tempProducts[i];
          if (categories.indexOf(product.category)!==-1 &&(product.price >= priceRange.min && product.price <= priceRange.max)) {
            currentProducts.push(product)
          }
        }
        state.product = currentProducts;
      },
      sortProducts: (state:any, { payload: { sortName,direction } }) => {
        const productsCopy = [...productInitialState.product];
        if (sortName === "price" && direction === "asc") {
          state.product = productsCopy.sort((a:any, b:any) => a.price - b.price);
        } 
        else if (sortName === "price" && direction === "desc") {
          state.product = productsCopy.sort((a:any, b:any) => b.price - a.price);
        }
        else if (sortName === "alphabetically" && direction === "asc") {
          state.product = productsCopy.sort((a:any, b:any) => a.name.localeCompare(b.name));
        }
        else {
          state.product = productsCopy.sort((a:any, b:any) => b.name.localeCompare(a.name));
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
        let currentCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) as any[] : []
        currentCart.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(currentCart));
      },
      removeFromCart: (state:any) => {
        state.cart = [];
        localStorage.setItem('cart', JSON.stringify([]));
      }
    },
  });
const store = configureStore({
  reducer: { product: productSlice.reducer, cart: cartSlice.reducer },
});
export const featuredProduct = tempProducts.filter((product) => product.featured === true)[0] as any;
export const categories = new Set(tempProducts.map(el=>el.category));
export const productActions = productSlice.actions;
export const cartActions = cartSlice.actions;
export default store;