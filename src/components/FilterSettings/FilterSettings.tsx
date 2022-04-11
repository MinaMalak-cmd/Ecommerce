import React, { useState } from "react";
import "../../App.css";
import { IProduct } from "../../Interface/IProduct";
import { useSelector, useDispatch } from "react-redux";
import { productActions, categories } from "../../store/index";
import useCheckMobile from "../../hooks/useCheckMobile";
import { Modal } from "react-bootstrap";
interface IProps {
    isShow?:boolean;
  }
function FilterSettings(props: IProps) {
  let isShow = props.isShow;
  let arrOfCategories = Array.from(categories);
  const isMobile = useCheckMobile();
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const priceRange = [
    [0, 20],
    [20, 100],
    [100, 200],
    [200, 300],
  ];
  const [modalShow, setModalShow] = useState(isShow);
  const handleClose = () => setModalShow(false);
  function categoryAdder(category: string) {
    let tempCategories = [];
    if (selectedCategories.includes(category)) {
      tempCategories = selectedCategories.filter((el) => el !== category);
      setSelectedCategories(tempCategories);
    } else {
      tempCategories = [...selectedCategories, category];
      setSelectedCategories(tempCategories);
    }
    let priceRange =
      selectedPrice.length > 0
        ? { min: selectedPrice[0], max: selectedPrice[1] }
        : { min: 0, max: 300 };
    dispatch(
      productActions.getProductByFilter({
        categories:
          tempCategories.length === 0 ? arrOfCategories : tempCategories,
        priceRange: priceRange,
      })
    );
  }
  function priceAdder(price: [number, number]) {
    setSelectedPrice(price);
    dispatch(
      productActions.getProductByFilter({
        categories:
          selectedCategories.length === 0
            ? arrOfCategories
            : selectedCategories,
        priceRange: { min: price[0], max: price[1] },
      })
    );
  }
  function clearAllSettings(){
    setSelectedCategories([]);
    setSelectedPrice([]);
    const checkBoxes = document.querySelectorAll("input[type='checkbox']:checked") as NodeListOf<HTMLInputElement>;
    for(var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = false;   
    }
    const radioBtn = document.querySelector("input[type='radio']:checked") as HTMLInputElement;
    radioBtn.checked = false;
    // setModalShow(false);
  }
  function categoryAdderMobile(category: string) {
    let tempCategories = [];
    if (selectedCategories.includes(category)) {
      tempCategories = selectedCategories.filter((el) => el !== category);
      setSelectedCategories(tempCategories);
    } else {
      tempCategories = [...selectedCategories, category];
      setSelectedCategories(tempCategories);
    }
  }
  function priceAdderMobile(price: [number, number]) {
    setSelectedPrice(price);
  }
  function saveSettings(){
    let priceRange =
    selectedPrice.length > 0
      ? { min: selectedPrice[0], max: selectedPrice[1] }
      : { min: 0, max: 300 };
    dispatch(
        productActions.getProductByFilter({
          categories:selectedCategories.length === 0 ? arrOfCategories: selectedCategories,
          priceRange: priceRange,
        })
      );
      handleClose();
  }
  return (
    <>
      {!isMobile && (
        <div>
          <h3>Materials</h3>
          <div className="col-sm-9">
            {arrOfCategories.map((item: any, index: number) => {
              return (
                <div key={index} className="mb-2">
                  <input
                    type="checkbox"
                    id={item}
                    value={item}
                    name="checkBox"
                    onChange={() => categoryAdder(item)}
                  />
                  <label
                    htmlFor={item}
                    className="filter-settings__categories__label"
                  >
                    {" "}
                    {item}
                  </label>
                </div>
              );
            })}
            <hr />
          </div>
          <h3>Price range</h3>
          <div className="col-sm-9">
            {priceRange.map((item: any, index: number) => {
              return (
                <div key={index} className="mb-2">
                  <input
                    type="radio"
                    id={`price${index}`}
                    value={`price${index}`}
                    name="radioButton"
                    onChange={() => priceAdder(item)}
                  />
                  <label
                    htmlFor={`price${index}`}
                    className="filter-settings__categories__label"
                  >
                    {" "}
                    ${item[0]}-${item[1]}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isMobile && (
          <div className="col-sm-6">
                <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="col-sm-11 m-auto">
                    <div>
                        <h3>Materials</h3>
                        <div className="col-sm-9">
                        {arrOfCategories.map((item: any, index: number) => {
                            return (
                            <div key={index} className="mb-2">
                                <input
                                type="checkbox"
                                id={item}
                                value={item}
                                onChange={() => categoryAdderMobile(item)}
                                />
                                <label
                                htmlFor={item}
                                className="filter-settings__categories__label"
                                >
                                {" "}
                                {item}
                                </label>
                            </div>
                            );
                        })}
                        <hr />
                        </div>
                        <h3>Price range</h3>
                        <div className="col-sm-9">
                        {priceRange.map((item: any, index: number) => {
                            return (
                            <div key={index} className="mb-2">
                                <input
                                type="radio"
                                id={`price${index}`}
                                value={`price${index}`}
                                name="radioButton"
                                onChange={() => priceAdderMobile(item)}
                                />
                                <label
                                htmlFor={`price${index}`}
                                className="filter-settings__categories__label"
                                >
                                {" "}
                                ${item[0]}-${item[1]}
                                </label>
                            </div>
                            );
                        })}
                        </div>
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer >
                    <div className="d-flex w-100 justify-content-between">
                            <button
                            className="btn btn-white btn-outline-dark col-sm-5 text-center"
                            onClick={clearAllSettings}
                            >
                            CLEAR
                            </button>
                            <button
                            className="btn btn-dark col-sm-5 text-center"
                            onClick={saveSettings}
                            >
                            SAVE
                            </button>
                    </div>
                </Modal.Footer>
                </Modal>
          </div>
      )}
    </>
  );
}

export default FilterSettings;
