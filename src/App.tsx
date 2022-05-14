import React, { useState, useRef, useLayoutEffect } from "react";
import "./App.css";
import filterImg from "./assets/filterSettings.svg";
import updown from "./assets/updown.svg";
import { IProduct } from "./Interface/IProduct";
import Product from "./components/Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { productActions, cartActions, featuredProduct } from "./store/index";
import useCheckMobile from "./hooks/useCheckMobile";
import FilterSettings from "./components/FilterSettings/FilterSettings";
import NavBar from "./components/NavBar/NavBar";
import FeaturedProduct from "./components/FeaturedProduct/FeaturedProduct";

function App() {
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cart);
  const [cartShow, setCartShow] = useState(false);
  const handleClose = () => setCartShow(false);
  const handleShow = () => setCartShow(true);
  const [filterSettings, setFilterSettings] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  let products = useSelector((state: any) => state.product.product);
  products = useCheckMobile() ? products.slice(0, 4) : products.slice(0, 6);

  function dispatchCart(product: IProduct) {
    dispatch(cartActions.addToCart(product));
    handleShow();
  }
  function removeItemsFromCart() {
    dispatch(cartActions.removeFromCart());
    handleClose();
  }
  function SortByCategory(category: string) {
    dispatch(
      productActions.sortProducts({
        sortName: category,
        direction: sortDirection,
      })
    );
  }
  function sortByDirectionHandler() {
    let category = (
      document.getElementById("sortByCategory") as HTMLInputElement
    ).value;
    let tempSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(tempSortDirection);
    dispatch(
      productActions.sortProducts({
        sortName: category,
        direction: tempSortDirection,
      })
    );
  }
  function addFeaturedProductToCart() {
    dispatchCart(featuredProduct);
  }
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else if (!firstRender.current && cartItems?.length > 0) {
      handleShow();
    }
  }, [cartItems]);

  return (
    <div className="container container-fluid py-3">
      {/* NavBar  */}
      <NavBar
        cartItems={cartItems}
        onShowModal={handleShow}
        onHideModal={handleClose}
        onRemoveItemsFromCart={removeItemsFromCart}
        cartShow={cartShow}
      />

      {/* Featured product */}
      <FeaturedProduct
        featuredProduct={featuredProduct}
        onAddFeaturedProductToCart={addFeaturedProductToCart}
      />

      {/* Product details */}
      <section className="row mt-5 product-detail">
        <div className="col-lg-6">
          <h3 className="product-detail__material__heading">
            Materials people also use
          </h3>
          <div className="d-flex">
            {featuredProduct?.details?.recommendations?.map((item) => (
              <div className="" key={item.src}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="product-detail__material__image"
                />
              </div>
            ))}
          </div>
          <div className="product-detail__material__details ">
            <h3 className="product-detail__material__details__heading">
              Details
            </h3>
            <div className="product-detail__material__details__desc">
              Weight : {featuredProduct?.details?.weight} g/m2
              <br />
              Thickness : {featuredProduct?.details?.thickness} cm
            </div>
            <div className="product-detail__material__details__filter-img">
              <img
                src={filterImg}
                alt="filter"
                width="30"
                onClick={() => setFilterSettings(!filterSettings)}
              />
              {filterSettings && (
                <div className="product-list__items__filter-settings">
                  <FilterSettings isShow={filterSettings} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <h3 className="product-detail__heading">
            About the {featuredProduct.name}
          </h3>
          <div className="product-detail__cat">{featuredProduct.category}</div>
          <p className="product-detail__desc">
            {featuredProduct?.details?.description}
          </p>
        </div>
      </section>
      <hr />

      {/* Product list */}
      <section className="mt-5 product-list">
        <div className="row justify-content-between ">
          <div className="col-lg-5">
            <p className="product-list__header">
              Materials/
              <span className="product-list__header__prem">Premium photos</span>
            </p>
          </div>
          <div className="col-lg-3 product-list__sort">
            <button
              className="btn btn-transparent product-list__sort-direction-button py-0"
              onClick={() => sortByDirectionHandler()}
            >
              <img src={updown} alt="sort-direction" />
              Sort By
            </button>
            <select
              id="sortByCategory"
              onChange={(e) => SortByCategory(e.target.value)}
            >
              <option value="price">price</option>
              <option value="alphabetically">alphabetically</option>
            </select>
          </div>
        </div>
        <div className="product-list__items">
          <div className="product-list__items__filter-settings">
            <FilterSettings />
          </div>
          <div className="product-list__items__products">
            <div className="product-list__items__products__container">
              {products.map((item, index) => {
                return <Product product={item} key={index} />;
              })}
            </div>
            <div className="mt-2">{/* Pagination goes here */}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
