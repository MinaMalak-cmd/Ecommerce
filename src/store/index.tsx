import { createSlice, configureStore} from "@reduxjs/toolkit";
import data from "../data/db.json";

const tempProducts = data.products;
const productInitialState = {product:tempProducts,page:1,totalPages:1,total:tempProducts.length,productsPerPage:[],limit:4};
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
        let x = {...paginateState(state.limit,state.page,currentProducts)};
        // console.log("🚀 ~ file: index.tsx ~ line 20 ~ x", x)
        state.productsPerPage = x.productsPerPage;
        state.totalPages = x.totalPages;
        // console.log("🚀 ~ file: index.tsx ~ line 22 ~ totalPages", state.totalPages)
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
      paginateProducts: (state:any, { payload: { page=1 } }) => {
        const total = state.total;
        const limit = state.limit;
        const start = (page - 1)* limit;
        const end = start + limit;
        let result = [...state.product];
        result = (end === total) ? result.slice(start) :
        result.slice(start, end);
        state.page = page;  
        state.productsPerPage=result;
        state.totalPages = Math.ceil(total/limit);
      },
      setLimit: (state:any, { payload: { limit } }) => {
        state.limit = limit;
      },
    },
  });
const paginateState = (limit:number,page:number,products:any) => {
  const total = products.length;
  const start = (page - 1)* limit;
  const end = start + limit;
  console.log("🚀 ~ file: index.tsx ~ line 22 ~ total", { total,products,start,end})
  let result = [...products];
  result = (end === total) ? result.slice(start) :
  result.slice(start, end);
  let productsPerPage=result;
  let totalPages = Math.ceil(total/limit);
  console.log("🚀 ~ file: index.tsx ~ line 68 ~ paginateState ~ totalPages", totalPages)
  // console.log("🚀 ~ file: index.tsx ~ line 68 ~ paginateState ~ result.length", result.length)
  // console.log("🚀 ~ file: index.tsx ~ line 69 ~ paginateState ~ limit", limit)
  // console.log("🚀 ~ file: index.tsx ~ line 70 ~ paginateState ~ totalPages", totalPages)
  return {productsPerPage,totalPages};
}
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