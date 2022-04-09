import "./App.css";
import {
  Navbar,
  Nav,
  Badge,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import img from "./assets/img.svg";
import cart from "./assets/cart.svg";
import filterImg from "./assets/filterSettings.svg";
import updown from "./assets/updown.svg";
import data from "./data/db.json";
import { IProduct } from "./Interface/IProduct";
import Product from "./components/Product/Product";

function App() {
  const products = data.products;
  const featuredProduct = products.filter(
    (product) => product.featured === true
  )[0] as IProduct;
  function clickHandler() {
    console.log("clicked");
  }
  return (
    <div className="container container-fluid py-3">
      {/* NavBar  */}
      <Navbar bg="transparent" expand={false}>
        <div className="d-flex justify-content-space-between">
          <Navbar.Brand href="#">
            <img src={img} width="220" height="auto" />
          </Navbar.Brand>
          <Nav className="nav-item">
            <img src={cart} width="54" height="auto" alt="cart" />
            <Badge bg="black" text="white" className="nav-item__badge">
              9
            </Badge>
          </Nav>
        </div>
      </Navbar>
      <hr />
      {/* Main section */}
      <section className="main-section row justify-content-space-between d-flex pos-relative">
        <div className="col-lg-5">
          <p className="main-section__header">{featuredProduct.name}</p>
        </div>
        <div className="col-lg-3 col-sm-12">
          <Button variant="dark" className="main-section__button">
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
                onClick={clickHandler}
              />
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
            <button className="btn btn-transparent product-list__sort-direction-button py-0">
              <img src={updown} alt="sort-direction" />
              Sort By
            </button>
            <DropdownButton
              id="dropdown-basic-button"
              title="Price"
              variant="transparent"
            >
              <Dropdown.Item href="#/action-1">Alpabetically</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="product-list__items">
          <div className="product-list__items__filter-settings">hi</div>
          <div className="product-list__items__products">
            <div className="d-flex">
              {products.map((item,index) => {
                return (
                  <Product product={item} key={index}/>
                  
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
