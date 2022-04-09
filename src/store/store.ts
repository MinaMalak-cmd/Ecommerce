import { createSlice } from "@reduxjs/toolkit";
import {IProduct} from "../Interface/IProduct";
import data from "../data/db.json";

const products = data.products;
const initalState = products as IProduct[];
const productSlice = createSlice({
    name: "product",
    initialState: initalState,
    reducers: {
      getProductByFilter: (state, { payload: { filterObj } }) => {
        const { category, priceRange } = filterObj;
        let products = state.filter((product) => {
          if (category === product.category) {
            if (
              priceRange.min <= product.price &&
              product.price <= priceRange.max
            ) {
              return product;
            }
          }
        });
  
        state.products = products;
      },
      sortProducts: (state, { payload: { sortName } }) => {
        const productsCopy = {...state};
        if (sortName === "price") {
          state.products = productsCopy.sort((a:IProduct, b:IProduct) => a.price - b.price);
        } else {
          state.products = productsCopy.sort((a:IProduct, b:IProduct) => b.name - a.name);
        }
      },
    },
  });
  
export const { getProductByFilter, sortProducts } = productSlice.actions;
export const selectProduct = (state:{product:IProduct}) => state.product;
export default productSlice.reducer;
  