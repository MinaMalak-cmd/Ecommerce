import React, { useState } from "react";
import "../../App.css";
import { Card } from "react-bootstrap";
import { IProduct } from "../../Interface/IProduct";
interface IProps {
  product: IProduct;
}
function Product(props: IProps) {
  const product = props.product;
  function clickHandler() {
    console.log("clicked");
  }
  const [buttonShow, setButtonShow] = useState(false);
  return (
    <>
      <div
        className="product-list__items__products__container__product"
        onMouseEnter={() => setButtonShow(true)}
        onMouseLeave={() => setButtonShow(false)}
      >
        <img
          src={product.image.src}
          width="100%"
          height="100%"
          className="product-list__items__products__container__product__img"
        />
        {buttonShow && (
          <button className="btn btn-dark product-list__items__products__container__product__button">
            Add to cart
          </button>
        )}
        {product.bestseller && (
          <span className="product-list__items__products__container__product__bestseller-tag">
            Best seller
          </span>
        )}
        <div className="product-list__items__products__container__product__cat">{product.category}</div>
        <h3 className="product-list__items__products__container__product__name">{product.name}</h3>
        <div className="product-list__items__products__container__product__price">$ {product.price}</div>
      </div>
    </>
  );
}

export default Product;
