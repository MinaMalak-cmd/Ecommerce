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
  return (
    <div className="product-list__items__products__container__product">
      <img src={product.image.src} width="100%" height="100%" className="product-list__items__products__container__product__img"/>
    </div>
  );
}

export default Product;
