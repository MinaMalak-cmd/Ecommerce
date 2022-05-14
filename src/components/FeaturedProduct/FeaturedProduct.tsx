import React from "react";
import {Button} from "react-bootstrap";

function FeaturedProduct({featuredProduct,onAddFeaturedProductToCart}) {
  function addToCart(){
    onAddFeaturedProductToCart();
  }
  
  return (
    <div>
      <section className="main-section row justify-content-space-between d-flex pos-relative">
        <div className="col-lg-5">
          <p className="main-section__header">{featuredProduct.name}</p>
        </div>
        <div className="col-lg-3 col-sm-12">
          <Button
            variant="dark"
            className="main-section__button"
            onClick={addToCart}
          >
            Add to cart
          </Button>
        </div>
        <div className="col-lg-12 main-section__img-container">
          <span className="main-section__img-container__description">
            Featured
          </span>
          <img src={featuredProduct.image.src} alt="product" width="100%" />
        </div>
      </section>
    </div>
  );
}

export default FeaturedProduct;
