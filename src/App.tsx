import "./App.css";
import { Navbar, Nav, Badge,Button } from "react-bootstrap";
import img from "./assets/img.svg";
import cart from "./assets/cart.svg";
import data from "./data/db.json";

function App() {
  // const products =JSON.parse(data).products as [];
  console.log(data)
  // const featuredProduct = JSON.parse(data).filter(product => product.featured === true);
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
          <p className="main-section__header">Recycled Plastic</p>
        </div>
        <div className="col-md-3 col-sm-12">
          <Button variant="dark" className="main-section__button">Add to cart</Button>
        </div>
        <div className="col-lg-12 ">
        </div>
      </section>
      
    </div>
  );
}

export default App;
