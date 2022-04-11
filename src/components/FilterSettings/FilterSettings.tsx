import React, { useState } from "react";
import "../../App.css";
import { IProduct } from "../../Interface/IProduct";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../store/index";
import useWindowWidth from "../../hooks/useWindowWidth";

function FilterSettings() {
  const products = useSelector((state: any) => state.product.product);
  let categories = new Set(products.map(el=>el.category));
  let arrOfCategories = Array.from(categories)
  const width = useWindowWidth();
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const priceRange =[[0,20],[20,100],[100,200],[200,300]];
  function categoryAdder(category: string) {
    let tempCategories =[];
    if (selectedCategories.includes(category)) {
      tempCategories = selectedCategories.filter(el=>el!==category);
      setSelectedCategories(tempCategories);
    } else {
      tempCategories = [...selectedCategories, category];
      setSelectedCategories(tempCategories);
    }
    console.log(tempCategories);
    dispatch(productActions.getProductByFilter({category:tempCategories}));
  }
  return (
    <>
        <div>
            <h3>Materials</h3>
            <div className="col-sm-9">
                {arrOfCategories.map((item:any,index:number)=>{
                    return <div key={index} className="mb-2">
                        <input type="checkbox"  id={item} value={item} onChange={()=>categoryAdder(item)}/>
                        <label htmlFor={item} className="filter-settings__categories__label"> {item}</label>
                    </div>
                })}
                <hr />
            </div>
            <h3>Price range</h3>
            <div className="col-sm-9">
                {arrOfCategories.map((item:any,index:number)=>{
                    return <div key={index} className="mb-2">
                        <input type="checkbox"  id={item} value={item} onChange={()=>categoryAdder(item)}/>
                        <label htmlFor={item} className="filter-settings__categories__label"> {item}</label>
                    </div>
                })}
                <hr />
            </div>
        </div>
    </>
  );
}

export default FilterSettings;
