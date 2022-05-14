import React from "react";
import filterImg from "../../assets/filterSettings.svg";
import FilterSettings from "../../components/FilterSettings/FilterSettings";

function FeaturedProductDetails({featuredProduct,filterSettings,onChangeFilter}) {
   function onChange(){
    onChangeFilter();
   }
   return (
    <div>
      <section className="row mt-5 product-detail">
        <div className="col-lg-6">
          <h3 className="product-detail__material__heading">
            Materials people also use
          </h3>
          <div className="d-flex">
            {featuredProduct?.details?.recommendations?.map((item:any) => (
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
                onClick={onChange}
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
    </div>
  );
}

export default FeaturedProductDetails;
