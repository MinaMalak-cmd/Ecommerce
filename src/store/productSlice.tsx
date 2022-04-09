import { createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../Interface/IProduct";
import data from "../data/db.json";

const tempProducts = data.products;
const initalState = tempProducts;
const productSlice = createSlice({
    name: "product",
    initialState: initalState,
    reducers: {
      getProductByFilter: (state:any, action) => {
        const { category, priceRange } = action.payload;
        let currentProducts = {...state};
        currentProducts = currentProducts.filter((product) => {
          if (category === product.category && (priceRange.min <= product.price &&
            product.price <= priceRange.max)) {
                 return product;
          }
        });
        state.products = currentProducts;
      },
      sortProducts: (state:any, { payload: { sortName } }) => {
        const productsCopy = {...state};
        if (sortName === "price") {
          state.products = productsCopy.sort((a:IProduct, b:IProduct) => a.price - b.price);
        } else {
          state.products = productsCopy.sort((a:IProduct, b:IProduct) => a.name.localeCompare(b.name));
        }
      },
    },
  });
  
export const { getProductByFilter, sortProducts } = productSlice.actions;
export const selectProduct = (state:{product:IProduct}) => state.product;
export default productSlice.reducer;
  