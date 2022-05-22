import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../store/index";
import updown from "../../assets/updown.svg";
import FilterSettings from "../../components/FilterSettings/FilterSettings";
import Product from "../../components/Product/Product";
import { IProduct } from "../../Interface/IProduct";
import Pagination from "../../components/Pagination/Pagination";

interface IProps {
  products: Array<IProduct>,
}
function ProductList({ products }: IProps) {
  const dispatch = useDispatch();
  const [sortDirection, setSortDirection] = useState("asc");
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
  function SortByCategory(category: string) {
    dispatch(
      productActions.sortProducts({
        sortName: category,
        direction: sortDirection,
      })
    );
  }
  return (
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
          <Pagination />
        </div>
      </div>
    </section>
  );
}

export default ProductList;
