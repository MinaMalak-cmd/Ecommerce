import React, { useState } from "react";
import "../../App.css";
import { Card } from "react-bootstrap";
import { IProduct } from "../../Interface/IProduct";
import { cartActions } from '../../store/index';
import { useSelector, useDispatch } from 'react-redux';
interface IProps {
  product: IProduct;
}

function Product(props: IProps) {
  const product = props.product;
  function clickHandler() {
    console.log("clicked");
  }
  const [buttonShow, setButtonShow] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state:any) => state.cart.cart);
  function dispatchCart(product:IProduct) {
    dispatch(cartActions.addToCart(product));
  }

  return (
    <>
      <div
        className="product-list__items__products__container__product"
        onMouseEnter={() => setButtonShow(true)}
        onMouseLeave={() => setButtonShow(false)}
      >
        <img
          src={product.image.src}
          alt={product.image.alt}
          width="100%"
          height="100%"
          className="product-list__items__products__container__product__img"
        />
        {buttonShow && (
          <button onClick={()=>dispatchCart(product)} className="btn btn-dark product-list__items__products__container__product__button">
            Add to cart
          </button>
        )}
        {product.bestseller && (
          <span className="product-list__items__products__container__product__bestseller-tag">
            Best seller
          </span>
        )}
        <div>
          <div className="product-list__items__products__container__product__cat">{product.category}</div>
          <h3 className="product-list__items__products__container__product__name">{product.name}</h3>
          <div className="product-list__items__products__container__product__price">$ {product.price}</div>
        </div>
      </div>
    </>
  );
}

export default Product;
