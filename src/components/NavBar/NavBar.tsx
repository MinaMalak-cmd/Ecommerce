import React from "react";
import { Navbar, Nav, Badge, Modal } from "react-bootstrap";
import img from "../../assets/img2.svg";
import cart from "../../assets/cart.svg";
import { IProduct } from "../../Interface/IProduct";

function NavBar({
  cartItems,
  onShowModal,
  onHideModal,
  cartShow,
  onRemoveItemsFromCart,
}) {
  function openModal() {
    if (cartItems?.length > 0) {
      onShowModal();
    }
  }
  function handleClose() {
    onHideModal();
  }
  function removeItemsFromCart() {
    onRemoveItemsFromCart();
  }
  return (
    <div>
      <Navbar bg="transparent" expand={false}>
        <div className="d-flex justify-content-space-between">
          <Navbar.Brand href="#">
            <img src={img} width="39" height="auto" alt="logo" />
          </Navbar.Brand>
          <Nav className="nav-item">
            <img
              src={cart}
              width="54"
              height="auto"
              alt="cart"
              style={{cursor:(cartItems?.length > 0)&&'pointer'}}
              onClick={openModal}
            />
            <Modal show={cartShow} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <div className="col-sm-11 m-auto">
                  {cartItems.map((el: IProduct, index: number) => {
                    return (
                      <div className="row mb-1" key={index}>
                        <div className="col-sm-6">
                          <h3>{el.name}</h3>
                          <span>$ {el.price}</span>
                        </div>
                        <div className="col-sm-6">
                          <img
                            src={el?.image?.src}
                            width="168"
                            height="92"
                            alt={el?.image?.alt}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-dark w-100 text-center"
                  onClick={removeItemsFromCart}
                >
                  Clear
                </button>
              </Modal.Footer>
            </Modal>
            <Badge bg="black" text="white" className="nav-item__badge">
              {cartItems?.length}
            </Badge>
          </Nav>
        </div>
      </Navbar>
      <hr />
    </div>
  );
}

export default NavBar;
