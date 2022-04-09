import { createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../Interface/IProduct";
import data from "../data/db.json";

const tempProducts = data.products;
const initalState = tempProducts;
const productSlice = createSlice({
    name: "product",
    initialState: initalState,
    reducers: {
      getProductByFilter: (state, action) => {
        const { category, priceRange } = action.payload;
        let products = {...state.products};
        products = products.filter((product) => {
          if (category === product.category && (priceRange.min <= product.price &&
            product.price <= priceRange.max)) {
                 return product;
          }
        });
        state.products = products;
      }
    },
  });
  
// export const { getProductByFilter, sortProducts } = productSlice.actions;
export const selectProduct = (state:{product:IProduct}) => state.product;
export default productSlice.reducer;
  